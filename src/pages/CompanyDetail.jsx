import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiFileText, FiX, FiGlobe } from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { fetchPublicCompanies } from '../services/publicApiService';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  
  const staticCompany = companiesData.find(
    c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
  );

  const [company, setCompany] = useState(() => staticCompany || null);
  const [isLoading, setIsLoading] = useState(!staticCompany);
  const [isFetched, setIsFetched] = useState(Boolean(staticCompany));

  useEffect(() => {
    let isMounted = true;
    if (!staticCompany) {
      setIsLoading(true);
      setIsFetched(false);
    }

    fetchPublicCompanies().then(res => {
      if (isMounted && res.success && Array.isArray(res.data)) {
        const found = res.data.find(
          c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
        );
        if (found) {
          setCompany(prev => {
            const prevPlans = prev?.plans || [];
            const fetchedPlans = found.plans || [];
            const planMap = new Map();
            prevPlans.forEach(p => planMap.set(p.id || p.slug, p));
            fetchedPlans.forEach(p => planMap.set(p.id || p.slug, { ...planMap.get(p.id || p.slug), ...p }));
            const mergedPlans = Array.from(planMap.values());

            return {
              ...prev,
              ...found,
              theme: {
                primary: found.theme?.primary || found.primary_color || prev?.theme?.primary || '#0038A8',
                secondary: found.theme?.secondary || found.secondary_color || prev?.theme?.secondary || '#F0F4FF',
                accent: found.theme?.accent || found.primary_color || prev?.theme?.accent || '#0038A8',
                background: found.theme?.background || found.secondary_color || prev?.theme?.background || '#F8FAFC',
                text: '#0F172A'
              },
              plans: mergedPlans.length > 0 ? mergedPlans : (found.plans && found.plans.length > 0 ? found.plans : prevPlans),
              sources: prev?.sources || found.sources
            };
          });
        }
      }
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
        setIsFetched(true);
      }
    });

    return () => { isMounted = false; };
  }, [companyId]);

  // Close sources modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSourcesOpen(false);
      }
    };
    if (isSourcesOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSourcesOpen]);

  // 1. While loading data, show clean loading state (Never flash "Not Found"!)
  if (isLoading && !company) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <h2 className="text-base sm:text-lg font-bold text-slate-800 font-display">Loading Company Details...</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Fetching insurance provider information</p>
      </div>
    );
  }

  // 2. Only show "Company Not Found" after fetch has definitely completed and company does not exist
  if (isFetched && !company) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <h1 className="text-2xl font-bold text-slate-800 font-display">Company Not Found</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested insurance provider could not be resolved.</p>
        <Link to="/" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 bg-slate-50 font-sans">
        <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">Resolving provider...</p>
      </div>
    );
  }

  const theme = company.theme || {
    primary: company.primary_color || '#0038A8',
    secondary: company.secondary_color || '#F0F4FF',
    accent: company.primary_color || '#0038A8',
    background: company.secondary_color || '#F8FAFC',
    text: '#0F172A'
  };

  const { name, fullName, logo, description, plans, sources } = company;
  const displayedPlans = (plans || []).filter(p => !p.parentPlanId);

  // Apply custom CSS variables for the theme
  const themeStyles = {
    '--primary': theme.primary || '#0038A8',
    '--secondary': theme.secondary || '#F0F4FF',
    '--accent': theme.accent || theme.primary || '#0038A8',
    '--bg': theme.background || '#F8FAFC',
    '--text': theme.text || '#0F172A',
  };

  return (
    <div
      className="min-h-screen pt-[88px] sm:pt-24 pb-2 sm:pb-16 relative transition-colors duration-300 font-sans"
      style={{ ...themeStyles, backgroundColor: 'var(--bg)' }}
    >
      {/* Background Decorative Blur using Company Primary Color */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: 'var(--primary)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* STANDARD WHYINSURED COMPANY PAGE ARCHITECTURE (USED FOR ALL PROVIDERS)     */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-160px)] py-1 sm:py-4 space-y-0">
          {/* Navigation Breadcrumb - Back to Search */}
          <div className="shrink-0 text-left mb-3.5 sm:mb-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="text-sm" /> Back to Search
            </Link>
          </div>

          {/* 1. COMPANY LOGO */}
          <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
            {logo ? (
              <img
                src={logo}
                alt={name || fullName || 'Company Logo'}
                className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
              />
            ) : (
              <div
                className="px-4 py-2 rounded-xl font-black text-sm sm:text-base font-display"
                style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
              >
                {name || fullName}
              </div>
            )}
          </div>

          {/* 2. AVAILABLE PLANS HEADING & SOURCES BUTTON */}
          <div className="relative shrink-0 mb-3.5 sm:mb-6">
            {/* Centered Heading */}
            <div className="text-center">
              <h2 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                Available Plans
              </h2>
              <div 
                className="w-7 sm:w-10 h-0.5 sm:h-1 mx-auto mt-1 sm:mt-1.5 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
            </div>

            {/* Sources Button (Right-aligned on desktop, placed neatly below heading on mobile) */}
            {sources && sources.length > 0 && (
              <div className="mt-2.5 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsSourcesOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-slate-700 hover:text-[#0038A8] bg-white hover:bg-[#F0F4FF] border border-slate-200 hover:border-[#0038A8]/35 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer select-none group"
                  title="View sources and reference documents"
                >
                  <FiFileText className="text-xs text-[#0038A8] group-hover:scale-110 transition-transform" />
                  <span>Sources</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. PLAN GRID / LIST */}
          {displayedPlans && displayedPlans.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 w-full">
              {displayedPlans.map((plan) => (
                <Link
                  key={plan.id || plan.slug}
                  to={`/insurance/${company.id || company.slug}/${plan.id || plan.slug}`}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
                  style={{ '--company-primary': theme.primary }}
                >
                  {/* Subtle bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] opacity-40 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: theme.primary }}
                  />

                  {/* Left: Plan name */}
                  <div className="flex-1 min-w-0 pr-2">
                    {plan.companyName && plan.companyName !== company.name && (
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0982C6] block font-display mb-0.5 truncate">
                        {plan.companyName}
                      </span>
                    )}
                    <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[var(--primary)] transition-colors duration-200 font-display leading-tight">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Right: Small arrow */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[var(--primary)] transition-all duration-200 shrink-0">
                    <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <FiArrowRight className="text-xl rotate-90" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 font-display">No Plans Available Yet</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">Health insurance plans for {name} will be added soon.</p>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SOURCES MODAL POPUP                                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSourcesOpen && sources && sources.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSourcesOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-md overflow-hidden z-10 p-5 sm:p-6 max-h-[88dvh] sm:max-h-[85vh] overflow-y-auto text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                type="button"
                onClick={() => setIsSourcesOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close sources popup"
              >
                <FiX className="text-base sm:text-lg" />
              </button>

              {/* Header */}
              <div className="pr-8 mb-4 sm:mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-display">
                    Sources
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Information used for {company.name || 'Insurance'} plans and policy details.
                </p>
              </div>

              {/* Vertical Source List */}
              <div className="space-y-2 sm:space-y-2.5">
                {sources.map((source, sIdx) => {
                  const hasUrl = Boolean(source.url && source.url.trim() !== '');
                  const RowComponent = hasUrl ? 'a' : 'div';
                  const rowProps = hasUrl ? {
                    href: source.url,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  } : {};

                  const isPdf = source.type === 'pdf' || (source.url && source.url.toLowerCase().endsWith('.pdf'));

                  return (
                    <RowComponent
                      key={sIdx}
                      {...rowProps}
                      className={`w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white flex items-center justify-between transition-all duration-200 group select-none ${
                        hasUrl
                          ? 'hover:bg-slate-50/90 hover:border-[#0038A8]/40 hover:shadow-2xs cursor-pointer'
                          : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center transition-colors shrink-0 ${
                          isPdf 
                            ? 'bg-rose-50/70 border-rose-100 text-rose-600 group-hover:bg-rose-100 group-hover:text-rose-700' 
                            : 'bg-[#F0F4FF]/70 border-[#0038A8]/15 text-[#0038A8] group-hover:bg-[#0038A8] group-hover:text-white'
                        }`}>
                          {isPdf ? <FiFileText className="text-sm" /> : <FiGlobe className="text-sm" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#0038A8] transition-colors font-display block truncate">
                            {source.title || source.name}
                          </span>
                        </div>
                      </div>

                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] transition-all duration-200 shrink-0">
                        <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </RowComponent>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
