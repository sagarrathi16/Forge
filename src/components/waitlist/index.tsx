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
        setMessage(data.message || "Successfully joined the waitlist! We'll be in touch.");
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
      className="px-4 md:px-16 py-28 max-w-[1440px] mx-auto fade-in-up delay-200"
    >
      <div className="max-w-xl mx-auto text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-on-background tracking-tight">
          Ready to build?
        </h2>
        <p className="text-base text-on-surface-variant">
          Join the waitlist to get early access to Forge.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" id="waitlistForm">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status === 'submitting'}
              aria-label="Email address"
              required
              className="flex-grow bg-surface-dim border border-outline-variant rounded p-3 text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-mono placeholder:text-on-surface-variant/50 disabled:opacity-50"
            />
            <button
              id="submitBtn"
              type="submit"
              disabled={status === 'submitting'}
              className="bg-primary text-on-primary text-sm font-medium px-6 py-3 rounded border border-primary hover:bg-transparent hover:text-primary transition-colors duration-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Joining...' : 'Join waitlist'}
            </button>
          </div>

          <div id="formStatus" className="text-sm h-6 flex items-center justify-center font-mono">
            {status === 'success' && (
              <span className="text-primary font-semibold" role="status">
                {message}
              </span>
            )}
            {status === 'duplicate' && (
              <span className="text-secondary font-semibold" role="status">
                {message}
              </span>
            )}
            {status === 'error' && (
              <span className="text-error font-semibold" role="alert">
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
