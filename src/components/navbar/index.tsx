export default function Navbar() {
  return (
    <header className="bg-background w-full top-0 sticky z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center space-x-8">
          <a
            className="text-2xl md:text-3xl font-bold text-on-background tracking-tighter"
            href="#"
          >
            Forge
          </a>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#templates"
            >
              Templates
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#how-it-works"
            >
              How it works
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-200"
              href="#community"
            >
              Community
            </a>
          </nav>
        </div>
        <div className="flex items-center">
          <a
            className="bg-primary text-on-primary text-xs font-medium px-4 py-2 rounded border border-primary hover:bg-transparent hover:text-primary transition-colors duration-200"
            href="#waitlist"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
