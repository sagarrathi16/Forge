export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Pick an idea", desc: "Select from curated templates or enter your own custom prompt." },
    { step: "02", title: "Build your project", desc: "Use AI assistance to write clean code, add features, and fix bugs." },
    { step: "03", title: "Deploy it", desc: "Launch your application with one click onto global edge infrastructure." },
    { step: "04", title: "Share it", desc: "Publish your work to the developer community and collect feedback." },
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground">Four simple steps to go from concept to launch.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div key={item.step} className="p-6 rounded-lg border bg-background space-y-3">
              <span className="text-2xl font-bold text-primary">{item.step}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

