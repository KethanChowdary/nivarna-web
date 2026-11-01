"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Receipt,
  TrendingUp,
  Cpu,
  Briefcase,
  BarChart3,
  GraduationCap,
  Target,
  MessageCircle,
  Users,
  Radar,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
  Quote,
  ShieldCheck,
  FileCheck2,
  Layers,
  Building2,
  Check,
  Mail,
  SlidersHorizontal,
  LayoutGrid,
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

type ServiceItem = {
  no: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  items?: string[];
  subgroups?: { groupTitle: string; items: string[] }[];
};

const siteData = {
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Who We Serve', href: '#who-we-serve' },
    { label: 'About Us', href: '#about' },
    { label: 'Partners', href: '#partners' },
    { label: 'How We Work', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  announcements: [
    'Where Financial Expertise Meets AI',
    'Your Numbers. Our Expertise. AI-Enhanced',
    'Beyond Numbers. Built for Better Decisions',
    'Professional Expertise. Modern Technology. Practical Advice.',
    'A Simple, Transparent Process',
  ],
  services: [
    {
      no: '01',
      icon: BookOpen,
      title: 'Accounting & Bookkeeping',
      desc: 'Keep your financial records accurate, organized and up to date.',
      items: [
        'Bookkeeping and accounting',
        'Monthly book closure',
        'Bank and ledger reconciliations',
        'Accounts payable and receivable',
        'Payroll Management',
        'Accounting services for Offshore business',
      ],
    },
    {
      no: '02',
      icon: ShieldCheck,
      title: 'Risk Management and Internal Controls',
      desc: 'Identify risks, strengthen controls and improve your business processes.',
      items: [
        'Internal control review',
        'Process audits',
        'Risk assessment',
        'Operational reviews',
        'Control gap identification',
        'Recommendations for improvement',
      ],
    },
    {
      no: '03',
      icon: Receipt,
      title: 'Tax Compliance & Litigation Support',
      desc: 'Stay compliant while reducing the administrative burden of managing tax requirements.',
      items: [
        'Income tax compliance',
        'GST compliance',
        'UAE VAT Compliance & Refunds',
        'Income Tax return preparation',
        'TDS Payments and Returns',
        'Tax reconciliations',
        'Handling end-to-end Tax Assessments, Notices & Refunds',
      ],
    },
    {
      no: '04',
      icon: TrendingUp,
      title: 'Tax Advisory',
      desc: 'Go beyond compliance with practical tax advice for your business and financial decisions.',
      items: [
        'Tax planning',
        'Transaction structuring',
        'Business and investment decisions',
        'Tax implications analysis',
        'Advisory on tax-efficient alternatives',
      ],
    },
    {
      no: '05',
      icon: Cpu,
      title: 'Finance Transformation',
      desc: 'Finance processes, systems and operational improvements for growing businesses.',
      items: [
        'Accounting software implementation',
        'Process improvement',
        'Automation',
        'AI-enabled finance workflows',
      ],
    },
    {
      no: '06',
      icon: Briefcase,
      title: 'Business Advisory',
      desc: 'Practical business and financial insights to support informed decisions.',
      items: [
        'Business planning',
        'Cost optimization',
        'Valuation',
        'Due diligence',
      ],
    },
    {
      no: '07',
      icon: BarChart3,
      title: 'Virtual CFO',
      desc: 'Ongoing financial planning, reporting and decision support for business owners.',
      items: [
        'Financial statements',
        'MIS reporting',
        'KPI dashboards',
        'Budget vs. actual',
        'Profitability analysis',
        'Cash-flow forecasting',
      ],
    },
    {
      no: '08',
      icon: FileCheck2,
      title: 'Incorporation & Regulatory Compliance',
      desc: 'End-to-end statutory entity formation, regulatory compliances, and secretarial filings.',
      subgroups: [
        {
          groupTitle: '1. Incorporation and Registration',
          items: [
            'Advise on choosing the appropriate form of entity',
            'Company/LLP/Partnership/Trust/Society Incorporation',
            'GST/MSME/Trade License/EPCG and other statutory registrations',
          ],
        },
        {
          groupTitle: '2. ROC & FEMA Filings',
          items: [
            'Conversion of Firm / Company to LLP',
            'Assistance in annual filings',
            'Routine Compliances & Filings',
            'Compliances for FEMA and RBI',
          ],
        },
      ],
    },
  ] as ServiceItem[],
  whoWeServe: [
    {
      title: 'Start-ups & Growing Businesses',
      desc: 'Start-ups, entrepreneurs and growing businesses needing agile accounting, compliance setup, and scalable financial systems.',
      icon: TrendingUp,
    },
    {
      title: 'SMEs & MSMEs',
      desc: 'Small and medium-sized enterprises (SMEs) and MSMEs looking for structured bookkeeping, cost optimization, and disciplined reporting.',
      icon: Layers,
    },
    {
      title: 'Companies & Corporate Entities',
      desc: 'Companies and corporate entities requiring robust internal controls, statutory process audits, regulatory filings, and CFO-level decision support.',
      icon: Building2,
    },
    {
      title: 'Professionals & Consultants',
      desc: 'Professionals, consultants and individual taxpayers seeking personal tax planning, advance tax, TDS, and return preparation.',
      icon: Users,
    },
    {
      title: 'Ongoing Retainer Clients',
      desc: 'Businesses seeking ongoing accounting, GST, taxation, UAE VAT, and end-to-end financial management support.',
      icon: ShieldCheck,
    },
  ],
  partners: [
    {
      name: 'CA Niveditha M. A.',
      role: 'Founding Partner',
      experience: 'Ex-Deloitte • 4+ Years Post-Qualification',
      initials: 'NM',
      bio: [
        'Niveditha is a Chartered Accountant with over four years of post-qualification experience gained at Deloitte & Touche AERS India Private Limited. Her experience includes working on complex financial services engagements, with exposure to US GAAP, IFRS, financial reporting, risk assessment, internal controls and regulatory compliance.',
        'She has contributed to identifying business risks, evaluating control processes, recommending improvements and supporting compliance and reporting requirements. Her professional background also includes accounting, financial statement preparation, SME due diligence support, financial projections and valuation assistance.',
      ],
      tags: [
        'US GAAP & IFRS',
        'Financial Reporting',
        'Risk Assessment',
        'Internal Controls',
        'SME Due Diligence',
        'Financial Projections & Valuation',
      ],
    },
    {
      name: 'CA Priyanka V.',
      role: 'Founding Partner',
      experience: 'Indirect Tax & GST Specialist • 7+ Years Experience',
      initials: 'PV',
      bio: [
        'Priyanka is a Chartered Accountant with over seven years of experience across accounting, audit and taxation, including specialised post-qualification experience in indirect taxation and GST advisory.',
        'Her expertise includes GST compliance, assessments, litigation support, preparation of appeals and representations, refund processes, tax reconciliations and due diligence. She has also advised on income tax, TDS, advance tax and MSME-related compliance requirements.',
        'Her wider experience includes financial reporting, bookkeeping, budgeting, forecasting, cash flow management and UAE VAT compliance. She has also led and mentored tax professionals and worked on improving compliance processes and internal controls.',
      ],
      tags: [
        'GST Advisory & Compliance',
        'Tax Litigation & Assessments',
        'UAE VAT Compliance & Refunds',
        'Appeals & Representations',
        'Cash Flow & Budgeting',
        'MSME Compliance',
      ],
    },
  ],
  traits: [
    {
      icon: GraduationCap,
      title: 'CA-Led',
      desc: 'Your financial matters are handled with professional accounting and financial expertise.',
    },
    {
      icon: Cpu,
      title: 'Technology-Enabled',
      desc: 'We use modern accounting, automation and AI tools to improve efficiency and reduce manual work.',
    },
    {
      icon: Target,
      title: 'Business-Focused',
      desc: "We don't just focus on compliance. We aim to understand the business behind the numbers.",
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      desc: 'Financial information should be understandable. We explain things clearly without unnecessary jargon.',
    },
    {
      icon: Users,
      title: 'Personalized Service',
      desc: 'As a boutique firm, we provide direct attention rather than treating clients as just another account.',
    },
    {
      icon: Radar,
      title: 'Proactive Approach',
      desc: 'We aim to identify issues and opportunities before they become problems.',
    },
  ],
  process: [
    {
      num: '01',
      title: 'Understand',
      desc: 'We discuss your business, current processes and requirements.',
    },
    {
      num: '02',
      title: 'Set Up',
      desc: 'We establish the appropriate accounting, reporting and workflow structure.',
    },
    {
      num: '03',
      title: 'Automate',
      desc: 'Where appropriate, we introduce technology and AI to streamline repetitive processes.',
    },
    {
      num: '04',
      title: 'Review',
      desc: 'Our CAs review the information, identify exceptions and apply professional judgment.',
    },
    {
      num: '05',
      title: 'Advise',
      desc: 'You receive clear reports, observations and actionable recommendations.',
    },
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
  const [servicesView, setServicesView] = useState<'slider' | 'grid'>('slider');
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

  const selectServiceAndContact = (serviceTitle: string) => {
    setForm((prev) => ({ ...prev, service: serviceTitle }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <div style={sans} className="min-h-screen bg-white text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: STYLE_BLOCK }} />

      {/* Announcement strip */}
      <div className="flex items-center justify-center gap-3 bg-[#0c304b] px-4 py-2.5 text-xs text-slate-300 sm:px-6">
        <Sparkles className="h-3.5 w-3.5 text-[#d7b66f]" />
        <span className="text-center font-medium">{siteData.announcements[announceIdx]}</span>
        <span className="hidden gap-1.5 sm:flex">
          {siteData.announcements.map((_, i) => (
            <button
              key={i}
              aria-label={`Show announcement ${i + 1}`}
              onClick={() => setAnnounceIdx(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === announceIdx ? 'bg-[#d7b66f]' : 'bg-slate-600'}`}
            />
          ))}
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" aria-label="Nivarna Advisors home">
            <Logo />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
              <a
                href="#services"
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Areas of Interest <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </a>
              {svcOpen && (
                <div className="absolute left-0 top-full w-[36rem] pt-3">
                  <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl">
                    {siteData.services.map(({ icon: Icon, title }) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => {
                          setSvcOpen(false);
                          selectServiceAndContact(title);
                        }}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0c304b] transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-[#8d672d]" />
                        <span className="truncate">{title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {siteData.nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-[#0c304b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors md:inline-block"
          >
            Schedule a Consultation
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 text-slate-700 hover:text-slate-900 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 lg:hidden">
            <div className="space-y-1">
              {siteData.nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 block rounded-full bg-[#0c304b] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
            >
              Schedule a Consultation
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#08233a] text-white">
        <span
          style={serif}
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-16 select-none text-[26rem] font-medium leading-none text-white/[0.03]"
        >
          N
        </span>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch lg:py-24">
          <div className="max-w-2xl lg:self-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b66f]/40 bg-[#0c304b] px-3.5 py-1 text-xs font-semibold text-[#d7b66f] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Where Financial Expertise Meets AI
            </div>
            <h1
              style={serif}
              className="max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            >
              Beyond Numbers. <br />
              Built for Better Decisions.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300">
              Managing finances shouldn&apos;t mean spending hours on routine accounting, compliance and reporting. We combine Chartered Accountant expertise with AI-powered tools and technology to simplify financial processes, reduce manual work and deliver insights that help you focus on your business.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300/90">
              Whether you need your books maintained, financial statements audited, taxes managed or financial decisions reviewed, we provide practical support tailored to your business.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#b68a42] px-6 py-3 text-sm font-semibold text-[#08233a] hover:bg-[#d7b66f] transition-colors"
              >
                Schedule a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white hover:border-slate-400 transition-colors"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="relative hidden flex-col overflow-hidden rounded-[2rem] border border-[#b68a42]/40 bg-[#0c304b] p-8 shadow-2xl shadow-black/30 lg:flex">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d7b66f]/25" />
            <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#d7b66f]/20" />
            <div aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d7b66f]/60 to-transparent" />
            <div className="relative flex h-full flex-col">
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#d7b66f]">
                Your Numbers. Our Expertise. AI-Enhanced
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
                Accounting, audit, tax, reporting and business advisory support, backed by Chartered Accountant expertise and intelligent workflows.
              </p>
              <div className="mt-8 grid flex-1 grid-cols-2 content-start gap-x-4 gap-y-3.5 border-t border-[#d7b66f]/25 pt-6">
                {siteData.services.map(({ icon: Icon, title }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => selectServiceAndContact(title)}
                    className="flex items-center gap-2 text-left text-xs font-medium text-slate-100 hover:text-[#d7b66f] transition-colors group"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#d7b66f] group-hover:scale-110 transition-transform" />
                    <span className="truncate">{title}</span>
                  </button>
                ))}
              </div>
              <a
                href="#services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d7b66f] hover:text-white transition-colors"
              >
                Explore all 8 practice areas <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-slate-800 py-4 bg-[#061d31]">
          <div className="nv-scrollbar-hide overflow-hidden">
            <div className="nv-marquee-track flex w-max gap-10">
              {[...siteData.services, ...siteData.services].map((s, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 border-l border-slate-800 pl-10 text-xs sm:text-sm font-medium text-slate-400 whitespace-nowrap"
                >
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
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">
              <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> Practice Areas
            </span>
            <h2 style={serif} className="mt-2 text-3xl font-medium text-slate-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Comprehensive accounting, audit, tax, advisory and regulatory solutions tailored to your business.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
              <button
                type="button"
                onClick={() => setServicesView('slider')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-colors ${
                  servicesView === 'slider'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Carousel
              </button>
              <button
                type="button"
                onClick={() => setServicesView('grid')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-colors ${
                  servicesView === 'grid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Grid View
              </button>
            </div>
            {servicesView === 'slider' && (
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCards(-1)}
                  aria-label="Previous service"
                  className="rounded-full border border-slate-300 p-2.5 text-slate-700 hover:border-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollCards(1)}
                  aria-label="Next service"
                  className="rounded-full border border-slate-300 p-2.5 text-slate-700 hover:border-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {servicesView === 'slider' ? (
          <div ref={trackRef} className="nv-scrollbar-hide mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {siteData.services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="flex w-[320px] sm:w-[360px] flex-none snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#d7b66f]/70 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7edd9] text-[#8d672d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span style={serif} className="text-sm font-medium text-slate-400">
                      No. {s.no}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>

                  <div className="mt-5 border-t border-slate-100 pt-4 flex-1">
                    {s.items && (
                      <ul className="space-y-2">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b68a42]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.subgroups && (
                      <div className="space-y-3.5">
                        {s.subgroups.map((group) => (
                          <div key={group.groupTitle} className="space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#8d672d]">
                              {group.groupTitle}
                            </p>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b68a42]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => selectServiceAndContact(s.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8d672d] hover:text-[#0c304b] transition-colors"
                    >
                      Request this service <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#d7b66f]/70 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7edd9] text-[#8d672d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span style={serif} className="text-sm font-medium text-slate-400">
                      No. {s.no}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>

                  <div className="mt-5 border-t border-slate-100 pt-4 flex-1">
                    {s.items && (
                      <ul className="space-y-2">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b68a42]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.subgroups && (
                      <div className="space-y-3.5">
                        {s.subgroups.map((group) => (
                          <div key={group.groupTitle} className="space-y-1.5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#8d672d]">
                              {group.groupTitle}
                            </p>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b68a42]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => selectServiceAndContact(s.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8d672d] hover:text-[#0c304b] transition-colors"
                    >
                      Request this service <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="border-t border-slate-200 bg-slate-50/70 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">
              <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> Client Focus
            </span>
            <h2 style={serif} className="mt-2 text-3xl font-medium text-slate-900 sm:text-4xl">
              Who We Serve
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Tailored accounting, compliance and advisory partnerships designed for different stages of business growth.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteData.whoWeServe.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#d7b66f]/70 hover:shadow-lg ${
                    idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7edd9] text-[#8d672d] transition-colors group-hover:bg-[#f0dfb8]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us & Why Choose Us */}
      <section id="about" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">
                <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> About Us
              </span>
              <blockquote className="relative mt-6 border-l-2 border-[#d7b66f]/70 pl-6">
                <Quote className="absolute -left-[15px] -top-1 h-7 w-7 rounded-full bg-white p-1 text-[#8d672d]" aria-hidden />
                <p style={serif} className="text-2xl italic leading-snug text-slate-900 sm:text-[1.75rem]">
                  We believe a CA firm should do more than prepare accounts and complete compliance requirements. It should help business owners understand their numbers, manage risks and make informed financial decisions.
                </p>
              </blockquote>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                We are a Chartered Accountant-led advisory firm focused on helping businesses manage their accounting, audit, tax and financial requirements with greater clarity and efficiency.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Our approach combines professional expertise, technology and AI-driven workflows to provide services that are practical, responsive and designed around the needs of modern businesses.
              </p>
              <div className="mt-8">
                <a
                  href="#partners"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8d672d] hover:text-[#0c304b] transition-colors"
                >
                  Meet our Founding Partners <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">Why Choose Us</span>
              <h2 style={serif} className="mt-2 text-3xl font-medium text-slate-900 sm:text-4xl">
                Professional Expertise. Modern Technology. Practical Advice.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteData.traits.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="group rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d7b66f]/60 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5"
                  >
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

      {/* Founding Partners */}
      <section id="partners" className="border-t border-slate-200 bg-slate-50/50 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">
              <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> Leadership
            </span>
            <h2 style={serif} className="mt-2 text-3xl font-medium text-slate-900 sm:text-4xl">
              Founding Partners
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Chartered Accountants combining Big Four engagement standards with specialized indirect tax advisory and strategic financial consulting.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {siteData.partners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-[#d7b66f]/70 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#08233a] text-xl font-bold text-[#d7b66f] shadow-inner"
                    style={serif}
                  >
                    {partner.initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-900">{partner.name}</h3>
                      <span className="rounded-full bg-[#f7edd9] px-2.5 py-0.5 text-xs font-semibold text-[#8d672d]">
                        {partner.role}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {partner.experience}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-6 text-sm leading-relaxed text-slate-600">
                  {partner.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Practice Areas
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="process" className="bg-[#08233a] py-24 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d7b66f]">Our Methodology</span>
            <h2 style={serif} className="mt-2 text-3xl font-medium sm:text-4xl">
              A Simple, Transparent Process
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              How we partner with your business to establish structure, ensure compliance, and unlock insights.
            </p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-5">
            {siteData.process.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <span style={ghostNum} className="relative z-10 text-4xl font-medium">{num}</span>
                <h3 className="mt-3 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8d672d]">
              <span className="h-px w-8 bg-[#8d672d]/60" aria-hidden /> Get In Touch
            </span>
            <h2 style={serif} className="mt-2 text-3xl font-medium text-slate-900 sm:text-4xl">
              Let&apos;s Make Your Finances Simpler
            </h2>
            <p className="mt-4 max-w-md text-slate-600 leading-relaxed">
              From accounting and compliance to audit, tax and advisory, we help you manage your financial responsibilities while giving you greater visibility into your business.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-800">Have a requirement? Let&apos;s talk.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#8d672d] hover:text-[#0c304b] transition-colors"
                href="mailto:contact@nivarna.in"
              >
                <Mail className="h-4 w-4 text-[#8d672d]" /> contact@nivarna.in
              </a>
            </div>

            <div className="mt-8 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you can expect</p>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8d672d] shrink-0" />
                  <span>Direct consultation with a qualified Chartered Accountant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8d672d] shrink-0" />
                  <span>Tailored assessment of your accounting, tax, and risk profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8d672d] shrink-0" />
                  <span>Transparent engagement structure and practical recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
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
                  className="mt-6 text-sm font-semibold text-[#8d672d] underline underline-offset-4 hover:text-[#0c304b] transition-colors"
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
                  <label htmlFor="consultation-service" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Service Needed <span className="font-normal text-slate-500">(optional)</span>
                  </label>
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
                    <option value="General Advisory / Other">Other / General Consultation</option>
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
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-[#0c304b] py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70 transition-colors"
                >
                  {submitting ? 'Sending request…' : 'Schedule a Consultation'}
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
            From accounting and compliance to audit, tax and advisory, we help you manage your financial responsibilities while giving you greater visibility into your business.
          </p>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#08233a] px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
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
              <p className="mt-4 max-w-sm text-sm text-slate-300">
                Where Financial Expertise Meets AI.
              </p>
              <p className="mt-1 max-w-sm text-xs text-slate-400">
                Chartered Accountant-led advisory firm for modern businesses.
              </p>
              <a
                className="mt-3 inline-block text-sm text-[#d7b66f] hover:text-white transition-colors"
                href="mailto:contact@nivarna.in"
              >
                contact@nivarna.in
              </a>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-sm">
              <a href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                Privacy Notice
              </a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                Contact &amp; Consultations
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm">© 2026 Nivarna Advisors. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 text-sm">
              {siteData.nav.map((n) => (
                <a key={n.label} href={n.href} className="hover:text-white transition-colors">
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
