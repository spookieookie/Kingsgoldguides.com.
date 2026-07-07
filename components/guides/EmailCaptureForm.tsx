'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function EmailCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'guide' }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-secondary border border-border rounded-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Join Our Newsletter
          </h3>
          <p className="text-muted-foreground mb-4">
            Get notified about new guides and gold-farming strategies.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-400 mt-2 text-sm">✓ Successfully subscribed!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 mt-2 text-sm">✗ Error subscribing. Try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
