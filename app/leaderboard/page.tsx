import Footer from "@/components/Footer";
import Link from "next/link";

type TopTeam = {
  team_id: number;
  team_name: string;
  points?: number;
};

const TEAM_NAME = "IMRNES";
const COUNTRY_CODE = "id";
const API_URL = `https://ctftime.org/api/v1/top-by-country/${COUNTRY_CODE}/?limit=100`;

async function fetchLeaderboard(): Promise<TopTeam[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent": "imrnes-site/1.0 (+https://ctftime.org/)",
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch leaderboard: ${res.status}`);
  }

  const data = (await res.json()) as TopTeam[] | Record<string, TopTeam[]>;

  if (Array.isArray(data)) return data;
  const keys = Object.keys(data as Record<string, unknown>);
  if (keys.length > 0) {
    const value = (data as Record<string, unknown>)[keys[0]];
    if (Array.isArray(value)) {
      return value as TopTeam[];
    }
  }
  return [];
}

export default async function LeaderboardPage() {
  let leaderboard: TopTeam[] = [];
  let error: string | null = null;

  try {
    leaderboard = await fetchLeaderboard();
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : String(e);
  }

  const normalizedName = (s: string) => s.trim().toLowerCase();
  const index = leaderboard.findIndex((t) => normalizedName(t.team_name) === normalizedName(TEAM_NAME));
  const rank = index >= 0 ? index + 1 : null;
  const team = index >= 0 ? leaderboard[index] : null;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-share-tech bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple-dark/20 via-brand-dark to-brand-dark">
      <main className="flex flex-col gap-12 w-full max-w-3xl items-center z-10 flex-grow">
        <section className="w-full mt-12 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-press-start text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-green drop-shadow-sm leading-tight py-4">
            LEADERBOARD
          </h1>
          <div className="h-1 w-24 bg-brand-green mx-auto rounded-full"></div>
          <p className="text-brand-light/80">
            Showing CTFtime rank for team <span className="text-brand-green font-press-start">{TEAM_NAME}</span> on Indonesia leaderboard.
          </p>
        </section>

        <section className="w-full px-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-200 rounded-lg p-4 text-center">
              Failed to load leaderboard: {error}
            </div>
          )}

          {!error && rank == null && (
            <div className="bg-brand-dark/50 border border-brand-green/30 rounded-xl p-6 md:p-8 backdrop-blur-sm text-center">
              <p className="text-brand-light/80">
                Team <span className="text-brand-green font-press-start">{TEAM_NAME}</span> is not in the current top list for Indonesia.
              </p>
              <p className="text-brand-light/60 mt-2">
                Data sourced from CTFtime. The endpoint may return only the top teams.
              </p>
            </div>
          )}

          {!error && rank != null && team && (
            <div className="bg-brand-dark/50 border border-brand-green/30 rounded-xl p-6 md:p-8 backdrop-blur-sm text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-5xl md:text-6xl font-press-start text-brand-green drop-shadow">
                  #{rank}
                </span>
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-light">{team.team_name}</h2>
                  {typeof team.points === "number" && (
                    <p className="text-brand-purple text-sm">Points: {team.points.toFixed(3)}</p>
                  )}
                  {team.team_id && (
                    <p className="text-brand-light/60 text-sm mt-1">
                      <Link
                        href={`https://ctftime.org/team/${team.team_id}`}
                        target="_blank"
                        className="underline hover:text-brand-green"
                      >
                        View on CTFtime
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!error && leaderboard.length > 0 && (
            <div className="mt-6 space-y-3">
              {leaderboard.map((t, i) => {
                const isSelf = normalizedName(t.team_name) === normalizedName(TEAM_NAME);
                const base =
                  "flex items-center justify-between p-4 rounded-lg border transition-colors";
                const normal =
                  "bg-brand-dark/40 border-brand-purple/30 hover:border-brand-purple/60";
                const highlight =
                  "bg-brand-green/10 border-brand-green/70 shadow-[0_0_15px_rgba(50,205,50,0.25)]";
                return (
                  <div
                    key={`${t.team_id}-${t.team_name}-${i}`}
                    className={`${base} ${isSelf ? highlight : normal}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 text-right font-press-start ${isSelf ? "text-brand-green" : "text-brand-light/70"}`}>
                        #{i + 1}
                      </div>
                      <div className={`text-lg ${isSelf ? "text-brand-green" : "text-brand-light"}`}>
                        {t.team_name}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {typeof t.points === "number" && (
                        <span className={`text-sm ${isSelf ? "text-brand-green" : "text-brand-purple"}`}>
                          {t.points.toFixed(3)}
                        </span>
                      )}
                      {t.team_id ? (
                        <Link
                          href={`https://ctftime.org/team/${t.team_id}`}
                          target="_blank"
                          className={`text-xs underline ${isSelf ? "text-brand-green" : "text-brand-light/70"} hover:text-brand-green`}
                        >
                          CTFtime
                        </Link>
                      ) : (
                        <span className="text-xs text-brand-light/50">N/A</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
