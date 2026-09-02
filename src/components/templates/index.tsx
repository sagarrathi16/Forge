'use client';

import templatesData from '@/data/templates.json';
import { Template } from '@/types';
import { useState, useRef } from 'react';

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'AI / ML', 'Systems'];
  const templates: Template[] = templatesData as Template[];

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
        <span>Showing {filteredTemplates.length} templates</span>
        <div className="flex items-center gap-1">
          <span>Swipe</span>
          <span className="text-primary font-bold">→</span>
        </div>
      </div>

      {/* Desktop 3-col Grid & Mobile Horizontal Snap Slider */}
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

      {/* Mobile Pagination Indicator Dots */}
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
    </section>
  );
}
