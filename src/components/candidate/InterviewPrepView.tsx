import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockInterviewQuestions } from '../../data/mockData';
import { generateInterviewFeedback } from '../../services/aiService';
import { InterviewEvaluation } from '../../types';
import {
  MessagesSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  const { interviewEvaluations, saveInterviewEvaluation } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<'Technical' | 'HR' | 'Behavioral' | 'Scenario'>('Technical');
  const [selectedRole, setSelectedRole] = useState('Data Analyst');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<InterviewEvaluation | null>(null);

  const categories: ('Technical' | 'HR' | 'Behavioral' | 'Scenario')[] = [
    'Technical',
    'Scenario',
    'Behavioral',
    'HR',
  ];

  const filteredQuestions = mockInterviewQuestions.filter(
    (q) => q.category === selectedCategory
  );

  const activeQuestion = filteredQuestions[currentQuestionIndex] || mockInterviewQuestions[0];

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const evaluation = await generateInterviewFeedback(
        activeQuestion.question,
        userAnswer,
        selectedRole
      );
      setCurrentEvaluation(evaluation);
      saveInterviewEvaluation(activeQuestion.id, evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
    setUserAnswer('');
    setCurrentEvaluation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
            <MessagesSquare className="w-4 h-4" />
            <span>AI Simulation & Evaluation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            AI Interview Preparation
          </h1>
          <p className="text-xs text-slate-500">
            Practice role-specific interview prompts with real-time AI scoring on accuracy, clarity, and depth.
          </p>
        </div>

        {/* Role & Category Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
          >
            <option value="Data Analyst">Role: Data Analyst</option>
            <option value="Business Analyst">Role: Business Analyst</option>
            <option value="Python Developer">Role: Python Developer</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentQuestionIndex(0);
              setUserAnswer('');
              setCurrentEvaluation(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat} Questions
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
              {activeQuestion.category}
            </span>
            <span className="text-xs text-slate-400">
              Difficulty: <strong className="text-slate-700">{activeQuestion.difficulty}</strong>
            </span>
          </div>
          <button
            onClick={handleNextQuestion}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Skip to Next →
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 leading-relaxed">
            “{activeQuestion.question}”
          </h2>
        </div>

        {/* User Answer Text Area */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Your Response (Type your spoken or written interview answer below):
          </label>
          <textarea
            rows={5}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="e.g. An INNER JOIN only returns rows where the join predicate matches in both tables, whereas a LEFT JOIN retains all records from the left table..."
            className="w-full p-3.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleEvaluate}
            disabled={!userAnswer.trim() || isEvaluating}
            id="evaluate-interview-answer-btn"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEvaluating ? 'Evaluating Response...' : 'Submit & Evaluate Answer'}</span>
          </button>
        </div>
      </div>

      {/* Evaluation Results Card */}
      {currentEvaluation && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                AI Evaluation Report
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Performance Assessment
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-indigo-600">
                {currentEvaluation.overallScore}%
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">Overall Rating</div>
            </div>
          </div>

          {/* 3 Metric Score Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Technical Accuracy</span>
                <span className="text-blue-600 font-bold">{currentEvaluation.technicalAccuracy}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${currentEvaluation.technicalAccuracy}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Clarity & Articulation</span>
                <span className="text-indigo-600 font-bold">{currentEvaluation.clarity}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${currentEvaluation.clarity}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Completeness</span>
                <span className="text-emerald-600 font-bold">{currentEvaluation.completeness}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${currentEvaluation.completeness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Suggested Improvement */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-xs space-y-1">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Suggested Improvement:</span>
            </span>
            <p className="text-slate-700 leading-relaxed pl-5">
              {currentEvaluation.suggestedImprovement}
            </p>
          </div>

          {/* Better Sample Answer */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 text-xs space-y-1">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Model Sample Answer (Interview Gold Standard):</span>
            </span>
            <p className="text-slate-800 leading-relaxed pl-5 font-mono text-[11px] mt-1">
              "{currentEvaluation.sampleBetterAnswer}"
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <span>Try Another Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
