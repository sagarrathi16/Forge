import stats from '@/data/statistics.json';
import testimonials from '@/data/testimonials.json';

export default function SocialProof() {
  return (
    <section id="community" className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto fade-in-up delay-200">
      <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block">
          Community & Showcase
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Built by developers like you
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant">
          Join thousands of young builders shipping real applications every day.
        </p>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-center">
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.projectsBuilt}+</p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">Projects Built</p>
        </div>
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.communityMembers}+</p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">Community Members</p>
        </div>
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.projectsDeployed}+</p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">Deployments</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="border-technical rounded-lg p-6 bg-surface space-y-4 hover:border-primary transition-colors duration-300">
            <p className="text-sm text-on-surface leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="border-t border-outline-variant pt-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-on-background">{t.author}</p>
                <p className="text-xs text-on-surface-variant">{t.role}</p>
              </div>
              <span className="font-mono text-[10px] text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                Verified Builder
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
