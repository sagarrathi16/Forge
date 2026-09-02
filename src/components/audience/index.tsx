export default function Audience() {
  return (
    <section className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto fade-in-up delay-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-primary uppercase tracking-widest block">
            Who it is for
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-on-background tracking-tight">
            Builders with Ideas
          </h3>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Designed for young developers and makers who have the vision but need a streamlined path to production. Stop getting bogged down in boilerplate.
          </p>
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs text-primary uppercase tracking-widest block">
            Why use it
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-on-background tracking-tight">
            Frictionless Flow
          </h3>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Reduce the time between thought and code. Our AI-assisted templates get you to a working prototype faster than ever before.
          </p>
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs text-primary uppercase tracking-widest block">
            What&apos;s different
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-on-background tracking-tight">
            Ship, Don&apos;t Just Learn
          </h3>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            We combine a professional-grade deployment stack with community sharing. Move beyond local tutorials and actually put your work into the world.
          </p>
        </div>
      </div>
    </section>
  );
}
