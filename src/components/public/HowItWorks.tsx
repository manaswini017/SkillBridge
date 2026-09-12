import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Building2,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Target,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { loginAs, setActiveTab } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Architectural Blueprint
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How SkillBridge AI Operates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Traditional job portals show generic job postings. Traditional EdTech platforms sell isolated courses. SkillBridge AI creates an interconnected intelligence mesh connecting candidates, educators, and governance.
        </p>
      </div>

      {/* The 3 Core Perspectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Candidate */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pillar 01 — Candidate</div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              “What should I learn and which opportunities fit me?”
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instead of guessing requirements or sending resumes into the void, candidates take targeted MCQ skill assessments, inspect quantifiable gap percentages against target roles, follow tailored 8-week roadmaps, and practice AI mock interviews.
            </p>
          </div>

          <button
            onClick={() => loginAs('candidate')}
            className="w-full mt-4 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <span>Explore Candidate Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Training Institution */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pillar 02 — Training Institution</div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              “Is our training actually improving candidate skills?”
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Training institutes no longer measure success merely by attendance or completion certificates. SkillBridge calculates the verified skill delta before vs. after training (e.g. 42% → 76%), isolating lingering bottlenecks like database queries or oral presentations.
            </p>
          </div>

          <button
            onClick={() => loginAs('institution')}
            className="w-full mt-4 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <span>Explore Institution View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Administrator / Government */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Pillar 03 — Govt / Administrator</div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              “Are skilling initiatives leading to employment outcomes?”
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Government directors and workforce planners gain real-time regional heatmaps across states, compare program return on capital (project-based vs. lecture-only), and generate audit-ready policy reports with verified employment conversion rates.
            </p>
          </div>

          <button
            onClick={() => loginAs('admin')}
            className="w-full mt-4 py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <span>Explore Govt Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* The Closed-Loop Methodology */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          The 8-Stage Unified Methodology
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '1. Skills Inventory', desc: 'Candidate registers verified certifications, projects, and self-reported competencies.' },
            { step: '2. Live Assessment', desc: 'Interactive MCQ challenges scientifically evaluate technical problem solving.' },
            { step: '3. Skill Gap Analysis', desc: 'AI algorithm evaluates target role requirements and computes high/medium gaps.' },
            { step: '4. Career Matching', desc: 'Compatibility index surfaces roles where candidate has >65% match.' },
            { step: '5. Adaptive Roadmap', desc: 'Phase-based 8-week curriculum targeted strictly at closing the identified gaps.' },
            { step: '6. Skill Improvement', desc: 'Candidate retakes assessments; scores increase and delta is recorded.' },
            { step: '7. Employment Outcomes', desc: 'Resume ATS scoring & AI interview mock prep convert readiness into job offers.' },
            { step: '8. Training Impact', desc: 'Institutions and policymakers trace return on training investment.' },
          ].map((item, idx) => (
            <div key={item.step} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Stage 0{idx + 1}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-2">{item.step}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
