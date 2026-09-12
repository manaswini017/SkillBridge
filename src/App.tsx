import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AuthModal } from './components/auth/AuthModal';

// Public Views
import { LandingPage } from './components/public/LandingPage';
import { HowItWorks } from './components/public/HowItWorks';

// Candidate Views
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { ProfileView } from './components/candidate/ProfileView';
import { SkillAssessmentView } from './components/candidate/SkillAssessmentView';
import { SkillGapAnalysisView } from './components/candidate/SkillGapAnalysisView';
import { JobMatchingView } from './components/candidate/JobMatchingView';
import { LearningRoadmapView } from './components/candidate/LearningRoadmapView';
import { AICareerAssistantView } from './components/candidate/AICareerAssistantView';
import { ResumeAnalysisView } from './components/candidate/ResumeAnalysisView';
import { InterviewPrepView } from './components/candidate/InterviewPrepView';
import { ProgressTrackingView } from './components/candidate/ProgressTrackingView';

// Institution Views
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { TrainingImpactView } from './components/institution/TrainingImpactView';

// Admin / Government Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RegionalHeatmapView } from './components/admin/RegionalHeatmapView';

const AppContent: React.FC = () => {
  const { userRole, activeTab, isAuthModalOpen } = useApp();

  const renderActiveView = () => {
    // Public landing pages
    if (activeTab === 'landing') {
      return <LandingPage />;
    }
    if (activeTab === 'how-it-works') {
      return <HowItWorks />;
    }

    // Candidate views
    switch (activeTab) {
      case 'dashboard':
      case 'candidate-dashboard':
        return <CandidateDashboard />;
      case 'profile':
        return <ProfileView />;
      case 'assessment':
        return <SkillAssessmentView />;
      case 'skill-gap':
        return <SkillGapAnalysisView />;
      case 'jobs':
        return <JobMatchingView />;
      case 'roadmap':
        return <LearningRoadmapView />;
      case 'ai-assistant':
        return <AICareerAssistantView />;
      case 'resume':
        return <ResumeAnalysisView />;
      case 'interview':
        return <InterviewPrepView />;
      case 'progress':
        return <ProgressTrackingView />;

      // Institution views
      case 'institution-dashboard':
      case 'institution-students':
      case 'institution-batches':
      case 'institution-curriculum':
        return <InstitutionDashboard />;
      case 'training-impact':
      case 'institution-effectiveness':
      case 'institution-gaps':
        return <TrainingImpactView />;

      // Admin / Government views
      case 'admin-overview':
      case 'admin-dashboard':
      case 'admin-analytics':
      case 'national-metrics':
      case 'policy-recommendations':
      case 'admin-demand':
      case 'admin-insights':
      case 'admin-reports':
        return <AdminDashboard />;
      case 'admin-heatmap':
      case 'regional-heatmap':
        return <RegionalHeatmapView />;

      default:
        if (userRole === 'institution') return <InstitutionDashboard />;
        if (userRole === 'admin') return <AdminDashboard />;
        return <CandidateDashboard />;
    }
  };

  const isPublicStandalone = userRole === 'public' && (activeTab === 'landing' || activeTab === 'how-it-works');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      {isPublicStandalone ? (
        <main className="flex-1 w-full">
          {renderActiveView()}
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl overflow-y-auto">
            {renderActiveView()}
          </main>
        </div>
      )}

      {/* Global Modals */}
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
