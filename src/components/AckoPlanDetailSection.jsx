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
import { getAckoPlanData, resolveAckoPlanId } from '../data/ackoPlansData';
import PolicyBenefitsPdfActions from './PolicyBenefitsPdfActions';
import BenefitSearchBar from './BenefitSearchBar';
import { getFilteredAndPrioritizedFeaturesSections, getBenefitSearchResults } from '../utils/benefitSearchHelper';
import { scrollToBenefitCard } from '../utils/scrollToBenefitCard';

// Default demo video
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
  award: FiAward
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

// Compact Feature-Wise Inline Video Button Component (ACKO Theme)
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-[#FAF5FA] text-[#511C53] border border-[#511C53]/25 hover:bg-[#511C53] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current text-[#00A99D] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Compact "View Details" Pill Button (ACKO Theme)
const ViewDetailsPill = ({ onClick, label = "View Details" }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#FAF5FA] text-[#511C53] border border-[#511C53]/30 hover:bg-[#511C53] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
  >
    <FiInfo className="text-[9px] text-[#00A99D] group-hover:text-white" />
    <span>{label}</span>
  </button>
);

// Premium "WATCH VIDEO" button (ACKO Theme)
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#511C53] border border-[#511C53]/25 hover:bg-[#511C53] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#00A99D] group-hover:text-white transition-colors" />
      <span>WATCH VIDEO</span>
    </button>
  </div>
);

// Premium In-Page Video Lightbox Modal (ACKO Theme)
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A99D]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#511C53] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
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

