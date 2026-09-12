import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  GraduationCap,
  Briefcase,
  Compass,
  CheckCircle2,
  Bot,
  FileCheck,
  MessagesSquare,
  Award,
  Layers,
  ChevronRight,
  Users,
  ShieldAlert,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setUserRole, setAuthModalOpen, setAuthMode, loginAs } = useApp();

  const handleGetStarted = () => {
    loginAs('candidate');
  };

  const handleExplorePlatform = () => {
    setActiveTab('about');
  };

  const workflowSteps = [
    { title: 'Assess', desc: 'Interactive skill validation & MCQ benchmarks', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
    { title: 'Analyze', desc: 'Precision AI skill gap diagnosis against target roles', icon: Target, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Learn', desc: 'Dynamic phase-based learning roadmaps', icon: Compass, color: 'text-sky-600 bg-sky-50' },
    { title: 'Match', desc: 'Compatibility-driven career recommendations', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Get Hired', desc: 'Interview prep, ATS resume scoring & placement', icon: Award, color: 'text-amber-600 bg-amber-50' },
    { title: 'Measure Impact', desc: 'Institution & government training effectiveness analytics', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  ];

  const aiFeatures = [
    {
      title: 'AI Skill Gap Analysis',
      desc: 'Compares real candidate abilities with employer job descriptions, computing mathematically grounded gaps and prioritization.',
      icon: Target,
      tag: 'Core Diagnostic',
    },
    {
      title: 'Intelligent Job Matching',
      desc: 'Replaces keyword searches with skill compatibility scoring. Surfaces missing skills, strong overlaps, and why you match.',
      icon: Briefcase,
      tag: 'Compatibility Engine',
    },
    {
      title: 'LLM Career Assistant',
      desc: 'Dedicated conversational career coach with deep contextual knowledge of candidate assessment histories and market demand.',
      icon: Bot,
      tag: 'LLM Powered',
    },
    {
      title: 'Personalized Learning Roadmap',
      desc: 'Generates progressive, phase-by-phase curriculum milestones directly tailored to eliminate high-impact skill deficiencies.',
      icon: Compass,
      tag: 'Adaptive Curriculum',
    },
    {
      title: 'Resume AI Analysis',
      desc: 'Parses resume text for detected competencies, quantifies impact scores, and flags target role alignment for ATS optimization.',
      icon: FileCheck,
      tag: 'ATS Screening',
    },
    {
      title: 'AI Interview Preparation',
      desc: 'Generates tailored technical, behavioral, and scenario interview drills with instant evaluation on clarity and technical accuracy.',
      icon: MessagesSquare,
      tag: 'Interactive Mock',
    },
    {
      title: 'Employment Readiness',
      desc: 'Holistic 0–100 score weighing technical proficiency, soft skills, verified certifications, and portfolio project rigor.',
      icon: Award,
      tag: 'Predictive Index',
    },
    {
      title: 'Training Impact Analytics',
      desc: 'Enables institutions and policymakers to trace candidates through completion, skill delta, and verified employment outcomes.',
      icon: Layers,
      tag: 'Outcome Governance',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-6 border border-blue-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Bridging Skills to Opportunities through AI-Driven Employment Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Bridge the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Skills and Employment.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered intelligence for identifying skill gaps, discovering career opportunities, personalizing learning, and measuring the real-world impact of skilling initiatives.
          </p>

          {/* Primary / Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={handleGetStarted}
              id="hero-primary-cta"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleExplorePlatform}
              id="hero-secondary-cta"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 shadow-xs transition"
            >
              Explore Platform
            </button>
          </div>

          {/* Perspective quick buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Or test directly as:</span>
            <button
              onClick={() => loginAs('candidate')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Candidate
            </button>
            <span>•</span>
            <button
              onClick={() => loginAs('institution')}
              className="text-emerald-600 font-semibold hover:underline"
            >
              Training Institution
            </button>
            <span>•</span>
            <button
              onClick={() => loginAs('admin')}
              className="text-purple-600 font-semibold hover:underline"
            >
              Govt / Admin
            </button>
          </div>

          {/* 3 Key Statistics */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-3xl font-extrabold text-blue-600">485,000+</div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-1">Skills Analyzed</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Across 12 technical domains</div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-3xl font-extrabold text-indigo-600">120,000+</div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-1">Candidates Supported</div>
              <div className="text-[11px] text-slate-400 mt-0.5">With personalized roadmaps</div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-3xl font-extrabold text-purple-600">940+</div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-1">Training Outcomes Tracked</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Verified employment pipelines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Unified Value Chain</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              The End-to-End Employment Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Unlike disparate job boards or isolated test portals, SkillBridge links talent capability directly to policy and employer impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SkillBridge AI? Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Systemic Resolution</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Why SkillBridge AI?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Job seekers don’t know why they are rejected; institutions celebrate enrollment without knowing who gets hired; and policymakers fund skilling without reliable skill-delta data. SkillBridge bridges all three with unified intelligence.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Identify real, quantified skill gaps against live employer requirements',
                  'Discover suitable career paths matched to verified capabilities',
                  'Get personalized, phase-based learning plans targeting high-ROI gaps',
                  'Connect skills directly with employment opportunities',
                  'Measure training program effectiveness & employment impact',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => loginAs('candidate')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition inline-flex items-center gap-2"
                >
                  <span>Experience as a Candidate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-slate-900">Live Skill Intelligence Matrix</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  System Benchmark Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="text-[11px] font-semibold text-slate-500">Candidate Experience</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">Data Analyst Skill Gap</div>
                  <div className="text-xs text-blue-600 font-medium mt-1">Match: 62% → Target: 85%</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '62%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1.5">Highest Deficit: SQL (+40%) & Power BI (+40%)</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="text-[11px] font-semibold text-slate-500">Training Effectiveness</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">5,000 Cohort Trainees</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">42% → 76% Skill Level (+34%)</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '76%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1.5">Employment Placement: 68% Conversion</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <span className="font-semibold">AI Governance Finding:</span> Cohorts with mandatory practical capstone datasets exhibited a <span className="font-bold underline">2.3x higher job offer conversion</span> compared to cohorts completing theory-only curricula.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Enterprise AI Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              AI-Powered Employment Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Comprehensive tools designed for candidates to master high-value competencies, and for leaders to evaluate outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Bridge Skills into Verifiable Employment?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of candidates, accredited training centers, and regional workforce boards utilizing SkillBridge AI today.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => loginAs('candidate')}
              className="px-6 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-xs hover:bg-blue-50 transition shadow-sm"
            >
              Launch Candidate Console
            </button>
            <button
              onClick={() => loginAs('institution')}
              className="px-6 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 border border-blue-400/40 text-white font-semibold text-xs transition"
            >
              Launch Institution Console
            </button>
            <button
              onClick={() => loginAs('admin')}
              className="px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-400/40 text-white font-semibold text-xs transition"
            >
              Launch Govt Admin Console
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
