import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeSkillGap } from '../../services/aiService';
import { SkillGapAnalysisResult } from '../../types';
import {
  Target,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BarChart2,
} from 'lucide-react';

export const SkillGapAnalysisView: React.FC = () => {
  const { candidateProfile, setActiveTab } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>('Data Analyst');
  const [analysis, setAnalysis] = useState<SkillGapAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const availableRoles = [
    'Data Analyst',
    'Business Analyst',
    'Python Developer',
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    analyzeSkillGap(selectedRole, candidateProfile).then((res) => {
      if (isMounted) {
        setAnalysis(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedRole, candidateProfile]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Strong':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Strong
          </span>
        );
      case 'Low Gap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Low Gap
          </span>
        );
      case 'Medium Gap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Medium Gap
          </span>
        );
      case 'High Gap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="w-3 h-3" /> High Gap
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
            <Target className="w-4 h-4" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            AI Skill Gap Analysis
          </h1>
          <p className="text-xs text-slate-500">
            Quantify exact competency distances between your verified abilities and employer hiring thresholds.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Target Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            id="target-role-select"
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2" />
          <p className="text-xs font-semibold text-slate-600">
            Synthesizing skill matrices and computing gap vectors...
          </p>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={analysis.overallMatch >= 70 ? '#10b981' : '#2563eb'}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.overallMatch / 100)}`}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute text-lg font-black text-slate-900">
                  {analysis.overallMatch}%
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Compatibility
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  Overall Job Match: {analysis.overallMatch}%
                </h3>
                <p className="text-xs text-slate-500">
                  Role: <span className="font-semibold text-slate-800">{selectedRole}</span>
                </p>
              </div>
            </div>

            {/* AI Explanation Pill */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Diagnostic Narrative</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {analysis.aiExplanation}
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  💡 Strategy: {analysis.recommendedAction}
                </span>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  id="generate-roadmap-from-gap-btn"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Generate My Learning Roadmap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visual Bar Comparison Chart Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  Visual Comparison: Current Level vs. Required Level
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-600" />
                  <span className="text-slate-600">Current Level</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-300" />
                  <span className="text-slate-600">Required Level</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {analysis.items.map((item) => (
                <div key={item.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.skill}</span>
                    <span className="text-slate-500 font-mono">
                      Current: <span className="font-bold text-blue-600">{item.currentLevel}%</span> / Required: <span className="font-bold text-slate-700">{item.requiredLevel}%</span>
                    </span>
                  </div>

                  {/* Dual Bar System */}
                  <div className="grid grid-cols-1 gap-1">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.gap === 0 ? 'bg-emerald-500' : item.gap > 25 ? 'bg-red-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${item.currentLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Detailed Skill Gap Matrix
              </h3>
              <span className="text-xs text-slate-400">
                {analysis.items.length} Target Competencies
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Skill</th>
                    <th className="p-3.5">Current Level</th>
                    <th className="p-3.5">Required Level</th>
                    <th className="p-3.5">Deficit Gap</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {analysis.items.map((item) => (
                    <tr key={item.skill} className="hover:bg-slate-50/50 transition">
                      <td className="p-3.5 font-bold text-slate-900">{item.skill}</td>
                      <td className="p-3.5 font-mono text-blue-600 font-bold">{item.currentLevel}%</td>
                      <td className="p-3.5 font-mono text-slate-700">{item.requiredLevel}%</td>
                      <td className="p-3.5 font-mono">
                        {item.gap > 0 ? (
                          <span className="text-red-600 font-bold">-{item.gap}%</span>
                        ) : (
                          <span className="text-emerald-600 font-bold">0%</span>
                        )}
                      </td>
                      <td className="p-3.5">{getStatusBadge(item.status)}</td>
                      <td className="p-3.5 text-right">
                        {item.gap > 0 ? (
                          <button
                            onClick={() => setActiveTab('roadmap')}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Add to Plan →
                          </button>
                        ) : (
                          <span className="text-emerald-600 text-[11px] font-semibold">Qualified ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
