import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft,
  FiX,
  FiCheck,
  FiArrowRight,
  FiPlus,
  FiMinus,
  FiPlay,
  FiChevronDown,
  FiHome,
  FiHeart,
  FiCalendar,
  FiCheckSquare,
  FiCpu,
  FiRefreshCw,
  FiShield,
  FiClipboard,
  FiTrendingUp,
  FiCreditCard,
  FiTruck,
  FiClock,
  FiSmile,
  FiDollarSign,
  FiZap,
  FiUsers,
  FiActivity,
  FiGlobe,
  FiAward,
  FiInfo,
  FiAlertTriangle
} from 'react-icons/fi';
import { getMagmaPlanData, resolveMagmaPlanId } from '../data/magmaPlansData';
import PolicyBenefitsPdfActions from './PolicyBenefitsPdfActions';
import BenefitSearchBar from './BenefitSearchBar';
import { getFilteredAndPrioritizedFeaturesSections, getBenefitSearchResults } from '../utils/benefitSearchHelper';
import { scrollToBenefitCard } from '../utils/scrollToBenefitCard';

// Default demo video URL
const DEFAULT_DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

// Icon Dictionary Mapping by Icon Type
const ICON_MAP = {
  home: FiHome,
  heart: FiHeart,
  calendar: FiCalendar,
  check: FiCheckSquare,
  cpu: FiCpu,
  refresh: FiRefreshCw,
  shield: FiShield,
  clipboard: FiClipboard,
  trending: FiTrendingUp,
  credit: FiCreditCard,
  truck: FiTruck,
  clock: FiClock,
  smile: FiSmile,
  dollar: FiDollarSign,
  zap: FiZap,
  users: FiUsers,
  activity: FiActivity,
  globe: FiGlobe,
  award: FiAward,
  'alert-triangle': FiAlertTriangle
};

// Helper to format YouTube or Direct MP4 URLs
const getVideoEmbedUrl = (url) => {
  if (!url) return { type: 'none', url: '' };
  if (url.includes('youtube.com/embed/')) return { type: 'youtube', url };

  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
  }

  if (url.endsWith('.mp4') || url.includes('.mp4?')) {
    return { type: 'mp4', url };
  }

  return { type: 'iframe', url };
};

