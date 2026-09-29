import React, { useState, useMemo, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiShare2, FiCheck, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { companiesData } from '../data/companies';
import { fetchPublicCompanies, fetchPublicPlan } from '../services/publicApiService';
import CompareForm from '../components/CompareForm';
import { getComparisonSections, BENEFIT_CATEGORIES } from '../utils/compareDataHelper';
import { exportComparisonToPDF } from '../utils/pdfExportHelper';


// ─── Helpers ────────────────────────────────────────────────────────────────

/** Normalise a cell value to a plain string for equality comparison */
const normaliseValue = (val) => {
  if (Array.isArray(val)) return val.join('|').toLowerCase().trim();
  return String(val || '').toLowerCase().trim();
};

/** Returns true if both sides of a feature row are considered equal */
const valuesAreEqual = (v1, v2) => normaliseValue(v1) === normaliseValue(v2);

/**
 * Filter comparisonSections according to the active BENEFIT_CATEGORIES entry.
 * - If cat.sections is absent → return all sections unchanged.
 * - If cat.featureKeywords is absent → include entire matched sections.
 * - If cat.featureKeywords is present → drill into groups/features and keep
 *   only rows whose title matches at least one keyword.
 */
const filterByCategory = (sections, cat) => {
  if (!cat || cat.id === 'all' || !cat.sections) return sections;

  const matchedSections = sections.filter(s => cat.sections.includes(s.title));
  if (!cat.featureKeywords) return matchedSections;

  const kw = cat.featureKeywords.map(k => k.toLowerCase());
  const featureMatches = (title) => kw.some(k => title.toLowerCase().includes(k));

  return matchedSections.map(section => {
    if (section.isGrouped) {
      const filteredGroups = section.groups
        .map(group => ({
          ...group,
          features: group.features.filter(f => featureMatches(f.title)),
        }))
        .filter(g => g.features.length > 0);
      return filteredGroups.length ? { ...section, groups: filteredGroups } : null;
    } else {
      const filteredFeatures = section.features.filter(f => featureMatches(f.title));
      return filteredFeatures.length ? { ...section, features: filteredFeatures } : null;
    }
  }).filter(Boolean);
};

/** Remove rows where both values are identical (for "Show Only Differences" mode) */
const filterDiffsOnly = (sections) => {
  return sections.map(section => {
    if (section.isGrouped) {
      const filteredGroups = section.groups
        .map(group => ({
          ...group,
          features: group.features.filter(f => !valuesAreEqual(f.val1, f.val2)),
        }))
        .filter(g => g.features.length > 0);
      return filteredGroups.length ? { ...section, groups: filteredGroups } : null;
    } else {
      const filteredFeatures = section.features.filter(f => !valuesAreEqual(f.val1, f.val2));
      return filteredFeatures.length ? { ...section, features: filteredFeatures } : null;
    }
  }).filter(Boolean);
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const CategorySeparator = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="pt-8 pb-3 flex items-center justify-center gap-3 px-4"
  >
    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-slate-200/80" />
    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full">
      {title}
    </span>
    <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-slate-200/80" />
  </motion.div>
);

const GroupHeader = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.3 }}
    className="pt-4 pb-1.5 px-3 sm:px-5 text-left"
  >
    <div className="flex items-center gap-1.5 text-emerald-600">
      <span className="text-xs sm:text-sm font-black select-none">▌</span>
      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
        {title}
      </span>
    </div>
    <div className="h-[1px] w-full bg-slate-100 mt-1" />
  </motion.div>
);

