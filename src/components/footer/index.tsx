import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface w-full mt-auto border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-16 py-12 max-w-[1440px] mx-auto">
        <div>
          <Link
            className="text-2xl font-bold text-on-background block mb-3 tracking-tighter"
            href="/"
          >
            Forge
          </Link>
          <p className="text-xs text-on-surface-variant font-mono">
            &copy; {new Date().getFullYear()} Forge. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end items-center text-xs">
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            href="/#features"
          >
            Features
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            href="/templates"
          >
            Templates
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            href="/#how-it-works"
          >
            How it works
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            href="/community"
          >
            Community
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            href="/#waitlist"
          >
            Waitlist
          </Link>
        </div>
      </div>
    </footer>
  );
}
