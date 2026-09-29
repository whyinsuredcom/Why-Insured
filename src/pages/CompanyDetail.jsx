import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiChevronRight, FiArrowRight, FiFileText, FiX, FiGlobe, FiExternalLink } from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { fetchPublicCompanies } from '../services/publicApiService';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  
  const [company, setCompany] = useState(() => companiesData.find(
    c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
  ));

  useEffect(() => {
    let isMounted = true;
    fetchPublicCompanies().then(res => {
      if (isMounted && res.success && Array.isArray(res.data)) {
        const found = res.data.find(
          c => c.slug === companyId || c.id === companyId || (companyId === 'hdfc-life' && (c.id === 'hdfc-ergo' || c.slug === 'hdfc-ergo'))
        );
        if (found) {
          setCompany(prev => ({
            ...prev,
            ...found,
            plans: found.plans && found.plans.length > 0 ? found.plans : prev?.plans,
            sources: prev?.sources || found.sources
          }));
        }
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

  if (!company) {
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

  const { theme, name, fullName, logo, description, plans, sources } = company;
  const displayedPlans = (plans || []).filter(p => !p.parentPlanId);
  const isSpecialCompany = company.id === 'hdfc-ergo' || company.slug === 'hdfc-ergo' || company.id === 'tata-aig' || company.slug === 'tata-aig' || company.id === 'icici-lombard' || company.slug === 'icici-lombard' || company.id === 'niva-bupa' || company.slug === 'niva-bupa' || company.id === 'star-health' || company.slug === 'star-health' || company.id === 'care-health' || company.slug === 'care-health' || company.id === 'reliance-general' || company.slug === 'reliance-general' || company.id === 'magma-hdi' || company.slug === 'magma-hdi' || company.id === 'manipal-cigna' || company.slug === 'manipal-cigna' || company.id === 'aditya-birla' || company.slug === 'aditya-birla' || company.id === 'bajaj-general' || company.slug === 'bajaj-general' || company.id === 'sbi-general' || company.slug === 'sbi-general' || company.id === 'acko' || company.slug === 'acko';

  // Apply custom CSS variables for the theme
  const themeStyles = {
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--bg': theme.background,
    '--text': theme.text,
  };

  // Helper to determine CTA button styles for non-HDFC companies
  const getButtonStyle = () => {
    if (company.id === 'care-health') {
      return {
        backgroundColor: theme.secondary,
        color: '#0F172A',
        borderColor: theme.secondary,
        boxShadow: '0 2px 6px -1px rgba(250, 204, 21, 0.3)'
      };
    }
    if (theme.gradient) {
      return {
        background: theme.gradient,
        color: '#FFFFFF',
        borderColor: 'transparent',
        boxShadow: '0 4px 10px -2px rgba(239, 68, 68, 0.25)'
      };
    }
    return {
      backgroundColor: `${theme.primary}10`,
      color: theme.primary,
      borderColor: `${theme.primary}20`
    };
  };

  const handleButtonEnter = (e) => {
    if (company.id === 'care-health') {
      e.currentTarget.style.backgroundColor = theme.primary;
      e.currentTarget.style.color = '#FFFFFF';
      e.currentTarget.style.borderColor = theme.primary;
    } else if (theme.gradient) {
      e.currentTarget.style.filter = 'brightness(1.08)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    } else {
      e.currentTarget.style.backgroundColor = theme.primary;
      e.currentTarget.style.color = '#FFFFFF';
    }
  };

  const handleButtonLeave = (e) => {
    if (company.id === 'care-health') {
      e.currentTarget.style.backgroundColor = theme.secondary;
      e.currentTarget.style.color = '#0F172A';
      e.currentTarget.style.borderColor = theme.secondary;
    } else if (theme.gradient) {
      e.currentTarget.style.filter = 'none';
      e.currentTarget.style.transform = 'none';
    } else {
      e.currentTarget.style.backgroundColor = `${theme.primary}10`;
      e.currentTarget.style.color = theme.primary;
    }
  };

  return (
    <div className={`min-h-screen ${isSpecialCompany ? 'pt-[88px] sm:pt-24 pb-2 sm:pb-16' : 'pt-20 sm:pt-24 pb-12 sm:pb-16'} relative transition-colors duration-300`} style={{ ...themeStyles, backgroundColor: 'var(--bg)' }}>
      {/* Background Decorative Blur using Company Primary Color */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: 'var(--primary)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isSpecialCompany ? (
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
              <img
                src={logo}
                alt={name}
                className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
              />
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
                    key={plan.id}
                    to={`/insurance/${company.id}/${plan.id}`}
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
        ) : (
          /* ========================================================================= */
          /* ALL OTHER COMPANIES (TATA AIG, ICICI, STAR, NIVA BUPA, CARE, KOTAK, ETC.)   */
          /* 100% UNCHANGED EXISTING DESIGN & FUNCTIONALITY                           */
          /* ========================================================================= */
          <>
            {/* Navigation Breadcrumb */}
            <div className="mb-4 sm:mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <FiArrowLeft className="text-sm" /> Back to Search
              </Link>
            </div>
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-12 relative overflow-hidden">
              {/* Subtle colored accent strip at the top */}
              <div 
                className="absolute top-0 left-0 right-0 h-2" 
                style={{ background: theme.gradient ? theme.gradient : 'var(--primary)' }}
              />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <span 
                    className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-flex items-center gap-1.5"
                    style={{ 
                      backgroundColor: 'var(--bg)', 
                      color: 'var(--primary)', 
                      borderColor: `${theme.primary}20` 
                    }}
                  >
                    {theme.accent && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" 
                        style={{ backgroundColor: 'var(--accent)' }} 
                      />
                    )}
                    Verified Provider
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight font-display">
                    {fullName}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
                
                {/* Logo block */}
                <img
                  src={logo}
                  alt={name}
                  className="w-36 sm:w-48 lg:w-56 h-auto max-h-20 sm:max-h-24 lg:max-h-28 object-contain select-none self-start lg:self-center shrink-0"
                />
              </div>
            </div>

            {/* Plans Section Header */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 font-display">
                <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                Available Health Plans
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                Compare and choose from {displayedPlans.length} custom-tailored policies.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className="bg-white rounded-2xl border border-slate-100/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Dynamic hover overlay border */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: theme.gradient ? theme.gradient : 'var(--primary)' }}
                  />

                  <div>
                    {/* Plan Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 
                          className="text-lg font-black tracking-tight transition-colors duration-200 font-display"
                          style={{ color: 'var(--primary)' }}
                        >
                          {plan.name}
                        </h3>
                        <p className="text-slate-400 text-xs font-semibold mt-0.5">{name}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        {theme.accent && (
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                        )}
                        Health
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                      {plan.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-2.5 mb-6">
                      {plan.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                          <FiCheck 
                            className="text-sm shrink-0 mt-0.5" 
                            style={{ color: 'var(--primary)' }} 
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: CTA */}
                  <div className="border-t border-slate-50 pt-4 mt-auto w-full">
                    <Link
                      to={`/insurance/${company.id}/${plan.id}`}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-3 px-4 rounded-xl border transition-all duration-200 cursor-pointer"
                      style={getButtonStyle()}
                      onMouseEnter={handleButtonEnter}
                      onMouseLeave={handleButtonLeave}
                    >
                      View Details <FiChevronRight />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

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
                  Information used for the {company.name || 'Tata AIG'} plans and policy details.
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
