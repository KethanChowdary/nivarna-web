"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, FileSearch, ShieldCheck, Receipt, TrendingUp, Cpu, Briefcase,
  BarChart3, Building2, GraduationCap, Target, MessageCircle, Users, Radar,
  ArrowRight, Menu, X, CheckCircle2, ChevronLeft, ChevronRight, Sparkles,
  ChevronDown, Quote, Send,
} from 'lucide-react';

const STYLE_BLOCK = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
  @keyframes nv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .nv-marquee-track { animation: nv-marquee 32s linear infinite; }
  .nv-marquee-track:hover { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { .nv-marquee-track { animation: none; } }
  .nv-scrollbar-hide::-webkit-scrollbar { display: none; }
  .nv-scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
`;
const serif = { fontFamily: "'Fraunces', Georgia, serif" };
const sans = { fontFamily: "'Manrope', system-ui, sans-serif" };
const ghostNum = { fontFamily: "'Fraunces', Georgia, serif", WebkitTextStroke: '1px #2dd4bf', color: 'transparent' };

const siteData = {
  nav: ['Services', 'About', 'Process', 'Contact'],
  announcements: [
    'Now onboarding founding clients in Bengaluru',
    'AI-assisted bookkeeping, reviewed and signed off by a CA',
    'GST, ROC and MCA compliance — handled end to end',
  ],
  services: [
    { no: '01', icon: BookOpen, title: 'Accounting & Bookkeeping', desc: 'Keep your financial records accurate, organized and up to date. Includes monthly book closure, reconciliations, and MIS.' }, //[cite: 2]
    { no: '02', icon: FileSearch, title: 'Financial Statement Audit', desc: 'Independent and structured audit support to enhance the reliability of your financial information through statutory audits and reviews.' }, //[cite: 2]
    { no: '03', icon: ShieldCheck, title: 'Internal Audit', desc: 'Identify risks, strengthen controls and improve your business processes via operational reviews and control gap identification.' }, //[cite: 2]
    { no: '04', icon: Receipt, title: 'Tax Compliance', desc: 'Stay compliant while reducing the administrative burden of managing tax requirements, GST, returns, and assessment notices.' }, //[cite: 2]
    { no: '05', icon: TrendingUp, title: 'Tax Advisory', desc: 'Go beyond compliance with practical tax advice for your business and financial decisions, structuring, and investments.' }, //[cite: 2]
    { no: '06', icon: Cpu, title: 'Finance Transformation', desc: 'Accounting software implementation, process improvement, automation, AI-enabled finance workflows, and SOP development.' }, //[cite: 2]
    { no: '07', icon: Briefcase, title: 'Advisory & Virtual CFO', desc: 'Outsourced finance team covering bookkeeping, reporting, FP&A, business planning, valuation, and due diligence.' }, //[cite: 2]
    { no: '08', icon: BarChart3, title: 'Reporting & Insights', desc: 'Financial statements, MIS reporting, KPI dashboards, budget vs. actual, profitability analysis, and cash-flow forecasting.' }, //[cite: 2]
    { no: '09', icon: Building2, title: 'Incorporation & Regulatory', desc: 'Advise on choosing the appropriate form of entity. ROC & MCA Filings, XBRL, ESOP, and CSR compliance advisory.' }, //[cite: 2]
  ],
  traits: [
    { icon: GraduationCap, title: 'CA-Led', desc: 'Your financial matters are handled with professional accounting and financial expertise.' }, //[cite: 2]
    { icon: Cpu, title: 'Technology-Enabled', desc: 'We use modern accounting, automation and AI tools to improve efficiency and reduce manual work.' }, //[cite: 2]
    { icon: Target, title: 'Business-Focused', desc: 'We don\'t just focus on compliance. We aim to understand the business behind the numbers.' }, //[cite: 2]
    { icon: MessageCircle, title: 'Clear Communication', desc: 'Financial information should be understandable. We explain things clearly without unnecessary jargon.' }, //[cite: 2]
    { icon: Users, title: 'Personalized Service', desc: 'As a boutique firm, we provide direct attention rather than treating clients as just another account.' }, //[cite: 2]
    { icon: Radar, title: 'Proactive Approach', desc: 'We aim to identify issues and opportunities before they become problems.' }, //[cite: 2]
  ],
  process: [
    { num: '01', title: 'Understand', desc: 'We discuss your business, current processes and requirements.' }, //[cite: 2]
    { num: '02', title: 'Set Up', desc: 'We establish the appropriate accounting, reporting and workflow structure.' }, //[cite: 2]
    { num: '03', title: 'Automate', desc: 'Where appropriate, we introduce technology and AI to streamline repetitive processes.' }, //[cite: 2]
    { num: '04', title: 'Review', desc: 'Our CAs review the information, identify exceptions and apply professional judgment.' }, //[cite: 2]
    { num: '05', title: 'Advise', desc: 'You receive clear reports, observations and actionable recommendations.' }, //[cite: 2]
  ],
  ledger: [
    { date: '04 Jan', account: 'Office Rent', debit: '₹45,000', credit: '—' },
    { date: '06 Jan', account: 'Client Invoice #1042', debit: '—', credit: '₹1,20,000' },
    { date: '09 Jan', account: 'GST Input Credit', debit: '₹8,600', credit: '—', flagged: true },
    { date: '14 Jan', account: 'Salaries', debit: '₹2,10,000', credit: '—' },
  ],
};

function Logo({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 ${light ? 'border-teal-400' : 'border-teal-600'}`}>
        <span className={`h-2 w-2 rounded-full ${light ? 'bg-teal-400' : 'bg-teal-600'}`} />
      </span>
      <span style={serif} className={`text-xl font-semibold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>Nivarna</span>
    </div>
  );
}

export default function NivarnaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [announceIdx, setAnnounceIdx] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', service: '' });
  const [sent, setSent] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setAnnounceIdx((i) => (i + 1) % siteData.announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter) return;
    setNewsletterSent(true);
  };

  const scrollCards = (dir: number) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 336, behavior: 'smooth' });
  };

  return (
    <div style={sans} className="min-h-screen bg-white text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />

      {/* Announcement strip */}
      <div className="flex items-center justify-center gap-3 bg-slate-900 px-6 py-2 text-xs text-slate-300">
        <Sparkles className="h-3.5 w-3.5 text-teal-400" />
        <span className="text-center">{siteData.announcements[announceIdx]}</span>
        <span className="hidden gap-1.5 sm:flex">
          {siteData.announcements.map((_, i) => (
            <button
              key={i}
              aria-label={`Show announcement ${i + 1}`}
              onClick={() => setAnnounceIdx(i)}
              className={`h-1.5 w-1.5 rounded-full ${i === announceIdx ? 'bg-teal-400' : 'bg-slate-600'}`}
            />
          ))}
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                Services <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {svcOpen && (
                <div className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    {siteData.services.map(({ icon: Icon, title }) => (
                      <a key={title} href="#services" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <Icon className="h-4 w-4 shrink-0 text-teal-700" /> {title}
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
          <a href="#contact" className="hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 md:inline-block">
            Book a Consultation
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            {siteData.nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-600">{n}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-full bg-slate-900 px-5 py-2.5 text-center text-sm font-semibold text-white">
              Book a Consultation
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <span style={serif} aria-hidden className="pointer-events-none absolute -left-10 -top-16 select-none text-[26rem] font-medium leading-none text-white/[0.03]">N</span>
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
          <div>
            <h1 style={serif} className="max-w-xl text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
              Where Financial Expertise Meets AI
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-slate-300">
              Managing finances shouldn't mean spending hours on routine accounting, compliance and reporting. We combine Chartered Accountant expertise with AI-powered tools and technology to simplify financial processes, reduce manual work and deliver insights that help you focus on your business. {/*[cite: 2] */}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white hover:border-slate-400">
                Explore Services
              </a>
            </div>
          </div>

          {/* Ledger visual */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <span style={serif} className="text-sm text-slate-300">General Ledger — FY26</span>
                <Sparkles className="h-4 w-4 text-teal-400" />
              </div>
              <div className="px-5 py-4">
                <div className="grid grid-cols-[1fr_1.6fr_1fr_1fr] gap-2 border-b border-slate-800 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <span>Date</span><span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
                </div>
                {siteData.ledger.map((row) => (
                  <div key={row.account} className={`relative grid grid-cols-[1fr_1.6fr_1fr_1fr] gap-2 border-b border-slate-800/60 py-2.5 text-xs ${row.flagged ? 'rounded-md bg-teal-500/10 ring-1 ring-teal-500/30' : ''}`}>
                    <span className="text-slate-400">{row.date}</span>
                    <span className="text-slate-200">{row.account}</span>
                    <span className="text-right text-slate-300">{row.debit}</span>
                    <span className="text-right text-slate-300">{row.credit}</span>
                    {row.flagged && (
                      <span className="col-span-4 mt-1 flex items-center gap-1.5 text-[11px] font-medium text-teal-400">
                        <Sparkles className="h-3 w-3" /> AI-reconciled — matched to GSTR-2B automatically
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-teal-500/25" />
          </div>
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

      {/* Services carousel */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Nine services, one accountable team</h2>
            <p className="mt-4 text-slate-600">A full spectrum of accounting, audit, tax and advisory support, delivered by the same team from setup through review.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollCards(-1)} aria-label="Previous" className="rounded-full border border-slate-300 p-2.5 hover:border-slate-500"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scrollCards(1)} aria-label="Next" className="rounded-full border border-slate-300 p-2.5 hover:border-slate-500"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={trackRef} className="nv-scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {siteData.services.map(({ no, icon: Icon, title, desc }) => (
            <div key={title} className="w-80 flex-none snap-start rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50">
                  <Icon className="h-5 w-5 text-teal-700" />
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
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <span className="text-sm font-medium text-teal-700">From our desk</span>
              <Quote className="mt-4 h-8 w-8 text-teal-600" />
              <p style={serif} className="mt-3 text-2xl italic leading-snug text-slate-900 sm:text-[1.75rem]">
                We are a Chartered Accountant-led advisory firm focused on helping businesses manage their accounting, audit, tax and financial requirements with greater clarity and efficiency. {/*[cite: 2] */}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">N</span>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">The Nivarna Team</p>
                  <p className="text-slate-500">Chartered Accountants, Bengaluru</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-teal-200 bg-teal-50 p-5">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <span><strong className="font-semibold text-slate-900">Founding Client Program</strong> — we're taking on our first clients now, working closely with each business we onboard.</span>
                </p>
              </div>
            </div>
            <div>
              <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Professional Expertise. Modern Technology. Practical Advice. {/*[cite: 2] */}</h2>
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {siteData.traits.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-center gap-5 px-6 py-5">
                    <Icon className="h-5 w-5 shrink-0 text-blue-600" />
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="font-semibold text-slate-900">{title}</h3>
                      <p className="text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl">A Simple, Transparent Process {/*[cite: 2] */}</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-5">
            {siteData.process.map(({ num, title, desc }, i) => (
              <div key={num} className="relative">
                {i < siteData.process.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-px w-full -translate-y-1/2 translate-x-1/2 bg-slate-700 md:block" />
                )}
                <span style={ghostNum} className="relative z-10 text-4xl font-medium">{num}</span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 style={serif} className="text-3xl font-medium text-slate-900 sm:text-4xl">Let's Make Your Finances Simpler {/*[cite: 2] */}</h2>
            <p className="mt-4 max-w-md text-slate-600">
              From accounting and compliance to audit, tax and advisory, we help you manage your financial responsibilities while giving you greater visibility into your business. {/*[cite: 2] */}
            </p>
            <ul className="mt-8 space-y-3">
              {['Response within one business day', 'A dedicated CA for your account', 'No-obligation first consultation'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-teal-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Thanks, {form.name.split(' ')[0]}.</h3>
                <p className="mt-1 text-sm text-slate-600">We'll reach out to you at {form.email} shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="">Select a service</option>
                    {siteData.services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-teal-500 py-16 text-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <p style={serif} className="max-w-xl text-2xl font-medium leading-snug sm:text-3xl">
            From your first invoice to your next audit, we're the team behind the numbers.
          </p>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 text-slate-400">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 border-b border-slate-800 pb-12 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 style={serif} className="text-3xl text-white sm:text-4xl">Nivarna</h3>
              <p className="mt-2 max-w-sm text-sm">Chartered accountancy, run the modern way. Bengaluru, India.</p>
            </div>
            <div>
              {newsletterSent ? (
                <p className="flex items-center gap-2 text-sm text-teal-400"><CheckCircle2 className="h-4 w-4" /> You're on the list.</p>
              ) : (
                <form onSubmit={submitNewsletter}>
                  <label className="mb-2 block text-sm text-slate-300">Get occasional notes on compliance deadlines and updates</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={newsletter}
                      onChange={(e) => setNewsletter(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
                    />
                    <button type="submit" aria-label="Subscribe" className="shrink-0 rounded-lg bg-teal-500 px-4 py-2.5 text-slate-950 hover:bg-teal-400">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
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