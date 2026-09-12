import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockRecommendedRoles } from '../../data/mockData';
import {
  Sparkles,
  Award,
  GraduationCap,
  Target,
  Briefcase,
  MapPin,
  Bot,
  FileCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const { candidateProfile, setActiveTab } = useApp();

  const readinessScore = candidateProfile.employmentReadinessScore ?? 78;
  const breakdown = candidateProfile.readinessBreakdown ?? {
    technicalSkills: 82,
    softSkills: 70,
    projects: 75,
    certifications: 80,
    jobMatch: 84,
  };

  const skills = candidateProfile.skills ?? [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Employment Intelligence Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {candidateProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Your readiness score improved by <span className="font-bold text-white">+6 points</span> following your recent Python & Excel assessments. Closing your SQL gap will push you past the 85-point benchmark!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="px-4 py-2 bg-white text-blue-800 font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-50 transition flex items-center gap-1.5"
            id="dash-gap-btn"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Analyze Skill Gap</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 bg-blue-600/60 border border-blue-300/40 text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition flex items-center gap-1.5"
            id="dash-roadmap-btn"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>My Roadmap</span>
          </button>
        </div>
      </div>

      {/* Grid: Employment Readiness Score & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Composite Index
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Good Readiness
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Employment Readiness Score
            </h2>
          </div>

          {/* Circular Visual Score */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#2563eb"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - readinessScore / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {readinessScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Good Employment Readiness
            </p>
            <p className="text-[11px] text-slate-400 text-center max-w-[220px]">
              Targeting Tier-1 Data Analyst & Business Intelligence Openings
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Benchmark Target: 85+</span>
            <span className="font-semibold text-blue-600">Top 18% of Cohort</span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Evaluation Factors
              </span>
              <span className="text-xs text-slate-500">Updated from verified submissions</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Readiness Breakdown & Competency Weights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Technical Skills</span>
                <span className="text-blue-600">{breakdown.technicalSkills}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${breakdown.technicalSkills}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">Python 75%, SQL 40%, Excel 80%</p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Soft Skills & Communication</span>
                <span className="text-indigo-600">{breakdown.softSkills}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${breakdown.softSkills}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">Executive communication & structured reasoning</p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Applied Projects</span>
                <span className="text-emerald-600">{breakdown.projects}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${breakdown.projects}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">2 verified repositories (Customer Churn Analysis)</p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Industry Certifications</span>
                <span className="text-purple-600">{breakdown.certifications}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all"
                  style={{ width: `${breakdown.certifications}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">3 verified credentials (IBM, Microsoft Excel)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-blue-900 font-medium">
                Target Role Fit: <span className="font-bold">Data Analyst Match at {breakdown.jobMatch}%</span>
              </span>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-blue-700 font-semibold hover:underline shrink-0"
            >
              View Matches →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
            <p className="text-xs text-slate-500">Fast workflows to improve employment readiness</p>
          </div>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            AI Accelerated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setActiveTab('assessment')}
            id="quick-action-take-assessment"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">Take Assessment</div>
              <div className="text-[10px] text-slate-500 mt-0.5">MCQ validation</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('skill-gap')}
            id="quick-action-analyze-gap"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
              <Target className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">Analyze Skill Gap</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Role vs reality</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            id="quick-action-find-jobs"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition">Find Jobs</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Compatibility engine</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            id="quick-action-generate-roadmap"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition">Generate Roadmap</div>
              <div className="text-[10px] text-slate-500 mt-0.5">8-week curriculum</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ai-assistant')}
            id="quick-action-ask-assistant"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
              <Bot className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition">Ask AI Assistant</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Contextual guidance</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            id="quick-action-analyze-resume"
            className="p-3.5 rounded-xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40 text-left transition group flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition">Analyze Resume</div>
              <div className="text-[10px] text-slate-500 mt-0.5">ATS role alignment</div>
            </div>
          </button>
        </div>
      </div>

      {/* Grid: Skill Overview & Recommended Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skill Overview Progress Bars */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Skill Overview</h2>
              <p className="text-xs text-slate-500">Current verified proficiency levels</p>
            </div>
            <button
              onClick={() => setActiveTab('assessment')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Take Quiz →
            </button>
          </div>

          <div className="space-y-3.5">
            {skills.map((skill) => {
              const isHigh = skill.currentLevel >= 70;
              const isLow = skill.currentLevel < 50;
              const barColor = isLow ? 'bg-amber-500' : isHigh ? 'bg-blue-600' : 'bg-indigo-500';

              return (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      {skill.name}
                      {skill.verified ? (
                        <CheckCircle2 className="w-3 h-3 text-blue-600" title="Verified by Assessment" />
                      ) : (
                        <span className="text-[9px] text-amber-600 bg-amber-50 px-1 py-0.2 rounded font-normal">
                          Unverified
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-800">{skill.currentLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${skill.currentLevel}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
            💡 <span className="font-semibold text-slate-700">Target Action:</span> Taking the SQL assessment and scoring over 70% will resolve your largest bottleneck for Data Analyst placement.
          </div>
        </div>

        {/* Recommended Roles */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recommended Roles</h2>
              <p className="text-xs text-slate-500">Ranked by current candidate skill compatibility</p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All 4 Roles →
            </button>
          </div>

          <div className="space-y-3">
            {mockRecommendedRoles.slice(0, 3).map((role) => (
              <div
                key={role.id}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{role.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                        {role.matchPercentage}% Match
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-3">
                      <span>{role.salaryRange}</span>
                      <span>•</span>
                      <span>{role.location}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{role.openings} Openings</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="self-start sm:self-center px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold rounded-lg transition shrink-0"
                  >
                    View Details
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Candidate Strengths:</span>
                    <span className="text-emerald-700 font-semibold text-[11px]">
                      {role.candidateStrengths.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Missing / Gap Skills:</span>
                    <span className="text-amber-700 font-semibold text-[11px]">
                      {role.missingSkills.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
