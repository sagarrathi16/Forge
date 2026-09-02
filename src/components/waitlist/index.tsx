'use client';

import { validateEmail } from '@/lib/validation';
import { useState, useEffect } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number>(14);

  useEffect(() => {
    fetch('/api/waitlist')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === 'number') {
          setWaitlistCount(data.count);
        }
      })
      .catch((err) => console.warn('Could not fetch waitlist count:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setStatus('error');
      setMessage(validation.error || 'Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 201 && data.success) {
        setStatus('success');
        if (typeof data.count === 'number') {
          setWaitlistCount(data.count);
        } else {
          setWaitlistCount((prev) => prev + 1);
        }
        setMessage(data.message || "Successfully joined the waitlist! We'll be in touch soon.");
        setEmail('');
      } else if (res.status === 409) {
        setStatus('duplicate');
        setMessage(data.error || 'You are already on the waitlist!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section
      id="waitlist"
      className="px-4 md:px-16 py-16 md:py-20 max-w-[1440px] mx-auto scroll-mt-16 md:scroll-mt-20 fade-in-up delay-200"
    >
      <div className="max-w-xl mx-auto text-center space-y-6">
        {/* Live Social Proof Pill */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{waitlistCount}+ builders on the waitlist</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-on-background tracking-tight">
          Ready to Ship Your Next Idea?
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed">
          Join the early access developer waitlist. Free starter kits, CLI access, and instant cloud deployments.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2" id="waitlistForm">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              disabled={status === 'submitting'}
              className="flex-1 bg-surface-container border border-outline-variant rounded px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-primary text-on-primary font-bold px-6 py-3 rounded text-sm hover:bg-transparent hover:text-primary border border-primary transition-all duration-200 shadow-[0_0_16px_rgba(192,193,255,0.25)] hover:shadow-[0_0_24px_rgba(192,193,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-tactile cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Joining...</span>
                </>
              ) : (
                'Join waitlist'
              )}
            </button>
          </div>

          <p className="text-[11px] text-on-surface-variant/60 font-mono">
            No spam. We respect developer inboxes. Unsubscribe anytime.
          </p>
        </form>

        {/* Feedback Banners */}
        {status === 'success' && (
          <div
            role="status"
            className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in slide-in-from-top-1 duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{message}</span>
          </div>
        )}

        {status === 'duplicate' && (
          <div
            role="alert"
            className="p-3.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono animate-in fade-in slide-in-from-top-1 duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">info</span>
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="p-3.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono animate-in fade-in slide-in-from-top-1 duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">error</span>
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}
