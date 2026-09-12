import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { assessmentQuestionsData } from '../../data/mockData';
import { AssessmentResult } from '../../types';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const SkillAssessmentView: React.FC = () => {
  const { submitAssessment, setActiveTab } = useApp();

  const skillsList = [
    'SQL',
    'Python',
    'Power BI',
    'Data Analytics',
    'Communication',
  ];

  const [selectedSkill, setSelectedSkill] = useState<string>('SQL');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions = assessmentQuestionsData[selectedSkill] || assessmentQuestionsData['SQL'];

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    let level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = 'Beginner';
    if (score >= 85) level = 'Expert';
    else if (score >= 70) level = 'Advanced';
    else if (score >= 50) level = 'Intermediate';

    let strengths: string[] = [];
    let improvements: string[] = [];

    if (selectedSkill === 'SQL') {
      if (score >= 60) {
        strengths = ['Relational data modeling', 'Basic filtering with WHERE'];
      } else {
        strengths = ['Basic syntax recognition'];
      }
      improvements = ['Window functions (ROW_NUMBER, RANK)', 'HAVING aggregate filter constraints', 'Complex LEFT JOIN edge cases'];
    } else if (selectedSkill === 'Python') {
      strengths = ['Data structures (lists vs tuples)', 'Vectorized filtering in Pandas'];
      improvements = ['Memory garbage collection mechanisms', 'Complex list comprehension optimization'];
    } else {
      strengths = ['Core conceptual principles', 'Business problem breakdown'];
      improvements = ['Advanced edge cases & executive synthesis'];
    }

    const assessmentRes: AssessmentResult = {
      skill: selectedSkill,
      score,
      level,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      strengths,
      improvementAreas: improvements,
      timestamp: new Date().toISOString(),
    };

    setResult(assessmentRes);
    setIsSubmitted(true);
    submitAssessment(assessmentRes);
  };

  const handleResetQuiz = (newSkill?: string) => {
    if (newSkill) setSelectedSkill(newSkill);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Interactive Assessment Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Skill Assessment
          </h1>
          <p className="text-xs text-slate-500">
            Validate technical & soft competencies with standardized MCQ challenges to benchmark readiness.
          </p>
        </div>

        {/* Skill Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {skillsList.map((skill) => (
            <button
              key={skill}
              onClick={() => handleResetQuiz(skill)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedSkill === skill
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {!isSubmitted ? (
        /* Quiz Active State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          {/* Quiz Top Progress */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                {selectedSkill} Competency Test
              </span>
              <h2 className="text-sm font-bold text-slate-900">
                Question {currentQuestionIdx + 1} of {questions.length}
              </h2>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {Object.keys(selectedAnswers).length} answered
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">
                {questions[currentQuestionIdx].difficulty}
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-2">
                {questions[currentQuestionIdx].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {questions[currentQuestionIdx].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx((p) => Math.min(questions.length - 1, p + 1))}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  id="submit-assessment-btn"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Submit Assessment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Assessment Complete
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {selectedSkill} Benchmark Evaluation
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-blue-600">
                  {result?.score}%
                </div>
                <div className="text-[11px] font-semibold text-slate-400">
                  Assessment Score
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-bold text-xs">
                Level: {result?.level}
              </div>
            </div>
          </div>

          {/* Score details card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs text-slate-500 font-medium">Correct Answers</span>
              <div className="text-xl font-bold text-slate-900 mt-1">
                {result?.correctAnswers} / {result?.totalQuestions}
              </div>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
              <span className="text-xs text-emerald-700 font-medium">Competency Level</span>
              <div className="text-xl font-bold text-emerald-800 mt-1">
                {result?.level}
              </div>
            </div>
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
              <span className="text-xs text-blue-700 font-medium">Profile Sync</span>
              <div className="text-xl font-bold text-blue-800 mt-1">
                Verified in Profile
              </div>
            </div>
          </div>

          {/* Strengths & Improvement Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Areas of Strength</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {result?.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Areas */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
              <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Areas Requiring Improvement</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {result?.improvementAreas.map((imp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question Review Accordion */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Answer Key & Explanations
            </h3>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border text-xs ${
                      isCorrect ? 'bg-slate-50 border-slate-200' : 'bg-red-50/30 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-900">
                        {idx + 1}. {q.question}
                      </div>
                      {isCorrect ? (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-red-600 flex items-center gap-1 shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Correct Answer:</span>{' '}
                      {q.options[q.correctIndex]}
                    </div>
                    <div className="mt-1 text-[11px] text-blue-700 bg-blue-50/60 p-2 rounded-lg">
                      💡 {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleResetQuiz()}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={() => setActiveTab('skill-gap')}
              id="analyze-skill-gap-cta-btn"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Analyze My Skill Gap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
