import Footer from "@/components/Footer";
import Link from "next/link";

type CveEntry = {
  cve: string;
  ghsa?: string;
  product?: string;
  week?: string;
  repoUrl?: string;
  repoLabel?: string;
};

const SOURCE_URL = "https://goetia.imrnes.team/aryma/Zero-day-list-aryma/src/branch/main/README.md";

function parseCves(markdown: string): CveEntry[] {
  const lines = markdown.split("\n");
  let week = "";
  let product = "";
  let ghsa = "";
  let repoUrl = "";
  let repoLabel = "";
  const entries: CveEntry[] = [];

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## Week")) {
      week = line.replace(/^##\s+/, "");
      continue;
    }

    if (line.startsWith("### ")) {
      product = line.replace(/^###\s+/, "");
      repoUrl = "";
      repoLabel = "";
      continue;
    }

    if (line.includes("GHSA")) {
      const match = line.match(/https?:\/\/\S+/);
      if (match) {
        const cleaned = match[0]
          .replace(/[`"'()]/g, "")
          .replace(/[.,;:]$/, "");
        ghsa = cleaned;
        const repoMatch = cleaned.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/security\/advisories\/[^\/]+/);
        if (repoMatch) {
          const owner = repoMatch[1];
          const repo = repoMatch[2];
          repoUrl = `https://github.com/${owner}/${repo}`;
          repoLabel = `${owner}/${repo}`;
        }
      }
      continue;
    }

    const cveMatch = line.match(/CVE-\d{4}-\d{4,}/);
    if (cveMatch) {
      entries.push({
        cve: cveMatch[0],
        ghsa: ghsa || undefined,
        product: product || undefined,
        week: week || undefined,
        repoUrl: repoUrl || undefined,
        repoLabel: repoLabel || undefined,
      });
      ghsa = "";
      repoUrl = "";
      repoLabel = "";
    }
  }

  return entries;
}

async function fetchCves() {
  const res = await fetch(SOURCE_URL, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent": "imrnes-site/1.0 (+https://goetia.imrnes.team/)",
      "Accept": "text/plain, text/markdown;q=0.9, */*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch CVEs: ${res.status}`);
  }

  const markdown = await res.text();
  return parseCves(markdown);
}

export default async function CvePage() {
  let cves: CveEntry[] = [];
  let cveError: string | null = null;

  try {
    cves = await fetchCves();
  } catch (e: unknown) {
    cveError = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-share-tech bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple-dark/20 via-brand-dark to-brand-dark">
      <main className="flex flex-col gap-12 w-full max-w-4xl items-center z-10 flex-grow">
        <section className="w-full mt-12 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-press-start text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green drop-shadow-sm leading-tight py-4">
            CVE DISCOVERED
          </h1>
          <div className="h-1 w-24 bg-brand-green mx-auto rounded-full"></div>
          <p className="text-brand-light/80">
            Latest CVEs collected from the IMRNES zero-day list.
          </p>
        </section>

        <section className="w-full px-4 text-brand-light space-y-6">
          <div className="bg-brand-dark/50 border border-brand-green/30 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-brand-light">Discovered CVEs</h2>
                <p className="text-brand-light/60">Total: {cves.length}</p>
              </div>
              <div className="text-sm text-brand-light/60">
                Source: goetia.imrnes.team
              </div>
            </div>
          </div>

          {cveError && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-200 rounded-lg p-4 text-center">
              Failed to load CVEs: {cveError}
            </div>
          )}

          {!cveError && cves.length === 0 && (
            <div className="bg-brand-dark/50 border border-brand-green/30 rounded-xl p-6 md:p-8 backdrop-blur-sm text-center">
              <p className="text-brand-light/80">No CVEs found.</p>
            </div>
          )}

          {!cveError && cves.length > 0 && (
            <div className="space-y-3">
              {cves.map((entry, index) => (
                <div
                  key={`${entry.cve}-${index}`}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-lg border border-brand-purple/30 bg-brand-dark/40 hover:border-brand-purple/60 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-press-start text-brand-green">{entry.cve}</div>
                    <div className="text-sm text-brand-light/70 flex flex-wrap gap-x-3 gap-y-1">
                      {entry.product && <span>{entry.product}</span>}
                      {entry.repoUrl && (
                        <Link
                          href={entry.repoUrl}
                          target="_blank"
                          className="underline text-brand-light/70 hover:text-brand-green"
                        >
                          {entry.repoLabel || "Repository"}
                        </Link>
                      )}
                      {entry.week && <span>{entry.week}</span>}
                    </div>
                  </div>
                  <div className="text-sm">
                    {entry.ghsa ? (
                      <Link
                        href={entry.ghsa}
                        target="_blank"
                        className="underline text-brand-light/80 hover:text-brand-green"
                      >
                        GHSA Advisory
                      </Link>
                    ) : (
                      <span className="text-brand-light/50">No GHSA link</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