// Compact Feature-Wise Inline Video Button Component (Magma Bright Red Theme)
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold bg-[#FFF5F5] text-[#ED1B24] border border-[#ED1B24]/25 hover:bg-[#ED1B24] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group align-middle ml-0.5 sm:ml-1"
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current text-[#ED1B24] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Compact "View Details" Pill Button (Magma Bright Red Theme)
const ViewDetailsPill = ({ onClick, label = "View Details" }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#FFF5F5] text-[#ED1B24] border border-[#ED1B24]/30 hover:bg-[#ED1B24] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
  >
    <FiInfo className="text-[9px] text-[#ED1B24] group-hover:text-white" />
    <span>{label}</span>
  </button>
);

// Premium "WATCH VIDEO" button (Magma Bright Red Theme)
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#ED1B24] border border-[#ED1B24]/25 hover:bg-[#ED1B24] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#ED1B24] group-hover:text-white transition-colors" />
      <span>WATCH VIDEO</span>
    </button>
  </div>
);

// Premium In-Page Video Lightbox Modal
const FeatureVideoModal = ({ isOpen, onClose, videoTitle, videoUrl }) => {
  if (!isOpen || !videoUrl) return null;

  const embedData = getVideoEmbedUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
        style={{ width: 'calc(100vw - 32px)', maxWidth: '900px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-950 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B24]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#ED1B24] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <FiX />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {embedData.type === 'mp4' ? (
            <video
              src={embedData.url}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={embedData.url}
              title={videoTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Magma Features Accordion Items (Tested Reference Pattern)
function MagmaFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  onOpenDetailsModal,
  demoVideoUrl
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, points, steps, tierData, hasDetailsModal, detailsModalTitle, detailsModalContent, isRider, iconType } = item;
  const IconComponent = (iconType && ICON_MAP[iconType]) || FiCheckSquare;

  return (
    <motion.div
      ref={itemRef}
      data-benefit-id={id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.04, ease: "easeOut" }}
      onClick={() => onToggle(id, itemRef)}
      className={`transition-all duration-200 cursor-pointer rounded-xl sm:rounded-2xl border overflow-hidden select-none flex flex-col justify-between ${
        item._isMatched
          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
          : isExpanded
          ? 'bg-[#FFF5F5]/90 border-[#ED1B24]/60 shadow-md ring-1 ring-[#ED1B24]/20'
          : 'bg-white border-slate-200/80 hover:border-[#ED1B24]/40 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-3 sm:p-4 flex items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded ? 'bg-[#ED1B24] text-white shadow-xs' : 'bg-[#FFF5F5] text-[#ED1B24]'
            }`}>
              <IconComponent className="text-xs sm:text-base" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <h3 className="text-xs sm:text-sm font-extrabold font-display leading-tight sm:leading-snug text-[#000000]">
                {title}
              </h3>
              {onOpenVideo && (
                <VideoButton featureTitle={title} onOpenVideo={onOpenVideo} videoUrl={demoVideoUrl} />
              )}
              {hasDetailsModal && onOpenDetailsModal && (
                <ViewDetailsPill
                  label="View Details"
                  onClick={() => onOpenDetailsModal(detailsModalTitle || title, detailsModalContent || summary)}
                />
              )}
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/80 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {isRider && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#ED1B24]/10 text-[#ED1C24] border border-[#ED1B24]/20 tracking-wide shrink-0">
                  Optional / Add-on
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[10px] sm:text-xs font-semibold mt-0.5 leading-tight sm:leading-snug text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Controls: Plus/Minus Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
            isExpanded ? 'bg-[#ED1B24] text-white rotate-180' : 'bg-[#FFF5F5] text-[#ED1B24]'
          }`}>
            {isExpanded ? (
              <FiMinus className="text-[10px] sm:text-xs stroke-[2.5]" />
            ) : (
              <FiPlus className="text-[10px] sm:text-xs stroke-[2.5]" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Summary & Details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 sm:px-4 sm:pb-4 border-t border-slate-100/80 text-slate-600 space-y-2 sm:space-y-2.5">
              {/* Contextual Badge */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {badge && (
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FFF5F5] text-[#ED1B24] border border-[#ED1B24]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ED1B24]" />
                    {badge}
                  </span>
                )}
              </div>

              {/* Short explanation / Details */}
              <div className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-600">
                {summary}
              </div>

              {/* Key Highlights */}
              {points && points.length > 0 && (
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1.5">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Coverage Highlights
                  </div>
                  <ul className="space-y-1">
                    {points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-700 font-medium">
                        <FiCheck className="text-[#ED1B24] mt-0.5 shrink-0 text-xs" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Compact Tier Breakdown Mini-Table if present */}
              {tierData && tierData.tiers && (
                <div className="mt-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80">
                  <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {tierData.title || 'Coverage Tiers'}
                  </div>
                  <div className="divide-y divide-slate-100 text-[10px] sm:text-xs">
                    {tierData.tiers.map((tItem, tIdx) => (
                      <div key={tIdx} className="py-1 flex items-center justify-between">
                        <span className="font-semibold text-slate-700">{tItem.tier}</span>
                        <span className="font-bold text-[#ED1B24]">{tItem.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Steps if present */}
              {steps && steps.length > 0 && (
                <div className="mt-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                    {steps.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <div className="px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs text-[9px] sm:text-[11px] font-black text-[#000000]">
                          {step}
                        </div>
                        {sIdx < steps.length - 1 && (
                          <span className="text-[9px] sm:text-xs font-extrabold text-[#ED1B24] px-0.5">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MagmaPlanDetailSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeLimitationId, setActiveLimitationId] = useState(null);
  const [detailsModalState, setDetailsModalState] = useState({
    isOpen: false,
    title: '',
    content: ''
  });
  const [videoModalState, setVideoModalState] = useState({
    isOpen: false,
    title: '',
    url: ''
  });

  const [expandedReportCard, setExpandedReportCard] = useState({
    csr: false,
    icr: false,
    complaint: false
  });

  const toggleReportCard = (key) => {
    setExpandedReportCard(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [expandedCompanyStrength, setExpandedCompanyStrength] = useState({
    ownership: false,
    creditRating: false,
    capitalStrength: false,
    financialBase: false,
    reinsurance: false,
    marketPosition: false
  });

  const toggleCompanyStrength = (key) => {
    setExpandedCompanyStrength(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [expandedFeatureId, setExpandedFeatureId] = useState(null);
  const [benefitSearchQuery, setBenefitSearchQuery] = useState('');

  const { planId: urlPlanId } = useParams();
  const location = useLocation();
  const isFeaturesPage = location.pathname.endsWith('/features');

  // Resolve to canonical Magma plan ID — One Health Secure
  const currentPlanId = resolveMagmaPlanId(planIdProp || plan?.id || urlPlanId) || planIdProp || plan?.id || urlPlanId;
  const staticPlanData = getMagmaPlanData(currentPlanId);
  const isMatchingStatic = Boolean(staticPlanData && (staticPlanData.planId === currentPlanId || staticPlanData.id === currentPlanId));
  const matchedStatic = isMatchingStatic ? staticPlanData : null;
  const planData = React.useMemo(() => {
    if (plan) {
      return {
        ...matchedStatic,
        ...plan,
        planName: plan.name || plan.planName || matchedStatic?.planName || currentPlanId,
        featuresSections: (plan.featuresSections && plan.featuresSections.length > 0)
          ? plan.featuresSections
          : (matchedStatic?.featuresSections || []),
        reportCard: (plan.reportCard && (plan.reportCard.csr || (plan.reportCard.allMetrics && plan.reportCard.allMetrics.length > 0) || (plan.reportCard.items && plan.reportCard.items.length > 0)))
          ? plan.reportCard
          : (matchedStatic?.reportCard || null),
        companyStrength: (plan.companyStrength && (plan.companyStrength.ownership || (plan.companyStrength.items && plan.companyStrength.items.length > 0)))
          ? plan.companyStrength
          : (matchedStatic?.companyStrength || null),
        limitationsWaitingPeriods: (plan.limitationsWaitingPeriods?.items && plan.limitationsWaitingPeriods.items.length > 0)
          ? plan.limitationsWaitingPeriods
          : (matchedStatic?.limitationsWaitingPeriods || { items: [] }),
        mustKnow: (plan.mustKnow?.items && plan.mustKnow.items.length > 0)
          ? plan.mustKnow
          : (matchedStatic?.mustKnow || { items: [] }),
        bestSuitedFor: ((plan.bestSuitedFor?.profiles && plan.bestSuitedFor.profiles.length > 0) || (plan.bestSuitedFor?.items && plan.bestSuitedFor.items.length > 0))
          ? plan.bestSuitedFor
          : (matchedStatic?.bestSuitedFor || { profiles: [] }),
        variants: (plan.variants && plan.variants.length > 0)
          ? plan.variants
          : (matchedStatic?.variants || [])
      };
    }
    return matchedStatic;
  }, [plan, matchedStatic, currentPlanId]);
  const uiConfig = planData?.uiConfig ?? {};
  const demoVideoUrl = uiConfig.demoVideoUrl ?? DEFAULT_DEMO_VIDEO_URL;
  const { logo, name } = company;

  // Filter & prioritize features sections based on current plan search
  const {
    sections: prioritizedFeaturesSections,
    totalMatches: totalBenefitMatches,
    hasActiveSearch: hasActiveBenefitSearch
  } = React.useMemo(() => {
    return getFilteredAndPrioritizedFeaturesSections(planData?.featuresSections || [], benefitSearchQuery);
  }, [planData?.featuresSections, benefitSearchQuery]);

  // Flat search results for dropdown
  const benefitSearchResults = React.useMemo(() => {
    return getBenefitSearchResults(planData?.featuresSections || [], benefitSearchQuery);
  }, [planData?.featuresSections, benefitSearchQuery]);

  const handleBenefitResultClick = (itemId) => {
    scrollToBenefitCard(itemId);
  };

  // Reset all UI state on plan switch
  useEffect(() => {
    setActiveModal(null);
    setActiveLimitationId(null);
    setDetailsModalState({ isOpen: false, title: '', content: '' });
    setVideoModalState({ isOpen: false, title: '', url: '' });
    setExpandedReportCard({ csr: false, icr: false, complaint: false });
    setExpandedCompanyStrength({
      ownership: false,
      creditRating: false,
      capitalStrength: false,
      financialBase: false,
      reinsurance: false,
      marketPosition: false
    });
    setExpandedFeatureId(null);
  }, [currentPlanId]);

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (activeModal || videoModalState.isOpen || detailsModalState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, videoModalState.isOpen, detailsModalState.isOpen]);

  const handleOpenVideo = (title, url) => {
    setVideoModalState({
      isOpen: true,
      title: title || 'Feature Video',
      url: url || demoVideoUrl
    });
  };

  const handleCloseVideo = () => {
    setVideoModalState({
      isOpen: false,
      title: '',
      url: ''
    });
  };

  const handleOpenDetailsModal = (title, content) => {
    setDetailsModalState({
      isOpen: true,
      title,
      content
    });
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalState({
      isOpen: false,
      title: '',
      content: ''
    });
  };

  const toggleAccordionItem = (id, ref) => {
    if (expandedFeatureId === id) {
      setExpandedFeatureId(null);
    } else {
      setExpandedFeatureId(id);
      setTimeout(() => {
        if (ref && ref.current) {
          const yOffset = -110;
          const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  // =========================================================================
  // DEDICATED FEATURES PAGE (EXACT 4 CATEGORIES - MAGMA RED & BLACK THEME)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-white min-h-screen overflow-x-hidden relative font-sans">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#ED1B24]" />

        {/* Page Container — Matching Reference Spacing & Density */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 space-y-8 sm:space-y-10 relative z-10">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-2"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3 sm:mb-4">
              <Link
                to={`/insurance/${company.id}/${currentPlanId}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to {planData.planName}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor="#ED1B24"
                searchResults={benefitSearchResults}
                onResultClick={handleBenefitResultClick}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src={logo}
                alt={name}
                className="w-28 sm:w-48 h-auto max-h-10 sm:max-h-16 object-contain select-none mb-3.5 sm:mb-4"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ED1B24] block mb-0.5">
                Magma General Insurance
              </span>
              <h1 className="text-base sm:text-2xl font-black text-[#000000] tracking-tight font-display">
                {planData.planName}
              </h1>
              <span className="text-xs sm:text-sm font-extrabold text-[#ED1B24] uppercase tracking-wider block mt-1">
                POLICY BENEFITS
              </span>
              <div className="w-8 sm:w-12 h-1 bg-[#ED1B24] mx-auto mt-2 rounded-full" />
            </div>

            {/* DOWNLOAD & SHARE PDF ACTION BUTTONS */}
            <PolicyBenefitsPdfActions
              company={company}
              plan={planData}
              featuresSections={planData.featuresSections}
            />
          </motion.div>

          {/* EMPTY SEARCH FEEDBACK IF ZERO MATCHES */}
          {hasActiveBenefitSearch && totalBenefitMatches === 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-xs sm:text-sm font-black text-slate-800 font-display block">
                No benefits found
              </span>
              <p className="text-xs text-slate-500 font-medium">
                No benefits matching “<span className="font-semibold text-slate-700">{benefitSearchQuery}</span>” in this plan.
              </p>
            </div>
          )}

          {/* 4 CATEGORY SECTIONS (EXACT 4 TITLES ONLY) */}
          {prioritizedFeaturesSections?.map((sec, secIdx) => (
            <div key={sec.id || secIdx} className="space-y-3 sm:space-y-3.5">
              
              {/* Global Emerald Green Category Banner (#00A368) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="w-full relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#00A368] px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm border border-[#00A368]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
                <h2 className="text-xs sm:text-sm font-black tracking-wider text-white font-display flex items-center gap-2.5 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-white/80 inline-block shadow-xs shrink-0" />
                  {sec.title}
                </h2>
              </motion.div>

              {/* Compact Grid of Benefit Cards */}
              <div className={`grid ${sec.gridCols || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4`}>
                {sec.items.map((item, itemIdx) => (
                  <MagmaFeatureAccordionItem
                    key={item.id}
                    item={item}
                    index={itemIdx}
                    isExpanded={expandedFeatureId === item.id}
                    onToggle={toggleAccordionItem}
                    onOpenVideo={handleOpenVideo}
                    onOpenDetailsModal={handleOpenDetailsModal}
                    demoVideoUrl={demoVideoUrl}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* FOOTNOTE */}
          <div className="text-right pt-2">
            <span className="text-xs font-bold text-slate-400">
              *Terms & Conditions Apply as per official Magma General Insurance One Health Secure policy wording.
            </span>
          </div>

        </div>

        {/* IN-PAGE VIDEO LIGHTBOX MODAL */}
        <FeatureVideoModal
          isOpen={videoModalState.isOpen}
          onClose={handleCloseVideo}
          videoTitle={videoModalState.title}
          videoUrl={videoModalState.url}
        />

        {/* COMPACT DETAILS MODAL */}
        <AnimatePresence>
          {detailsModalState.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDetailsModal}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-md overflow-hidden z-10 p-5 sm:p-6 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleCloseDetailsModal}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <FiX className="text-sm" />
                </button>
                <div className="flex items-center gap-2 mb-3 pr-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B24]" />
                  <h3 className="text-sm sm:text-base font-extrabold text-[#000000] font-display">
                    {detailsModalState.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {detailsModalState.content}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                  <button
                    type="button"
                    onClick={handleCloseDetailsModal}
                    className="px-4 py-1.5 rounded-lg bg-[#ED1B24] text-white text-xs font-bold hover:bg-[#C9131B] transition-colors cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // =========================================================================
  // MAIN MAGMA PLAN OVERVIEW PAGE (SINGLE VIEWPORT HUB)
  // =========================================================================
  return (
    <div className="w-full font-sans">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        
        {/* Navigation Breadcrumb - Back to Plans */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to Magma General Insurance Plans</span><span className="sm:hidden">Back to Plans</span>
          </Link>
        </div>

        {/* 1. MAGMA LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-28 sm:w-52 h-auto max-h-10 sm:max-h-20 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-base sm:text-2xl font-black text-[#000000] tracking-tight font-display">
            {planData.planName}
          </h1>
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#ED1B24] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 6-CARD NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'ratio'
                ? 'border-[#ED1B24] ring-2 ring-[#ED1B24]/20'
                : 'border-slate-200/80 hover:border-[#ED1B24]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'ratio' ? 'bg-[#ED1B24]' : 'bg-[#ED1B24]/30 group-hover:bg-[#ED1B24]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              REPORT CARD
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'fundamental'
                ? 'border-[#ED1B24] ring-2 ring-[#ED1B24]/20'
                : 'border-slate-200/80 hover:border-[#ED1B24]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'fundamental' ? 'bg-[#ED1B24]' : 'bg-[#ED1B24]/30 group-hover:bg-[#ED1B24]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              COMPANY STRENGTH
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#ED1B24]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ED1B24]/30 group-hover:bg-[#ED1B24] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              POLICY BENEFITS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 4: LIMITATIONS & WAITING PERIODS */}
          <button
            type="button"
            onClick={() => {
              setActiveModal('limitations');
              setActiveLimitationId(null);
            }}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'limitations'
                ? 'border-[#ED1B24] ring-2 ring-[#ED1B24]/20'
                : 'border-slate-200/80 hover:border-[#ED1B24]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'limitations' ? 'bg-[#ED1B24]' : 'bg-[#ED1B24]/30 group-hover:bg-[#ED1B24]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              LIMITATIONS & WAITING PERIODS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'mustKnow'
                ? 'border-[#ED1B24] ring-2 ring-[#ED1B24]/20'
                : 'border-slate-200/80 hover:border-[#ED1B24]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'mustKnow' ? 'bg-[#ED1B24]' : 'bg-[#ED1B24]/30 group-hover:bg-[#ED1B24]'
            }`} />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#ED1B24] text-xs sm:text-base font-black select-none shrink-0"
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                MUST KNOW DETAILS
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 6: PERFECT FOR */}
                    {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'bestSuitedFor'
                ? 'border-[#ED1B24] ring-2 ring-[#ED1B24]/20'
                : 'border-slate-200/80 hover:border-[#ED1B24]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#ED1B24]' : 'bg-[#ED1B24]/30 group-hover:bg-[#ED1B24]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#000000] group-hover:text-[#ED1B24] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight uppercase">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1B24] group-hover:bg-[#FFF5F5] group-hover:border-[#ED1B24]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SAME-PAGE MODAL OVERLAYS (MAGMA RED & BLACK THEME) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-hidden z-10 p-4 sm:p-8 max-h-[88dvh] sm:max-h-[85vh] overflow-y-auto text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#000000] hover:bg-slate-200 transition-colors cursor-pointer z-20"
              >
                <FiX className="text-base sm:text-lg" />
              </button>

              {/* MODAL 1: REPORT CARD */}
              {activeModal === 'ratio' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight font-display">
                      REPORT CARD
                    </h2>
                    <p className="text-xs text-[#ED1B24] font-semibold mt-0.5">
                      Magma General Insurance Performance
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: CSR */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('csr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            CSR
                          </span>
                          {planData.reportCard?.csr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.csr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.csr ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedReportCard.csr && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <div>
                                <span className="text-[11px] sm:text-xs font-semibold text-[#ED1B24] tracking-wide block font-display">
                                  {planData.reportCard.csr.subtitle || 'Claim Settlement Ratio'}
                                </span>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                                  {planData.reportCard.csr.explanation}
                                </p>
                              </div>

                              <div className="space-y-2.5 pt-1">
                                <div>
                                  <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                    {planData.reportCard.csr.singleYear}
                                  </div>
                                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                    {planData.reportCard.csr.singleYearLabel || 'Recent Single Year'}
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                  <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                    {planData.reportCard.csr.threeYearAvg}
                                  </div>
                                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                    {planData.reportCard.csr.threeYearAvgLabel || '3 Year Average'}
                                  </div>
                                </div>
                              </div>

                              <WatchVideoButton
                                title="CSR (Claim Settlement Ratio)"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard.csr.videoUrl || demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 2: ICR */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('icr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            ICR
                          </span>
                          {planData.reportCard?.icr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight shrink-0 font-display">
                              {planData.reportCard.icr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.icr ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedReportCard.icr && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <div>
                                <span className="text-[11px] sm:text-xs font-semibold text-[#ED1B24] tracking-wide block font-display">
                                  {planData.reportCard.icr.subtitle || 'Incurred Claim Ratio'}
                                </span>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                                  {planData.reportCard.icr.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                                  {planData.reportCard.icr.range}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.reportCard.icr.rangeLabel || 'Healthy ICR Range'}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="ICR (Incurred Claim Ratio)"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard.icr.videoUrl || demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 3: COMPLAINT VOLUME */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('complaint')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            COMPLAINT VOLUME
                          </span>
                          {planData.reportCard?.complaintVolume?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight shrink-0 font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.complaint ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedReportCard.complaint && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.reportCard.complaintVolume.explanation}
                              </p>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                                  {planData.reportCard.complaintVolume.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.reportCard.complaintVolume.label}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Complaint Volume"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard.complaintVolume.videoUrl || demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 2: COMPANY STRENGTH */}
              {activeModal === 'fundamental' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight font-display">
                      COMPANY STRENGTH
                    </h2>
                    <p className="text-xs text-[#ED1B24] font-semibold mt-0.5">
                      How reliable/strong is the insurer?
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* OWNERSHIP */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('ownership')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            OWNERSHIP / PERCENTAGE
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.ownership?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.ownership ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.ownership && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.companyStrength.ownership.explanation}
                              </p>
                              <div className="space-y-2 pt-1">
                                {planData.companyStrength.ownership.items?.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 text-xs">
                                    <span className="font-semibold text-slate-800">{item.name}</span>
                                    <span className="font-bold text-[#ED1B24]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CREDIT RATING */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('creditRating')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            CREDIT RATING
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-amber-600 font-display">
                            {planData.companyStrength?.creditRating?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.creditRating ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.creditRating && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.companyStrength.creditRating.explanation}
                              </p>
                              <div className="space-y-2 pt-1">
                                {planData.companyStrength.creditRating.items?.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 text-xs">
                                    <span className="font-semibold text-slate-800">{item.agency}</span>
                                    <span className="font-bold text-emerald-600">{item.rating}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CAPITAL STRENGTH */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('capitalStrength')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            CAPITAL STRENGTH (SOLVENCY)
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.capitalStrength?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.capitalStrength && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.companyStrength.capitalStrength.explanation}
                              </p>
                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                                  {planData.companyStrength.capitalStrength.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.capitalStrength.label}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* FINANCIAL BASE */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/35 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('financialBase')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#ED1B24] transition-colors font-display shrink-0">
                            FINANCIAL BASE (AUM)
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.financialBase?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.financialBase ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.financialBase && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.companyStrength.financialBase.explanation}
                              </p>
                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                                  {planData.companyStrength.financialBase.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.financialBase.label}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 3: LIMITATIONS & WAITING PERIODS */}
              {activeModal === 'limitations' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight font-display">
                      LIMITATIONS & WAITING PERIODS
                    </h2>
                    <p className="text-xs text-[#ED1B24] font-semibold mt-0.5">
                      Terms, Waiting Periods & Exclusions
                    </p>
                  </div>

                  <div className="space-y-3">
                    {planData.limitationsWaitingPeriods?.items?.map((item) => {
                      const isExpanded = activeLimitationId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl sm:rounded-2xl border border-[#ED1B24]/30 bg-white overflow-hidden shadow-2xs hover:border-[#ED1B24]/60 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLimitationId(isExpanded ? null : item.id)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#ED1B24] transition-colors leading-tight">
                                {item.title}
                              </h4>
                              {item.durationTag && (
                                <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFF5F5] text-[#ED1B24] border border-[#ED1B24]/20">
                                  {item.durationTag}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5] transition-all duration-300 shrink-0">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isExpanded ? 'rotate-180 text-[#ED1B24]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-2.5 text-xs text-slate-600">
                                  <p className="leading-relaxed font-medium">{item.summary}</p>
                                  {item.highlight && (
                                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                                      {item.highlight}
                                    </div>
                                  )}
                                  {item.diseaseList && (
                                    <ul className="space-y-1 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                                      {item.diseaseList.map((d, dIdx) => (
                                        <li key={dIdx} className="flex items-center gap-1.5 text-slate-700 font-medium">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#ED1B24] shrink-0" />
                                          <span className="truncate">{d}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {item.exclusionsList && (
                                    <ul className="space-y-1 pt-1">
                                      {item.exclusionsList.map((ex, exIdx) => (
                                        <li key={exIdx} className="flex items-start gap-1.5 text-slate-600 font-medium">
                                          <span className="text-[#ED1B24] font-bold shrink-0">✕</span>
                                          <span>{ex}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MODAL 4: MUST KNOW DETAILS */}
              {activeModal === 'mustKnow' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight font-display">
                      MUST KNOW DETAILS
                    </h2>
                    <p className="text-xs text-[#ED1B24] font-semibold mt-0.5">
                      Key product takeaways
                    </p>
                  </div>

                  <div className="space-y-3">
                    {planData.mustKnow?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white border border-[#ED1B24]/30 shadow-2xs space-y-2 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.icon}</span>
                          <h4 className="text-sm font-extrabold text-[#000000] font-display">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {item.summary}
                        </p>
                        {item.points && (
                          <ul className="space-y-1 pt-1 border-t border-slate-100">
                            {item.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                                <FiCheck className="text-[#ED1B24] mt-0.5 shrink-0 text-xs" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            
              {/* MODAL 5: PERFECT FOR */}
              {(activeModal === 'bestSuitedFor' || activeModal === 'perfectFor') && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      PERFECT FOR
                    </h2>
                    <p className="text-xs text-[#ED1B24] font-medium mt-0.5">
                      {planData.bestSuitedFor?.subheading || planData.perfectFor?.subheading || 'Who is this plan perfect for?'}
                    </p>
                    {(planData.bestSuitedFor?.description || planData.perfectFor?.description) && (
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {planData.bestSuitedFor?.description || planData.perfectFor?.description}
                      </p>
                    )}
                  </div>

                  {((planData.bestSuitedFor?.profiles || planData.perfectFor?.items || []).length > 0) ? (
                    <div className="space-y-3">
                      {(planData.bestSuitedFor?.profiles || planData.perfectFor?.items || []).map((profile, idx) => (
                        <div
                          key={profile.id || idx}
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#ED1B24]/30 shadow-2xs space-y-2 text-left hover:border-[#ED1B24]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#000000] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#ED1B24] border border-[#ED1B24]/20 shrink-0 font-display">
                                {profile.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {profile.summary || profile.description}
                          </p>
                          {profile.highlights && (
                            <ul className="space-y-1 pt-1.5 border-t border-slate-100">
                              {profile.highlights.map((hl, hlIdx) => (
                                <li key={hlIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                                  <FiCheck className="text-[#ED1B24] mt-0.5 shrink-0 text-xs" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-xs sm:text-sm font-medium">
                      Information not available for this plan.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
