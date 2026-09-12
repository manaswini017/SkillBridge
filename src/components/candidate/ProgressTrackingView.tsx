import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  BarChart2,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';

export const ProgressTrackingView: React.FC = () => {
  const { candidateProfile } = useApp();

  const skillComparisonData = [
    { skill: 'SQL', before: 40, current: 68, gain: 28 },
    { skill: 'Python', before: 60, current: 82, gain: 22 },
    { skill: 'Power BI', before: 25, current: 55, gain: 30 },
    { skill: 'Excel', before: 70, current: 80, gain: 10 },
    { skill: 'Communication', before: 60, current: 72, gain: 12 },
  ];

  const timelineProgressData = [
    { week: 'Week 1', readiness: 60, sql: 25, python: 60 },
    { week: 'Week 2', readiness: 64, sql: 32, python: 68 },
    { week: 'Week 3', readiness: 69, sql: 40, python: 72 },
    { week: 'Week 4', readiness: 72, sql: 52, python: 76 },
    { week: 'Week 5', readiness: 75, sql: 60, python: 80 },
    { week: 'Week 6 (Current)', readiness: 78, sql: 68, python: 82 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>Longitudinal Delta Analytics</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Progress Tracking & Skill Gains
        </h1>
        <p className="text-xs text-slate-500">
          Trace measured skill elevation and employment readiness improvements across completed roadmaps and assessments.
        </p>
      </div>

      {/* Top 3 KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Readiness Improvement
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18 pts
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">
              {candidateProfile.employmentReadinessScore ?? 78}
            </span>
            <span className="text-xs text-slate-400">from 60 baseline</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Approaching the 85+ Tier-1 hiring threshold.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Skill Gap Reduction
            </span>
            <span className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3.5 h-3.5" /> 34% Closed
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">34%</span>
            <span className="text-xs text-slate-400">Net Deficit Closed</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Major gains recorded across SQL and Power BI.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Verified Assessments
            </span>
            <span className="inline-flex items-center text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">5 Skills</span>
            <span className="text-xs text-slate-400">Scientifically Tested</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            All assessments logged into candidate verified blockchain-ready record.
          </p>
        </div>
      </div>

      {/* Chart: Before vs Current Skill Levels */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Skill Improvement: Before vs. Current
            </h2>
            <p className="text-xs text-slate-500">
              Quantifiable progression across individual competencies
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-300" />
              <span className="text-slate-600">Before</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-600" />
              <span className="text-slate-600">Current</span>
            </div>
          </div>
        </div>

        {/* Skill Bars with Before/Current Callouts */}
        <div className="space-y-4 pt-2">
          {skillComparisonData.map((item) => (
            <div key={item.skill} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono">
                    Before: <strong className="text-slate-600">{item.before}%</strong>
                  </span>
                  <span>→</span>
                  <span className="text-blue-600 font-mono font-bold">
                    Current: {item.current}%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    +{item.gain}% Gain
                  </span>
                </div>
              </div>

              {/* Stacked visualization */}
              <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                {/* Previous Level Base */}
                <div
                  className="absolute left-0 top-0 h-full bg-slate-400 rounded-full"
                  style={{ width: `${item.before}%` }}
                />
                {/* Current Elevated Level */}
                <div
                  className="absolute left-0 top-0 h-full bg-blue-600 rounded-full opacity-80"
                  style={{ width: `${item.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart: Timeline Readiness Growth */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Employment Readiness Trajectory (Weekly)
            </h2>
            <p className="text-xs text-slate-500">
              6-Week Longitudinal Trend Line
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line
                type="monotone"
                dataKey="readiness"
                name="Readiness Score"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="sql"
                name="SQL Proficiency"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="python"
                name="Python Proficiency"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
