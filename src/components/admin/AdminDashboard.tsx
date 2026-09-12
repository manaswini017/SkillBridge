import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  MapPin,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Download,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { adminMetrics } = useApp();

  const [selectedRegionFilter, setSelectedRegionFilter] = useState('all');
  const [selectedGapFilter, setSelectedGapFilter] = useState('all');

  const filteredRegions = adminMetrics.regionalHeatmap.filter((reg) => {
    if (selectedRegionFilter !== 'all' && reg.state !== selectedRegionFilter) {
      return false;
    }
    if (selectedGapFilter !== 'all' && reg.gapLevel !== selectedGapFilter) {
      return false;
    }
    return true;
  });

  const chartData = adminMetrics.regionalHeatmap.map((r) => ({
    state: r.state,
    placementRate: r.placementRate,
    candidates: Math.round(r.candidatesCount / 1000), // in thousands
  }));

  return (
    <div className="space-y-6">
      {/* Policy Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ministry of Skill Development & Employment Intelligence Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            National Skill & Employment Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-Time Policy & Skilling Dashboard — Correlating regional candidate talent supply against industrial market demand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold rounded-xl">
            Live Feed: National Registry v2.4
          </span>
        </div>
      </div>

      {/* 5 National Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Candidates
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {adminMetrics.totalCandidates.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Across 28 States</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Accredited Centers
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {adminMetrics.totalInstitutions.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-600 font-semibold mt-0.5">Certified Institutions</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            National Avg Score
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {adminMetrics.averageReadiness}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Readiness Index</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            National Placement
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {adminMetrics.placementRate}%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">+4.2% YoY Gain</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Deficit Sectors
          </span>
          <div className="text-sm font-bold text-red-600 mt-2 flex flex-wrap gap-1">
            {adminMetrics.criticalSkillGaps.map((g) => (
              <span key={g} className="px-1.5 py-0.5 bg-red-50 rounded border border-red-200 text-[10px]">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Skill Heatmap & State Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Regional Skill Heatmap & Industrial Alignment
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative territorial supply vs industry talent vacancies
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Telangana">Telangana</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>

            <select
              value={selectedGapFilter}
              onChange={(e) => setSelectedGapFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">All Gap Severities</option>
              <option value="High">High Gap</option>
              <option value="Medium">Medium Gap</option>
              <option value="Moderate">Moderate</option>
            </select>
          </div>
        </div>

        {/* State Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Region / State</th>
                <th className="p-3.5">Top Demand Skill</th>
                <th className="p-3.5">Skill Deficit Level</th>
                <th className="p-3.5">Registered Talent</th>
                <th className="p-3.5">Placement Conversion</th>
                <th className="p-3.5 text-right">Policy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredRegions.map((region) => (
                <tr key={region.state} className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{region.state}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">{region.topDemandSkill}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        region.gapLevel === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : region.gapLevel === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {region.gapLevel} Gap
                    </span>
                  </td>
                  <td className="p-3.5 font-mono">{region.candidatesCount.toLocaleString()}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-600">
                    {region.placementRate}%
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="text-[11px] font-semibold text-blue-600">Active Skilling Subsidy</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart: Regional Placement vs Candidate Talent Volume */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              State-Level Placement Conversion Rate (%)
            </h2>
            <p className="text-xs text-slate-500">
              Comparing employment delivery across prioritized industrial corridors
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={26}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              />
              <Bar dataKey="placementRate" name="Placement Conversion Rate (%)" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Generated Policy Recommendations */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Autonomous Policy Recommendations & Resource Allocations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminMetrics.policyRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                    {rec.targetState}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      rec.impactPriority === 'High'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {rec.impactPriority} Priority
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 mt-2">{rec.title}</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Projected Impact:</span>
                <span className="font-bold text-emerald-700">{rec.projectedImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
