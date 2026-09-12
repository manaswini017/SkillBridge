import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockRecommendedRoles } from '../../data/mockData';
import { JobRoleMatch } from '../../types';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building,
  DollarSign,
  ChevronDown,
} from 'lucide-react';

export const JobMatchingView: React.FC = () => {
  const { setActiveTab } = useApp();

  const [roleFilter, setRoleFilter] = useState('all');
  const [minMatchFilter, setMinMatchFilter] = useState(60);
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<JobRoleMatch>(mockRecommendedRoles[0]);

  const filteredRoles = mockRecommendedRoles.filter((role) => {
    if (roleFilter !== 'all' && !role.title.toLowerCase().includes(roleFilter.toLowerCase())) {
      return false;
    }
    if (role.matchPercentage < minMatchFilter) {
      return false;
    }
    if (locationFilter !== 'all' && !role.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
          <Briefcase className="w-4 h-4" />
          <span>Skill-Compatibility Matching Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Career & Job Opportunities
        </h1>
        <p className="text-xs text-slate-500">
          Ranked purely on computational compatibility between your verified proficiencies and employer job descriptions.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 min-w-[160px]">
          <span className="text-xs font-semibold text-slate-500">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Python Developer">Python Developer</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 min-w-[180px]">
          <span className="text-xs font-semibold text-slate-500">Min Match:</span>
          <select
            value={minMatchFilter}
            onChange={(e) => setMinMatchFilter(Number(e.target.value))}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value={60}>60% + Compatibility</option>
            <option value={70}>70% + Compatibility</option>
            <option value={80}>80% + Compatibility</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 min-w-[160px]">
          <span className="text-xs font-semibold text-slate-500">Location:</span>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="all">All Hubs</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredRoles.length}</span> aligned roles
        </div>
      </div>

      {/* Main Layout: Left Role List, Right "Why am I a match?" Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Role Cards */}
        <div className="lg:col-span-7 space-y-3">
          {filteredRoles.map((role) => {
            const isSelected = selectedRoleForDetail.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRoleForDetail(role)}
                className={`p-5 rounded-2xl border transition cursor-pointer text-left ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-sm ring-1 ring-blue-500'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800">
                        {role.matchPercentage}% Match
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                      <span>{role.salaryRange}</span>
                      <span>•</span>
                      <span>{role.location}</span>
                      <span>•</span>
                      <span className="text-slate-700 font-medium">{role.experienceRequired}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    {role.openings} Openings
                  </span>
                </div>

                {/* Overlaps & Gaps */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                      Candidate Strengths
                    </span>
                    <span className="text-slate-800 font-semibold text-xs mt-0.5 block">
                      {role.candidateStrengths.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                      Missing / Gap Skills
                    </span>
                    <span className="text-slate-800 font-semibold text-xs mt-0.5 block">
                      {role.missingSkills.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: "Why am I a match?" Deep Dive Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5 sticky top-24 self-start">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Why Am I a Match?
            </h2>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-medium">Selected Evaluation:</span>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedRoleForDetail.title}
              </h3>
              <span className="text-lg font-black text-blue-600">
                {selectedRoleForDetail.matchPercentage}%
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <span className="font-semibold">AI Match Diagnostic:</span> {selectedRoleForDetail.whyMatchReason}
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">Mandatory Employer Skills:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedRoleForDetail.requiredSkills.map((req) => (
                  <span
                    key={req}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[11px]"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium block">Hiring Ecosystem:</span>
              <div className="mt-1 text-slate-700 font-semibold">
                {selectedRoleForDetail.companyCount} verified companies currently screening for this skill profile.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Build Roadmap for {selectedRoleForDetail.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              Practice Mock Interview Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
