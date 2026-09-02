'use client';

import { useState, useRef } from 'react';

export default function HowItWorks() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: "Pick a path",
      desc: "Start from a curated starter template or describe what you want to build in plain English to our intelligent scaffolding engine.",
      terminal: "$ forge init habit-tracker",
    },
    {
      num: "02",
      title: "Build & Iterate",
      desc: "Iterate seamlessly on the scaffolded code with context-aware AI tools and built-in type-safe database migrations.",
      terminal: "$ forge dev --ai-assist",
    },
    {
      num: "03",
      title: "Zero-Config Deploy",
      desc: "Push your code. Forge automatically provisions serverless infrastructure, PostgreSQL databases, and SSL certificates instantly.",
      terminal: "$ forge deploy --prod",
    },
    {
      num: "04",
      title: "Share & Grow",
      desc: "Publish your live URL directly to the Forge community to gather feedback, attract real users, and recruit co-builders.",
      terminal: "$ forge share --public",
    },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveSlide(Math.min(Math.max(index, 0), steps.length - 1));
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
      id="how-it-works"
      className="w-full bg-surface-container-low border-y border-outline-variant scroll-mt-16 md:scroll-mt-20 fade-in-up delay-300"
    >
      <div className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest mb-2 block font-semibold">
              Process
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-background tracking-tight">
              How to Get Started
            </h2>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <span>Swipe</span>
            <span className="text-primary font-bold">→</span>
          </div>
        </div>

        {/* Desktop 4-col Grid & Mobile Horizontal Snap Slider */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="card-tactile min-w-[82vw] sm:min-w-[280px] md:min-w-0 snap-center rounded-lg p-6 bg-surface flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Gradient on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-mono font-extrabold text-outline-variant group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                </div>

                <h3 className="text-lg font-bold text-on-background mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Simulated CLI Command Chip */}
              <div className="mt-6 pt-3 border-t border-outline-variant/40">
                <code className="text-[11px] font-mono text-primary/80 bg-surface-container px-2 py-1 rounded block truncate">
                  {step.terminal}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeSlide === i ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
