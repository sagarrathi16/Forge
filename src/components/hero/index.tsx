export default function Hero() {
  return (
    <section className="py-20 md:py-28 text-center space-y-6">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          From &ldquo;I have an idea&rdquo; to &ldquo;I built it.&rdquo;
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Forge helps young developers turn ideas into real software projects with instant templates, AI-assisted development, one-click deployment, and a supportive community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#waitlist"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get Early Access
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

