export default function Features() {
  const capabilities = [
    {
      num: "01",
      icon: "auto_awesome_mosaic",
      title: "Start from a template",
      desc: "Don't start from zero. Use curated, production-ready foundations.",
      delay: "delay-100",
    },
    {
      num: "02",
      icon: "smart_toy",
      title: "Build with AI",
      desc: "Assisted development that understands your project's context.",
      delay: "delay-200",
    },
    {
      num: "03",
      icon: "rocket_launch",
      title: "Deploy in one click",
      desc: "Instant production environments without configuration headaches.",
      delay: "delay-300",
    },
    {
      num: "04",
      icon: "forum",
      title: "Share with the community",
      desc: "Showcase your work, get feedback, and find collaborators.",
      delay: "delay-400",
    },
  ];

  return (
    <section
      id="features"
      className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto bg-surface-container-low border-y border-outline-variant"
    >
      <div className="mb-14 fade-in-up delay-100">
        <span className="font-mono text-xs text-primary uppercase tracking-widest mb-3 block">
          Capabilities
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Core Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {capabilities.map((item) => (
          <div
            key={item.num}
            className={`border-technical rounded-lg p-6 bg-surface hover:border-primary transition-colors duration-300 fade-in-up ${item.delay}`}
          >
            <span className="font-mono text-xs text-on-surface-variant mb-4 block">
              {item.num}
            </span>
            <span className="material-symbols-outlined text-primary mb-4 block text-3xl">
              {item.icon}
            </span>
            <h3 className="text-base font-semibold text-on-background mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
