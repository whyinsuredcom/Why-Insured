import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiAlertCircle } from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { fetchPublicCompanies } from '../services/publicApiService';
import { getPlanSupportedCoverages, STANDARD_COVERAGE_OPTIONS } from '../utils/compareDataHelper';

export default function CompareForm({
  onClose,
  onSubmenuStateChange,
  initialCompany1Id,
  initialCompany2Id,
  initialPlan1Id,
  initialPlan2Id,
  initialCoverage1,
  initialCoverage2,
  initialCoverage
}) {
  const navigate = useNavigate();

  // Dynamic companies list from Supabase with instant local fallback
  const [companiesList, setCompaniesList] = useState(companiesData);

  useEffect(() => {
    let mounted = true;
    fetchPublicCompanies().then((res) => {
      if (mounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setCompaniesList(res.data);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Selection states
  const [company1, setCompany1] = useState(() => {
    if (initialCompany1Id) {
      return companiesData.find(c => c.id === initialCompany1Id || c.slug === initialCompany1Id) || null;
    }
    return null;
  });
  const [company2, setCompany2] = useState(() => {
    if (initialCompany2Id) {
      return companiesData.find(c => c.id === initialCompany2Id || c.slug === initialCompany2Id) || null;
    }
    return null;
  });
  const [plan1, setPlan1] = useState(() => {
    if (initialCompany1Id && initialPlan1Id) {
      const comp = companiesData.find(c => c.id === initialCompany1Id || c.slug === initialCompany1Id);
      return comp?.plans.find(p => p.id === initialPlan1Id) || null;
    }
    return null;
  });
  const [plan2, setPlan2] = useState(() => {
    if (initialCompany2Id && initialPlan2Id) {
      const comp = companiesData.find(c => c.id === initialCompany2Id || c.slug === initialCompany2Id);
      return comp?.plans.find(p => p.id === initialPlan2Id) || null;
    }
    return null;
  });

  // Dropdown open states
  const [c1Open, setC1Open] = useState(false);
  const [c2Open, setC2Open] = useState(false);
  const [p1Open, setP1Open] = useState(false);
  const [p2Open, setP2Open] = useState(false);
  const [covOpen, setCovOpen] = useState(false);
  const [cov1Open, setCov1Open] = useState(false);
  const [cov2Open, setCov2Open] = useState(false);

  // Coverage selection states:
  // Desktop: independent Plan 1 & Plan 2 coverage
  // Tablet & Mobile: single common coverage
  const [coverage, setCoverage] = useState(() => Number(initialCoverage) || Number(initialCoverage1) || 20);
  const [coverage1, setCoverage1] = useState(() => Number(initialCoverage1) || Number(initialCoverage) || 20);
  const [coverage2, setCoverage2] = useState(() => Number(initialCoverage2) || Number(initialCoverage) || 20);

  // Supported coverages derived from each respective plan
  const plan1Coverages = useMemo(() => getPlanSupportedCoverages(plan1), [plan1]);
  const plan2Coverages = useMemo(() => getPlanSupportedCoverages(plan2), [plan2]);
  const coverageOptions = STANDARD_COVERAGE_OPTIONS;

  // Clamp Plan 1 coverage to supported range when plan1 changes
  useEffect(() => {
    if (plan1 && plan1Coverages.length > 0) {
      if (!plan1Coverages.includes(coverage1)) {
        const closest = plan1Coverages.reduce((prev, curr) =>
          Math.abs(curr - coverage1) < Math.abs(prev - coverage1) ? curr : prev
        , plan1Coverages[0]);
        setCoverage1(closest);
      }
    }
  }, [plan1, plan1Coverages]);

  // Clamp Plan 2 coverage to supported range when plan2 changes
  useEffect(() => {
    if (plan2 && plan2Coverages.length > 0) {
      if (!plan2Coverages.includes(coverage2)) {
        const closest = plan2Coverages.reduce((prev, curr) =>
          Math.abs(curr - coverage2) < Math.abs(prev - coverage2) ? curr : prev
        , plan2Coverages[0]);
        setCoverage2(closest);
      }
    }
  }, [plan2, plan2Coverages]);

  // Validation flag: Plan selectors are enabled only after both companies are selected
  const plansEnabled = company1 !== null && company2 !== null;

  // Validation flag: "Compare Now" enabled only if all selections are complete
  const canCompare = company1 && company2 && plan1 && plan2;

  const anyOpen = c1Open || c2Open || p1Open || p2Open || covOpen || cov1Open || cov2Open;
  useEffect(() => {
    if (onSubmenuStateChange) {
      onSubmenuStateChange(anyOpen);
    }
  }, [anyOpen, onSubmenuStateChange]);

  // Handle Company 1 selection
  const handleSelectCompany1 = (company) => {
    setCompany1(company);
    setPlan1(null); // Reset plan 1 since company changed
    setC1Open(false);

    // If company 2 is already the same, clear it to prevent self-comparison
    if (company2 && company2.id === company.id) {
      setCompany2(null);
      setPlan2(null);
    }
  };

  // Handle Company 2 selection
  const handleSelectCompany2 = (company) => {
    if (company1 && company1.id === company.id) {
      return; // Prevent selection of the same company
    }
    setCompany2(company);
    setPlan2(null); // Reset plan 2 since company changed
    setC2Open(false);
  };

  const handleCompareNow = () => {
    if (!canCompare) return;

    // Navigate to ComparisonPage with selected parameters and independent coverages
    navigate(`/compare?c1=${company1.id}&c2=${company2.id}&p1=${plan1.id}&p2=${plan2.id}&cov1=${coverage1}&cov2=${coverage2}&cov=${coverage1}`);

    // Close the dropdown parent if provided (e.g. Navbar menu)
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full font-sans text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        
        {/* Company Selectors: Side-by-side on all viewports */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:col-span-2">
          {/* ==================== 1. COMPANY 1 ==================== */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Company 1
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setC1Open(!c1Open);
                  setC2Open(false);
                  setP1Open(false);
                  setP2Open(false);
                }}
                className="w-full min-h-[46px] flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-200 text-left text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer min-w-0"
              >
                {company1 ? (
                  <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white rounded-lg p-0.5 sm:p-1 shrink-0 border border-slate-100">
                      <img src={company1.logo} alt={company1.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="truncate">{company1.name}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">Select Company</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 shrink-0 ${c1Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {c1Open && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setC1Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto py-2"
                    >
                      {companiesList.map((company) => (
                        <button
                          key={company.id}
                          type="button"
                          onClick={() => handleSelectCompany1(company)}
                          className="w-full flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-50 text-left text-[11px] sm:text-xs font-bold text-slate-600 transition-colors min-w-0"
                        >
                          <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-0.5 sm:p-1 shrink-0">
                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="truncate">{company.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ==================== 2. COMPANY 2 ==================== */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Company 2
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setC2Open(!c2Open);
                  setC1Open(false);
                  setP1Open(false);
                  setP2Open(false);
                }}
                className="w-full min-h-[46px] flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-200 text-left text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer min-w-0"
              >
                {company2 ? (
                  <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white rounded-lg p-0.5 sm:p-1 shrink-0 border border-slate-100">
                      <img src={company2.logo} alt={company2.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="truncate">{company2.name}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">Select Company</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 shrink-0 ${c2Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {c2Open && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setC2Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto py-2"
                    >
                      {companiesList.map((company) => {
                        const isSame = company1 && company.id === company1.id;
                        return (
                          <button
                            key={company.id}
                            type="button"
                            disabled={isSame}
                            onClick={() => handleSelectCompany2(company)}
                            className={`w-full flex items-center justify-between px-2 sm:px-4 py-2 sm:py-2.5 text-left text-[11px] sm:text-xs font-bold transition-colors min-w-0 ${
                              isSame 
                                ? 'bg-slate-50/50 text-slate-300 cursor-not-allowed' 
                                : 'hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                              <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-0.5 sm:p-1 shrink-0 opacity-80">
                                <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                              </div>
                              <span className="truncate">{company.name}</span>
                            </div>
                            {isSame && (
                              <span className="text-[7.5px] sm:text-[9px] font-extrabold text-amber-500 bg-amber-50 border border-amber-100 px-1 sm:px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-0.5">
                                <FiAlertCircle className="hidden sm:inline-block" /> Same
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* Subtle validation message below Company 2 if Company 1 is selected */}
            {company1 && !company2 && (
              <span className="text-[9px] sm:text-[10px] text-amber-500 font-semibold mt-1.5 block pl-0.5 animate-pulse">
                Please select a different company.
              </span>
            )}
          </div>
        </div>

        {/* Plan Selectors: Side-by-side on all viewports */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:col-span-2">
          {/* ==================== 3. PLAN 1 ==================== */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Plan 1
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!plansEnabled}
                onClick={() => {
                  setP1Open(!p1Open);
                  setC1Open(false);
                  setC2Open(false);
                  setP2Open(false);
                  setCovOpen(false);
                  setCov1Open(false);
                  setCov2Open(false);
                }}
                className={`w-full min-h-[46px] flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 border rounded-2xl transition-all duration-200 text-left text-xs sm:text-sm font-semibold cursor-pointer min-w-0 ${
                  plansEnabled 
                    ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700' 
                    : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
                }`}
              >
                {plan1 ? (
                  <div className="flex flex-col min-w-0 w-full pr-1">
                    <span className="text-slate-700 truncate">{plan1.name}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">Select Plan</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 shrink-0 ${p1Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {p1Open && plansEnabled && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setP1Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto py-2"
                    >
                      {(company1.plans || []).filter(p => !p.hasVariants).map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => {
                            setPlan1(plan);
                            setP1Open(false);
                          }}
                          className="w-full px-2 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-50 text-left transition-colors flex flex-col gap-0.5 min-w-0"
                        >
                          <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate w-full">{plan.name}</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold line-clamp-1 w-full">{plan.description}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ==================== 4. PLAN 2 ==================== */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Plan 2
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!plansEnabled}
                onClick={() => {
                  setP2Open(!p2Open);
                  setC1Open(false);
                  setC2Open(false);
                  setP1Open(false);
                  setCovOpen(false);
                  setCov1Open(false);
                  setCov2Open(false);
                }}
                className={`w-full min-h-[46px] flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 border rounded-2xl transition-all duration-200 text-left text-xs sm:text-sm font-semibold cursor-pointer min-w-0 ${
                  plansEnabled 
                    ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700' 
                    : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
                }`}
              >
                {plan2 ? (
                  <div className="flex flex-col min-w-0 w-full pr-1">
                    <span className="text-slate-700 truncate">{plan2.name}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">Select Plan</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 shrink-0 ${p2Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {p2Open && plansEnabled && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setP2Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto py-2"
                    >
                      {(company2.plans || []).filter(p => !p.hasVariants).map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => {
                            setPlan2(plan);
                            setP2Open(false);
                          }}
                          className="w-full px-2 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-50 text-left transition-colors flex flex-col gap-0.5 min-w-0"
                        >
                          <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate w-full">{plan.name}</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold line-clamp-1 w-full">{plan.description}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ==================== 5. DESKTOP ONLY: TWO INDEPENDENT COVERAGE SELECTORS ==================== */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-3 sm:gap-5 md:col-span-2">
          {/* Plan 1 – Select Coverage */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Plan 1 – Select Coverage
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!plan1}
                onClick={() => {
                  setCov1Open(!cov1Open);
                  setC1Open(false);
                  setC2Open(false);
                  setP1Open(false);
                  setP2Open(false);
                  setCovOpen(false);
                  setCov2Open(false);
                }}
                className={`w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 border rounded-2xl transition-all duration-200 text-left text-sm font-semibold cursor-pointer ${
                  plan1
                    ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700'
                    : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
                }`}
              >
                {plan1 ? (
                  <span className="text-slate-700">
                    {coverage1 >= 100 ? `₹${coverage1 / 100} Crore` : `₹${coverage1} Lakh`}
                  </span>
                ) : (
                  <span className="text-slate-400">Select Coverage</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 ${cov1Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {cov1Open && plan1 && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setCov1Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-52 overflow-y-auto py-2"
                    >
                      {plan1Coverages.map((cov) => (
                        <button
                          key={cov}
                          type="button"
                          onClick={() => {
                            setCoverage1(cov);
                            setCov1Open(false);
                          }}
                          className={`w-full px-4 py-2.5 hover:bg-slate-50 text-left transition-colors text-xs font-bold ${
                            coverage1 === cov ? 'text-emerald-600 bg-emerald-50/40' : 'text-slate-600'
                          }`}
                        >
                          {cov >= 100 ? `₹${cov / 100} Crore` : `₹${cov} Lakh`}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Plan 2 – Select Coverage */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
              Plan 2 – Select Coverage
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!plan2}
                onClick={() => {
                  setCov2Open(!cov2Open);
                  setC1Open(false);
                  setC2Open(false);
                  setP1Open(false);
                  setP2Open(false);
                  setCovOpen(false);
                  setCov1Open(false);
                }}
                className={`w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 border rounded-2xl transition-all duration-200 text-left text-sm font-semibold cursor-pointer ${
                  plan2
                    ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700'
                    : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
                }`}
              >
                {plan2 ? (
                  <span className="text-slate-700">
                    {coverage2 >= 100 ? `₹${coverage2 / 100} Crore` : `₹${coverage2} Lakh`}
                  </span>
                ) : (
                  <span className="text-slate-400">Select Coverage</span>
                )}
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 ${cov2Open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {cov2Open && plan2 && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setCov2Open(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-52 overflow-y-auto py-2"
                    >
                      {plan2Coverages.map((cov) => (
                        <button
                          key={cov}
                          type="button"
                          onClick={() => {
                            setCoverage2(cov);
                            setCov2Open(false);
                          }}
                          className={`w-full px-4 py-2.5 hover:bg-slate-50 text-left transition-colors text-xs font-bold ${
                            coverage2 === cov ? 'text-emerald-600 bg-emerald-50/40' : 'text-slate-600'
                          }`}
                        >
                          {cov >= 100 ? `₹${cov / 100} Crore` : `₹${cov} Lakh`}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ==================== 6. TABLET ONLY: PRESERVED RESPONSIVE DESIGN (SINGLE FULL-WIDTH) ==================== */}
        <div className="hidden md:block lg:hidden md:col-span-2 space-y-1.5">
          <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
            Coverage
          </label>
          <div className="relative">
            <button
              type="button"
              disabled={!plan1 || !plan2}
              onClick={() => {
                setCovOpen(!covOpen);
                setC1Open(false);
                setC2Open(false);
                setP1Open(false);
                setP2Open(false);
                setCov1Open(false);
                setCov2Open(false);
              }}
              className={`w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 border rounded-2xl transition-all duration-200 text-left text-sm font-semibold cursor-pointer ${
                (plan1 && plan2) 
                  ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700' 
                  : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
              }`}
            >
              {(plan1 && plan2) ? (
                <span className="text-slate-700">
                  {coverage >= 100 ? `₹${coverage / 100} Crore` : `₹${coverage} Lakh`}
                </span>
              ) : (
                <span className="text-slate-400">Select Coverage</span>
              )}
              <FiChevronDown className={`text-slate-400 transition-transform duration-200 ${covOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {covOpen && plan1 && plan2 && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setCovOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-52 overflow-y-auto py-2"
                  >
                    {coverageOptions.map((cov) => (
                      <button
                        key={cov}
                        type="button"
                        onClick={() => {
                          setCoverage(cov);
                          setCoverage1(cov);
                          setCoverage2(cov);
                          setCovOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 hover:bg-slate-50 text-left transition-colors text-xs font-bold ${
                          coverage === cov ? 'text-emerald-600 bg-emerald-50/40' : 'text-slate-600'
                        }`}
                      >
                        {cov >= 100 ? `₹${cov / 100} Crore` : `₹${cov} Lakh`}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ==================== 7. MOBILE ONLY: PRESERVED SINGLE COVERAGE SELECTOR ==================== */}
        <div className="block md:hidden col-span-2 space-y-1.5">
          <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5">
            Coverage
          </label>
          <div className="relative">
            <button
              type="button"
              disabled={!plan1 || !plan2}
              onClick={() => {
                setCovOpen(!covOpen);
                setC1Open(false);
                setC2Open(false);
                setP1Open(false);
                setP2Open(false);
                setCov1Open(false);
                setCov2Open(false);
              }}
              className={`w-full min-h-[46px] flex items-center justify-between px-3 py-2.5 border rounded-2xl transition-all duration-200 text-left text-xs sm:text-sm font-semibold cursor-pointer ${
                (plan1 && plan2) 
                  ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700' 
                  : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
              }`}
            >
              {(plan1 && plan2) ? (
                <span className="text-slate-700 truncate">
                  {coverage >= 100 ? `₹${coverage / 100} Crore` : `₹${coverage} Lakh`}
                </span>
              ) : (
                <span className="text-slate-400">Select Coverage</span>
              )}
              <FiChevronDown className={`text-slate-400 transition-transform duration-200 shrink-0 ${covOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {covOpen && plan1 && plan2 && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setCovOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 max-h-52 overflow-y-auto py-2"
                  >
                    {coverageOptions.map((cov) => (
                      <button
                        key={cov}
                        type="button"
                        onClick={() => {
                          setCoverage(cov);
                          setCoverage1(cov);
                          setCoverage2(cov);
                          setCovOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 hover:bg-slate-50 text-left transition-colors text-xs font-bold ${
                          coverage === cov ? 'text-emerald-600 bg-emerald-50/40' : 'text-slate-600'
                        }`}
                      >
                        {cov >= 100 ? `₹${cov / 100} Crore` : `₹${cov} Lakh`}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Compare Button */}
      <div className="flex justify-center pt-2 border-t border-slate-100 mt-5">
        <motion.button
          type="button"
          disabled={!canCompare}
          whileHover={canCompare ? { scale: 1.025, y: -1 } : {}}
          whileTap={canCompare ? { scale: 0.98 } : {}}
          onClick={handleCompareNow}
          className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm shrink-0 flex items-center justify-center gap-2 cursor-pointer ${
            canCompare 
              ? 'bg-[#059669] hover:bg-[#047857] text-white hover:shadow-md' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200/45'
          }`}
        >
          Compare Now
        </motion.button>
      </div>
    </div>
  );
}
