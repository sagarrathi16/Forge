'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { animateScrollToWaitlist } from '@/lib/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Templates', href: '/templates' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Community', href: '/community' },
  ];

  // Only highlight dedicated route pages; do not falsely auto-select hash links on home
  const isActive = (href: string) => {
    if (href === '/templates') return pathname === '/templates';
    if (href === '/community') return pathname === '/community';
    return false;
  };

  // When clicking Forge on the landing page, smoothly scroll directly back to top and clean URL
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Handle in-page smooth scrolling cleanly and sync history state
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
    setMobileMenuOpen(false);
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      animateScrollToWaitlist(e);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/90 backdrop-blur-md w-full top-0 sticky z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-4 md:px-16 py-3.5 max-w-[1440px] mx-auto">
        {/* Brand & Nav */}
        <div className="flex items-center space-x-8">
          <Link
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-on-background tracking-tighter btn-tactile group cursor-pointer"
            href="/"
            onClick={handleLogoClick}
          >
            <span>Forge</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              v1.0 Beta
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-md transition-all duration-150 btn-tactile ${
                    active
                      ? 'bg-white/[0.08] text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-background hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            className="bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded border border-primary hover:bg-transparent hover:text-primary transition-all duration-200 shadow-[0_0_12px_rgba(192,193,255,0.2)] hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] btn-tactile cursor-pointer"
            href="/#waitlist"
            onClick={handleWaitlistClick}
          >
            Join waitlist
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded border border-outline-variant bg-surface text-on-surface hover:border-primary/60 btn-tactile p-1.5"
          >
            <span
              className={`w-4 h-0.5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}
            ></span>
            <span
              className={`w-4 h-0.5 bg-current transition-all duration-200 my-0.5 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`w-4 h-0.5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-outline-variant bg-surface/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="block px-3 py-2 rounded text-sm text-on-surface hover:text-primary hover:bg-white/[0.04] transition-colors btn-tactile"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            onClick={handleWaitlistClick}
            className="block px-3 py-2 rounded text-sm text-primary font-bold hover:bg-white/[0.04] transition-colors btn-tactile"
          >
            Join waitlist →
          </Link>
          <div className="pt-2 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Status: Operational</span>
            <span className="text-primary">edge: us-east</span>
          </div>
        </div>
      )}
    </header>
  );
}
