import stats from '@/data/statistics.json';
import testimonials from '@/data/testimonials.json';

export default function SocialProof() {
  return (
    <section id="community" className="py-16 bg-muted/40 border-y">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">{stats.projectsBuilt}+</p>
            <p className="text-sm text-muted-foreground">Projects Built</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{stats.communityMembers}+</p>
            <p className="text-sm text-muted-foreground">Community Members</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{stats.projectsDeployed}+</p>
            <p className="text-sm text-muted-foreground">Deployments</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-4">
              <p className="italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
