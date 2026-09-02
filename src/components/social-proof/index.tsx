'use client';

import { useState, useRef, useEffect } from 'react';
import { Project, Testimonial, PlatformStatistics } from '@/types';

interface SocialProofProps {
  initialProjects?: Project[];
  initialTestimonials?: Testimonial[];
  initialStats?: PlatformStatistics;
}

export default function SocialProof({
  initialProjects = [],
  initialTestimonials = [],
  initialStats = { projectsBuilt: 1240, communityMembers: 860, projectsDeployed: 970 },
}: SocialProofProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [stats, setStats] = useState<PlatformStatistics>(initialStats);
  const [loading, setLoading] = useState<boolean>(initialProjects.length === 0);
  const [activeProjectSlide, setActiveProjectSlide] = useState(0);
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const [userReactions, setUserReactions] = useState<{ [key: string]: { starred?: boolean; upvoted?: boolean } }>({});

  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length === 0 || testimonials.length === 0) {
      setLoading(true);
      fetch('/api/community')
        .then((res) => res.json())
        .then((payload) => {
          if (payload.success && payload.data) {
            if (payload.data.projects) setProjects(payload.data.projects);
            if (payload.data.testimonials) setTestimonials(payload.data.testimonials);
            if (payload.data.stats) setStats(payload.data.stats);
          }
        })
        .catch((err) => console.warn('Could not fetch community data from API:', err))
        .finally(() => setLoading(false));
    }
  }, [projects.length, testimonials.length]);

  const toggleStar = async (projectId: string) => {
    const isCurrentlyStarred = userReactions[projectId]?.starred || false;
    const delta = isCurrentlyStarred ? -1 : 1;

    setUserReactions((prev) => ({
      ...prev,
      [projectId]: { ...prev[projectId], starred: !isCurrentlyStarred },
    }));

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, stars: Math.max(0, p.stars + delta) };
        }
        return p;
      })
    );

    try {
      await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, type: 'star', delta }),
      });
    } catch (err) {
      console.error('Failed to sync star reaction with backend:', err);
    }
  };

  const toggleUpvote = async (projectId: string) => {
    const isCurrentlyUpvoted = userReactions[projectId]?.upvoted || false;
    const delta = isCurrentlyUpvoted ? -1 : 1;

    setUserReactions((prev) => ({
      ...prev,
      [projectId]: { ...prev[projectId], upvoted: !isCurrentlyUpvoted },
    }));

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, upvotes: Math.max(0, p.upvotes + delta) };
        }
        return p;
      })
    );

    try {
      await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, type: 'upvote', delta }),
      });
    } catch (err) {
      console.error('Failed to sync upvote reaction with backend:', err);
    }
  };

  const handleProjectsScroll = () => {
    if (projectsScrollRef.current) {
      const { scrollLeft, clientWidth } = projectsScrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveProjectSlide(Math.min(Math.max(index, 0), projects.length - 1));
    }
  };

  const handleTestimonialsScroll = () => {
    if (testimonialsScrollRef.current) {
      const { scrollLeft, clientWidth } = testimonialsScrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveTestimonialSlide(Math.min(Math.max(index, 0), testimonials.length - 1));
    }
  };

  return (
    <section
      id="community"
      className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto bg-surface-container-low border-y border-outline-variant fade-in-up delay-200"
    >
      {/* Section Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block font-semibold">
          Community &amp; Showcase
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tight">
          Built with Forge
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
          Real tools, open-source utilities, and micro-SaaS projects shipped by builders across the globe.
        </p>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 text-center">
        <div className="card-tactile rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
            {stats.projectsBuilt}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Projects Scaffolded
          </p>
        </div>
        <div className="card-tactile rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
            {stats.communityMembers}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Active Builders
          </p>
        </div>
        <div className="card-tactile rounded-lg p-6 bg-surface">
          <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
            {stats.projectsDeployed}+
          </p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">
            Edge Deployments
          </p>
        </div>
      </div>

      {/* Community Shared Builds Grid & Mobile Snap Slider */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-on-background tracking-tight">
            Recent Community Builds
          </h3>
          <div className="md:hidden flex items-center gap-1.5 text-xs font-mono text-on-surface-variant">
            <span>Swipe</span>
            <span className="text-primary font-bold">→</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg p-6 bg-surface border border-outline-variant/60 space-y-4 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-32 h-5 bg-surface-container rounded"></div>
                    <div className="w-16 h-4 bg-primary/10 rounded"></div>
                  </div>
                  <div className="w-full h-3.5 bg-surface-container/70 rounded"></div>
                  <div className="w-4/5 h-3.5 bg-surface-container/70 rounded"></div>
                </div>

                <div className="space-y-3 pt-2 border-t border-outline-variant/40">
                  <div className="flex gap-1.5">
                    <div className="w-12 h-4 bg-surface-container-low rounded"></div>
                    <div className="w-16 h-4 bg-surface-container-low rounded"></div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="w-20 h-4 bg-surface-container rounded"></div>
                    <div className="flex gap-2">
                      <div className="w-12 h-6 bg-surface-container rounded"></div>
                      <div className="w-12 h-6 bg-surface-container rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={projectsScrollRef}
            onScroll={handleProjectsScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
          >
            {projects.map((project) => {
              const isStarred = userReactions[project.id]?.starred;
              const isUpvoted = userReactions[project.id]?.upvoted;

              return (
                <div
                  key={project.id}
                  className="card-tactile min-w-[84vw] sm:min-w-[320px] md:min-w-0 snap-center rounded-lg p-6 bg-surface flex flex-col justify-between space-y-4 group relative overflow-hidden"
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
                          className="text-primary hover:underline text-xs font-mono flex items-center gap-1 btn-tactile"
                        >
                          <span className="material-symbols-outlined text-sm">link</span>
                          Live Demo
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-outline-variant/50">
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

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <span className="font-semibold text-on-background block">
                          {project.author}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          {project.role}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-on-surface-variant font-mono text-xs">
                        <button
                          onClick={() => toggleStar(project.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded border transition-all btn-tactile ${
                            isStarred
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                              : 'bg-surface-container border-outline-variant/60 hover:border-primary/50'
                          }`}
                          title="Star this build"
                        >
                          <span className="material-symbols-outlined text-sm text-amber-400">
                            {isStarred ? 'star' : 'star_outline'}
                          </span>
                          <span>{project.stars}</span>
                        </button>

                        <button
                          onClick={() => toggleUpvote(project.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded border transition-all btn-tactile ${
                            isUpvoted
                              ? 'bg-primary/20 border-primary/50 text-primary'
                              : 'bg-surface-container border-outline-variant/60 hover:border-primary/50'
                          }`}
                          title="Upvote this build"
                        >
                          <span className="material-symbols-outlined text-sm text-primary">
                            thumb_up
                          </span>
                          <span>{project.upvotes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Pagination Indicator Dots */}
        {!loading && (
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  activeProjectSlide === i ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Testimonials Grid & Mobile Snap Slider */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-on-background tracking-tight">
            What Builders Are Saying
          </h3>
          <div className="md:hidden flex items-center gap-1.5 text-xs font-mono text-on-surface-variant">
            <span>Swipe</span>
            <span className="text-primary font-bold">→</span>
          </div>
        </div>

        <div
          ref={testimonialsScrollRef}
          onScroll={handleTestimonialsScroll}
          className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="card-tactile min-w-[84vw] sm:min-w-[320px] md:min-w-0 snap-center rounded-lg p-6 bg-surface space-y-4 flex flex-col justify-between"
            >
              <p className="text-sm text-on-surface leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-outline-variant/60 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-on-background">
                    {t.author}
                  </p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
                <span className="font-mono text-[10px] text-primary uppercase bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  Verified Builder
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeTestimonialSlide === i ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
