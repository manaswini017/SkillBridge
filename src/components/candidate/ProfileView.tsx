import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { candidateProfile, updateCandidateField } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states initialized from context
  const [education, setEducation] = useState(candidateProfile.education || 'Bachelor of Technology (B.Tech)');
  const [degree, setDegree] = useState(candidateProfile.degree || 'Computer Science & Engineering');
  const [branch, setBranch] = useState(candidateProfile.branch || 'CSE');
  const [college, setCollege] = useState(candidateProfile.college || 'National Institute of Technology (NIT)');
  const [experienceYears, setExperienceYears] = useState(candidateProfile.experienceYears ?? 1);
  const [preferredRolesText, setPreferredRolesText] = useState((candidateProfile.preferredRoles || []).join(', '));
  const [preferredLocationText, setPreferredLocationText] = useState((candidateProfile.preferredLocation || []).join(', '));
  const [certificationsText, setCertificationsText] = useState((candidateProfile.certifications || []).join('\n'));

  // Skills addition state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'tool'>('technical');
  const [newSkillLevel, setNewSkillLevel] = useState(60);

  const completeness = candidateProfile.completeness ?? 85;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateField('education', education);
    updateCandidateField('degree', degree);
    updateCandidateField('branch', branch);
    updateCandidateField('college', college);
    updateCandidateField('experienceYears', Number(experienceYears));
    updateCandidateField(
      'preferredRoles',
      preferredRolesText.split(',').map((s) => s.trim()).filter(Boolean)
    );
    updateCandidateField(
      'preferredLocation',
      preferredLocationText.split(',').map((s) => s.trim()).filter(Boolean)
    );
    updateCandidateField(
      'certifications',
      certificationsText.split('\n').map((s) => s.trim()).filter(Boolean)
    );

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const currentSkills = candidateProfile.skills ? [...candidateProfile.skills] : [];
    currentSkills.push({
      name: newSkillName.trim(),
      category: newSkillCategory,
      currentLevel: newSkillLevel,
      previousLevel: 0,
      lastAssessed: new Date().toISOString().split('T')[0],
      verified: false,
    });
    updateCandidateField('skills', currentSkills);
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillIndex: number) => {
    const currentSkills = candidateProfile.skills ? [...candidateProfile.skills] : [];
    currentSkills.splice(skillIndex, 1);
    updateCandidateField('skills', currentSkills);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Professional Profile</h1>
          <p className="text-xs text-slate-500">
            Keep your skills, verified credentials, and target roles up to date for precise AI employment matching.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Profile updated successfully!
          </div>
        )}
      </div>

      {/* Completeness & Missing Suggestions Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700">Profile Completeness</span>
            <span className="text-blue-600 font-bold">{completeness}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Profiles above 90% receive <span className="font-semibold text-slate-700">2.4x more interview invitations</span> from verified recruiters.
          </p>
        </div>

        {/* Missing Suggestions */}
        <div className="lg:col-span-8 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> AI Recommendations to Reach 100%
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>Add a link to your live GitHub / Tableau project repository.</span>
            </div>
            <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Verify your SQL knowledge via the interactive MCQ assessment.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Academic & Experience Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Education & Background</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree Program</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Specialization</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Years)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
              <input
                type="number"
                defaultValue={candidateProfile.graduationYear || 2024}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Career Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Career Preferences</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Roles (comma separated)
              </label>
              <input
                type="text"
                value={preferredRolesText}
                onChange={(e) => setPreferredRolesText(e.target.value)}
                placeholder="e.g. Data Analyst, Business Analyst, Python Developer"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Locations (comma separated)
              </label>
              <input
                type="text"
                value={preferredLocationText}
                onChange={(e) => setPreferredLocationText(e.target.value)}
                placeholder="e.g. Hyderabad, Bengaluru, Pune, Remote"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Skills Inventory & Management */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Skills Inventory</h2>
            </div>
            <span className="text-xs text-slate-500">
              {candidateProfile.skills?.length || 0} Registered Competencies
            </span>
          </div>

          {/* Current Skills List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(candidateProfile.skills || []).map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                    {skill.verified ? (
                      <CheckCircle2 className="w-3 h-3 text-blue-600" title="Verified Assessment" />
                    ) : (
                      <span className="text-[9px] text-amber-700 bg-amber-50 px-1 py-0.2 rounded">
                        Self-reported
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize">
                    {skill.category} • {skill.currentLevel}%
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Skill Row */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Skill name (e.g. AWS, Django)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 min-w-[150px] px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            >
              <option value="technical">Technical</option>
              <option value="tool">Tool / Software</option>
              <option value="soft">Soft Skill</option>
            </select>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">Level:</span>
              <input
                type="number"
                min="10"
                max="100"
                step="5"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className="w-16 px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white"
              />
              <span className="text-[11px] text-slate-500">%</span>
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Certifications & Projects */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900">Certifications & Accreditations</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Certifications List (One per line)
            </label>
            <textarea
              rows={3}
              value={certificationsText}
              onChange={(e) => setCertificationsText(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            id="save-profile-btn"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Recalculate Profile Completeness</span>
          </button>
        </div>
      </form>
    </div>
  );
};
