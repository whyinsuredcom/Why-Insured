import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend,
  FiX,
  FiRotateCcw,
  FiArrowRight,
  FiCheck,
  FiShield,
  FiSearch
} from 'react-icons/fi';
import aiAvatarImg from '../assets/ai_advisor_avatar.jpg';
import { sendUserRequirementToAi, clientFallbackMatcher } from '../services/aiChatService';
import { FEATURE_FLAGS } from '../config/features';

// Global event dispatchers to control AI Chat from anywhere
export const openAiChat = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('whyinsured-open-chat'));
  }
};

export const closeAiChat = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('whyinsured-close-chat'));
  }
};

export const toggleAiChat = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('whyinsured-toggle-chat'));
  }
};

export default function AiChatAssistant({
  inline = false,
  initialQuery = '',
  onBackToSearch = null
} = {}) {
  const location = useLocation();
  const planMatch = location.pathname.match(/\/insurance\/[^/]+\/([^/]+)/);
  const currentPlan = planMatch ? planMatch[1] : null;

  const [isOpen, setIsOpen] = useState(inline ? true : false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(inline ? true : false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-initial',
      sender: 'ai',
      text: "Hi! 👋 I’m your WHYINSURED Advisor. Think of me as your insurance friend — you can ask me anything about health insurance, and I’ll help you understand what’s right for you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendations: []
    }
  ]);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const initialSentRef = useRef(false);

  // Auto-send initial requirement query when activated from search bar
  useEffect(() => {
    if (inline && initialQuery && !initialSentRef.current) {
      initialSentRef.current = true;
      handleSendMessage(initialQuery);
    }
  }, [inline, initialQuery]);

  // Auto-scroll inside chat messages container without scrolling the browser window/viewport
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll and restore focus whenever chat state updates
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, isTyping]);

  // Listen for global open/close/toggle events from search bar or other components
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setHasOpenedBefore(true);
    };

    const handleCloseChat = () => {
      setIsOpen(false);
    };

    const handleToggleChat = () => {
      setIsOpen(prev => {
        const next = !prev;
        if (next) setHasOpenedBefore(true);
        return next;
      });
    };

    window.addEventListener('whyinsured-open-chat', handleOpenChat);
    window.addEventListener('whyinsured-close-chat', handleCloseChat);
    window.addEventListener('whyinsured-toggle-chat', handleToggleChat);

    return () => {
      window.removeEventListener('whyinsured-open-chat', handleOpenChat);
      window.removeEventListener('whyinsured-close-chat', handleCloseChat);
      window.removeEventListener('whyinsured-toggle-chat', handleToggleChat);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => {
      const next = !prev;
      if (next && !hasOpenedBefore) {
        setHasOpenedBefore(true);
      }
      return next;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: "Hi! 👋 I’m your WHYINSURED Advisor. Think of me as your insurance friend — you can ask me anything about health insurance, and I’ll help you understand what’s right for you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: []
      }
    ]);
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 50);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    setInputValue('');

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Fetch AI response from backend
      const response = await sendUserRequirementToAi(query, messages, currentPlan);

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        recommendations: response.recommendations || [],
        suggestions: response.suggestions || [],
        disclaimer: response.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.warn('[AI Chat] Backend query failed, using grounded fallback matcher:', error);
      const fallback = clientFallbackMatcher(query, currentPlan);
      const aiResponse = {
        id: `ai-fb-${Date.now()}`,
        sender: 'ai',
        text: fallback.text,
        recommendations: fallback.recommendations || [],
        suggestions: fallback.suggestions || [],
        disclaimer: fallback.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render chat modal content
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="whyinsured-chat-panel"
          initial={{ opacity: 0, y: inline ? 10 : 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: inline ? 10 : 25, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={
            inline
              ? "w-full h-[540px] max-h-[75vh] bg-[#F8FAFC] rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden flex flex-col font-sans relative z-30"
              : "fixed z-[99] right-3 sm:right-6 bottom-20 sm:bottom-24 w-[calc(100vw-24px)] sm:w-[410px] h-[580px] max-h-[82vh] bg-[#F8FAFC] rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col font-sans pointer-events-auto select-auto"
          }
        >
          {/* Top Soft Green Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none bg-[#00A86B]" />

          {/* =================================================================== */}
          {/* CHAT HEADER (#00A86B Accents + WHYINSURED Clean Style)             */}
          {/* =================================================================== */}
          <div className="relative bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-200/80 z-10 shrink-0 shadow-xs pointer-events-auto">
            <div className="flex items-center justify-between gap-3">
              {/* AI Avatar & Title */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#00A86B]/40 shrink-0 shadow-xs">
                  <img
                    src={aiAvatarImg}
                    alt="AI Advisor"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00A86B] rounded-full border border-white" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-[#0F172A] tracking-tight font-display leading-tight">
                      WHYINSURED Advisor
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#00A86B] border border-[#00A86B]/25">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 truncate leading-tight mt-0.5">
                    Personalized health insurance recommendations & guidance
                  </p>
                </div>
              </div>

              {/* Header Actions: Reset & (Back to Search or Close) */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-[#00A86B] hover:bg-[#ECFDF5] flex items-center justify-center text-sm transition-colors cursor-pointer"
                  title="Restart conversation"
                  aria-label="Restart conversation"
                >
                  <FiRotateCcw className="text-xs pointer-events-none" />
                </button>
                {inline && onBackToSearch ? (
                  <button
                    type="button"
                    onClick={onBackToSearch}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                    title="Back to search plans"
                    aria-label="Back to Website Search"
                  >
                    <FiSearch className="text-xs text-emerald-600" />
                    <span>Back to Search</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#00A86B] text-slate-500 hover:text-white flex items-center justify-center text-base transition-colors cursor-pointer"
                    title="Close Chat"
                    aria-label="Close Chat"
                  >
                    <FiX className="pointer-events-none" />
                  </button>
                )}
              </div>
            </div>

            {/* Green Signature Underline Pill */}
            <div className="w-10 h-0.5 bg-[#00A86B] rounded-full mt-2.5" />
          </div>

          {/* =================================================================== */}
          {/* CHAT MESSAGES CONTAINER                                            */}
          {/* =================================================================== */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs relative z-10 scrollbar-thin pointer-events-auto select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0F172A] text-white rounded-br-xs border border-slate-800'
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80 shadow-xs'
                  }`}
                >
                  {/* Message Text with bold/formatting support */}
                  <div className="font-normal text-[12px] sm:text-[12.5px] space-y-1 select-text">
                    {msg.text.split('\n').map((paragraph, pIdx) => {
                      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={pIdx}>
                          {parts.map((part, partIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={partIdx} className={msg.sender === 'user' ? 'text-white font-extrabold' : 'text-[#0F172A] font-extrabold'}>
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  <div
                    className={`text-[9px] mt-1.5 text-right font-medium ${
                      msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Policy Recommendation Cards */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2.5 pointer-events-auto select-auto">
                    <div className="flex items-center gap-1.5 px-1 text-[11px] font-black uppercase tracking-wider text-slate-600 font-display">
                      <FiShield className="text-[#00A86B]" />
                      <span>Recommended Policy Matches</span>
                    </div>

                    {msg.recommendations.map((policy) => (
                      <div
                        key={policy.planId}
                        className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#00A86B]/50 p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                      >
                        {/* Top Accent Indicator */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00A86B] via-[#0fa26e] to-transparent pointer-events-none" />

                        {/* Card Top: Logo & Title */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={policy.logo}
                              alt={policy.companyName}
                              className="w-10 h-7 object-contain rounded bg-slate-50 p-0.5 border border-slate-100 pointer-events-none"
                            />
                            <div>
                              <h4 className="text-xs sm:text-sm font-black text-[#0F172A] font-display leading-tight group-hover:text-[#00A86B] transition-colors">
                                {policy.name}
                              </h4>
                              <span className="text-[10px] font-semibold text-slate-500">
                                {policy.companyName}
                              </span>
                            </div>
                          </div>

                          {/* Badge */}
                          <span className="text-[8px] sm:text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#00A86B] border border-[#00A86B]/25 tracking-wide shrink-0">
                            {policy.badge}
                          </span>
                        </div>

                        {/* Coverage range & Match Score */}
                        <div className="mb-2 px-2 py-1 bg-slate-50 rounded-lg flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slate-700">
                          <span>Sum Insured: <strong className="text-[#0F172A]">{policy.coverage}</strong></span>
                          {policy.matchScore && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#00A86B] border border-[#00A86B]/30">
                              {policy.matchScore}% Match
                            </span>
                          )}
                        </div>

                        {/* Match Reason */}
                        {policy.reason && (
                          <p className="text-[10px] text-slate-500 font-medium leading-tight mb-2 italic">
                            "{policy.reason}"
                          </p>
                        )}

                        {/* Key Highlights Checklist */}
                        <ul className="space-y-1 mb-3 text-[10.5px] text-slate-600">
                          {policy.highlights.slice(0, 3).map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-1.5">
                              <FiCheck className="text-[#00A86B] font-bold shrink-0 mt-0.5 text-xs" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Action Button: View Details */}
                        <Link
                          to={policy.link}
                          onClick={handleClose}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#00A86B] to-[#0fa26e] hover:from-[#0fa26e] hover:to-[#059669] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-2xs hover:shadow-sm hover:scale-[1.01] transition-all cursor-pointer select-none active:scale-[0.98]"
                        >
                          <span>View Plan Details</span>
                          <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    ))}

                    {/* Grounded Policy Disclaimer */}
                    {msg.disclaimer && (
                      <p className="text-[9.5px] text-slate-400 text-center px-1 pt-1 leading-tight select-text">
                        *{msg.disclaimer}
                      </p>
                    )}
                  </div>
                )}

              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="bg-white rounded-2xl rounded-bl-xs px-4 py-3 border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] font-bold text-slate-400 ml-1">Analyzing policies...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* =================================================================== */}
          {/* CHAT INPUT FORM (#00A86B Focus & Send Button)                     */}
          {/* =================================================================== */}
          <div
            className="p-3 bg-white border-t border-slate-200/80 shrink-0 relative z-10 pointer-events-auto"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isTyping ? "Advisor is thinking..." : "Tell me what you need (e.g. 15L cover for parents)..."}
                  disabled={isTyping}
                  className="w-full pl-3.5 pr-3 py-2.5 text-xs sm:text-[12.5px] rounded-xl bg-slate-50 border border-slate-200/90 focus:outline-hidden focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]/40 text-slate-800 placeholder-slate-400 transition-all font-medium disabled:opacity-60 cursor-text pointer-events-auto select-text"
                />
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-gradient-to-r from-[#00A86B] to-[#0fa26e] hover:from-[#0fa26e] hover:to-[#059669] text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-auto'
                }`}
                aria-label="Send requirement"
              >
                <FiSend className="text-xs sm:text-sm pointer-events-none" />
              </button>
            </form>

            <div className="flex items-center justify-between px-1 mt-1.5 text-[9px] text-slate-400 select-none pointer-events-none">
              <span>⚡ Instant Policy Recommendations</span>
              <span>Powered by WHYINSURED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // If rendered inline (inside the homepage search bar container)
  if (inline) {
    return modalContent;
  }

  // If floating AI Chat widget is disabled via central FEATURE_FLAGS, do not render floating button or portal
  if (!FEATURE_FLAGS.AI_CHAT_WIDGET) {
    return null;
  }

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING AI BUTTON (Only shown on non-home pages; on homepage it is     */}
      {/*    integrated inside the search bar)                                      */}
      {/* ========================================================================= */}
      {!isHomePage && (
        <motion.button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? 'Close AI Assistant' : 'Chat with WHYINSURED'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pointer-events-auto group relative flex items-center gap-2.5 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white pl-1.5 pr-4 py-1.5 sm:py-2 rounded-full shadow-xl border border-slate-700/70 hover:border-[#00A86B]/90 transition-all duration-300 cursor-pointer select-none"
        >
          {/* Subtle Ambient Glow Ring */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#00A86B]/40 to-[#0fa26e]/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Circular AI Advisor Avatar */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#00A86B] via-[#0fa26e] to-[#0F172A] shrink-0 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-white/90 flex items-center justify-center">
              {isOpen ? (
                <div className="w-full h-full bg-[#00A86B] text-white flex items-center justify-center">
                  <FiX className="text-sm transition-transform duration-200 group-hover:rotate-90" />
                </div>
              ) : (
                <img
                  src={aiAvatarImg}
                  alt="WHYINSURED AI Health Advisor"
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            
            {/* Online Status Indicator */}
            {!isOpen && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00A86B] border-2 border-white rounded-full">
                <span className="absolute inset-0 rounded-full bg-[#00A86B] animate-ping opacity-75" />
              </span>
            )}
          </div>

          {/* Button Text Label */}
          <div className="relative flex items-center gap-1.5 pr-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse shrink-0 shadow-[0_0_6px_#00A86B]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white whitespace-nowrap font-sans">
              {isOpen ? 'Close Chat' : 'Chat with WHYINSURED'}
            </span>
          </div>
        </motion.button>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING AI CHAT PANEL PORTAL (ATTACHED TO BODY WITH FULL INTERACTIVITY) */}
      {/* ========================================================================= */}
      {typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent}
    </>
  );
}
