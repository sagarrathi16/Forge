export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Pick a path",
      desc: "Start from a curated template or describe what you want to build in plain English to our AI engine.",
    },
    {
      num: "2",
      title: "Build",
      desc: "Iterate on the scaffolded code with integrated AI tools tailored to your stack.",
    },
    {
      num: "3",
      title: "Deploy",
      desc: "Push your code. We handle the infrastructure, database, and hosting instantly.",
    },
    {
      num: "4",
      title: "Share",
      desc: "Publish to the Forge community to get feedback, users, or contributors.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto bg-surface-container-low border-y border-outline-variant fade-in-up delay-300"
    >
      <div className="mb-14">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-3 block">
          Process
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          How to get started
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="border-l-2 border-outline-variant pl-6 hover:border-primary transition-colors duration-300 space-y-2"
          >
            <span className="text-4xl font-bold text-surface-variant mb-2 block font-sans">
              {step.num}
            </span>
            <h3 className="text-base font-semibold text-on-background">
              {step.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
