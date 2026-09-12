import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  TrendingUp,
  Star,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building,
  GraduationCap,
  Download,
  Sparkles,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export const TrainingImpactView: React.FC = () => {
  const { institutionMetrics } = useApp();

  const [selectedBatchId, setSelectedBatchId] = useState(institutionMetrics.batches[0]?.id || 'b1');

  const radarData = [
    { subject: 'Python', Pre: 40, Post: 85, fullMark: 100 },
    { subject: 'SQL', Pre: 25, Post: 72, fullMark: 100 },
    { subject: 'Power BI', Pre: 20, Post: 80, fullMark: 100 },
    { subject: 'Statistics', Pre: 45, Post: 78, fullMark: 100 },
    { subject: 'Soft Skills', Pre: 55, Post: 75, fullMark: 100 },
    { subject: 'Projects', Pre: 30, Post: 88, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>Empirical Impact Evaluation Model</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Training Impact & ROI Analysis
          </h1>
          <p className="text-xs text-slate-500">
            Scientifically attribute employment and proficiency elevation to curriculum interventions.
          </p>
        </div>

        {/* Batch Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Select Cohort:</label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
          >
            {institutionMetrics.batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5 Impact Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Pre-Training Baseline
          </span>
          <div className="text-2xl font-black text-slate-600 mt-1">38%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Diagnostic Entrance Test</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Post-Training Output
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">79%</div>
          <div className="text-[10px] text-blue-500 mt-0.5">Capstone Final Exam</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Net Improvement
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">+41%</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Statistically Significant</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Employment Rate
          </span>
          <div className="text-2xl font-black text-indigo-700 mt-1">76%</div>
          <div className="text-[10px] text-indigo-600 font-medium mt-0.5">Within 90 Days</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Employer Rating
            </span>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">4.3 / 5.0</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Recruiter Satisfaction</div>
        </div>
      </div>

      {/* Radar Chart: Multi-dimensional Skill Elevation */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Multi-Competency Pre vs. Post Radar Footprint
            </h2>
            <p className="text-xs text-slate-500">
              Holistic capability expansion across both technical & professional dimensions
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Pre-Training Baseline"
                dataKey="Pre"
                stroke="#94a3b8"
                fill="#94a3b8"
                fillOpacity={0.4}
              />
              <Radar
                name="Post-Training Verified"
                dataKey="Post"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.5}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Success Factors & Curriculum Gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-emerald-900">Key Program Drivers</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">1.</span>
              <span>Hands-on capstone project directly simulating real-world e-commerce datasets.</span>
            </li>
            <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">2.</span>
              <span>Rigorous weekly MCQ assessments aligned with industry interview formats.</span>
            </li>
            <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">3.</span>
              <span>Peer code reviews and business presentation practice for soft skills.</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-900">Recommended Curriculum Refinements</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-2.5 bg-white rounded-xl border border-amber-100 flex items-start gap-2">
              <span className="text-amber-600 font-bold">1.</span>
              <span>Increase dedicated hours for Advanced SQL window functions and indexing.</span>
            </li>
            <li className="p-2.5 bg-white rounded-xl border border-amber-100 flex items-start gap-2">
              <span className="text-amber-600 font-bold">2.</span>
              <span>Introduce cloud data warehousing modules (BigQuery / Snowflake basics).</span>
            </li>
            <li className="p-2.5 bg-white rounded-xl border border-amber-100 flex items-start gap-2">
              <span className="text-amber-600 font-bold">3.</span>
              <span>Add mock technical interview simulations prior to final campus placements.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
