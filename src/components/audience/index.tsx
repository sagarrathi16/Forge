'use client';

import { useState, useRef } from 'react';

export default function Audience() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      category: "Who it is for",
      title: "Builders with Ideas",
      desc: "Designed for young developers and makers who have the vision but need a streamlined path to production. Stop getting bogged down in boilerplate and configuration nightmares.",
      badge: "Target Audience",
    },
    {
      category: "Why use it",
      title: "Frictionless Flow",
      desc: "Reduce the time between thought and code. Our AI-assisted templates and zero-config deployment get you to a working prototype faster than traditional development pipelines.",
      badge: "Value Proposition",
    },
    {
      category: "What's different",
      title: "Ship, Don't Just Learn",
      desc: "We combine an enterprise-grade deployment stack with community sharing. Move beyond local tutorial sandbox code and actually put working software in front of real users.",
      badge: "Core Differentiator",
    },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveSlide(Math.min(Math.max(index, 0), pillars.length - 1));
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
    <section className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto fade-in-up delay-200">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest block font-semibold mb-2">
            Why Forge
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tight">
            Engineered for Serious Creators
          </h2>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden flex items-center gap-2 text-xs font-mono text-on-surface-variant">
          <span>Swipe</span>
          <span className="text-primary font-bold">→</span>
        </div>
      </div>

      {/* Desktop 3-col Grid & Mobile Horizontal Snap Slider */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
      >
        {pillars.map((item, idx) => (
          <div
            key={item.category}
            className="card-tactile min-w-[82vw] sm:min-w-[300px] md:min-w-0 snap-center rounded-lg p-6 bg-surface-container-low flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Gradient on Hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold block">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant bg-surface px-2 py-0.5 rounded border border-outline-variant/60">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-background tracking-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono text-on-surface-variant/70">
              <span>Pillar 0{idx + 1}</span>
              <span className="text-primary font-bold">✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Pagination Indicator Dots */}
      <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
        {pillars.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              activeSlide === i ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
