import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiArrowRight,
  FiShield,
  FiLayers,
  FiActivity,
  FiX
} from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { searchGlobalInsurance } from '../utils/globalSearchHelper';
import { detectQueryIntent } from '../utils/searchIntentDetector';
import RealInsuranceSearchResultPanel from '../components/RealInsuranceSearchResultPanel';
import AiChatAssistant from '../components/AiChatAssistant';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchContainerRef = useRef(null);

  // Default state on initial mount or browser refresh is ALWAYS empty:
  // searchQuery = "", searchResults = [], isChatActive = false
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const [activeChatQuery, setActiveChatQuery] = useState('');
  const [showMobileInsurance, setShowMobileInsurance] = useState(false);

  // Ensure homepage starts completely fresh on full page refresh / initial mount
  useEffect(() => {
    // If URL has any lingering ?q= parameter, remove it immediately
    if (searchParams.get('q')) {
      setSearchParams({}, { replace: true });
    }
    sessionStorage.removeItem('whyinsured_last_search_query');
  }, []);

  // Update query state (in-memory React state only, no URL parameter pollution on live typing)
  const handleSearchChange = (val) => {
    setSearchQuery(val);
  };

  // Listen for global search reset event (e.g. when user clicks WHYINSURED logo)
  useEffect(() => {
    const handleResetSearch = () => {
      setIsChatActive(false);
      setActiveChatQuery('');
      setSearchQuery('');
      sessionStorage.removeItem('whyinsured_last_search_query');
      if (searchParams.get('q')) {
        setSearchParams({}, { replace: true });
      }
    };

    window.addEventListener('whyinsured-reset-search', handleResetSearch);
    return () => window.removeEventListener('whyinsured-reset-search', handleResetSearch);
  }, [searchParams, setSearchParams]);

  // Clean up any search query storage when leaving the Home page
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('whyinsured_last_search_query');
    };
  }, []);

  // Close search results ONLY when user explicitly clicks/taps outside search area (inactive during chat)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest &&
        (event.target.closest('[role="dialog"]') || event.target.closest('.fixed') || event.target.closest('.modal'))
      ) {
        return;
      }

      if (isChatActive) {
        return;
      }

      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        handleSearchChange('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isChatActive]);

  // Evaluate real database content search across all companies, plans, and features
  const searchResults = useMemo(() => {
    return searchGlobalInsurance(searchQuery);
  }, [searchQuery]);

  // Intelligently evaluate whether query is Website Search or Conversational Requirement
  const queryIntent = useMemo(() => {
    return detectQueryIntent(searchQuery, searchResults);
  }, [searchQuery, searchResults]);

  // Handle starting inline AI conversation in the search area
  const handleStartChat = (queryToStart) => {
    const q = (queryToStart || searchQuery).trim();
    if (!q) return;
    setActiveChatQuery(q);
    setIsChatActive(true);
  };

  // Handle exiting chat and returning smoothly to search bar
  const handleExitChat = () => {
    setIsChatActive(false);
    setActiveChatQuery('');
    setSearchQuery('');
    sessionStorage.removeItem('whyinsured_last_search_query');
    if (searchParams.get('q')) {
      setSearchParams({}, { replace: true });
    }
  };

  // Handle keydown in search input (Enter triggers conversational flow if requirement intent)
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (queryIntent.isConversational) {
        e.preventDefault();
        handleStartChat(searchQuery);
      }
    }
  };

  // Setup word-by-word animation variants
  const headingText = "Let’s Get the Reality of Insurance";
  const words = headingText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(6px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] pt-28 sm:pt-44 md:pt-52 lg:pt-60 pb-36 sm:pb-32 overflow-visible flex flex-col items-center justify-start">
      
      {/* Subtle Premium Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-45 pointer-events-none -z-10" />

      {/* Premium Backdrop Glows - Soft and Elegant */}
      <div className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute top-[10%] right-[15%] w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[120px]" />
      </div>

      {/* Hero Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center relative z-20">
        
        {/* Main Heading with Word-by-word Stagger Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[26px] sm:text-[38px] md:text-[50px] lg:text-[56px] font-black tracking-tight text-[#0F172A] mb-8 sm:mb-10 font-display leading-[1.12] text-center"
        >
          {words.map((word, idx) => {
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            const isReality = cleanWord === "Reality";
            return (
              <motion.span
                key={idx}
                variants={wordVariants}
                className={`inline-block whitespace-nowrap mr-[0.22em] ${
                  isReality 
                    ? 'text-emerald-600 bg-gradient-to-r from-emerald-600 to-[#10B981] bg-clip-text text-transparent font-black relative' 
                    : 'text-[#0F172A]'
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Global Smart Search & AI Advisor Container */}
        <motion.div
          ref={searchContainerRef}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="relative max-w-2xl sm:max-w-3xl mx-auto px-1"
        >
          {isChatActive ? (
            /* =================================================================== */
            /* 1. TRANSITIONED AI CONVERSATION INTERFACE IN THE SAME SEARCH AREA    */
            /* =================================================================== */
            <AiChatAssistant
              inline={true}
              initialQuery={activeChatQuery}
              onBackToSearch={handleExitChat}
            />
          ) : (
            /* =================================================================== */
            /* 2. SMART SEARCH BAR (THE ONLY VISIBLE INPUT)                        */
            /* =================================================================== */
            <>
              {/* Elevated Clean Search Input Wrapper */}
              <div className="relative flex items-center w-full h-14 sm:h-16 rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-slate-300 focus-within:border-emerald-500 focus-within:shadow-2xl focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-300 pl-4 sm:pl-5 pr-3 sm:pr-4 group">
                {/* Search Icon */}
                <FiSearch className="text-xl sm:text-2xl text-slate-400 group-focus-within:text-emerald-600 transition-colors mr-3 shrink-0" />
                
                {/* Search Input Field */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search benefits or ask a question..."
                  className="flex-1 min-w-0 h-full bg-transparent text-[#0F172A] text-xs sm:text-base font-semibold placeholder-slate-400 focus:outline-none font-sans"
                />

                {/* Clear Query Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors shrink-0 mr-1"
                    title="Clear search"
                    aria-label="Clear search query"
                  >
                    Clear
                  </button>
                )}

                {/* Dynamic Send / Ask Button when conversational requirement intent is recognized */}
                {queryIntent.isConversational && (
                  <button
                    type="button"
                    onClick={() => handleStartChat(searchQuery)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 select-none animate-in fade-in zoom-in-95 duration-200"
                    title="Ask WHYINSURED Advisor"
                    aria-label="Ask WHYINSURED Advisor"
                  >
                    <span className="hidden min-[380px]:inline">Ask</span>
                    <FiArrowRight className="text-xs" />
                  </button>
                )}
              </div>

              {/* Conversational Intent Banner (When user writes requirement query) */}
              <AnimatePresence>
                {queryIntent.isConversational && !isChatActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.995 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleStartChat(searchQuery)}
                    className="w-full bg-white border border-emerald-300/80 rounded-2xl shadow-xl p-3.5 sm:p-4 text-left font-sans mt-3.5 cursor-pointer hover:border-emerald-500 hover:shadow-2xl transition-all duration-200 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400" />
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <span className="text-emerald-700 text-base">✨</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-black text-[#0F172A] group-hover:text-emerald-700 transition-colors">
                              {queryIntent.entity?.hasEntity && queryIntent.feature?.hasFeature
                                ? `Policy Feature Question Detected`
                                : queryIntent.entity?.hasEntity
                                ? `Policy Question Detected`
                                : `Requirement Query Detected`}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#00A86B] border border-[#00A86B]/25">
                              WHYINSURED Advisor
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                            {queryIntent.entity?.hasEntity && queryIntent.feature?.hasFeature
                              ? `Press Enter or click to ask WHYINSURED Advisor about this policy feature.`
                              : `Press Enter or click to get personalized policy recommendations from WHYINSURED Advisor.`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs shrink-0 group-hover:translate-x-1 transition-transform">
                        <span className="hidden sm:inline">Start Chat</span>
                        <FiArrowRight className="text-sm" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real Insurance Content Search Results Panel (Website Search) */}
              <AnimatePresence>
                {!queryIntent.isConversational && searchQuery.trim() && (
                  <RealInsuranceSearchResultPanel
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    onClose={() => handleSearchChange('')}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        {/* Mobile Hero Navigation Buttons (Insurance, Compare, Hospital, Claim) - Visible ONLY on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="md:hidden flex flex-col items-center justify-center gap-2.5 mt-8 px-1 w-full max-w-sm mx-auto"
        >
          {/* ROW 1: [ Insurance ] [ Compare ] */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowMobileInsurance(!showMobileInsurance)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer w-full ${
                showMobileInsurance
                  ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                  : 'border-slate-200/80 bg-white text-slate-700 hover:text-emerald-600 shadow-sm hover:shadow-md'
              }`}
            >
              <FiShield className="text-[#059669] text-sm shrink-0" />
              <span>Insurance</span>
            </button>

            <Link
              to="/compare"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-all duration-200 cursor-pointer w-full"
            >
              <FiLayers className="text-[#059669] text-sm shrink-0" />
              <span>Compare</span>
            </Link>
          </div>

          {/* ROW 2: [ Hospital ] [ Claim ] */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <a
              href="https://panel-hospital.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-all duration-200 cursor-pointer w-full"
            >
              <FiActivity className="text-[#059669] text-sm shrink-0" />
              <span>Hospital</span>
            </a>

            <Link
              to="/claim"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-all duration-200 cursor-pointer w-full"
            >
              <FiShield className="text-[#059669] text-sm shrink-0" />
              <span>Claim</span>
            </Link>
          </div>

          {/* Supported Providers Grid for Mobile Insurance Button */}
          <AnimatePresence>
            {showMobileInsurance && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full bg-white border border-slate-100 rounded-2xl p-4 shadow-xl overflow-hidden text-left mt-1"
              >
                <div className="mb-3 pl-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Supported Providers
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {companiesData.map((company) => (
                    <Link
                      key={company.id}
                      to={`/insurance/${company.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50/80 rounded-xl border border-slate-50 hover:border-slate-100 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-1 shrink-0 transition-transform duration-200 group-hover:scale-105">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-600 transition-colors font-sans">
                        {company.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
