export default function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-brand-purple/30 bg-black/40 text-center font-share-tech text-brand-light/60">
      <p>&copy; {new Date().getFullYear()} IMRNES Team. All rights vibe coded.</p>
      <p className="text-sm mt-2">Built with Yahoodie Framework &amp; Tailwind CSS</p>
      <p className="text-sm mt-4 font-press-start text-xs">
        <a
          href="https://forum.imrnes.team"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-green hover:text-brand-light transition-colors"
        >
          Forum &rarr;
        </a>
      </p>
    </footer>
  );
}