// Sub-component for ACKO Features Accordion Items
function AckoFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  onOpenDetailsModal,
  demoVideoUrl
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, points, hasDetailsModal, detailsModalTitle, detailsModalContent, isRider, iconType } = item;
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
          ? 'bg-white border-[#00A99D] shadow-md ring-2 ring-[#00A99D]/25'
          : isExpanded
          ? 'bg-[#FAF5FA]/90 border-[#511C53]/60 shadow-md ring-1 ring-[#511C53]/20'
          : 'bg-white border-slate-200/80 hover:border-[#511C53]/40 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-3 sm:p-4 flex items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded ? 'bg-[#511C53] text-white shadow-xs' : 'bg-[#FAF5FA] text-[#511C53]'
            }`}>
              <IconComponent className="text-xs sm:text-base" />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-xs sm:text-sm font-extrabold font-display leading-tight sm:leading-snug text-[#0F172A]">
              {title}
            </h3>

            {subtitle && (
              <p className="text-[10px] sm:text-xs font-semibold leading-tight sm:leading-snug text-slate-500">
                {subtitle}
              </p>
            )}

            {/* Action Buttons & Badges Flex Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
              {onOpenVideo && (
                <VideoButton featureTitle={title} onOpenVideo={onOpenVideo} videoUrl={demoVideoUrl} />
              )}
              {badge && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#511C53]/15 text-[#511C53] tracking-wide shrink-0">
                  {badge}
                </span>
              )}
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#00A99D]/15 text-[#00A99D] border border-[#00A99D]/40 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {hasDetailsModal && onOpenDetailsModal && (
                <ViewDetailsPill
                  label="View Details"
                  onClick={() => onOpenDetailsModal(detailsModalTitle || title, detailsModalContent || summary)}
                />
              )}
              {isRider && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#E35275]/15 text-[#E35275] tracking-wide shrink-0">
                  Rider
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Plus / Minus Button */}
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 self-center ${
          isExpanded ? 'bg-[#511C53] text-white rotate-180' : 'bg-[#FAF5FA] text-[#511C53]'
        }`}>
          {isExpanded ? (
            <FiMinus className="text-[10px] sm:text-xs stroke-[2.5]" />
          ) : (
            <FiPlus className="text-[10px] sm:text-xs stroke-[2.5]" />
          )}
        </div>
      </div>

      {/* Expanded Accordion Body Content */}
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
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FAF5FA] text-[#511C53] border border-[#511C53]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#00A99D]" />
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
                      <li key={pIdx} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-600 font-medium">
                        <FiCheck className="text-[#00A99D] mt-0.5 shrink-0 text-xs font-bold" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {onOpenVideo && (
                <WatchVideoButton
                  title={title}
                  onOpenVideo={onOpenVideo}
                  videoUrl={demoVideoUrl}
                  className="pt-2"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT: AckoPlanDetailSection
// Replicates the EXACT Single-Viewport Hub & Features Page Architecture from SBI
// =============================================================================
export default function AckoPlanDetailSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null); // 'ratio' | 'fundamental' | 'limitations' | 'mustKnow' | 'bestSuitedFor'
  const [activeLimitationId, setActiveLimitationId] = useState(null);
  const [expandedFeatureId, setExpandedFeatureId] = useState(null);
  const [videoModalState, setVideoModalState] = useState({ isOpen: false, title: '', url: '' });
  const [detailsModalState, setDetailsModalState] = useState({ isOpen: false, title: '', content: '' });
  const [expandedReportCard, setExpandedReportCard] = useState({ csr: false, icr: false, complaint: false });
  const [expandedCompanyStrength, setExpandedCompanyStrength] = useState({
    ownership: false,
    creditRating: false,
    capitalStrength: false,
    financialBase: false,
    reinsurance: false,
    marketPosition: false
  });
  const [benefitSearchQuery, setBenefitSearchQuery] = useState('');

  const { planId: urlPlanId } = useParams();
  const location = useLocation();
  const isFeaturesPage = location.pathname.endsWith('/features');

  // Resolve to canonical ACKO plan ID — Platinum Super Top Up
  const currentPlanId = resolveAckoPlanId(planIdProp || plan?.id || urlPlanId) || planIdProp || plan?.id || urlPlanId;
  const staticPlanData = getAckoPlanData(currentPlanId);
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

  // Reset UI state on plan switch
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

  const toggleReportCard = (key) => {
    setExpandedReportCard(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCompanyStrength = (key) => {
    setExpandedCompanyStrength(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // =========================================================================
  // DEDICATED FEATURES PAGE (POLICY BENEFITS WITH EXACT 4 HEADINGS)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#FAF5FA] min-h-screen overflow-x-hidden relative font-sans">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#511C53]" />

        {/* Page Container */}
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to {planData.planName}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor="#511C53"
                searchResults={benefitSearchResults}
                onResultClick={handleBenefitResultClick}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src={logo}
                alt={name}
                className="w-24 sm:w-44 h-auto max-h-9 sm:max-h-16 object-contain select-none mb-3.5 sm:mb-4"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-[#511C53] block mb-0.5">
                ACKO General Insurance
              </span>
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName}
              </h1>
              <span className="text-xs sm:text-sm font-extrabold text-[#00A99D] uppercase tracking-wider block mt-1">
                POLICY BENEFITS
              </span>
              <div className="w-8 sm:w-12 h-1 bg-[#511C53] mx-auto mt-2 rounded-full" />
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

          {/* 4 CATEGORY SECTIONS (EXACT 4 HEADINGS: MOST IMPORTANT, valueAdded, ADDITIONAL, optional) */}
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 relative z-10">
                  <h2 className="text-xs sm:text-sm font-black tracking-wider text-white font-display flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-white/80 inline-block shadow-xs shrink-0" />
                    {sec.title}
                  </h2>
                </div>
              </motion.div>

              {/* Grid of Cards */}
              {sec.items && sec.items.length > 0 ? (
                <div className={`grid ${sec.gridCols || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4`}>
                  {sec.items.map((item, itemIdx) => (
                    <AckoFeatureAccordionItem
                      key={item.id}
                      item={item}
                      index={itemIdx}
                      isExpanded={expandedFeatureId === item.id}
                      onToggle={(id, ref) => toggleAccordionItem(id, ref)}
                      onOpenVideo={handleOpenVideo}
                      onOpenDetailsModal={handleOpenDetailsModal}
                      demoVideoUrl={demoVideoUrl}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {/* FOOTNOTE */}
          <div className="text-right pt-2">
            <span className="text-xs font-bold text-slate-400">
              *Terms & Conditions Apply as per official {planData.fullName || planData.planName || 'ACKO General Insurance'} policy wording.
            </span>
          </div>

        </div>

        {/* IN-PAGE VIDEO MODAL */}
        <FeatureVideoModal
          isOpen={videoModalState.isOpen}
          onClose={handleCloseVideo}
          videoTitle={videoModalState.title}
          videoUrl={videoModalState.url}
        />

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {detailsModalState.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDetailsModal}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-hidden z-10 p-5 sm:p-7 max-h-[85vh] overflow-y-auto text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-display">
                    {detailsModalState.title}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCloseDetailsModal}
                    className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <FiX className="text-base" />
                  </button>
                </div>
                <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {detailsModalState.content}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // =========================================================================
  // MAIN PLAN OVERVIEW PAGE (SINGLE VIEWPORT HUB - EXACT 1:1 STRUCTURE WITH SBI)
  // =========================================================================
  return (
    <div className="w-full font-sans">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        
        {/* Navigation Breadcrumb - Back to Plans */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" />{' '}
            <span className="hidden sm:inline">
              Back to ACKO Plans
            </span>
            <span className="sm:hidden">
              Back to Plans
            </span>
          </Link>
        </div>

        {/* 1. ACKO LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#511C53] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 6-BUTTON PRIMARY NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'ratio'
                ? 'border-[#511C53] ring-2 ring-[#511C53]/20'
                : 'border-slate-200/80 hover:border-[#511C53]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'ratio' ? 'bg-[#511C53]' : 'bg-[#511C53]/30 group-hover:bg-[#511C53]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              REPORT CARD
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'fundamental'
                ? 'border-[#511C53] ring-2 ring-[#511C53]/20'
                : 'border-slate-200/80 hover:border-[#511C53]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'fundamental' ? 'bg-[#511C53]' : 'bg-[#511C53]/30 group-hover:bg-[#511C53]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              COMPANY STRENGTH
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#511C53]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#511C53]/30 group-hover:bg-[#511C53] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              POLICY BENEFITS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 4: LIMITATIONS */}
          <button
            type="button"
            onClick={() => {
              setActiveModal('limitations');
              setActiveLimitationId(null);
            }}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'limitations'
                ? 'border-[#511C53] ring-2 ring-[#511C53]/20'
                : 'border-slate-200/80 hover:border-[#511C53]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'limitations' ? 'bg-[#511C53]' : 'bg-[#511C53]/30 group-hover:bg-[#511C53]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              LIMITATIONS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'mustKnow'
                ? 'border-[#511C53] ring-2 ring-[#511C53]/20'
                : 'border-slate-200/80 hover:border-[#511C53]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'mustKnow' ? 'bg-[#511C53]' : 'bg-[#511C53]/30 group-hover:bg-[#511C53]'
            }`} />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#00A99D] text-xs sm:text-base font-black select-none shrink-0"
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                MUST KNOW DETAILS
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'bestSuitedFor'
                ? 'border-[#511C53] ring-2 ring-[#511C53]/20'
                : 'border-slate-200/80 hover:border-[#511C53]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#511C53]' : 'bg-[#511C53]/30 group-hover:bg-[#511C53]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#511C53] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#511C53] group-hover:bg-[#FAF5FA] group-hover:border-[#511C53]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SAME-PAGE MODAL OVERLAYS */}
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
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
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer z-20"
              >
                <FiX className="text-base sm:text-lg" />
              </button>

              {/* MODAL 1: REPORT CARD */}
              {activeModal === 'ratio' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      REPORT CARD
                    </h2>
                    <p className="text-xs text-[#511C53] font-medium mt-0.5">
                      ACKO General Insurance Performance
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: Claim Settlement Ratio */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('csr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.reportCard?.csr?.title || 'Claim Settlement Ratio'}
                          </span>
                          {planData.reportCard?.csr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.csr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.csr ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.csr.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.reportCard.csr.explanation}
                                </p>
                              )}
                              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                                <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{planData.reportCard.csr.singleYearLabel || 'Recent Single Year'}</div>
                                  <div className="text-sm font-black text-[#511C53] mt-0.5">{planData.reportCard.csr.singleYear}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{planData.reportCard.csr.threeYearAvgLabel || '3 Years Avg Ratio'}</div>
                                  <div className="text-sm font-black text-[#511C53] mt-0.5">{planData.reportCard.csr.threeYearAvg}</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 2: Incurred Claim Ratio */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('icr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.reportCard?.icr?.title || 'Incurred Claim Ratio'}
                          </span>
                          {planData.reportCard?.icr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.icr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.icr ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.icr.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.reportCard.icr.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.reportCard.icr.rangeLabel || 'Incurred Claim Ratio'}</span>
                                <span className="text-sm font-black text-[#511C53]">{planData.reportCard.icr.range || planData.reportCard.icr.summaryValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 3: Complaint Volume */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('complaint')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.reportCard?.complaintVolume?.title || 'Complaints / 10K Claims'}
                          </span>
                          {planData.reportCard?.complaintVolume?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.complaint ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.complaintVolume.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.reportCard.complaintVolume.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.reportCard.complaintVolume.label || 'Complaints per 10,000 Claims'}</span>
                                <span className="text-sm font-black text-[#511C53]">{planData.reportCard.complaintVolume.value || planData.reportCard.complaintVolume.summaryValue}</span>
                              </div>
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      COMPANY STRENGTH
                    </h2>
                    <p className="text-xs text-[#511C53] font-medium mt-0.5">
                      How reliable/strong is the insurer?
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* 1. Ownership */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('ownership')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.ownership?.title || 'OWNERSHIP / PERCENTAGE'}
                          </span>
                          {planData.companyStrength?.ownership?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.ownership.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.ownership ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.companyStrength.ownership.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.ownership.explanation}
                                </p>
                              )}
                              {planData.companyStrength.ownership.items && (
                                <div className="space-y-1.5 pt-1">
                                  {planData.companyStrength.ownership.items.map((it, idx) => (
                                    <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                                      <span className="text-slate-700">{it.name}</span>
                                      <span className="text-[#511C53] font-bold">{it.value}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2. Credit Rating */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('creditRating')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.creditRating?.title || 'CREDIT RATING'}
                          </span>
                          {planData.companyStrength?.creditRating?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.creditRating.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.creditRating ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.companyStrength.creditRating.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.creditRating.explanation}
                                </p>
                              )}
                              {planData.companyStrength.creditRating.items && (
                                <div className="space-y-1.5 pt-1">
                                  {planData.companyStrength.creditRating.items.map((it, idx) => (
                                    <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                                      <span className="text-slate-700">{it.agency}</span>
                                      <span className="text-[#511C53] font-bold">{it.rating}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. Capital Strength / Solvency */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('capitalStrength')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.capitalStrength?.title || 'CAPITAL STRENGTH'}
                          </span>
                          {planData.companyStrength?.capitalStrength?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.capitalStrength.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.companyStrength.capitalStrength.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.capitalStrength.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.companyStrength.capitalStrength.label || 'Solvency Ratio'}</span>
                                <span className="text-sm font-black text-[#00A99D]">{planData.companyStrength.capitalStrength.value || planData.companyStrength.capitalStrength.summaryValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 4. Financial Base */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('financialBase')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.financialBase?.title || 'FINANCIAL BASE'}
                          </span>
                          {planData.companyStrength?.financialBase?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.financialBase.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.financialBase ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.companyStrength.financialBase.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.financialBase.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.companyStrength.financialBase.label || 'Assets Under Management (AUM)'}</span>
                                <span className="text-sm font-black text-[#511C53]">{planData.companyStrength.financialBase.value || planData.companyStrength.financialBase.summaryValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 5. Reinsurance Strength */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('reinsurance')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.reinsuranceStrength?.title || 'REINSURANCE STRENGTH'}
                          </span>
                          {planData.companyStrength?.reinsuranceStrength?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.reinsuranceStrength.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.reinsurance ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.reinsurance && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              {planData.companyStrength.reinsuranceStrength.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.reinsuranceStrength.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.companyStrength.reinsuranceStrength.label || 'Reinsurance Backing'}</span>
                                <span className="text-sm font-black text-[#00A99D]">{planData.companyStrength.reinsuranceStrength.value || planData.companyStrength.reinsuranceStrength.summaryValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 6. Market Position */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#511C53]/35 bg-white overflow-hidden shadow-2xs hover:border-[#511C53]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('marketPosition')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#511C53] transition-colors font-display shrink-0">
                            {planData.companyStrength?.marketPosition?.title || 'MARKET POSITION'}
                          </span>
                          {planData.companyStrength?.marketPosition?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.marketPosition.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FAF5FA] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.marketPosition ? 'rotate-180 text-[#511C53]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCompanyStrength.marketPosition && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                              {planData.companyStrength.marketPosition.explanation && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {planData.companyStrength.marketPosition.explanation}
                                </p>
                              )}
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.companyStrength.marketPosition.label || 'Cashless Hospital Network'}</span>
                                <span className="text-sm font-black text-[#511C53]">{planData.companyStrength.marketPosition.value || planData.companyStrength.marketPosition.summaryValue}</span>
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      LIMITATIONS
                    </h2>
                    <p className="text-xs text-rose-600 font-medium mt-0.5">
                      Terms, Waiting Periods & Exclusions
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.limitationsWaitingPeriods?.items?.map((lim) => {
                      const isExpanded = activeLimitationId === lim.id;
                      return (
                        <div
                          key={lim.id}
                          className="rounded-xl sm:rounded-2xl border border-rose-200/80 bg-white overflow-hidden shadow-2xs hover:border-rose-400 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLimitationId(isExpanded ? null : lim.id)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-rose-700 transition-colors font-display shrink-0">
                                {lim.title}
                              </span>
                              {lim.durationTag && (
                                <span className="text-xs sm:text-sm font-bold text-rose-600 tracking-tight shrink-0 font-display">
                                  {lim.durationTag}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-rose-50 transition-all duration-300 shrink-0">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isExpanded ? 'rotate-180 text-rose-700' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-rose-50/20 space-y-2.5">
                                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    {lim.summary}
                                  </p>
                                  {lim.highlight && (
                                    <div className="text-[11px] font-bold text-[#511C53] flex items-center gap-1.5 pt-0.5">
                                      <FiCheck className="text-[#00A99D] shrink-0" />
                                      <span>{lim.highlight}</span>
                                    </div>
                                  )}
                                  {lim.exclusionsList && (
                                    <ul className="space-y-1 pt-1">
                                      {lim.exclusionsList.map((exc, eIdx) => (
                                        <li key={eIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                                          <FiX className="text-rose-500 mt-0.5 shrink-0 text-xs" />
                                          <span>{exc}</span>
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      MUST KNOW DETAILS
                    </h2>
                    <p className="text-xs text-[#511C53] font-medium mt-0.5">
                      Key product takeaways
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.mustKnow?.items?.map((mk) => (
                      <div
                        key={mk.id}
                        className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#511C53]/25 bg-[#FAF5FA]/60 space-y-1.5 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">{mk.icon}</span>
                          <h3 className="text-xs sm:text-sm font-black text-[#511C53]">
                            {mk.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium pl-6 sm:pl-7">
                          {mk.summary}
                        </p>
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
                    <p className="text-xs text-[#511C53] font-medium mt-0.5">
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
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#511C53]/30 shadow-2xs space-y-2 text-left hover:border-[#511C53]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF5FF] text-[#511C53] border border-[#511C53]/20 shrink-0 font-display">
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
                                  <FiCheck className="text-[#511C53] mt-0.5 shrink-0 text-xs" />
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
