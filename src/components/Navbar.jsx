import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiChevronRight,
  FiChevronDown
} from 'react-icons/fi';
import Logo from './Logo';
import { companiesData } from '../data/companies';
import { fetchPublicCompanies } from '../services/publicApiService';
import CompareForm from './CompareForm';

export default function Navbar() {
  const [companiesList, setCompaniesList] = useState(companiesData);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop Health Insurance hover open
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null); // Active company for separate side dropdown
  const [sideMenuTop, setSideMenuTop] = useState(0); // Vertical offset aligned with hovered company
  const [compareDropdownOpen, setCompareDropdownOpen] = useState(false); // Desktop compare hover open
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isHoveringCompare, setIsHoveringCompare] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownCardRef = useRef(null);
  const closeTimerRef   = useRef(null); // Delayed-close timer for safe cursor transition
  const location = useLocation();

  // Helper: cancel any pending close timer
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Helper: schedule dropdown close after a short delay
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredCompanyId(null);
    }, 120);
  };

  useEffect(() => {
    if (!isSubmenuOpen && !isHoveringCompare) {
      setCompareDropdownOpen(false);
    }
  }, [isSubmenuOpen, isHoveringCompare]);

  // Close all menus when location path changes
  useEffect(() => {
    setDropdownOpen(false);
    setHoveredCompanyId(null);
    setCompareDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup close timer on unmount
  useEffect(() => {
    return () => cancelClose();
  }, []);

  const isActive = (path) => {
    if (path === '/insurance') {
      return location.pathname.startsWith('/insurance') && !location.pathname.includes('/academy');
    }
    return location.pathname === path;
  };

  // Load live companies from Supabase backend API
  useEffect(() => {
    let isMounted = true;
    fetchPublicCompanies().then(res => {
      if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setCompaniesList(prev => res.data.map(liveComp => {
          const staticMatch = prev.find(p => p.id === liveComp.id || p.slug === liveComp.slug);
          return {
            ...staticMatch,
            ...liveComp,
            plans: liveComp.plans && liveComp.plans.length > 0 ? liveComp.plans : staticMatch?.plans
          };
        }));
      }
    });
    return () => { isMounted = false; };
  }, []);

  const hoveredCompany = hoveredCompanyId
    ? companiesList.find(c => c.id === hoveredCompanyId)
    : null;

  const hoveredCompanyPlans = hoveredCompany?.plans
    ? hoveredCompany.plans.filter(p => !p.parentPlanId)
    : [];

  // Calculate vertical alignment for the floating side plans dropdown.
  // Strategy:
  //   1. Align the side panel's top edge with the hovered company row's top (relative to the card).
  //   2. Only clamp downward at the viewport bottom — shift up the minimum required so the
  //      panel bottom stays on screen.
  //   3. Never shift higher than the hovered row's own top (so the panel never drifts to a
  //      completely different company's region).
  //   4. Internal scrollbar handles content overflow — no need for aggressive upward shifts.
  const handleCompanyHover = (companyId, e) => {
    setHoveredCompanyId(companyId);
    if (e && e.currentTarget && dropdownCardRef.current) {
      const itemRect   = e.currentTarget.getBoundingClientRect();
      const cardRect   = dropdownCardRef.current.getBoundingClientRect();

      // Where is the hovered row relative to the company card's top?
      const relativeTop = itemRect.top - cardRect.top;

      // Estimated side panel height (header ~60px + up to 5 plans ~50px each + padding)
      // We cap the plans list to 260px via max-h, so total panel ≈ 330px.
      const SIDE_PANEL_HEIGHT = 330;
      const VIEWPORT_H = window.innerHeight;

      // Where would the panel bottom land if top = relativeTop (absolute from viewport)?
      const absPanelBottom = itemRect.top + SIDE_PANEL_HEIGHT;

      let adjustedTop = relativeTop;

      if (absPanelBottom > VIEWPORT_H - 16) {
        // Only shift up the minimum needed to keep the bottom edge 16px from viewport edge.
        const overflow = absPanelBottom - (VIEWPORT_H - 16);
        // But never shift above the hovered item's own top relative to the card.
        adjustedTop = Math.max(relativeTop - overflow, 0);
      }

      setSideMenuTop(adjustedTop);
    }
  };

  const handleLogoClick = () => {
    setDropdownOpen(false);
    setHoveredCompanyId(null);
    setCompareDropdownOpen(false);
    sessionStorage.removeItem('whyinsured_last_search_query');
    window.dispatchEvent(new CustomEvent('whyinsured-reset-search'));
  };

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 font-sans transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 backdrop-blur-[24px] border border-slate-900/10 shadow-lg py-2.5 rounded-[22px]' 
          : 'bg-white/75 backdrop-blur-[18px] border border-slate-900/05 shadow-md py-3 rounded-[22px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-12">
          {/* Left Brand Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center shrink-0 cursor-pointer"
          >
            <Logo className="h-8 sm:h-9" />
          </Link>

          {/* Desktop Main Navigation */}
          <div className="flex items-center gap-8">
            
            {/* Health Insurance (Hover menu, same exact w-72 company dropdown + separate right-side floating plan dropdown) */}
            <div 
              className="relative py-2"
              onMouseEnter={() => {
                cancelClose();
                setDropdownOpen(true);
                setCompareDropdownOpen(false);
              }}
              onMouseLeave={() => {
                scheduleClose();
              }}
            >
              <button 
                type="button"
                className={`relative py-1 text-sm font-semibold transition-colors duration-250 cursor-pointer ${
                  isActive('/insurance') ? 'text-[#0F172A]' : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <span>Health Insurance</span>
                {isActive('/insurance') && (
                  <motion.span 
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"
                  />
                )}
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 pt-4 w-72 z-50 pointer-events-auto"
                  >
                    {/* EXISTING UNCHANGED COMPANY DROPDOWN CONTAINER */}
                    <div 
                      ref={dropdownCardRef}
                      className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl py-4 overflow-visible"
                    >
                      {/* Fixed Header */}
                      <div className="px-5 mb-2.5 flex items-center justify-between">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 pl-1">
                          Supported Providers
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {companiesList.length} Companies
                        </span>
                      </div>
                      
                      {/* INDEPENDENT COMPANY SCROLL CONTAINER */}
                      <div 
                        className="px-2 space-y-1 overflow-y-auto overscroll-contain max-h-[380px] sm:max-h-[calc(100vh-180px)] pr-1"
                        style={{ scrollbarWidth: 'thin' }}
                      >
                        {companiesList.map((company) => {
                          const isHovered = hoveredCompanyId === company.id;
                          return (
                            <div
                              key={company.id}
                              onMouseEnter={(e) => {
                                cancelClose();
                                handleCompanyHover(company.id, e);
                              }}
                              className="relative"
                            >
                              <div
                                className={`flex items-center justify-between px-3 py-2.5 rounded-2xl transition-colors duration-200 cursor-default group text-left ${
                                  isHovered ? 'bg-slate-50' : 'hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <div className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl p-1.5 shrink-0 transition-transform duration-200 group-hover:scale-105">
                                    <img 
                                      src={company.logo} 
                                      alt={company.name} 
                                      className="w-full h-full object-contain" 
                                    />
                                  </div>
                                  <span className={`text-xs font-bold transition-all duration-200 truncate ${
                                    isHovered
                                      ? 'text-emerald-600 translate-x-1'
                                      : 'text-slate-600 group-hover:text-emerald-600 group-hover:translate-x-1'
                                  }`}>
                                    {company.name}
                                  </span>
                                </div>
                                <FiChevronRight className={`text-xs shrink-0 transition-transform duration-200 ${
                                  isHovered
                                    ? 'text-emerald-600 translate-x-0.5'
                                    : 'text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5'
                                }`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* SEPARATE RIGHT-SIDE FLOATING PLAN DROPDOWN (DYNAMIC VERTICAL ALIGNMENT) */}
                      <AnimatePresence>
                        {hoveredCompany && (
                          <motion.div
                            key={hoveredCompany.id}
                            initial={{ opacity: 0, x: -8, scale: 0.97 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -8, scale: 0.97 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            style={{ top: `${sideMenuTop}px` }}
                            className="absolute left-[calc(100%+8px)] w-72 z-55 pointer-events-auto"
                            onMouseEnter={() => {
                              cancelClose();
                              setHoveredCompanyId(hoveredCompany.id);
                            }}
                            onMouseLeave={() => {
                              scheduleClose();
                            }}
                          >
                            {/*
                              Cursor-safe invisible bridge between the company list and plans panel.
                              Covers the 8px gap plus a diagonal triangle so the cursor can travel
                              from any company row straight-right or diagonally to this panel
                              without accidentally leaving the hover zone.
                            */}
                            <div
                              className="absolute pointer-events-auto"
                              style={{
                                top: 0,
                                bottom: 0,
                                left: '-20px',
                                width: '20px',
                              }}
                            />

                            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl py-4 px-3 overflow-hidden">
                              {/* Header */}
                              <div className="px-3 mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0">
                                    <img src={hoveredCompany.logo} alt={hoveredCompany.name} className="w-full h-full object-contain" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-xs font-black text-slate-800 font-display block truncate">
                                      {hoveredCompany.name}
                                    </span>
                                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                      Available Plans
                                    </span>
                                  </div>
                                </div>

                                <Link
                                  to={`/insurance/${hoveredCompany.id}`}
                                  onClick={() => {
                                    setDropdownOpen(false);
                                    setHoveredCompanyId(null);
                                  }}
                                  className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 px-2 py-0.5 rounded-full transition-all shrink-0 cursor-pointer"
                                >
                                  Overview →
                                </Link>
                              </div>

                              {/* INDEPENDENT PLAN SCROLL CONTAINER */}
                              <div 
                                className="space-y-1 overflow-y-auto overscroll-contain max-h-[260px] pr-1"
                                style={{ scrollbarWidth: 'thin' }}
                              >
                                {hoveredCompanyPlans && hoveredCompanyPlans.length > 0 ? (
                                  hoveredCompanyPlans.map((plan) => (
                                    <Link
                                      key={plan.id}
                                      to={`/insurance/${hoveredCompany.id}/${plan.id}`}
                                      onClick={() => {
                                        setDropdownOpen(false);
                                        setHoveredCompanyId(null);
                                      }}
                                      className="flex items-center justify-between px-3 py-2.5 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200/60 rounded-2xl transition-all duration-150 cursor-pointer group text-left"
                                    >
                                      <div className="min-w-0 flex-1 pr-2">
                                        <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-800 transition-colors block truncate">
                                          {plan.name}
                                        </span>
                                        {plan.coverage ? (
                                          <span className="text-[10px] text-slate-400 font-medium block truncate">
                                            Coverage: {plan.coverage}
                                          </span>
                                        ) : plan.description ? (
                                          <span className="text-[10px] text-slate-400 font-medium block truncate">
                                            {plan.description}
                                          </span>
                                        ) : null}
                                      </div>

                                      <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-150 shrink-0">
                                        <FiArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                                      </div>
                                    </Link>
                                  ))
                                ) : (
                                  <div className="py-6 px-3 text-center space-y-1">
                                    <span className="text-xs font-bold text-slate-600 block">Plans coming soon</span>
                                    <p className="text-[10px] text-slate-400">No active plans listed yet.</p>
                                    <Link
                                      to={`/insurance/${hoveredCompany.id}`}
                                      onClick={() => {
                                        setDropdownOpen(false);
                                        setHoveredCompanyId(null);
                                      }}
                                      className="inline-block mt-2 text-[10px] font-bold text-emerald-600 hover:underline"
                                    >
                                      View Company Details →
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compare (Hover menu) */}
            <div 
              className="relative py-2"
              onMouseEnter={() => {
                setIsHoveringCompare(true);
                setCompareDropdownOpen(true);
                setDropdownOpen(false);
                setHoveredCompanyId(null);
              }}
              onMouseLeave={() => {
                setIsHoveringCompare(false);
                if (!isSubmenuOpen) {
                  setCompareDropdownOpen(false);
                }
              }}
            >
              <button 
                type="button"
                className={`relative py-1 text-sm font-semibold transition-colors duration-250 cursor-pointer ${
                  isActive('/compare') ? 'text-[#0F172A]' : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <span>Compare</span>
                {isActive('/compare') && (
                  <motion.span 
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"
                  />
                )}
              </button>
              
              <AnimatePresence>
                {compareDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 pt-4 w-[520px] z-55 pointer-events-auto"
                  >
                    <div 
                      className="bg-white/95 backdrop-blur-xl rounded-[24px] border border-slate-900/10 shadow-2xl p-6 text-left"
                      style={{
                        maxHeight: 'calc(100dvh - 120px)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'thin'
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          Compare Health Plans
                        </h3>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          Choose providers and policies to analyze core criteria side-by-side.
                        </p>
                      </div>
                      <CompareForm 
                        onClose={() => {
                          setCompareDropdownOpen(false);
                          setIsHoveringCompare(false);
                        }} 
                        onSubmenuStateChange={(isOpen) => setIsSubmenuOpen(isOpen)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Claim Link */}
            <Link
              to="/claim"
              className={`relative py-1 text-sm font-semibold transition-colors duration-250 cursor-pointer ${
                isActive('/claim') ? 'text-[#0F172A]' : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              <span>Claim</span>
              {isActive('/claim') && (
                <motion.span 
                  layoutId="nav-active-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"
                />
              )}
            </Link>

            {/* Hospital Link */}
            <a
              href="https://panel-hospital.vercel.app/"
              className={`relative py-1 text-sm font-semibold transition-colors duration-250 cursor-pointer ${
                isActive('/hospital') ? 'text-[#0F172A]' : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              <span>Hospital</span>
              {isActive('/hospital') && (
                <motion.span 
                  layoutId="nav-active-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"
                />
              )}
            </a>

          </div>

          {/* Right Side: Insurance Academy Pill */}
          <div className="hidden md:block">
            <Link
              to="/academy"
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer inline-block ${
                isActive('/academy')
                  ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                  : 'border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:-translate-y-0.5 hover:shadow-sm'
              }`}
            >
              Insurance Academy
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between h-10 w-full py-1">
          <Link to="/" onClick={handleLogoClick} className="flex items-center shrink-0 cursor-pointer">
            <Logo className="h-7" />
          </Link>
          <Link
            to="/academy"
            className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-[#064e3b] hover:from-emerald-100 hover:to-emerald-200/50 hover:shadow-xs transition-all duration-200 cursor-pointer shadow-xs"
          >
            Insurance Academy
          </Link>
        </div>

      </div>
    </nav>
  );
}
