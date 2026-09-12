import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sparkles,
  User,
  Building2,
  ShieldCheck,
  LogOut,
  LogIn,
  Menu,
  X,
  ChevronDown,
  Compass,
  FileText,
  HelpCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    candidateProfile,
    setAuthModalOpen,
    setAuthMode,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getRoleBadge = (role: UserRole | 'public') => {
    switch (role) {
      case 'candidate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <User className="w-3.5 h-3.5" /> Candidate Portal
          </span>
        );
      case 'institution':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5" /> Institution Portal
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Govt / Admin Intel
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Compass className="w-3.5 h-3.5" /> Public Platform
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (userRole === 'public') setActiveTab('landing');
              else if (userRole === 'candidate') setActiveTab('dashboard');
              else if (userRole === 'institution') setActiveTab('institution-dashboard');
              else setActiveTab('admin-overview');
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="header-logo-btn"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">SkillBridge</span>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block leading-none">Employment & Skill Intelligence</p>
            </div>
          </button>

          {/* Quick Perspective Role Indicator */}
          <div className="hidden md:block">
            {getRoleBadge(userRole)}
          </div>
        </div>

        {/* Center / Right: Role Switcher & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Perspective Switcher Pill */}
          <div className="relative">
            <button
              id="role-switch-dropdown-btn"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              title="Switch Perspective"
            >
              <span className="text-slate-400 font-normal">View as:</span>
              <span className="font-semibold capitalize text-slate-900">
                {userRole === 'public' ? 'Public' : userRole}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setRoleDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 divide-y divide-slate-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Perspective
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserRole('candidate');
                        setActiveTab('dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition ${
                        userRole === 'candidate' ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <div>
                          <div>Candidate Portal</div>
                          <div className="text-[10px] text-slate-400 font-normal">Learner & Job Seeker</div>
                        </div>
                      </div>
                      {userRole === 'candidate' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('institution');
                        setActiveTab('institution-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition ${
                        userRole === 'institution' ? 'text-emerald-700 font-semibold bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <div>
                          <div>Training Institution</div>
                          <div className="text-[10px] text-slate-400 font-normal">Cohorts & Effectiveness</div>
                        </div>
                      </div>
                      {userRole === 'institution' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('admin');
                        setActiveTab('admin-overview');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-purple-50 transition ${
                        userRole === 'admin' ? 'text-purple-700 font-semibold bg-purple-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        <div>
                          <div>Government / Admin</div>
                          <div className="text-[10px] text-slate-400 font-normal">Regional Heatmaps & Impact</div>
                        </div>
                      </div>
                      {userRole === 'admin' && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('public');
                        setActiveTab('landing');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                        userRole === 'public' ? 'text-slate-900 font-semibold bg-slate-50' : 'text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <div>Public Landing Page</div>
                          <div className="text-[10px] text-slate-400 font-normal">Overview & How It Works</div>
                        </div>
                      </div>
                      {userRole === 'public' && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation Links for Public View */}
          {userRole === 'public' && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('landing')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  activeTab === 'landing' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  activeTab === 'about' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                How It Works
              </button>
            </div>
          )}

          {/* Auth Action Buttons */}
          {userRole === 'public' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                id="header-login-btn"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition"
                id="header-signup-btn"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  {userRole === 'candidate' ? candidateProfile.name.charAt(0) : userRole === 'institution' ? 'T' : 'G'}
                </div>
                <span className="text-xs font-medium text-slate-800 max-w-[120px] truncate">
                  {userRole === 'candidate' ? candidateProfile.name : userRole === 'institution' ? 'Apex Skilling Council' : 'Director General (Admin)'}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                title="Log out"
                id="header-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-3 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1">
            Navigate Perspectives
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setUserRole('candidate');
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2 text-xs rounded-lg text-left border ${
                userRole === 'candidate' ? 'bg-blue-50 border-blue-200 text-blue-800 font-semibold' : 'border-slate-200 text-slate-700'
              }`}
            >
              Candidate Portal
            </button>
            <button
              onClick={() => {
                setUserRole('institution');
                setActiveTab('institution-dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2 text-xs rounded-lg text-left border ${
                userRole === 'institution' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' : 'border-slate-200 text-slate-700'
              }`}
            >
              Institution
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setActiveTab('admin-overview');
                setMobileMenuOpen(false);
              }}
              className={`p-2 text-xs rounded-lg text-left border ${
                userRole === 'admin' ? 'bg-purple-50 border-purple-200 text-purple-800 font-semibold' : 'border-slate-200 text-slate-700'
              }`}
            >
              Govt / Admin
            </button>
            <button
              onClick={() => {
                setUserRole('public');
                setActiveTab('landing');
                setMobileMenuOpen(false);
              }}
              className={`p-2 text-xs rounded-lg text-left border ${
                userRole === 'public' ? 'bg-slate-100 border-slate-300 text-slate-900 font-semibold' : 'border-slate-200 text-slate-700'
              }`}
            >
              Public Landing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
