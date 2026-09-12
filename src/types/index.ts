export type UserRole = 'candidate' | 'institution' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  institutionName?: string;
  department?: string;
  // Candidate specifics
  education?: string;
  degree?: string;
  branch?: string;
  college?: string;
  graduationYear?: number;
  experienceYears?: number;
  preferredRoles?: string[];
  preferredLocation?: string[];
  completeness?: number;
  employmentReadinessScore?: number;
  readinessBreakdown?: {
    technicalSkills: number;
    softSkills: number;
    projects: number;
    certifications: number;
    jobMatch: number;
  };
  skills?: CandidateSkill[];
  certifications?: string[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
}

export interface CandidateSkill {
  name: string;
  category: 'technical' | 'soft' | 'tool';
  currentLevel: number; // 0-100
  previousLevel?: number; // for progress tracking
  lastAssessed?: string;
  verified: boolean;
}

export interface AssessmentQuestion {
  id: string;
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface AssessmentResult {
  skill: string;
  score: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  totalQuestions: number;
  correctAnswers: number;
  strengths: string[];
  improvementAreas: string[];
  timestamp: string;
}

export interface SkillGapItem {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  status: 'Strong' | 'Low Gap' | 'Medium Gap' | 'High Gap';
  priority: 'high' | 'medium' | 'low';
}

export interface SkillGapAnalysisResult {
  targetRole: string;
  overallMatch: number;
  items: SkillGapItem[];
  aiExplanation: string;
  recommendedAction: string;
}

export interface JobRoleMatch {
  id: string;
  title: string;
  matchPercentage: number;
  salaryRange: string;
  demandLevel: 'High' | 'Very High' | 'Moderate';
  experienceRequired: string;
  location: string;
  requiredSkills: string[];
  candidateStrengths: string[];
  missingSkills: string[];
  whyMatchReason: string;
  companyCount: number;
  openings: number;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  skill: string;
  duration: string;
  description: string;
  topics: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  completed: boolean;
}

export interface LearningRoadmap {
  id: string;
  targetRole: string;
  totalDuration: string;
  estimatedHours: number;
  phases: RoadmapPhase[];
  overallProgress: number;
}

export interface ResumeAnalysisResult {
  score: number;
  detectedSkills: string[];
  strengths: string[];
  missingSkills: string[];
  formatScore: number;
  impactScore: number;
  aiSuggestions: {
    type: 'critical' | 'improvement' | 'positive';
    category: string;
    message: string;
  }[];
  targetRoleMatch?: {
    role: string;
    matchScore: number;
  };
}

export interface InterviewQuestionItem {
  id: string;
  category: 'Technical' | 'HR' | 'Behavioral' | 'Scenario';
  role: string;
  question: string;
  idealKeyPoints: string[];
  difficulty: string;
}

export interface InterviewEvaluation {
  technicalAccuracy: number; // 0-100
  clarity: number; // 0-100
  completeness: number; // 0-100
  overallScore: number;
  suggestedImprovement: string;
  sampleBetterAnswer: string;
  strengthsIdentified: string[];
}

export interface InstitutionBatch {
  id: string;
  name: string;
  enrolledStudents: number;
  completionRate: number;
  averageScore: number;
  placementRate: number;
}

export interface InstitutionMetrics {
  name: string;
  totalStudents: number;
  preTrainingScore: number;
  postTrainingScore: number;
  averageImprovement: number;
  placementRate: number;
  batches: InstitutionBatch[];
  topPerformingSkills: string[];
  lowPerformingSkills: string[];
  totalEnrolled?: number;
  completedTraining?: number;
  employmentRate?: number;
  employedCount?: number;
  commonSkillGaps?: { skill: string; gapPercentage: number; cohortAffected: number }[];
  cohorts?: any[];
  pipelineData?: any[];
  aiInsight?: string;
}

export interface RegionalHeatmapItem {
  state: string;
  topDemandSkill: string;
  gapLevel: 'High' | 'Medium' | 'Moderate';
  candidatesCount: number;
  placementRate: number;
}

export interface RegionalSkillHeatmapItem {
  state: string;
  zone: string;
  python: number;
  sql: number;
  cloud: number;
  aiMl: number;
  cybersecurity: number;
  dataAnalytics: number;
  averageReadiness: number;
  activeCandidates: number;
  trainingCenters: number;
}

export interface PolicyRecommendationItem {
  id: string;
  targetState: string;
  impactPriority: 'High' | 'Medium' | 'Normal';
  title: string;
  description: string;
  projectedImpact: string;
}

export interface AdminNationalMetrics {
  totalCandidates: number;
  totalInstitutions: number;
  averageReadiness: number;
  placementRate: number;
  criticalSkillGaps: string[];
  regionalHeatmap: RegionalHeatmapItem[];
  policyRecommendations: PolicyRecommendationItem[];
  candidatesTrained?: number;
  trainingCompletionRate?: number;
  employmentRate?: number;
  averageSkillImprovement?: number;
  activeTrainingPrograms?: number;
  annualBudgetUtilized?: number;
  employmentFunnel?: any[];
  regionalDemands?: any[];
  topTrainingPrograms?: any[];
}

export interface GeneratedReport {
  id: string;
  title: string;
  generatedDate: string;
  reportingPeriod: string;
  executiveSummary: string;
  keyMetrics: { label: string; value: string; trend: string }[];
  criticalSkillGaps: { skill: string; gap: number; severity: string }[];
  regionalBreakdown: { region: string; candidates: number; employmentRate: string }[];
  aiPolicyRecommendations: string[];
}
