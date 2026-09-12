import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { generateCareerAdvice } from '../../services/aiService';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AICareerAssistantView: React.FC = () => {
  const { candidateProfile } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: `Hello ${candidateProfile.name}! I am your AI Career Assistant. I have loaded your current verified profile (Readiness: ${candidateProfile.employmentReadinessScore}/100, Python: 75%, SQL: 40%, Excel: 80%). How can I assist your career progression today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What skills should I learn to become a Data Analyst?',
    'Why is my SQL skill gap high?',
    'Which job roles are best for my current skills?',
    'Create a 3-month learning plan for me.',
    'How can I improve my employment readiness?',
    'What should I learn next?',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const reply = await generateCareerAdvice(candidateProfile, messageContent, history);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'assistant',
        text: `Chat session refreshed. I am analyzing your live profile for ${candidateProfile.name}. Ask me any question about your target roles or skill deficits!`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold">
            <Bot className="w-4 h-4" />
            <span>LLM-Powered Career Advisor</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            AI Career Assistant
          </h1>
          <p className="text-xs text-slate-500">
            Get personalized career guidance based on your skills, goals, assessments, and progress.
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="self-start sm:self-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Suggested Inquiries
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-700 text-xs font-medium transition shadow-2xs text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isAI ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAI
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isAI
                        ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {/* Render message with line breaks and basic formatting */}
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">AI Advisor is analyzing your competency profile...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about skill gaps, learning plans, or interview strategy..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
