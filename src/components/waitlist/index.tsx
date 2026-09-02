'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/validation';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setStatus('error');
      setMessage(validation.error || 'Invalid email address.');
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

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for joining the Forge waitlist!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="waitlist" className="py-20">
      <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Join the Forge Waitlist</h2>
          <p className="text-muted-foreground text-sm">
            Be among the first developers to get early access when we launch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={status === 'submitting'}
            aria-label="Email address"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50 min-w-[120px]"
          >
            {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-sm font-medium text-green-600 dark:text-green-400" role="status">
            {message}
          </p>
        )}

        {status === 'error' && (
          <p className="text-sm font-medium text-destructive" role="alert">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
