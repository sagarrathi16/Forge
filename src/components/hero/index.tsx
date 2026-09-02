'use client';

import { animateScrollToWaitlist } from '@/lib/navigation';
import { useState } from 'react';

type TerminalTab = 'init' | 'test' | 'deploy';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('init');
  const [copied, setCopied] = useState(false);

  const terminalCommands = {
    init: 'forge init "Build a habit tracker"',
    test: 'forge test --coverage',
    deploy: 'forge deploy --prod',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(terminalCommands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="px-4 md:px-16 py-16 md:py-24 max-w-[1440px] mx-auto fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Announcement Chip */}
          <a
            href="#waitlist"
            onClick={animateScrollToWaitlist}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant hover:border-primary/60 hover:text-on-surface transition-all btn-tactile group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span>Early Access Waitlist is Live</span>
            <span className="text-primary group-hover:translate-x-0.5 transition-transform">→</span>
          </a>

          {/* Headline with 2 Clean Lines */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-background leading-[1.1]">
            <span className="block">From &ldquo;I have an idea&rdquo;</span>
            <span className="block text-primary">to &ldquo;I built it.&rdquo;</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Forge gives young developers the exact tools needed to turn rough concepts into working, deployed applications through templates, AI-assisted development, zero-config deployment, and community sharing.
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <a
              className="bg-primary text-on-primary text-sm font-semibold px-6 py-3 rounded border border-primary hover:bg-transparent hover:text-primary transition-all duration-200 shadow-[0_0_16px_rgba(192,193,255,0.25)] hover:shadow-[0_0_24px_rgba(192,193,255,0.45)] btn-tactile flex items-center gap-2 group cursor-pointer"
              href="#waitlist"
              onClick={animateScrollToWaitlist}
            >
              <span>Join the waitlist</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              className="bg-transparent text-on-background text-sm font-medium px-6 py-3 rounded border border-outline-variant hover:border-primary hover:text-primary transition-all duration-200 btn-tactile cursor-pointer"
              href="#how-it-works"
              onClick={scrollToHowItWorks}
            >
              See how it works
            </a>
          </div>

          {/* Quick Metrics Micro-Row */}
          <div className="flex items-center gap-6 pt-3 text-xs font-mono text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">1,240+</span>
              <span>Projects Built</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">0</span>
              <span>Config Required</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">100%</span>
              <span>Open Foundations</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive CLI Terminal */}
        <div className="lg:col-span-5 relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-primary/10 rounded-xl blur-2xl pointer-events-none opacity-60"></div>

          <div className="relative border-technical rounded-lg p-5 code-bg shadow-2xl space-y-4">
            {/* Terminal Header with Switchable Tabs */}
            <div className="flex items-center justify-between border-b border-outline-variant pb-3 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="text-on-surface-variant ml-2 font-mono text-[11px]">forge-cli</span>
              </div>

              {/* Command Tabs */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded border border-outline-variant/60 font-mono text-[11px]">
                {(['init', 'test', 'deploy'] as TerminalTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-0.5 rounded transition-all btn-tactile ${
                      activeTab === tab
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Screen Content */}
            <div className="font-mono text-xs space-y-3 min-h-[170px] flex flex-col justify-between">
              {activeTab === 'init' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="text-on-surface flex items-center justify-between">
                    <div>
                      <span className="text-primary font-bold">$</span> forge init &quot;Build a habit tracker&quot;
                    </div>
                    <button
                      onClick={handleCopy}
                      className="text-on-surface-variant hover:text-primary transition-colors btn-tactile p-1"
                      title="Copy command"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <div className="text-on-surface-variant opacity-75 leading-relaxed text-[11px]">
                    &gt; Analyzing intent with Forge AI...<br />
                    &gt; Selecting React + Supabase template...<br />
                    &gt; Configuring Row Level Security &amp; Auth...<br />
                    &gt; Scaffolding project files...
                  </div>
                  <div className="text-emerald-400 font-semibold pt-1 text-[11px]">
                    [SUCCESS] Project scaffolded in 1.4s
                  </div>
                </div>
              )}

              {activeTab === 'test' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="text-on-surface flex items-center justify-between">
                    <div>
                      <span className="text-primary font-bold">$</span> forge test --coverage
                    </div>
                    <button
                      onClick={handleCopy}
                      className="text-on-surface-variant hover:text-primary transition-colors btn-tactile p-1"
                      title="Copy command"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <div className="text-on-surface-variant opacity-75 leading-relaxed text-[11px]">
                    ✓ validation.test.ts (6 tests passed)<br />
                    ✓ waitlist-api.test.ts (4 tests passed)<br />
                    &gt; Total: 10 passed in 202ms
                  </div>
                  <div className="text-emerald-400 font-semibold pt-1 text-[11px]">
                    [SUCCESS] Coverage: 100% statements
                  </div>
                </div>
              )}

              {activeTab === 'deploy' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="text-on-surface flex items-center justify-between">
                    <div>
                      <span className="text-primary font-bold">$</span> forge deploy --prod
                    </div>
                    <button
                      onClick={handleCopy}
                      className="text-on-surface-variant hover:text-primary transition-colors btn-tactile p-1"
                      title="Copy command"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <div className="text-on-surface-variant opacity-75 leading-relaxed text-[11px]">
                    &gt; Building production bundle...<br />
                    &gt; Deploying to global edge network...<br />
                    &gt; Routing DNS and TLS certificate...
                  </div>
                  <div className="text-primary font-semibold pt-1 flex items-center gap-1.5 text-[11px]">
                    <span className="material-symbols-outlined text-sm">link</span>
                    https://habit-tracker.forge.dev
                  </div>
                </div>
              )}

              {/* Terminal Footer */}
              <div className="border-t border-outline-variant/60 pt-2 flex items-center justify-between text-[10px] text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  edge: connected
                </span>
                <span>latency: 24ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
