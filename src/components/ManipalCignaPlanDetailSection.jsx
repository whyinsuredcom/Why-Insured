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
  FiActivity
} from 'react-icons/fi';
import { getManipalCignaPlanData, resolveManipalCignaPlanId } from '../data/manipalCignaPlansData';
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
  activity: FiActivity
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

// Feature-Wise Inline Video Button Component (HDFC-Referenced Placement with ManipalCigna Orange Theme)
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#F8971F] border border-[#F8971F]/30 hover:bg-[#F8971F] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#F8971F] group-hover:text-white transition-colors" />
      <span>WATCH VIDEO</span>
    </button>
  );
};

// Premium "WATCH VIDEO" button — matches Report Card & Modal design
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#F8971F] border border-[#F8971F]/30 hover:bg-[#F8971F] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#F8971F] group-hover:text-white transition-colors" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#F8971F]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#F8971F] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
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

// Limitation detail body — plan-specific content
function LimitationDetailContent({ item }) {
  return (
    <>
      <p className="font-medium leading-relaxed text-slate-700 text-[11px] sm:text-xs">
        {item.summary}
      </p>

      {item.highlight && (
        <div className="p-3 rounded-xl bg-[#56B948]/10 border border-[#56B948]/20 text-[#56B948] font-semibold flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold">✓</span>
          <span>{item.highlight}</span>
        </div>
      )}

      {item.diseaseList && (
        <div className="p-3 sm:p-4 rounded-xl bg-[#FFF9F3]/80 border border-[#F8971F]/20 space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#F8971F] block">
            {item.diseaseListHeader || 'Covered after Continuous Coverage Period'}
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
            {item.diseaseList.map((disease, dIdx) => (
              <li key={dIdx} className="flex items-start gap-1.5">
                <span className="text-[#F8971F] font-bold">•</span>
                <span>{disease}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.durationTag && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
          <span>Applicable Timeline</span>
          <span className="text-[#F8971F] font-bold">{item.durationTag}</span>
        </div>
      )}
    </>
  );
}

// EXACT HDFC Feature Accordion Item Component (with ManipalCigna colors)
function HdfcStyleFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  demoVideoUrl
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, steps, points, isRider, iconType, videoUrl } = item;
  const IconComponent = (iconType && ICON_MAP[iconType]) || FiCheckSquare;
  const currentVideoUrl = videoUrl || demoVideoUrl;

  return (
    <motion.div
      ref={itemRef}
      data-benefit-id={id}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      onClick={() => onToggle(id, itemRef)}
      className={`transition-all duration-200 cursor-pointer rounded-xl sm:rounded-2xl border overflow-hidden select-none flex flex-col justify-between ${
        item._isMatched
          ? 'bg-white border-[#56B948] shadow-md ring-2 ring-[#56B948]/25'
          : isExpanded
          ? 'bg-[#FFF9F3]/90 border-[#F8971F]/60 shadow-md ring-1 ring-[#F8971F]/20'
          : 'bg-white border-slate-200/80 hover:border-[#F8971F]/40 shadow-2xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-2.5 sm:p-4 flex items-start sm:items-center justify-between gap-1.5 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded ? 'bg-[#F8971F] text-white shadow-xs' : 'bg-[#FFF9F3] text-[#F8971F]'
            }`}>
              <IconComponent className="text-xs sm:text-base" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <h3 className="text-xs sm:text-base font-extrabold font-display leading-tight sm:leading-snug text-[#0F172A]">
                {title}
              </h3>
              {onOpenVideo && (
                <VideoButton featureTitle={title} onOpenVideo={onOpenVideo} videoUrl={currentVideoUrl} />
              )}
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#56B948]/10 text-[#56B948] border border-[#56B948]/30 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {isRider && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#F8971F]/10 text-[#F8971F] tracking-wide shrink-0">
                  Rider
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[9px] sm:text-xs font-semibold mt-0.5 leading-tight sm:leading-snug text-slate-500 line-clamp-2 sm:line-clamp-none">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Plus / Minus Button */}
        <div className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5 sm:mt-0 ${
          isExpanded ? 'bg-[#F8971F] text-white rotate-180' : 'bg-[#FFF9F3] text-[#F8971F]'
        }`}>
          {isExpanded ? (
            <FiMinus className="text-[10px] sm:text-sm stroke-[2.5]" />
          ) : (
            <FiPlus className="text-[10px] sm:text-sm stroke-[2.5]" />
          )}
        </div>
      </div>

      {/* Expanded Summary & Contextual Badges */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-2.5 pb-2.5 sm:px-4.5 sm:pb-4.5 border-t border-slate-100/80 text-slate-600 space-y-2 sm:space-y-2.5">
              {/* Contextual Badge */}
              {badge && (
                <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FFF9F3] text-[#F8971F] border border-[#F8971F]/25 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#F8971F]" />
                    {badge}
                  </span>
                </div>
              )}

              {/* Bullet points or Detailed Summary */}
              {points && points.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <ul className="space-y-1 text-[11px] sm:text-xs text-slate-600 list-none pl-0">
                    {points.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-1.5">
                        <span className="text-[#F8971F] font-bold shrink-0 leading-tight">•</span>
                        <span
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: pt.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-[11px] sm:text-sm font-medium leading-relaxed text-slate-600 whitespace-pre-line pt-1">
                  {summary}
                </div>
              )}

              {/* Visual Number Step Progression */}
              {steps && steps.length > 0 && (
                <div className="mt-2 sm:mt-2.5 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Coverage Progression Example
                  </div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    {steps.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white border border-slate-200 shadow-2xs text-[10px] sm:text-xs font-black text-[#0F172A] flex items-center gap-1">
                          {step}
                        </div>
                        {sIdx < steps.length - 1 && (
                          <span className="text-[10px] sm:text-xs font-extrabold text-[#F8971F] px-0.5">
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

export default function ManipalCignaPlanDetailSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeLimitationModal, setActiveLimitationModal] = useState(null);
  const [videoModalState, setVideoModalState] = useState({
    isOpen: false,
    title: '',
    url: ''
  });
  const [expandedLimitations, setExpandedLimitations] = useState({
    initial: false,
    specific: false,
    permanent: false
  });
  const [expandedReportCard, setExpandedReportCard] = useState({
    csr: false,
    icr: false,
    complaint: false
  });
  const [expandedCompanyStrength, setExpandedCompanyStrength] = useState({
    ownership: false,
    creditRating: false,
    capitalStrength: false,
    financialBase: false,
    reinsurance: false,
    marketPosition: false
  });
  const [expandedFeatureId, setExpandedFeatureId] = useState(null);
  const [benefitSearchQuery, setBenefitSearchQuery] = useState('');

  const { planId: urlPlanId } = useParams();
  const location = useLocation();
  const isFeaturesPage = location.pathname.endsWith('/features');
  const isLimitationsPage = location.pathname.endsWith('/limitations');

  const currentPlanId = resolveManipalCignaPlanId(planIdProp || plan?.id || urlPlanId) || planIdProp || plan?.id || urlPlanId;
  const staticPlanData = getManipalCignaPlanData(currentPlanId);
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
  const primaryColor = uiConfig.primaryColor ?? '#F8971F';
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

  const toggleLimitation = (key) => {
    setExpandedLimitations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleReportCard = (key) => {
    setExpandedReportCard(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCompanyStrength = (key) => {
    setExpandedCompanyStrength(prev => ({ ...prev, [key]: !prev[key] }));
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

  const handleOpenVideo = (title, url) => {
    setVideoModalState({
      isOpen: true,
      title: title || 'Feature Video',
      url: url || demoVideoUrl
    });
  };

  const handleCloseVideo = () => {
    setVideoModalState({ isOpen: false, title: '', url: '' });
  };

  // Reset UI state when switching plans
  useEffect(() => {
    setActiveModal(null);
    setActiveLimitationModal(null);
    setVideoModalState({ isOpen: false, title: '', url: '' });
    setExpandedLimitations({ initial: false, specific: false, permanent: false });
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
    if (activeModal || videoModalState.isOpen || activeLimitationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, videoModalState.isOpen, activeLimitationModal]);

  if (!planData || !currentPlanId) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-lg font-bold text-slate-800">Plan Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">Could not load data for this ManipalCigna plan.</p>
        <Link to={`/insurance/${company.id}`} className="mt-4 text-sm font-semibold text-[#F8971F] hover:underline">
          Back to ManipalCigna Plans
        </Link>
      </div>
    );
  }

  // =========================================================================
  // DEDICATED LIMITATIONS & WAITING PERIODS PAGE (EXACT HDFC STRUCTURE)
  // =========================================================================
  if (isLimitationsPage) {
    return (
      <div className="w-full pb-20 bg-[#FFFBF7] min-h-screen overflow-x-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#F8971F]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 space-y-6 sm:space-y-8 relative z-10">
          {/* Top Navigation & Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-2"
          >
            <div className="text-left mb-3.5 sm:mb-5">
              <Link
                to={`/insurance/${company.id}/${currentPlanId}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlanLabel || `Back to ${planData.planName}`}</span><span className="sm:hidden">Back to Plan</span>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center mb-3 sm:mb-4">
              <img
                src={logo}
                alt={name}
                className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
              />
            </div>

            <div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#F8971F] font-display">
                {planData.planName}
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                {planData.limitationsWaitingPeriods?.heading || 'LIMITATIONS & WAITING PERIODS'}
              </h1>
              <div className="w-8 sm:w-12 h-1 bg-[#F8971F] mx-auto mt-1.5 rounded-full" />
            </div>
          </motion.div>

          {/* Limitation Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {(planData.limitationsWaitingPeriods?.items || []).map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => setActiveLimitationModal(item)}
                className="w-full p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-[#F8971F]/40 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none group relative overflow-hidden active:scale-[0.98]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F8971F]/30 group-hover:bg-[#F8971F] transition-colors duration-200" />
                <span className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#F8971F] transition-colors font-display pr-2">
                  {item.title}
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#F8971F] group-hover:bg-[#FFF9F3] group-hover:border-[#F8971F]/20 transition-all duration-200 shrink-0 select-none">
                  <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-right pt-1">
            <span className="text-xs font-bold text-slate-400">*T&C Apply</span>
          </div>
        </div>

        {/* Detail Box Modal */}
        <AnimatePresence>
          {activeLimitationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLimitationModal(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-hidden z-10 p-4 sm:p-8 max-h-[88dvh] sm:max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveLimitationModal(null)}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer z-10"
                  aria-label="Close"
                >
                  <FiX className="text-base sm:text-lg" />
                </button>

                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#F8971F] block">
                      {planData.planName} • Policy Details
                    </span>
                    <h2 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      {activeLimitationModal.title}
                    </h2>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl border border-[#F8971F]/30 bg-white overflow-hidden shadow-2xs">
                    <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                      <LimitationDetailContent item={activeLimitationModal} />
                      <WatchVideoButton
                        title={activeLimitationModal.title}
                        onOpenVideo={handleOpenVideo}
                        videoUrl={activeLimitationModal.videoUrl ?? demoVideoUrl}
                        align="start"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // =========================================================================
  // DEDICATED FEATURES / POLICY BENEFITS PAGE (EXACT HDFC STRUCTURE)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#FFFBF7] min-h-screen overflow-x-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#F8971F]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 space-y-6 sm:space-y-8 relative z-10">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-2"
          >
            <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-5">
              <Link
                to={`/insurance/${company.id}/${currentPlanId}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlanLabel || `Back to ${planData.planName}`}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor="#F8971F"
                searchResults={benefitSearchResults}
                onResultClick={handleBenefitResultClick}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src={logo}
                alt={name}
                className="w-24 sm:w-44 h-auto max-h-9 sm:max-h-16 object-contain select-none mb-3.5 sm:mb-5"
              />
              {planData.companyName && (
                <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0982C6] mb-1 font-display">
                  {planData.companyName}
                </div>
              )}
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName} <span className="text-[#F8971F]">—</span> {planData.featuresHeadingSuffix || 'POLICY BENEFITS'}
              </h1>
              <div className="w-8 sm:w-12 h-1 bg-[#F8971F] mx-auto mt-1.5 rounded-full" />
            </div>

            {/* DOWNLOAD & SHARE PDF ACTION BUTTONS */}
            <PolicyBenefitsPdfActions
              company={company}
              plan={planData}
              featuresSections={planData.featuresSections}
            />
          </motion.div>

          {/* Empty Search Feedback */}
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

          {/* DYNAMIC PLAN-SPECIFIC FEATURES SECTIONS */}
          {prioritizedFeaturesSections.filter(sec => sec.items && sec.items.length > 0).map((sec, secIdx) => (
            <div key={sec.id || secIdx}>
              {/* Global Emerald Green Category Banner (#00A368) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="w-full mb-3.5 sm:mb-4 relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#00A368] px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm border border-[#00A368]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
                <h2 className="text-xs sm:text-sm font-black tracking-wider text-white font-display flex items-center gap-2.5 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-white/80 inline-block shadow-xs shrink-0" />
                  {sec.title}
                </h2>
              </motion.div>
              <div className={`grid ${sec.gridCols || 'grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4`}>
                {sec.items.map((item, itemIdx) => (
                  <HdfcStyleFeatureAccordionItem
                    key={item.id}
                    item={item}
                    index={itemIdx}
                    isExpanded={expandedFeatureId === item.id}
                    onToggle={toggleAccordionItem}
                    onOpenVideo={handleOpenVideo}
                    demoVideoUrl={demoVideoUrl}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* FOOTNOTE */}
          <div className="text-right pt-1">
            <span className="text-xs font-bold text-slate-400">
              *T&C Apply
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
      </div>
    );
  }

  // =========================================================================
  // MAIN MANIPALCIGNA PLAN DETAIL PAGE (EXACT HDFC ERGO 2X2 + 5TH BUTTON STRUCTURE)
  // =========================================================================
  return (
    <div className="w-full">
      {/* Single Viewport Container - Exact HDFC ERGO balanced layout */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        {/* Navigation Breadcrumb - Back to Plans */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlansLabel || 'Back to ManipalCigna Plans'}</span><span className="sm:hidden">Back to Plans</span>
          </Link>
        </div>

        {/* 1. MANIPALCIGNA LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          {planData.companyName && (
            <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0982C6] mb-0.5 font-display">
              {planData.companyName}
            </div>
          )}
          <h1 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#F8971F] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 2-COLUMN BUTTON GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#F8971F]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F8971F]/30 group-hover:bg-[#F8971F] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#F8971F] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.reportCardButtonLabel || 'REPORT CARD'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#F8971F] group-hover:bg-[#FFF9F3] group-hover:border-[#F8971F]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#0982C6]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0982C6]/30 group-hover:bg-[#0982C6] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0982C6] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.companyStrengthButtonLabel || 'COMPANY STRENGTH'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0982C6] group-hover:bg-[#EBF5FB] group-hover:border-[#0982C6]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#56B948]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#56B948]/30 group-hover:bg-[#56B948] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#56B948] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.policyBenefitsButtonLabel || 'POLICY BENEFITS'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#56B948] group-hover:bg-[#EBF8EB] group-hover:border-[#56B948]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 4: LIMITATIONS & WAITING PERIODS */}
          <button
            type="button"
            onClick={() => {
              setActiveModal('limitations');
              setActiveLimitationModal(null);
            }}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#F8971F]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F8971F]/30 group-hover:bg-[#F8971F] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#F8971F] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.limitationsButtonLabel || 'LIMITATIONS & WAITING PERIODS'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#F8971F] group-hover:bg-[#FFF9F3] group-hover:border-[#F8971F]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border border-[#F8971F]/35 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#F8971F] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ring-1 ring-[#F8971F]/10 hover:ring-[#F8971F]/25 `}
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F8971F] transition-colors duration-200" />
            <div className="flex items-center gap-1.5 sm:gap-2.5 relative z-10 min-w-0 pr-1">
              <span className="text-[#F8971F] text-xs sm:text-base font-black select-none shrink-0 group-hover:scale-110 transition-transform duration-200">
                ✦
              </span>
              <h3 className="text-xs sm:text-base font-black text-[#0F172A] group-hover:text-[#F8971F] transition-colors duration-200 font-display tracking-wide uppercase leading-tight truncate">
                {planData.mustKnowButtonLabel || 'MUST KNOW DETAILS'}
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FFF9F3] border border-[#F8971F]/25 flex items-center justify-center text-[#F8971F] group-hover:bg-[#F8971F] group-hover:text-white transition-all duration-200 shrink-0 relative z-10">
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
                ? 'border-[#F8971F] ring-2 ring-[#F8971F]/20'
                : 'border-slate-200/80 hover:border-[#F8971F]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#F8971F]' : 'bg-[#F8971F]/30 group-hover:bg-[#F8971F]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#F8971F] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight uppercase">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#F8971F] group-hover:bg-[#FFF8F0] group-hover:border-[#F8971F]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL OVERLAYS (EXACT HDFC OVERLAY STRUCTURE WITH MANIPALCIGNA THEME)      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-hidden z-10 p-4 sm:p-8 max-h-[88dvh] sm:max-h-[85vh] overflow-y-auto text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <FiX className="text-base sm:text-lg" />
              </button>

              {/* MODAL 1: REPORT CARD */}
              {activeModal === 'ratio' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#F8971F] block font-display">
                      {planData.reportCard?.subheading || 'ManipalCigna Performance'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.reportCard?.heading || 'REPORT CARD'}
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {planData.reportCard?.description || 'Official claim settlement and financial strength metrics.'}
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {[
                      { key: 'csr', data: planData.reportCard?.csr },
                      { key: 'icr', data: planData.reportCard?.icr },
                      { key: 'complaint', data: planData.reportCard?.complaintVolume }
                    ].filter(i => Boolean(i.data)).map(({ key, data }) => {
                      const isExpanded = expandedReportCard[key];
                      return (
                        <div key={key} className="rounded-xl sm:rounded-2xl border border-[#F8971F]/30 bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => toggleReportCard(key)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group"
                          >
                            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#F8971F] transition-colors font-display">
                              {data.title}
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-xs sm:text-sm font-bold text-[#F8971F]">
                                {data.summaryValue}
                              </span>
                              <FiChevronDown className={`text-xs sm:text-sm text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#F8971F]' : ''}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/50 space-y-2 text-xs text-slate-600">
                                  {data.subtitle && <p className="font-bold text-slate-800">{data.subtitle}</p>}
                                  <p>{data.explanation}</p>
                                  {data.singleYear && (
                                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                                      <span className="text-slate-400">{data.singleYearLabel || 'Recent Year'}</span>
                                      <span className="font-bold text-slate-800">{data.singleYear}</span>
                                    </div>
                                  )}
                                  {data.threeYearAvg && (
                                    <div className="flex items-center justify-between text-[11px]">
                                      <span className="text-slate-400">{data.threeYearAvgLabel || '3-Yr Average'}</span>
                                      <span className="font-bold text-slate-800">{data.threeYearAvg}</span>
                                    </div>
                                  )}
                                  {data.range && (
                                    <div className="flex items-center justify-between text-[11px]">
                                      <span className="text-slate-400">{data.rangeLabel || 'Range'}</span>
                                      <span className="font-bold text-slate-800">{data.range}</span>
                                    </div>
                                  )}
                                  {data.value && (
                                    <div className="flex items-center justify-between text-[11px]">
                                      <span className="text-slate-400">{data.label || 'Value'}</span>
                                      <span className="font-bold text-slate-800">{data.value}</span>
                                    </div>
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

              {/* MODAL 2: COMPANY STRENGTH */}
              {activeModal === 'fundamental' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#0982C6] block font-display">
                      {planData.companyStrength?.subheading || 'How reliable/strong is the insurer?'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.companyStrength?.heading || 'COMPANY STRENGTH'}
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {planData.companyStrength?.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {[
                      { key: 'ownership', data: planData.companyStrength?.ownership },
                      { key: 'creditRating', data: planData.companyStrength?.creditRating },
                      { key: 'capitalStrength', data: planData.companyStrength?.capitalStrength },
                      { key: 'financialBase', data: planData.companyStrength?.financialBase },
                      { key: 'reinsurance', data: planData.companyStrength?.reinsuranceStrength },
                      { key: 'marketPosition', data: planData.companyStrength?.marketPosition }
                    ].filter(i => Boolean(i.data)).map(({ key, data }) => {
                      const isExpanded = expandedCompanyStrength[key];
                      return (
                        <div key={key} className="rounded-xl sm:rounded-2xl border border-[#0982C6]/25 bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => toggleCompanyStrength(key)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group"
                          >
                            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0982C6] transition-colors font-display">
                              {data.title}
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-xs sm:text-sm font-bold text-[#0982C6]">
                                {data.summaryValue}
                              </span>
                              <FiChevronDown className={`text-xs sm:text-sm text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#0982C6]' : ''}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/50 space-y-2 text-xs text-slate-600">
                                  <p>{data.explanation}</p>
                                  {data.items && (
                                    <ul className="space-y-1 pt-1 list-disc list-inside">
                                      {data.items.map((it, idx) => (
                                        <li key={idx}>{it}</li>
                                      ))}
                                    </ul>
                                  )}
                                  {data.label && (
                                    <p className="text-[11px] text-slate-400 font-medium pt-1">
                                      {data.label}
                                    </p>
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

              {/* MODAL 3: LIMITATIONS & WAITING PERIODS */}
              {activeModal === 'limitations' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#F8971F] block font-display">
                      {planData.planName} • Policy Details
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.limitationsWaitingPeriods?.heading || 'LIMITATIONS & WAITING PERIODS'}
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      Terms, Waiting Periods & Exclusions
                    </p>
                  </div>

                  <div className="space-y-3">
                    {(planData.limitationsWaitingPeriods?.items || []).map((item) => {
                      const isExpanded = activeLimitationModal?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl sm:rounded-2xl border border-[#F8971F]/30 bg-white overflow-hidden shadow-2xs hover:border-[#F8971F]/60 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLimitationModal(isExpanded ? null : item)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#F8971F] transition-colors leading-tight">
                                {item.title}
                              </h4>
                              {item.durationTag && (
                                <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFF9F3] text-[#F8971F] border border-[#F8971F]/20">
                                  {item.durationTag}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF9F3] transition-all duration-300 shrink-0">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isExpanded ? 'rotate-180 text-[#F8971F]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                  <LimitationDetailContent item={item} />
                                  <WatchVideoButton
                                    title={item.title}
                                    onOpenVideo={handleOpenVideo}
                                    videoUrl={item.videoUrl ?? demoVideoUrl}
                                    align="start"
                                  />
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
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#F8971F] block font-display">
                      {planData.mustKnow?.subheading || 'Essential plan conditions and highlights'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.mustKnow?.heading || 'MUST-KNOW DETAILS'}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {(planData.mustKnow?.items || []).map((item) => (
                      <div key={item.id} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#F8971F]/20 bg-[#FFF9F3]/60 space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">{item.icon}</span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                            {item.title}
                          </h4>
                        </div>
                        {item.value && (
                          <span className="inline-block text-[10px] sm:text-xs font-bold text-[#F8971F] bg-white px-2 py-0.5 rounded-md border border-[#F8971F]/20">
                            {item.value}
                          </span>
                        )}
                        <div className="space-y-1 text-xs text-slate-600 leading-relaxed pt-1">
                          {item.paragraphs.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
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
                    <p className="text-xs text-[#F8971F] font-medium mt-0.5">
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
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#F8971F]/30 shadow-2xs space-y-2 text-left hover:border-[#F8971F]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF8F0] text-[#F8971F] border border-[#F8971F]/20 shrink-0 font-display">
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
                                  <FiCheck className="text-[#F8971F] mt-0.5 shrink-0 text-xs" />
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
