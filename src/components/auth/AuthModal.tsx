import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Sparkles, User, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, loginAs } = useApp();

  const [role, setRole] = useState<UserRole>('candidate');
  const [name, setName] = useState('Aarav Patel');
  const [email, setEmail] = useState('aarav.patel@example.com');
  const [password, setPassword] = useState('password123');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role, name, email);
  };

  const handleQuickDemo = (selectedRole: UserRole) => {
    if (selectedRole === 'candidate') {
      loginAs('candidate', 'Aarav Patel', 'aarav.patel@example.com');
    } else if (selectedRole === 'institution') {
      loginAs('institution', 'Apex Skilling Council', 'admin@apexskills.org');
    } else {
      loginAs('admin', 'National Directorate', 'director@skills.gov.in');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="fixed inset-0"
        onClick={() => setAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          id="auth-modal-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {authMode === 'login' ? 'Sign In to SkillBridge AI' : 'Create an Account'}
            </h2>
            <p className="text-xs text-slate-500">
              Employment intelligence & skill benchmarking platform
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-4 mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Select Your Perspective Role
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`py-2 px-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition ${
                role === 'candidate'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('institution')}
              className={`py-2 px-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition ${
                role === 'institution'
                  ? 'bg-white text-emerald-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Institution</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 px-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition ${
                role === 'admin'
                  ? 'bg-white text-purple-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrator</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900">Instant Demo Login:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('candidate')}
                className="text-[11px] px-2 py-0.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('institution')}
                className="text-[11px] px-2 py-0.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Institution
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="text-[11px] px-2 py-0.5 rounded bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
              >
                Govt Admin
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name / Organization Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Patel"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition flex items-center justify-center gap-2 mt-2"
          >
            <span>{authMode === 'login' ? 'Sign In & Enter Dashboard' : 'Register Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          {authMode === 'login' ? (
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
