export default function Hero() {
  return (
    <section className="px-4 md:px-16 py-20 md:py-28 max-w-[1440px] mx-auto fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-background leading-[1.1]">
            <span className="block">From &ldquo;I have an idea&rdquo;</span>
            <span className="block text-primary">to &ldquo;I built it.&rdquo;</span>
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Forge gives you the tools to go from an idea to a working project through templates, AI-assisted development, deployment, and community.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              className="bg-primary text-on-primary text-sm font-medium px-6 py-3 rounded border border-primary hover:bg-transparent hover:text-primary transition-colors duration-200"
              href="#waitlist"
            >
              Join the waitlist
            </a>
            <a
              className="bg-transparent text-on-background text-sm font-medium px-6 py-3 rounded border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-200"
              href="#how-it-works"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Technical Code Terminal Card */}
        <div className="border-technical rounded-lg p-6 code-bg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center space-x-2 border-b border-outline-variant pb-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <span className="text-on-surface-variant ml-4 text-xs">forge-cli</span>
            </div>
            <div className="text-on-surface">
              <span className="text-primary">$</span> forge init &quot;Build a habit tracker&quot;
            </div>
            <div className="text-on-surface-variant opacity-70 leading-relaxed text-xs">
              &gt; Analyzing intent...<br />
              &gt; Selecting React + Supabase template...<br />
              &gt; Scaffolding project...
            </div>
            <div className="text-secondary mt-4 font-semibold text-xs">
              [SUCCESS] Project scaffolded.
            </div>
            <div className="text-on-surface mt-3">
              <span className="text-primary">$</span> forge deploy
            </div>
            <div className="text-primary mt-2 flex items-center text-xs font-semibold">
              <span className="material-symbols-outlined mr-2 text-sm">link</span>
              https://habit-tracker.forge.dev
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
