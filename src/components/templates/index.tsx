'use client';

import { Template } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface TemplatesProps {
  initialTemplates?: Template[];
}

export default function Templates({ initialTemplates = [] }: TemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [loading, setLoading] = useState<boolean>(initialTemplates.length === 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'AI / ML', 'Systems'];

  useEffect(() => {
    if (templates.length === 0) {
      setLoading(true);
      fetch('/api/templates')
        .then((res) => res.json())
        .then((payload) => {
          if (payload.success && Array.isArray(payload.data)) {
            setTemplates(payload.data);
          }
        })
        .catch((err) => console.warn('Could not fetch templates from API:', err))
        .finally(() => setLoading(false));
    }
  }, [templates.length]);

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleCopyCommand = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveSlide(Math.min(Math.max(index, 0), filteredTemplates.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.82;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="templates"
      className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto fade-in-up delay-200"
    >
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block font-semibold">
          Starter Kits
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tight">
          Production-Ready Foundations
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
          Pre-configured architectures with auth, databases, type safety, state management, and zero-config edge deployment.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveSlide(0);
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }
            }}
            className={`px-4 py-1.5 rounded text-xs font-mono transition-all duration-150 border btn-tactile ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary border-primary font-bold shadow-[0_0_12px_rgba(192,193,255,0.25)]'
                : 'bg-surface border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden flex items-center justify-between mb-4 text-xs font-mono text-on-surface-variant px-1">
        <span>Showing {loading ? '...' : filteredTemplates.length} templates</span>
        <div className="flex items-center gap-1">
          <span>Swipe</span>
          <span className="text-primary font-bold">→</span>
        </div>
      </div>

      {/* Loading Skeleton View */}
      {loading ? (
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="min-w-[84vw] sm:min-w-[320px] md:min-w-0 rounded-lg p-6 bg-surface border border-outline-variant/60 flex flex-col justify-between space-y-5 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-20 h-4 bg-primary/10 rounded border border-primary/20"></div>
                  <div className="w-14 h-4 bg-surface-container rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-surface-container rounded"></div>
                <div className="space-y-2 pt-1">
                  <div className="w-full h-3.5 bg-surface-container/70 rounded"></div>
                  <div className="w-5/6 h-3.5 bg-surface-container/70 rounded"></div>
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex gap-1.5">
                  <div className="w-12 h-4 bg-surface-container rounded"></div>
                  <div className="w-16 h-4 bg-surface-container rounded"></div>
                  <div className="w-14 h-4 bg-surface-container rounded"></div>
                </div>
                <div className="w-full h-10 bg-surface-container rounded border border-outline-variant/40"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop 3-col Grid & Mobile Horizontal Snap Slider */
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
        >
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="card-tactile min-w-[84vw] sm:min-w-[320px] md:min-w-0 snap-center rounded-lg p-6 bg-surface flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              {/* Top Accent Gradient on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {tpl.category}
                  </span>
                  {tpl.badge && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/60">
                      {tpl.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-on-background group-hover:text-primary transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {tpl.description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Stack Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CLI Command Box with Tactile Copy */}
                <div className="code-bg border border-outline-variant rounded p-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant truncate pr-2 select-all">
                    <span className="text-primary">$</span> {tpl.cliCommand}
                  </span>
                  <button
                    onClick={() => handleCopyCommand(tpl.id, tpl.cliCommand)}
                    className="text-primary hover:text-on-surface transition-colors p-1.5 rounded hover:bg-white/[0.05] btn-tactile flex items-center justify-center"
                    title="Copy command"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedId === tpl.id ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Pagination Indicator Dots */}
      {!loading && (
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
          {filteredTemplates.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to template ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeSlide === i ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
