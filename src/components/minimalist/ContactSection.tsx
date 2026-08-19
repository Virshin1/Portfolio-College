import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      window.location.href = `mailto:${portfolioData.email}?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nSender: ' + formData.email)}`;
    }, 800);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          06 / Reach
        </h2>
        <h3 className="text-2xl font-bold font-display text-white">
          Get in Touch
        </h3>
        <p className="text-zinc-400 text-sm mt-1 font-light">
          Available for software engineering roles, distributed systems projects, and technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Info Left */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-1">
            <div className="text-xs font-mono text-zinc-500">Email Address</div>
            <div className="flex items-center justify-between">
              <a
                href={`mailto:${portfolioData.email}`}
                className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-white transition-colors"
              >
                {portfolioData.email}
              </a>
              <button
                onClick={handleCopy}
                className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-1">
            <div className="text-xs font-mono text-zinc-500">Phone / WhatsApp</div>
            <div className="text-xs sm:text-sm font-mono text-zinc-200">
              {portfolioData.phone}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-1">
            <div className="text-xs font-mono text-zinc-500">Location</div>
            <div className="text-xs sm:text-sm font-mono text-zinc-200">
              {portfolioData.location}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/Virshin1</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Message Form Right */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-lg border border-zinc-800 bg-zinc-950/40 space-y-4"
          >
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Send Direct Message
            </div>

            {sent ? (
              <div className="p-4 rounded border border-zinc-700 bg-zinc-900 text-xs font-mono text-zinc-300">
                Opening email client for delivery to {portfolioData.email}...
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
