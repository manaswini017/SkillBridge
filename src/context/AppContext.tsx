import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  AssessmentResult,
  LearningRoadmap,
  InterviewEvaluation,
  InstitutionMetrics,
  AdminNationalMetrics,
} from '../types';
import {
  mockInitialCandidate,
  mockDefaultRoadmap,
  mockInstitutionMetrics,
  mockAdminNationalMetrics,
} from '../data/mockData';

interface AppContextType {
  userRole: UserRole | 'public';
  setUserRole: (role: UserRole | 'public') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  candidateProfile: UserProfile;
  setCandidateProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateCandidateField: (field: keyof UserProfile, value: any) => void;
  updateCandidateSkill: (skillName: string, newLevel: number) => void;
  currentRoadmap: LearningRoadmap;
  toggleRoadmapTopic: (phaseNumber: number, topicId: string) => void;
  latestAssessment: AssessmentResult | null;
  submitAssessment: (result: AssessmentResult) => void;
  interviewEvaluations: Record<string, InterviewEvaluation>;
  saveInterviewEvaluation: (questionId: string, evaluation: InterviewEvaluation) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  loginAs: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  institutionMetrics: InstitutionMetrics;
  setInstitutionMetrics: React.Dispatch<React.SetStateAction<InstitutionMetrics>>;
  adminMetrics: AdminNationalMetrics;
  setAdminMetrics: React.Dispatch<React.SetStateAction<AdminNationalMetrics>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | 'public'>('candidate');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [candidateProfile, setCandidateProfile] = useState<UserProfile>(mockInitialCandidate);
  const [currentRoadmap, setCurrentRoadmap] = useState<LearningRoadmap>(mockDefaultRoadmap);
  const [latestAssessment, setLatestAssessment] = useState<AssessmentResult | null>(null);
  const [interviewEvaluations, setInterviewEvaluations] = useState<Record<string, InterviewEvaluation>>({});
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [institutionMetrics, setInstitutionMetrics] = useState<InstitutionMetrics>(mockInstitutionMetrics);
  const [adminMetrics, setAdminMetrics] = useState<AdminNationalMetrics>(mockAdminNationalMetrics);

  // Sync default tab when userRole switches
  useEffect(() => {
    if (userRole === 'public') {
      setActiveTab('landing');
    } else if (userRole === 'candidate') {
      if (activeTab.startsWith('institution') || activeTab.startsWith('admin') || activeTab === 'landing' || activeTab === 'about') {
        setActiveTab('dashboard');
      }
    } else if (userRole === 'institution') {
      if (!activeTab.startsWith('institution')) {
        setActiveTab('institution-dashboard');
      }
    } else if (userRole === 'admin') {
      if (!activeTab.startsWith('admin')) {
        setActiveTab('admin-overview');
      }
    }
  }, [userRole]);

  const updateCandidateField = (field: keyof UserProfile, value: any) => {
    setCandidateProfile((prev) => {
      const updated = { ...prev, [field]: value };
      // recalculate completeness
      let filledCount = 0;
      const trackedFields: (keyof UserProfile)[] = [
        'education',
        'degree',
        'branch',
        'college',
        'experienceYears',
        'preferredRoles',
        'preferredLocation',
        'skills',
        'certifications',
        'projects',
      ];
      trackedFields.forEach((f) => {
        const val = updated[f];
        if (Array.isArray(val) ? val.length > 0 : Boolean(val)) {
          filledCount++;
        }
      });
      const completeness = Math.min(100, Math.round((filledCount / trackedFields.length) * 100));
      return { ...updated, completeness };
    });
  };

  const updateCandidateSkill = (skillName: string, newLevel: number) => {
    setCandidateProfile((prev) => {
      const skills = prev.skills ? [...prev.skills] : [];
      const idx = skills.findIndex((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (idx >= 0) {
        skills[idx] = {
          ...skills[idx],
          previousLevel: skills[idx].currentLevel,
          currentLevel: newLevel,
          lastAssessed: new Date().toISOString().split('T')[0],
          verified: true,
        };
      } else {
        skills.push({
          name: skillName,
          category: 'technical',
          currentLevel: newLevel,
          previousLevel: 0,
          lastAssessed: new Date().toISOString().split('T')[0],
          verified: true,
        });
      }

      // Recalculate average technical score & employment readiness
      const avgTech = Math.round(
        skills.reduce((acc, curr) => acc + curr.currentLevel, 0) / (skills.length || 1)
      );
      const newReadiness = Math.min(
        99,
        Math.round(
          avgTech * 0.4 +
            (prev.readinessBreakdown?.softSkills || 70) * 0.2 +
            (prev.readinessBreakdown?.projects || 75) * 0.2 +
            (prev.readinessBreakdown?.certifications || 80) * 0.2
        )
      );

      return {
        ...prev,
        skills,
        employmentReadinessScore: newReadiness,
        readinessBreakdown: {
          ...(prev.readinessBreakdown || {
            technicalSkills: 82,
            softSkills: 70,
            projects: 75,
            certifications: 80,
            jobMatch: 84,
          }),
          technicalSkills: avgTech,
        },
      };
    });
  };

  const toggleRoadmapTopic = (phaseNumber: number, topicId: string) => {
    setCurrentRoadmap((prev) => {
      const updatedPhases = prev.phases.map((phase) => {
        if (phase.phaseNumber !== phaseNumber) return phase;
        const updatedTopics = phase.topics.map((t) => {
          if (t.id === topicId) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });
        const allCompleted = updatedTopics.every((t) => t.completed);
        return {
          ...phase,
          topics: updatedTopics,
          completed: allCompleted,
        };
      });

      // Calculate overall progress
      let totalTopics = 0;
      let completedTopics = 0;
      updatedPhases.forEach((p) => {
        p.topics.forEach((t) => {
          totalTopics++;
          if (t.completed) completedTopics++;
        });
      });

      const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

      return {
        ...prev,
        phases: updatedPhases,
        overallProgress,
      };
    });
  };

  const submitAssessment = (result: AssessmentResult) => {
    setLatestAssessment(result);
    // automatically elevate the skill level based on the assessment!
    updateCandidateSkill(result.skill, result.score);
  };

  const saveInterviewEvaluation = (questionId: string, evaluation: InterviewEvaluation) => {
    setInterviewEvaluations((prev) => ({
      ...prev,
      [questionId]: evaluation,
    }));
  };

  const loginAs = (role: UserRole, name?: string, email?: string) => {
    setUserRole(role);
    if (role === 'candidate') {
      setCandidateProfile((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        role: 'candidate',
      }));
      setActiveTab('dashboard');
    } else if (role === 'institution') {
      setActiveTab('institution-dashboard');
    } else if (role === 'admin') {
      setActiveTab('admin-overview');
    }
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUserRole('public');
    setActiveTab('landing');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        candidateProfile,
        setCandidateProfile,
        updateCandidateField,
        updateCandidateSkill,
        currentRoadmap,
        toggleRoadmapTopic,
        latestAssessment,
        submitAssessment,
        interviewEvaluations,
        saveInterviewEvaluation,
        authModalOpen,
        setAuthModalOpen,
        isAuthModalOpen: authModalOpen,
        setIsAuthModalOpen: setAuthModalOpen,
        authMode,
        setAuthMode,
        loginAs,
        logout,
        institutionMetrics,
        setInstitutionMetrics,
        adminMetrics,
        setAdminMetrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
