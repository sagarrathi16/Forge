import stats from '@/data/statistics.json';
import testimonials from '@/data/testimonials.json';
import projectsData from '@/data/projects.json';
import { Project } from '@/types';

export default function SocialProof() {
  const projects: Project[] = projectsData as Project[];

  return (
    <section
      id="community"
      className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto bg-surface-container-low border-y border-outline-variant fade-in-up delay-200"
    >
      {/* Section Header */}
      <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block">
          Community & Showcase
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Built by the Forge Community
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant">
          Explore real applications, side projects, and tools shipped by developers using Forge.
        </p>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-center">
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">
            {stats.projectsBuilt}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Projects Built
          </p>
        </div>
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">
            {stats.communityMembers}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Community Members
          </p>
        </div>
        <div className="border-technical rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-bold text-primary font-mono">
            {stats.projectsDeployed}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Deployments
          </p>
        </div>
      </div>

      {/* Community Shared Builds Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-on-background tracking-tight">
            Recent Community Builds
          </h3>
          <span className="font-mono text-xs text-on-surface-variant">
            Showing {projects.length} shared projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-technical rounded-lg p-6 bg-surface flex flex-col justify-between space-y-4 hover:border-primary transition-colors duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-lg font-bold text-on-background group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs font-mono flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">link</span>
                      Live Demo
                    </a>
                  )}
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-outline-variant">
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Reaction Stats */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="font-semibold text-on-background block">
                      {project.author}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      {project.role}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-on-surface-variant font-mono text-xs">
                    <span className="flex items-center gap-1" title="Stars">
                      <span className="material-symbols-outlined text-sm text-primary">star</span>
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1" title="Upvotes">
                      <span className="material-symbols-outlined text-sm text-primary">thumb_up</span>
                      {project.upvotes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h3 className="text-xl font-bold text-on-background tracking-tight mb-8">
          What Builders Are Saying
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border-technical rounded-lg p-6 bg-surface space-y-4 hover:border-primary transition-colors duration-300"
            >
              <p className="text-sm text-on-surface leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-outline-variant pt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-on-background">
                    {t.author}
                  </p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
                <span className="font-mono text-[10px] text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                  Verified Builder
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
