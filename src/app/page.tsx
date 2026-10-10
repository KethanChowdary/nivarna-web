"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpen, Receipt, TrendingUp, Cpu, Briefcase,
  BarChart3, GraduationCap, Target, MessageCircle, Users, Radar,
  ArrowRight, Menu, X, CheckCircle2, ChevronLeft, ChevronRight, Sparkles,
  ChevronDown, Quote,
} from 'lucide-react';
import nivarnaLogo from '../../public/nivarna-logo.jpeg';
import nivarnaLogoDark from '../../public/nivarna-logo-transparent.png';

const STYLE_BLOCK = `
  @keyframes nv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .nv-marquee-track { animation: nv-marquee 32s linear infinite; }
  .nv-marquee-track:hover { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { .nv-marquee-track { animation: none; } }
  .nv-scrollbar-hide::-webkit-scrollbar { display: none; }
  .nv-scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
`;
const serif = { fontFamily: "var(--font-fraunces), Georgia, serif" };
const sans = { fontFamily: "var(--font-manrope), system-ui, sans-serif" };
const ghostNum = { fontFamily: "var(--font-fraunces), Georgia, serif", WebkitTextStroke: '1px #2dd4bf', color: 'transparent' };

const siteData = {
  nav: ['Services', 'About', 'Process', 'Contact'],
  announcements: [
    'Where Financial Expertise Meets AI',
    'Professional Expertise. Modern Technology. Practical Advice.',
    'A Simple, Transparent Process',
  ],
  services: [
    { no: '01', icon: BookOpen, title: 'Accounting & Bookkeeping', desc: 'Accounting and bookkeeping support for growing businesses.' },
    { no: '02', icon: Receipt, title: 'Tax Compliance & Litigation Support', desc: 'Tax compliance and litigation support for business requirements.' },
    { no: '03', icon: Briefcase, title: 'Virtual CFO Services', desc: 'Ongoing financial planning, reporting and decision support for business owners.' },
    { no: '04', icon: BarChart3, title: 'MIS Reports & Automated Dashboards', desc: 'Management reports, performance indicators and automated business dashboards.' },
    { no: '05', icon: TrendingUp, title: 'Business Advisory Services', desc: 'Practical business and financial insights to support informed decisions.' },
    { no: '06', icon: Cpu, title: 'Management Consulting Services', desc: 'Finance processes, systems and operational improvements for growing businesses.' },
  ],
  traits: [
    { icon: GraduationCap, title: 'Chartered Accountant-Led', desc: 'Our team includes Chartered Accountants who are members of ICAI.' },
    { icon: Cpu, title: 'Technology-Enabled', desc: 'We use modern accounting, automation and AI tools to improve efficiency and reduce manual work.' }, //[cite: 2]
    { icon: Target, title: 'Business-Focused', desc: 'We don\'t just focus on compliance. We aim to understand the business behind the numbers.' }, //[cite: 2]
    { icon: MessageCircle, title: 'Clear Communication', desc: 'Financial information should be understandable. We explain things clearly without unnecessary jargon.' }, //[cite: 2]
    { icon: Users, title: 'Personalized Service', desc: 'We provide attentive support shaped around each business and its requirements.' },
    { icon: Radar, title: 'Proactive Approach', desc: 'We aim to identify issues and opportunities before they become problems.' }, //[cite: 2]
  ],
  process: [
    { num: '01', title: 'Understand', desc: 'We discuss your business, current processes and requirements.' },
    { num: '02', title: 'Set Up', desc: 'We establish an appropriate accounting, reporting and workflow structure.' },
    { num: '03', title: 'Automate', desc: 'Where appropriate, we use technology to streamline repetitive processes.' },
    { num: '04', title: 'Review', desc: 'We review information, identify exceptions and apply professional judgment.' },
    { num: '05', title: 'Advise', desc: 'You receive clear reports, observations and actionable recommendations.' },
  ],
};

function Logo({ className = '', variant = 'light' }: { className?: string; variant?: 'light' | 'dark' }) {
  const src = variant === 'dark' ? nivarnaLogoDark : nivarnaLogo;
  const size = variant === 'dark' ? 'h-11 sm:h-12' : 'h-14 sm:h-16';
  return <Image src={src} alt="Nivarna Advisors" priority className={`${size} w-auto ${className}`} />;
}

