import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Building,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const InstitutionDashboard: React.FC = () => {
  const { institutionMetrics } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const placementPieData = [
    { name: 'Placed', value: institutionMetrics.placementRate, color: '#10b981' },
    { name: 'In Interview Pipeline', value: 16, color: '#3b82f6' },
    { name: 'Upskilling / Preparing', value: 100 - institutionMetrics.placementRate - 16, color: '#94a3b8' },
  ];

  const skillPerformanceData = [
    { skill: 'Python', pre: 35, post: 84, gain: 49 },
    { skill: 'Data Visualization', pre: 30, post: 76, gain: 46 },
    { skill: 'Excel Advanced', pre: 50, post: 88, gain: 38 },
    { skill: 'SQL & Warehousing', pre: 28, post: 65, gain: 37 },
    { skill: 'Communication', pre: 52, post: 68, gain: 16 },
  ];

  const handleExportReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>Institution Analytics Portal • {institutionMetrics.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Training & Skilling Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Evaluate program effectiveness, measure concrete pre-vs-post skilling gains, and prove employer placement outcomes.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          id="export-impact-report-btn"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{downloadSuccess ? 'Report Downloaded!' : 'Export Impact Report (PDF)'}</span>
        </button>
      </div>

      {/* 5 Core Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Enrolled
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {institutionMetrics.totalStudents.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Verified Candidates</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Pre-Training Avg
          </span>
          <div className="text-2xl font-black text-slate-600 mt-1">
            {institutionMetrics.preTrainingScore}%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cohort Baseline</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Post-Training Avg
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {institutionMetrics.postTrainingScore}%
          </div>
          <div className="text-[11px] text-blue-600 font-semibold mt-0.5">Verified Output</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Avg Gain
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              Verified
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            +{institutionMetrics.averageImprovement}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Net Delta Elevation</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Placement Rate
            </span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
              Target: 70%
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-700 mt-1">
            {institutionMetrics.placementRate}%
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-0.5">880+ Hired Alumni</div>
        </div>
      </div>

      {/* Visual Analytics Grid: Pre vs Post Skills & Placement Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pre vs Post Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pre-Training vs. Post-Training Skill Mastery
              </h2>
              <p className="text-xs text-slate-500">
                Empirical evaluation across foundational curriculum modules
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-slate-300" />
                <span className="text-slate-600">Pre</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-indigo-600" />
                <span className="text-slate-600">Post</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillPerformanceData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="skill" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Bar dataKey="pre" name="Pre-Training Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="post" name="Post-Training Verified" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placement Breakdown Donut */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Placement Conversion
            </h2>
            <p className="text-xs text-slate-500">Employment outcome distribution</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {placementPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {placementPieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-bold text-slate-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Training Batches & Cohort Performance
            </h2>
            <p className="text-xs text-slate-500">
              Drilldown into completion rates and employment conversions
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {institutionMetrics.batches.length} Active Batches
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Batch Name</th>
                <th className="p-3.5">Enrolled</th>
                <th className="p-3.5">Completion Rate</th>
                <th className="p-3.5">Avg Score</th>
                <th className="p-3.5">Placement Rate</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {institutionMetrics.batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 font-bold text-slate-900">{batch.name}</td>
                  <td className="p-3.5 font-mono">{batch.enrolledStudents} students</td>
                  <td className="p-3.5 font-mono">{batch.completionRate}%</td>
                  <td className="p-3.5 font-mono font-bold text-blue-600">{batch.averageScore}%</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-600">{batch.placementRate}%</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Completed & Placed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing vs Low Performing Skills Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-emerald-900">
              Top Performing Curriculum Competencies
            </h3>
          </div>
          <div className="space-y-2">
            {institutionMetrics.topPerformingSkills.map((skill) => (
              <div
                key={skill}
                className="p-3 bg-white rounded-xl border border-emerald-100 text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <span>{skill}</span>
                <span className="text-emerald-700 font-bold font-mono">92% Cohort Pass Rate</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-900">
              Curriculum Areas Requiring Faculty Intervention
            </h3>
          </div>
          <div className="space-y-2">
            {institutionMetrics.lowPerformingSkills.map((skill) => (
              <div
                key={skill}
                className="p-3 bg-white rounded-xl border border-amber-100 text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <span>{skill}</span>
                <span className="text-amber-700 font-bold font-mono">Recommend Lab Hours</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
