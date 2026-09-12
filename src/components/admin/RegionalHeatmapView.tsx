import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Download,
  Building,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
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
} from 'recharts';

export const RegionalHeatmapView: React.FC = () => {
  const { adminMetrics } = useApp();

  const [stateFilter, setStateFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');

  const filteredData = adminMetrics.regionalHeatmap.filter((item) => {
    if (stateFilter !== 'all' && item.state !== stateFilter) return false;
    if (sectorFilter !== 'all' && !item.topDemandSkill.toLowerCase().includes(sectorFilter.toLowerCase())) return false;
    return true;
  });

  const barData = adminMetrics.regionalHeatmap.map((item) => ({
    state: item.state,
    candidates: Math.round(item.candidatesCount / 1000),
    placement: item.placementRate,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Geospatial Talent Mapping</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Regional Skill Heatmaps & Industrial Corridors
          </h1>
          <p className="text-xs text-slate-500">
            Granular analysis of territorial skill supply versus enterprise hiring requisitions across states.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Telangana">Telangana</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">All Technology Sectors</option>
            <option value="Cloud">Cloud Infrastructure</option>
            <option value="AI">AI & Machine Learning</option>
            <option value="Data">Data Analytics</option>
            <option value="DevOps">DevOps & SRE</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Highest Demand Hub
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">Karnataka & Telangana</div>
          <p className="text-xs text-blue-600 font-medium mt-0.5">Focus: AI/ML & Cloud Computing</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Severe Deficit Area
          </span>
          <div className="text-xl font-bold text-red-600 mt-1">Maharashtra (Data Analytics)</div>
          <p className="text-xs text-slate-500 mt-0.5">High Gap Level (-42% deficit against postings)</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            National Skilling Budget Allocated
          </span>
          <div className="text-xl font-bold text-emerald-600 mt-1">$48.2M USD</div>
          <p className="text-xs text-slate-500 mt-0.5">Covering 1,850 Accredited Institutes</p>
        </div>
      </div>

      {/* Heatmap Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((region) => (
          <div
            key={region.state}
            className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-3 hover:border-blue-300 transition"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">{region.state}</h3>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  region.gapLevel === 'High'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : region.gapLevel === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {region.gapLevel} Deficit
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Top Industrial Demand:</span>
                <span className="font-bold text-slate-800">{region.topDemandSkill}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Candidates:</span>
                <span className="font-mono font-bold text-slate-900">
                  {region.candidatesCount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Placement Rate:</span>
                <span className="font-mono font-bold text-emerald-600">
                  {region.placementRate}%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Institutional Density: High</span>
              <button className="text-blue-600 font-bold hover:underline">
                Allocate Grants →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              State-by-State Talent Volume (in Thousands) vs Placement Conversion
            </h2>
            <p className="text-xs text-slate-500">
              Correlating student population scale with successful industry absorption
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="candidates" name="Registered Candidates (k)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="placement" name="Placement Conversion (%)" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
