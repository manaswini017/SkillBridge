import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Target,
  Briefcase,
  MapPin,
  Bot,
  FileCheck,
  MessagesSquare,
  TrendingUp,
  Building2,
  Users,
  Award,
  Layers,
  Globe,
  BarChart3,
  Flame,
  FileSpreadsheet,
  Lightbulb,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { userRole, activeTab, setActiveTab } = useApp();

  if (userRole === 'public') return null;

  const candidateNavItems = [
    { id: 'dashboard', label: 'Candidate Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'assessment', label: 'Skill Assessment', icon: GraduationCap, badge: 'Live MCQ' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, badge: 'AI Core' },
    { id: 'jobs', label: 'Career & Job Match', icon: Briefcase },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin },
    { id: 'ai-assistant', label: 'AI Career Assistant', icon: Bot, badge: 'LLM' },
    { id: 'resume', label: 'Resume Analysis', icon: FileCheck },
    { id: 'interview', label: 'Interview Preparation', icon: MessagesSquare },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
  ];

  const institutionNavItems = [
    { id: 'institution-dashboard', label: 'Training Dashboard', icon: LayoutDashboard },
    { id: 'institution-students', label: 'Student Performance', icon: Users },
    { id: 'institution-effectiveness', label: 'Training Effectiveness', icon: Award, badge: 'Impact' },
    { id: 'institution-gaps', label: 'Skill Gap Analytics', icon: Layers },
  ];

  const adminNavItems = [
    { id: 'admin-overview', label: 'National Overview', icon: Globe },
    { id: 'admin-analytics', label: 'Employment Analytics', icon: BarChart3 },
    { id: 'admin-heatmap', label: 'Skill Gap Heatmap', icon: Flame, badge: 'Regional' },
    { id: 'admin-demand', label: 'Regional Skill Demand', icon: Briefcase },
    { id: 'admin-insights', label: 'AI Policy Insights', icon: Lightbulb, badge: 'AI' },
    { id: 'admin-reports', label: 'Executive Reports', icon: FileSpreadsheet },
  ];

  let currentItems = candidateNavItems;
  let sectionLabel = 'Candidate Intelligence';
  if (userRole === 'institution') {
    currentItems = institutionNavItems;
    sectionLabel = 'Institution Metrics';
  } else if (userRole === 'admin') {
    currentItems = adminNavItems;
    sectionLabel = 'National Workforce Intel';
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex-shrink-0 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-4">
        <div>
          <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {sectionLabel}
          </div>
          <nav className="mt-2 space-y-1">
            {currentItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-700 font-semibold shadow-xs border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-slate-600">Model Engine: Synced</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 leading-tight">
          AI & Analytics pipeline operational. Local simulation mode active.
        </p>
      </div>
    </aside>
  );
};
