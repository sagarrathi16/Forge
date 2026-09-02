'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/validation';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
          <span>14 builders joined in the last 2 hours</span>
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
              placeholder="developer@domain.com"
              disabled={status === 'submitting'}
              aria-label="Email address"
              required
              className="flex-grow bg-surface-dim border border-outline-variant rounded p-3 text-on-background focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(192,193,255,0.2)] outline-none transition-all text-sm font-mono placeholder:text-on-surface-variant/50 disabled:opacity-50"
            />
            <button
              id="submitBtn"
              type="submit"
              disabled={status === 'submitting'}
              className="bg-primary text-on-primary text-sm font-bold px-6 py-3 rounded border border-primary hover:bg-transparent hover:text-primary transition-all duration-200 shadow-[0_0_16px_rgba(192,193,255,0.3)] hover:shadow-[0_0_24px_rgba(192,193,255,0.5)] whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed btn-tactile flex items-center justify-center gap-2"
            >
              {status === 'submitting' && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-on-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              <span>{status === 'submitting' ? 'Joining...' : 'Join waitlist'}</span>
            </button>
          </div>

          <div
            id="formStatus"
            aria-live="polite"
            className="text-sm min-h-[24px] flex items-center justify-center font-mono"
          >
            {status === 'success' && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in duration-200" role="status">
                <span className="material-symbols-outlined text-base">check_circle</span>
                {message}
              </span>
            )}
            {status === 'duplicate' && (
              <span className="text-amber-300 font-semibold flex items-center gap-1.5 animate-in fade-in duration-200" role="status">
                <span className="material-symbols-outlined text-base">info</span>
                {message}
              </span>
            )}
            {status === 'error' && (
              <span className="text-red-400 font-semibold flex items-center gap-1.5 animate-in fade-in duration-200" role="alert">
                <span className="material-symbols-outlined text-base">error</span>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
