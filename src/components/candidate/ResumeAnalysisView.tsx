import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeResume } from '../../services/aiService';
import { ResumeAnalysisResult } from '../../types';
import { mockResumeAnalysis } from '../../data/mockData';
import {
  FileCheck,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const ResumeAnalysisView: React.FC = () => {
  const { setActiveTab } = useApp();

  const [targetRole, setTargetRole] = useState('Data Analyst');
  const [fileName, setFileName] = useState('Aarav_Patel_Data_Resume.pdf');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult>(mockResumeAnalysis);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const res = await analyzeResume(fileName, targetRole);
    setAnalysis(res);
    setIsAnalyzing(false);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      handleRunAnalysis();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold">
            <FileCheck className="w-4 h-4" />
            <span>ATS & Semantic Resume Parser</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Resume AI Analysis
          </h1>
          <p className="text-xs text-slate-500">
            Audit your resume against automated ATS filters and target role competencies.
          </p>
        </div>

        {/* Target Role Selector & Action */}
        <div className="flex items-center gap-2">
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
          >
            <option value="Data Analyst">Target: Data Analyst</option>
            <option value="Business Analyst">Target: Business Analyst</option>
            <option value="Python Developer">Target: Python Developer</option>
          </select>
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}</span>
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center hover:border-blue-400 transition bg-slate-50/40 relative">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleSimulateUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Drag & Drop your resume or <span className="text-blue-600 underline">Browse files</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, TXT up to 10MB</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs mt-2">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Current Active File: <strong className="text-slate-900">{fileName}</strong></span>
          </div>
        </div>
      </div>

      {/* Score Overview & Top Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between items-center text-center">
          <div className="w-full text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ATS Compatibility
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">Resume Score</h3>
          </div>

          <div className="my-6 relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#d97706"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.score / 100)}`}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">{analysis.score}</span>
              <span className="text-[10px] font-semibold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target Role Match:</span>
            <span className="font-bold text-blue-600">{analysis.targetRoleMatch?.matchScore || 74}%</span>
          </div>
        </div>

        {/* Detected & Missing Skills */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Detected Competencies & Gaps</h3>
            <span className="text-xs text-slate-400">Against {targetRole}</span>
          </div>

          {/* Detected Skills */}
          <div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Detected Skills in Resume</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.detectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="pt-2">
            <span className="text-xs font-bold text-red-700 flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Missing Skills for {targetRole}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-red-50 text-red-800 rounded-lg text-xs font-semibold border border-red-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Identified Resume Strengths</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {analysis.strengths.map((str, idx) => (
              <li key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Actionable AI Recommendations</span>
          </h3>
          <div className="space-y-2 text-xs">
            {analysis.aiSuggestions.map((sug, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  sug.type === 'critical'
                    ? 'bg-red-50/50 border-red-200 text-red-900'
                    : 'bg-blue-50/50 border-blue-200 text-blue-900'
                }`}
              >
                <div className="font-bold text-[11px] uppercase tracking-wider mb-0.5">
                  {sug.category}
                </div>
                <div>{sug.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