const FeatureRow = ({ title, val1, val2, highlightDiff }) => {
  const isDiff = highlightDiff && !valuesAreEqual(val1, val2);

  const renderValue = (val) => {
    if (Array.isArray(val)) {
      return (
        <ul className="text-left space-y-1 list-none pl-0 w-full">
          {val.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-1 text-[11px] sm:text-xs font-semibold text-slate-600 leading-tight">
              <span className="text-emerald-500 shrink-0 select-none">•</span>
              <span className="comparison-value-text">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    const textVal = String(val || '').trim();
    const lowerVal = textVal.toLowerCase();

    const isYes = lowerVal === 'yes' || lowerVal === 'available' || lowerVal.includes('✓') || lowerVal === 'covered' || lowerVal.startsWith('covered');
    const isNo = lowerVal === 'no' || lowerVal === 'not available' || lowerVal.includes('✕') || lowerVal === 'not covered' || lowerVal.startsWith('not covered');

    if (isYes) {
      const cleanText = textVal.replace(/^[✓\s]+/, '').replace(/covered/i, 'Covered').replace(/available/i, 'Available').replace(/yes/i, 'Yes');
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50 comparison-badge">
          <span className="text-[11px] sm:text-xs select-none">✓</span>
          <span>{cleanText || 'Covered'}</span>
        </span>
      );
    }
    if (isNo) {
      const cleanText = textVal.replace(/^[✕\s]+/, '').replace(/not covered/i, 'Not Covered').replace(/not available/i, 'Not Available').replace(/no/i, 'No');
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100/50 comparison-badge">
          <span className="text-[11px] sm:text-xs select-none">✕</span>
          <span>{cleanText || 'Not Covered'}</span>
        </span>
      );
    }
    return (
      <span className="text-slate-700 font-semibold text-[11px] sm:text-xs leading-normal break-words comparison-value-text">
        {textVal}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(220px,1.8fr)_minmax(150px,1fr)_minmax(150px,1fr)] gap-2 sm:gap-4 items-center py-2 sm:py-2.5 px-3 sm:px-5 border-b border-slate-100/60 last:border-0 transition-colors comparison-grid-row ${isDiff
        ? 'bg-amber-50/40 border-l-2 border-l-amber-300/70 hover:bg-amber-50/60'
        : 'hover:bg-slate-50/30'
        }`}
    >
      <span className="text-slate-800 font-bold text-[11px] sm:text-xs tracking-tight text-left leading-tight sm:leading-relaxed comparison-feature-title">
        {title}
      </span>
      <div className="flex justify-center text-center pl-1 shrink-0 w-full min-w-0 comparison-cell">
        {renderValue(val1)}
      </div>
      <div className="flex justify-center text-center pl-1 shrink-0 w-full min-w-0 comparison-cell">
        {renderValue(val2)}
      </div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ComparisonPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const c1 = searchParams.get('c1');
  const c2 = searchParams.get('c2');
  const p1 = searchParams.get('p1');
  const p2 = searchParams.get('p2');
  const selectedCoverage = searchParams.get('cov') || '20';

  const [isGenerating, setIsGenerating] = useState(false);
  const [exportStatus, setExportStatus] = useState('idle');
  const [toastMessage, setToastMessage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDiffsOnly, setShowDiffsOnly] = useState(false);

  const chipScrollRef = useRef(null);

  const [liveCompanies, setLiveCompanies] = useState(companiesData);
  const [dynamicPlan1Data, setDynamicPlan1Data] = useState(null);
  const [dynamicPlan2Data, setDynamicPlan2Data] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchPublicCompanies().then((res) => {
      if (mounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setLiveCompanies(res.data);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Resolve companies and plans from data (with live Supabase data + offline fallback)
  const company1 = liveCompanies.find(c => c.id === c1 || c.slug === c1) || companiesData.find(c => c.id === c1 || c.slug === c1);
  const company2 = liveCompanies.find(c => c.id === c2 || c.slug === c2) || companiesData.find(c => c.id === c2 || c.slug === c2);
  const basePlan1 = company1?.plans?.find(p => p.id === p1 || p.slug === p1);
  const basePlan2 = company2?.plans?.find(p => p.id === p2 || p.slug === p2);

  // Load detailed CMS sections for plans from Supabase backend
  useEffect(() => {
    let mounted = true;
    if (company1 && basePlan1) {
      const cSlug = company1.slug || company1.id;
      const pSlug = basePlan1.slug || basePlan1.id;
      fetchPublicPlan(cSlug, pSlug).then(res => {
        if (mounted && res.success && res.data) {
          setDynamicPlan1Data(res.data);
        }
      });
    }
    if (company2 && basePlan2) {
      const cSlug = company2.slug || company2.id;
      const pSlug = basePlan2.slug || basePlan2.id;
      fetchPublicPlan(cSlug, pSlug).then(res => {
        if (mounted && res.success && res.data) {
          setDynamicPlan2Data(res.data);
        }
      });
    }
    return () => { mounted = false; };
  }, [c1, c2, p1, p2]);

  const plan1 = useMemo(() => {
    if (!basePlan1) return null;
    if (dynamicPlan1Data) {
      return {
        ...basePlan1,
        planData: {
          ...(basePlan1.planData || {}),
          ...dynamicPlan1Data
        }
      };
    }
    return basePlan1;
  }, [basePlan1, dynamicPlan1Data]);

  const plan2 = useMemo(() => {
    if (!basePlan2) return null;
    if (dynamicPlan2Data) {
      return {
        ...basePlan2,
        planData: {
          ...(basePlan2.planData || {}),
          ...dynamicPlan2Data
        }
      };
    }
    return basePlan2;
  }, [basePlan2, dynamicPlan2Data]);

  const hasValidParams = company1 && company2 && plan1 && plan2;

  const comparisonSections = useMemo(() => {
    if (!hasValidParams) return [];

    return getComparisonSections(
      plan1,
      company1,
      plan2,
      company2
    );
  }, [hasValidParams, plan1, company1, plan2, company2]);

  const filteredSections = useMemo(() => {
    const cat = BENEFIT_CATEGORIES.find(
      c => c.id === activeCategory
    );

    let sections = filterByCategory(
      comparisonSections,
      cat
    );

    if (showDiffsOnly) {
      sections = filterDiffsOnly(sections);
    }

    return sections;
  }, [
    comparisonSections,
    activeCategory,
    showDiffsOnly
  ]);

  // PDF Export handler
  const handleExportPDF = async () => {
    if (!hasValidParams || isGenerating || exportStatus !== 'idle') return;
    try {
      setIsGenerating(true);
      setExportStatus('generating');
      const result = await exportComparisonToPDF(plan1, company1, plan2, company2, () => {
        setExportStatus('downloaded');
      });
      if (result.shared) {
        setToastMessage('PDF downloaded & shared successfully!');
      } else if (result.unsupported) {
        setToastMessage('PDF downloaded successfully. Direct sharing is not supported on this browser.');
      } else {
        setToastMessage('PDF downloaded successfully.');
      }
      setTimeout(() => setExportStatus('idle'), 3000);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setExportStatus('idle');
      setToastMessage('Unable to generate PDF. Please try again.');
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Fallback: selection form ─────────────────────────────────────────────
  if (!hasValidParams) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 font-sans relative overflow-hidden flex items-center">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#059669]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
              <FiArrowLeft className="text-sm" /> Return to Home
            </Link>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-3 py-1 rounded-full">
                Compare Health Policies
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-display">
                Plan Comparison Suite
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                Select two different health insurance providers and their specific plans below to analyze and compare features, ratios, and waiting periods side-by-side.
              </p>
            </div>
            <CompareForm
              initialCompany1Id={c1}
              initialCompany2Id={c2}
              initialPlan1Id={p1}
              initialPlan2Id={p2}
            />
          </div>
        </div>
      </div>
    );
  }


  // Chip scroll helpers
  const scrollChips = (dir) => {
    if (chipScrollRef.current) {
      chipScrollRef.current.scrollBy({ left: dir * 120, behavior: 'smooth' });
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 font-sans relative overflow-x-clip comparison-page-wrapper">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#059669]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 comparison-container">

        {/* Back link */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <FiArrowLeft className="text-sm" /> Back to Search
          </Link>
        </div>

        {/* Page title + PDF export */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight font-display animate-fade-in">
            Compare Plans
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 max-w-md mx-auto">
            Side-by-side analysis of features, coverage, waiting periods and ratios
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleExportPDF}
              disabled={isGenerating}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer ${exportStatus === 'generating'
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : exportStatus === 'downloaded'
                  ? 'bg-emerald-700 text-white border border-emerald-600 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/80 hover:shadow-lg'
                }`}
            >
              {exportStatus === 'generating' ? (
                <><span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin shrink-0" /><span>Generating PDF...</span></>
              ) : exportStatus === 'downloaded' ? (
                <><FiCheck className="text-sm sm:text-base text-white shrink-0" /><span>PDF Downloaded</span></>
              ) : (
                <><FiShare2 className="text-sm sm:text-base shrink-0" /><span>Export Comparison to PDF</span></>
              )}
            </button>
          </div>
        </div>

        {/* ── Plan header cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:gap-8 items-stretch max-w-4xl mx-auto mb-6 sm:mb-10 comparison-header-cards">

          {/* Plan 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="rounded-xl sm:rounded-3xl border border-slate-100 bg-white p-3 sm:p-6 lg:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden comparison-header-card"
            style={{ borderTop: `4px solid ${company1.theme.primary}` }}
          >
            <div className="space-y-2 sm:space-y-4 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100/80 p-1 sm:p-2 flex items-center justify-center shrink-0"
              >
                <img src={company1.logo} alt={company1.name} className="w-full h-full object-contain" />
              </motion.div>
              <div className="space-y-0.5 sm:space-y-1 w-full min-w-0">
                <span className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block truncate">
                  {company1.name}
                </span>
                <h2 className="text-xs sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
                  {plan1.name}
                </h2>
              </div>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100/80 flex flex-col items-center gap-2">
              <span className="text-xs sm:text-base lg:text-lg font-black text-emerald-600 block uppercase tracking-wider animate-fade-in">
                ₹{selectedCoverage} Lakh Coverage
              </span>
              <button
                type="button"
                onClick={() => navigate('/compare')}
                className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer group"
              >
                <FiRefreshCw className="text-[9px] sm:text-[10px] group-hover:rotate-180 transition-transform duration-300" />
                Change Plan
              </button>
            </div>
          </motion.div>

          {/* Plan 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="rounded-xl sm:rounded-3xl border border-slate-100 bg-white p-3 sm:p-6 lg:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden comparison-header-card"
            style={{ borderTop: `4px solid ${company2.theme.primary}` }}
          >
            <div className="space-y-2 sm:space-y-4 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100/80 p-1 sm:p-2 flex items-center justify-center shrink-0"
              >
                <img src={company2.logo} alt={company2.name} className="w-full h-full object-contain" />
              </motion.div>
              <div className="space-y-0.5 sm:space-y-1 w-full min-w-0">
                <span className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block truncate">
                  {company2.name}
                </span>
                <h2 className="text-xs sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
                  {plan2.name}
                </h2>
              </div>
            </div>
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100/80 flex flex-col items-center gap-2">
              <span className="text-xs sm:text-base lg:text-lg font-black text-emerald-600 block uppercase tracking-wider animate-fade-in">
                ₹{selectedCoverage} Lakh Coverage
              </span>
              <button
                type="button"
                onClick={() => navigate('/compare')}
                className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer group"
              >
                <FiRefreshCw className="text-[9px] sm:text-[10px] group-hover:rotate-180 transition-transform duration-300" />
                Change Plan
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── "What do you want to compare?" — category filter chips ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-6 sm:mb-8"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xs px-4 sm:px-6 py-4 sm:py-5">
            <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">
              What do you want to compare?
            </p>
            <div className="flex items-center gap-1.5">
              {/* Left scroll arrow */}
              <button
                type="button"
                onClick={() => scrollChips(-1)}
                className="hidden sm:flex w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 items-center justify-center text-slate-500 shrink-0 transition-colors cursor-pointer"
                aria-label="Scroll chips left"
              >
                <FiChevronLeft className="text-xs" />
              </button>

              {/* Scrollable chip row */}
              <div
                ref={chipScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto flex-1 pb-0.5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {BENEFIT_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold border transition-all duration-150 cursor-pointer whitespace-nowrap ${isActive
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-50 text-slate-500 border-slate-200/80 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Right scroll arrow */}
              <button
                type="button"
                onClick={() => scrollChips(1)}
                className="hidden sm:flex w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 items-center justify-center text-slate-500 shrink-0 transition-colors cursor-pointer"
                aria-label="Scroll chips right"
              >
                <FiChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto">

          {/* Sticky header + differences toggle */}
          <div className="sticky top-[76px] z-30 bg-[#F8FAFC]/95 backdrop-blur-md border border-slate-200/60 shadow-xs rounded-2xl mb-4 sm:mb-6 comparison-sticky-header">

            {/* Differences toggle */}
            <div className="flex items-center justify-end px-3 sm:px-5 pt-2.5 pb-1">
              <div className="flex items-center gap-0.5 bg-slate-100 rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setShowDiffsOnly(false)}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold transition-all duration-150 cursor-pointer ${!showDiffsOnly ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  All Benefits
                </button>
                <button
                  type="button"
                  onClick={() => setShowDiffsOnly(true)}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold transition-all duration-150 cursor-pointer ${showDiffsOnly ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  Show Only Differences
                </button>
              </div>
            </div>

            {/* Column labels */}
            <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(220px,1.8fr)_minmax(150px,1fr)_minmax(150px,1fr)] gap-2 sm:gap-4 items-center py-2.5 px-3 sm:px-5">
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                FEATURE
              </span>
              <div className="flex items-center gap-1.5 justify-center">
                <img src={company1.logo} alt={company1.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0" />
                <span className="text-[10px] sm:text-xs font-black text-slate-800 uppercase tracking-tight truncate max-w-[60px] sm:max-w-none">
                  {company1.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <img src={company2.logo} alt={company2.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0" />
                <span className="text-[10px] sm:text-xs font-black text-slate-800 uppercase tracking-tight truncate max-w-[60px] sm:max-w-none">
                  {company2.name}
                </span>
              </div>
            </div>
          </div>

          {/* Sections — animated on filter change */}
          <AnimatePresence mode="wait">
            {filteredSections.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-2"
              >
                <span className="text-2xl select-none">🎯</span>
                <p className="text-sm font-bold text-slate-500">
                  {showDiffsOnly
                    ? 'Both plans are identical on this category — no differences to show.'
                    : 'No data available for this filter.'}
                </p>
                <button
                  type="button"
                  onClick={() => { setActiveCategory('all'); setShowDiffsOnly(false); }}
                  className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                >
                  Show all benefits →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${showDiffsOnly}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {filteredSections.map((section, catIdx) => (
                  <div key={catIdx} className="space-y-3">
                    <CategorySeparator title={section.title} />
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                      {section.isGrouped ? (
                        section.groups.map((group, groupIdx) => (
                          <React.Fragment key={groupIdx}>
                            <GroupHeader title={group.title} />
                            {group.features.map((feature, featIdx) => (
                              <FeatureRow
                                key={featIdx}
                                title={feature.title}
                                val1={feature.val1}
                                val2={feature.val2}
                                highlightDiff={!showDiffsOnly}
                              />
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        section.features.map((feature, featIdx) => (
                          <FeatureRow
                            key={featIdx}
                            title={feature.title}
                            val1={feature.val1}
                            val2={feature.val2}
                            highlightDiff={!showDiffsOnly}
                          />
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toast notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 text-xs font-bold pointer-events-auto"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}



