import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface w-full mt-auto border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-16 py-10 max-w-[1440px] mx-auto">
        <div>
          <Link
            className="text-2xl font-extrabold text-on-background inline-block mb-2 tracking-tighter btn-tactile"
            href="/"
          >
            Forge
          </Link>
          <p className="text-xs text-on-surface-variant font-mono leading-relaxed max-w-sm">
            The developer platform turning ideas into production software.
          </p>
          <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All Systems Operational</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 md:justify-end items-center text-xs font-mono">
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile"
            href="/#features"
          >
            Features
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile"
            href="/templates"
          >
            Templates
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile"
            href="/#how-it-works"
          >
            How it works
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile"
            href="/community"
          >
            Community
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile"
            href="/#waitlist"
          >
            Waitlist
          </Link>
        </div>
      </div>

      <div className="border-t border-outline-variant/40 py-4 px-4 md:px-16 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-on-surface-variant/70 font-mono">
        <p>&copy; {new Date().getFullYear()} Forge Dev Inc. Built for young builders.</p>
        <p>Zero-config • Type-safe • Global edge</p>
      </div>
    </footer>
  );
}
