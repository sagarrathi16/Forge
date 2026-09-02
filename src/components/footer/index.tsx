'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { animateScrollToWaitlist } from '@/lib/navigation';

export default function Footer() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      animateScrollToWaitlist(e);
    }
  };

  return (
    <footer className="bg-surface w-full mt-auto border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-16 py-10 max-w-[1440px] mx-auto">
        <div>
          <Link
            className="text-2xl font-extrabold text-on-background inline-block mb-2 tracking-tighter btn-tactile cursor-pointer"
            href="/"
            onClick={handleLogoClick}
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
            onClick={(e) => handleNavLinkClick(e, '/#features')}
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
            onClick={(e) => handleNavLinkClick(e, '/#how-it-works')}
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
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 hover:bg-white/[0.04] btn-tactile cursor-pointer"
            href="/#waitlist"
            onClick={handleWaitlistClick}
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
