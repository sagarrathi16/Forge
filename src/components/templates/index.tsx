'use client';

import templatesData from '@/data/templates.json';
import { Template } from '@/types';
import { useState } from 'react';

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  return (
    <section
      id="templates"
      className="px-4 md:px-16 py-20 max-w-[1440px] mx-auto fade-in-up delay-200"
    >
      <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block">
          Starter Kits
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Production-Ready Templates
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
          Don&apos;t start from scratch. Scaffolds with pre-configured auth, databases, state management, and edge deployment.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded text-xs font-mono transition-colors duration-200 border ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary border-primary font-semibold'
                : 'bg-surface border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="border-technical rounded-lg p-6 bg-surface flex flex-col justify-between space-y-5 hover:border-primary transition-colors duration-300 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {tpl.category}
                </span>
                {tpl.badge && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-on-secondary-container bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant">
                    {tpl.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-on-background group-hover:text-primary transition-colors">
                {tpl.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
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

              {/* CLI Command Box */}
              <div className="code-bg border border-outline-variant rounded p-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant truncate pr-2">
                  <span className="text-primary">$</span> {tpl.cliCommand}
                </span>
                <button
                  onClick={() => handleCopyCommand(tpl.id, tpl.cliCommand)}
                  className="text-primary hover:text-on-surface transition-colors p-1"
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
    </section>
  );
}