export default function NivarnaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [announceIdx, setAnnounceIdx] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', service: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setAnnounceIdx((i) => (i + 1) % siteData.announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    const website = new FormData(e.currentTarget).get('website');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website, privacyAccepted }),
      });

      if (!response.ok) {
        setFormError('We couldn’t send your request just now. Please try again or email contact@nivarna.in.');
        return;
      }

      setSent(true);
    } catch {
      setFormError('We couldn’t send your request just now. Please try again or email contact@nivarna.in.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollCards = (dir: number) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 336, behavior: 'smooth' });
  };

  return (
    <div style={sans} className="min-h-screen bg-white text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />

      {/* Announcement strip */}
      <div className="flex items-center justify-center gap-3 bg-[#0c304b] px-4 py-2 text-xs text-slate-300 sm:px-6">
        <Sparkles className="h-3.5 w-3.5 text-[#d7b66f]" />
        <span className="text-center">{siteData.announcements[announceIdx]}</span>
        <span className="hidden gap-1.5 sm:flex">
          {siteData.announcements.map((_, i) => (
            <button
              key={i}
              aria-label={`Show announcement ${i + 1}`}
              onClick={() => setAnnounceIdx(i)}
              className={`h-1.5 w-1.5 rounded-full ${i === announceIdx ? 'bg-[#d7b66f]' : 'bg-slate-600'}`}
            />
          ))}
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" aria-label="Nivarna Advisors home">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                Areas of Interest <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {svcOpen && (
                <div className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    {siteData.services.map(({ icon: Icon, title }) => (
                      <a key={title} href="#services" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <Icon className="h-4 w-4 shrink-0 text-[#8d672d]" /> {title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {siteData.nav.slice(1).map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-slate-900">{n}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden rounded-full bg-[#0c304b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 md:inline-block">
            Schedule a Consultation
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 md:hidden">
            {siteData.nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-600">{n}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-full bg-[#0c304b] px-5 py-2.5 text-center text-sm font-semibold text-white">
              Schedule a Consultation
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#08233a] text-white">
        <span style={serif} aria-hidden className="pointer-events-none absolute -left-10 -top-16 select-none text-[26rem] font-medium leading-none text-white/[0.03]">N</span>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch lg:py-24">
          <div className="max-w-2xl lg:self-center">
            <h1 style={serif} className="max-w-xl text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
              Accounting, Tax &amp; Business Advisory
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-slate-300">
              Nivarna Advisors provides accounting, tax compliance, virtual CFO and business advisory support to growing businesses. Our Chartered Accountant-led team combines professional expertise with modern tools to simplify financial processes and provide practical insights.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#b68a42] px-6 py-3 text-sm font-semibold text-[#08233a] hover:bg-[#d7b66f]">
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white hover:border-slate-400">
                Explore Services
              </a>
            </div>
          </div>

          <aside className="relative hidden flex-col overflow-hidden rounded-[2rem] border border-[#b68a42]/40 bg-[#0c304b] p-8 shadow-2xl shadow-black/30 lg:flex">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d7b66f]/25" />
            <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#d7b66f]/20" />
            <div aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d7b66f]/60 to-transparent" />
            <div className="relative flex h-full flex-col">
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#d7b66f]">Your Financial Partner</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
                Accounting, tax, reporting and business advisory support, backed by Chartered Accountant expertise.
              </p>
              <div className="mt-8 grid flex-1 grid-cols-2 content-start gap-x-6 gap-y-4 border-t border-[#d7b66f]/25 pt-6">
                {siteData.services.slice(0, 4).map(({ icon: Icon, title }) => (
                  <span key={title} className="flex items-center gap-2 text-sm font-medium text-slate-100">
                    <Icon className="h-4 w-4 shrink-0 text-[#d7b66f]" /> {title}
                  </span>
                ))}
              </div>
              <a href="#services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d7b66f] hover:text-white">
                Explore all services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-slate-800 py-4">
          <div className="nv-scrollbar-hide overflow-hidden">
            <div className="nv-marquee-track flex w-max gap-10">
              {[...siteData.services, ...siteData.services].map((s, i) => (
                <span key={i} className="flex items-center gap-10 border-l border-slate-800 pl-10 text-sm text-slate-500">
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-xl">
            <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Accounting, Tax &amp; Advisory Services</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollCards(-1)} aria-label="Previous" className="rounded-full border border-slate-300 p-2.5 hover:border-slate-500"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scrollCards(1)} aria-label="Next" className="rounded-full border border-slate-300 p-2.5 hover:border-slate-500"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={trackRef} className="nv-scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {siteData.services.map(({ no, icon: Icon, title, desc }) => (
            <div key={title} className="w-72 flex-none snap-start rounded-xl border border-slate-200 p-6 sm:w-80">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7edd9]">
                  <Icon className="h-5 w-5 text-[#8d672d]" />
                </div>
                <span style={serif} className="text-sm text-slate-300">No. {no}</span>
              </div>
              <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* From the desk / traits */}
      <section id="about" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#8d672d]">
                <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> About Us
              </span>
              <blockquote className="relative mt-6 border-l-2 border-[#d7b66f]/70 pl-6">
                <Quote className="absolute -left-[15px] -top-1 h-7 w-7 rounded-full bg-slate-50 p-1 text-[#8d672d]" aria-hidden />
                <p style={serif} className="text-2xl italic leading-snug text-slate-900 sm:text-[1.75rem]">
                  We are a Chartered Accountant-led advisory firm focused on helping businesses manage their accounting, tax and financial requirements with greater clarity and efficiency. {/*[cite: 2] */}
                </p>
              </blockquote>
              <p className="mt-6 text-base leading-relaxed text-slate-600">Our approach combines professional expertise, technology and AI-enabled workflows to provide practical support designed around modern businesses.</p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">We help business owners understand their numbers, manage financial processes and make informed business decisions.</p>
            </div>
            <div>
              <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Professional Expertise. Modern Technology. Practical Advice. {/*[cite: 2] */}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteData.traits.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d7b66f]/60 hover:shadow-lg hover:shadow-slate-900/5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7edd9] transition-colors group-hover:bg-[#f0dfb8]">
                      <Icon className="h-5 w-5 text-[#8d672d]" />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#08233a] py-24 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl">A Simple, Transparent Process {/*[cite: 2] */}</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-5">
            {siteData.process.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <span style={ghostNum} className="relative z-10 text-4xl font-medium">{num}</span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Let&apos;s Make Your Finances Simpler {/*[cite: 2] */}</h2>
            <p className="mt-4 max-w-md text-slate-600">
              From accounting and compliance to tax, advisory and virtual CFO support, we help you manage your financial responsibilities with greater clarity. {/*[cite: 2] */}
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-700">Have a requirement? Let&apos;s talk.</p>
            <a className="mt-3 inline-block text-sm font-medium text-[#8d672d] hover:text-[#0c304b]" href="mailto:contact@nivarna.in">
              contact@nivarna.in
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-[#8d672d]" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Thanks for getting in touch.</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  We’ve received your consultation request. We’ll be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', email: '', service: '' });
                    setPrivacyAccepted(false);
                    setFormError('');
                    setSent(false);
                  }}
                  className="mt-6 text-sm font-semibold text-[#8d672d] underline underline-offset-4 hover:text-[#0c304b]"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label htmlFor="consultation-name" className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                  <input
                    id="consultation-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-[#b68a42] focus:outline-none focus:ring-1 focus:ring-[#b68a42]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="consultation-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="consultation-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-[#b68a42] focus:outline-none focus:ring-1 focus:ring-[#b68a42]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="consultation-service" className="mb-1.5 block text-sm font-medium text-slate-700">Service Needed <span className="font-normal text-slate-500">(optional)</span></label>
                  <select
                    id="consultation-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-[#b68a42] focus:outline-none focus:ring-1 focus:ring-[#b68a42]"
                  >
                    <option value="">Select a service</option>
                    {siteData.services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="consultation-website">Website</label>
                  <input id="consultation-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <label className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[#0c304b]"
                  />
                  <span>
                    I have read the{' '}
                    <a href="/privacy" target="_blank" rel="noreferrer" className="font-medium text-[#8d672d] underline underline-offset-2">
                      Privacy Notice
                    </a>{' '}
                    and agree to my details being used to respond to this consultation request.
                  </span>
                </label>
                {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-[#0c304b] py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70">
                  {submitting ? 'Sending request…' : 'Request a Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-[#b68a42] py-16 text-[#08233a]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
          <p style={serif} className="max-w-xl text-2xl font-medium leading-snug sm:text-3xl">
            From accounting and compliance to tax, virtual CFO and advisory support, we help you manage your financial responsibilities.
          </p>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#08233a] px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Schedule a Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#08233a] py-16 text-slate-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-10 border-b border-slate-800 pb-12 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Logo variant="dark" />
              <p className="mt-4 max-w-sm text-sm">Chartered accountancy, run the modern way.</p>
              <a className="mt-3 inline-block text-sm text-slate-300 hover:text-white" href="mailto:contact@nivarna.in">
                contact@nivarna.in
              </a>
            </div>
            <a href="/privacy" className="text-sm hover:text-white">Privacy Notice</a>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm">© 2026 Nivarna. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              {siteData.nav.map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-white">{n}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
