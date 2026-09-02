import featuresData from '@/data/features.json';

export default function Features() {
  return (
    <section id="features" className="py-16 bg-muted/40 border-y">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need to ship</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built from the ground up for speed, learning, and collaboration.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuresData.map((feature) => (
            <div key={feature.id} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-2">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
