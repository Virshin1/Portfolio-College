import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { ArrowUpRight, Check, Copy, Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-zinc-800/60">
      <div className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Mail className="w-3.5 h-3.5 text-zinc-400" />
          <span>06 / Connection & Reach</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Initiate Contact
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl">
          Available for software engineering roles, distributed systems discussions, and open-source collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Left */}
        <div className="md:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-xl border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>Email Address</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
                href={`mailto:${portfolioData.email}`}
                className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-white transition-colors truncate"
              >
                {portfolioData.email}
              </a>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Phone / WhatsApp</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-zinc-200">
              {portfolioData.phone}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Location</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-zinc-200">
              {portfolioData.location}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/Virshin1</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Message Form Right */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8 rounded-xl border border-zinc-800/80 space-y-5"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider border-b border-zinc-800/80 pb-3">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              <span>Direct Dispatch</span>
            </div>

            {sent ? (
              <div className="p-5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-mono text-zinc-300 space-y-1">
                <div className="font-semibold text-emerald-400">Opening Mail Client...</div>
                <div>Preparing message for {portfolioData.email}</div>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Turing"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Project specs, inquiries, or collaboration ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-mono text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
