'use client';

import { useState, useRef } from 'react';

export default function Features() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      num: "01",
      icon: "auto_awesome_mosaic",
      title: "Start from a template",
      desc: "Don't start from zero. Use curated, production-ready foundations engineered for speed.",
      tag: "Scaffolding",
    },
    {
      num: "02",
      icon: "smart_toy",
      title: "Build with AI",
      desc: "Context-aware AI coding assistance that understands your specific codebase structure.",
      tag: "AI Assist",
    },
    {
      num: "03",
      icon: "rocket_launch",
      title: "Deploy in one click",
      desc: "Instant serverless edge deployment with automatic HTTPS and custom domains.",
      tag: "Zero-Config",
    },
    {
      num: "04",
      icon: "forum",
      title: "Share with the community",
      desc: "Showcase your creations, receive constructive feedback, and find collaborators.",
      tag: "Community",
    },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveSlide(Math.min(Math.max(index, 0), capabilities.length - 1));
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
      id="features"
      className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto bg-surface-container-low border-y border-outline-variant"
    >
      {/* Header with Title & Mobile Swipe Hint */}
      <div className="flex items-end justify-between mb-10 fade-in-up">
        <div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2 block font-semibold">
            Capabilities
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tight">
            Core Capabilities
          </h2>
        </div>

        {/* Mobile Swipe Hint with Arrows */}
        <div className="md:hidden flex items-center gap-2 text-xs font-mono text-on-surface-variant">
          <span>Swipe</span>
          <span className="text-primary font-bold">→</span>
        </div>
      </div>

      {/* Desktop Grid & Mobile Horizontal Snap Slider */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
      >
        {capabilities.map((item, index) => (
          <div
            key={item.num}
            className="card-tactile min-w-[82vw] sm:min-w-[280px] md:min-w-0 snap-center rounded-lg p-6 bg-surface flex flex-col justify-between group relative overflow-hidden btn-tactile"
          >
            {/* Top Accent Gradient on Hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-on-surface-variant font-bold">
                  {item.num}
                </span>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {item.tag}
                </span>
              </div>

              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center mb-4 border border-outline-variant/60 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-base font-bold text-on-background mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-mono text-on-surface-variant/80">
              <span>Ready in CLI</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Pagination Indicator Dots */}
      <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
        {capabilities.map((_, i) => (
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
