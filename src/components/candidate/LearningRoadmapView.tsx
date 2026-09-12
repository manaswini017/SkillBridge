import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const LearningRoadmapView: React.FC = () => {
  const { currentRoadmap, toggleRoadmapTopic, setActiveTab } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>AI Adaptive Learning Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Personalized Learning Roadmap
          </h1>
          <p className="text-xs text-slate-500">
            Dynamically synthesized to eliminate your specific skill gaps for the{' '}
            <span className="font-bold text-slate-800">{currentRoadmap.targetRole}</span> role.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-700">Roadmap Progress</div>
            <div className="text-[11px] text-slate-400">
              {currentRoadmap.totalDuration} • {currentRoadmap.estimatedHours} Estimated Hours
            </div>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#0284c7"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - currentRoadmap.overallProgress / 100)}`}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-900">
              {currentRoadmap.overallProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Target Role Context Banner */}
      <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            Closing Phases 1 & 2 directly resolves your <span className="font-bold">SQL (40% Gap)</span> and{' '}
            <span className="font-bold">Power BI (40% Gap)</span> deficiencies, lifting your job match from 62% to 85%+.
          </span>
        </div>
        <button
          onClick={() => setActiveTab('assessment')}
          className="px-3 py-1 bg-white hover:bg-sky-100 text-sky-800 font-semibold rounded-lg border border-sky-200 transition shrink-0"
        >
          Retake MCQ Assessment →
        </button>
      </div>

      {/* Sequential Phases Timeline */}
      <div className="space-y-4">
        {currentRoadmap.phases.map((phase) => {
          const completedCount = phase.topics.filter((t) => t.completed).length;
          const phasePercent = Math.round((completedCount / (phase.topics.length || 1)) * 100);

          return (
            <div
              key={phase.phaseNumber}
              className={`p-6 rounded-2xl border transition bg-white shadow-xs ${
                phase.completed ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 font-black text-xs flex items-center justify-center">
                    0{phase.phaseNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">{phase.title}</h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {phase.skill}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{phase.duration}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      phase.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {completedCount}/{phase.topics.length} Complete ({phasePercent}%)
                  </span>
                </div>
              </div>

              {/* Phase Topics Checklist */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {phase.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => toggleRoadmapTopic(phase.phaseNumber, topic.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between group ${
                      topic.completed
                        ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-slate-50/50 border-slate-200/70 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {topic.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                      )}
                      <span className={topic.completed ? 'line-through text-slate-500' : ''}>
                        {topic.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-700 uppercase font-bold">
                      {topic.completed ? 'Completed' : 'Mark Complete'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
