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
import { getAdityaBirlaPlanData, resolveAdityaBirlaPlanId } from '../data/adityaBirlaPlansData';
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

// Feature-Wise Inline Video Button Component (Aditya Birla Red/Orange Theme)
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#D51D25] border border-[#D51D25]/30 hover:bg-[#D51D25] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#D51D25] group-hover:text-white transition-colors" />
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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#D51D25] border border-[#D51D25]/30 hover:bg-[#D51D25] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#D51D25] group-hover:text-white transition-colors" />
      <span>WATCH VIDEO</span>
    </button>
  </div>
);

// Premium In-Page Video Lightbox Modal (Aditya Birla Theme)
const FeatureVideoModal = ({ isOpen, onClose, videoTitle, videoUrl }) => {
  if (!isOpen) return null;

  const embedInfo = getVideoEmbedUrl(videoUrl);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden z-10 p-4 sm:p-6 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white font-display">
                {videoTitle || 'Aditya Birla Feature Video'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D51D25] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              <FiX />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
            {embedInfo.type === 'youtube' && (
              <iframe
                src={embedInfo.url}
                title={videoTitle || 'Video'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {embedInfo.type === 'mp4' && (
              <video
                src={embedInfo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}
            {embedInfo.type === 'iframe' && (
              <iframe
                src={embedInfo.url}
                title={videoTitle || 'Video'}
                className="w-full h-full border-0"
                allowFullScreen
              />
            )}
            {embedInfo.type === 'none' && (
              <div className="text-center p-6 text-slate-400">
                <FiPlay className="text-3xl mx-auto mb-2 text-[#D51D25]" />
                <p className="text-xs">No video preview available for this benefit.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Sub-component for Aditya Birla Features Accordion Items
function AdityaBirlaFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  demoVideoUrl
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, steps, points, isRider, isProminent, iconType, videoUrl } = item;
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
      className={`transition-all duration-200 cursor-pointer rounded-xl sm:rounded-2xl border overflow-hidden select-none ${
        item._isMatched
          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
          : isExpanded
          ? 'bg-[#FFF5F5]/90 border-[#D51D25]/60 shadow-md ring-1 ring-[#D51D25]/20'
          : isProminent
          ? 'bg-white border-[#D51D25]/30 hover:border-[#D51D25]/60 shadow-xs ring-1 ring-[#D51D25]/10'
          : 'bg-white border-slate-200/80 hover:border-[#D51D25]/40 shadow-2xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-2.5 sm:p-4 flex items-start sm:items-center justify-between gap-1.5 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded
                ? 'bg-[#D51D25] text-white shadow-xs'
                : isProminent
                ? 'bg-red-50 text-[#D51D25] border border-red-200/60'
                : 'bg-[#FFF5F5] text-[#D51D25]'
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
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/80 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {isRider && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#D51D25]/10 text-[#D51D25] tracking-wide shrink-0 inline-flex items-center gap-1 shadow-2xs">
                  <span className="w-1 h-1 rounded-full bg-[#D51D25]" />
                  Optional Rider
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
          isExpanded ? 'bg-[#D51D25] text-white rotate-180' : 'bg-[#FFF5F5] text-[#D51D25]'
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
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FFF5F5] text-[#D51D25] border border-[#D51D25]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#D51D25]" />
                    {badge}
                  </span>
                </div>
              )}

              {/* Short explanation / Details */}
              {summary && (
                <div className="text-[11px] sm:text-sm font-medium leading-relaxed text-slate-600">
                  {summary}
                </div>
              )}

              {/* Bullet Points List if provided */}
              {points && points.length > 0 && (
                <div className="pt-1.5 space-y-1">
                  {points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5 text-[10.5px] sm:text-xs font-semibold text-slate-700 leading-snug">
                      <span className="text-[#D51D25] font-black shrink-0 select-none">✓</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: typeof pt === 'string' ? pt.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>') : pt
                        }}
                      />
                    </div>
                  ))}
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
                          <span className="text-[10px] sm:text-xs font-extrabold text-[#D51D25] px-0.5">
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

export default function AdityaBirlaPlanDetailSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeLimitationId, setActiveLimitationId] = useState(null);
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

  const location = useLocation();
  const { planId: urlPlanId } = useParams();

  // Resolve to canonical Aditya Birla plan ID
  const currentPlanId = resolveAdityaBirlaPlanId(planIdProp || plan?.id || urlPlanId) || planIdProp || plan?.id || urlPlanId;
  const staticPlanData = getAdityaBirlaPlanData(currentPlanId);
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

  const { name, logo } = company;
  const demoVideoUrl = planData?.uiConfig?.demoVideoUrl || DEFAULT_DEMO_VIDEO_URL;

  // Determine if features/policy benefits page is active
  const isFeaturesPage = location.pathname.endsWith('/features');

  // Check URL query params for modal opening
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modalParam = params.get('modal');
    if (modalParam && ['ratio', 'fundamental', 'limitations', 'mustKnow'].includes(modalParam)) {
      setActiveModal(modalParam);
    }
  }, [location.search]);

  // Filtering & search helper for Policy Benefits
  const {
    sections: prioritizedFeaturesSections,
    totalMatches: totalBenefitMatches,
    hasActiveSearch: hasActiveBenefitSearch
  } = React.useMemo(() => {
    return getFilteredAndPrioritizedFeaturesSections(planData?.featuresSections || [], benefitSearchQuery);
  }, [planData?.featuresSections, benefitSearchQuery]);

  const benefitSearchResults = React.useMemo(() => {
    return getBenefitSearchResults(planData?.featuresSections || [], benefitSearchQuery);
  }, [planData?.featuresSections, benefitSearchQuery]);

  const handleBenefitResultClick = (itemId) => {
    scrollToBenefitCard(itemId);
  };

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
  // DEDICATED FEATURES PAGE (POLICY BENEFITS — 4 CATEGORIES)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#FFFBF7] min-h-screen overflow-x-hidden relative">
        {/* Subtle Ambient Red/Orange Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#D51D25]" />
        <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full blur-[100px] opacity-10 pointer-events-none bg-[#F68529]" />

        {/* Page Container — Aditya Birla Theme */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 space-y-10 sm:space-y-12 relative z-10">

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
                primaryColor="#D51D25"
                searchResults={benefitSearchResults}
                onResultClick={handleBenefitResultClick}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src={logo}
                alt={name}
                className="w-28 sm:w-48 h-auto max-h-10 sm:max-h-18 object-contain select-none mb-3.5 sm:mb-5"
              />
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName} <span className="text-[#D51D25]">—</span> POLICY BENEFITS
              </h1>
              <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-[#D51D25] via-[#F68529] to-[#F5D34F] mx-auto mt-1.5 rounded-full" />
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

          {/* PRODUCT DETAILS CARD (WHEN AVAILABLE) */}
          {planData.productDetails && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden space-y-3"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0F172A] font-display">
                  {planData.productDetails.title || 'Product Details & Eligibility'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {planData.productDetails.items.map((item, idx) => (
                  <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-[#FFFBF7] border border-[#D51D25]/15">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0F172A] block mt-0.5 font-display">
                      {item.value}
                    </span>
                    {item.note && (
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {item.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4 DYNAMIC PLAN-SPECIFIC FEATURES SECTIONS */}
          {prioritizedFeaturesSections.map((sec, secIdx) => (
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

                <div className="flex items-center relative z-10">
                  <h2 className="text-xs sm:text-sm font-black tracking-wider text-white font-display flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-white/80 inline-block shadow-xs shrink-0" />
                    {sec.title}
                  </h2>
                </div>
              </motion.div>
              <div className={`grid ${sec.gridCols || 'grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4 items-start`}>
                {sec.items.map((item, itemIdx) => (
                  <AdityaBirlaFeatureAccordionItem
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

          {/* WAITING PERIOD SECTION (SEPARATE COMPACT SECTION BELOW 4 CATEGORIES) */}
          {planData.waitingPeriodDetails && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-3.5 pt-2"
            >
              <div className="w-full relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#14532D] via-[#052E16] to-[#14532D] px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm border border-emerald-900/50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-display flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-xs shrink-0" />
                    {planData.waitingPeriodDetails.title || 'WAITING PERIOD'}
                  </h2>
                  <span className="text-[7.5px] sm:text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    Standard Policy Terms
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
                {planData.waitingPeriodDetails.items.map((wp, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {wp.label}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#D51D25] font-display block">
                      {wp.period}
                    </span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {wp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FOOTNOTE */}
          <div className="text-center sm:text-right pt-2 pb-6">
            <span className="text-xs font-semibold text-slate-400">
              *Terms & Conditions apply.
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
  // MAIN ADITYA BIRLA PLAN DETAIL PAGE (SINGLE VIEWPORT — APPROVED HDFC UX STRUCTURE)
  // =========================================================================
  return (
    <div className="w-full">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        
        {/* Navigation Breadcrumb - Back to Plans */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to Aditya Birla Plans</span><span className="sm:hidden">Back to Plans</span>
          </Link>
        </div>

        {/* 1. ADITYA BIRLA LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-28 sm:w-52 h-auto max-h-10 sm:max-h-22 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#D51D25] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 2-COLUMN BUTTON GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#D51D25]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D51D25]/30 group-hover:bg-[#D51D25] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.reportCardButtonLabel || 'REPORT CARD'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D51D25] group-hover:bg-[#FFF5F5] group-hover:border-[#D51D25]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#D51D25]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D51D25]/30 group-hover:bg-[#D51D25] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.companyStrengthButtonLabel || 'COMPANY STRENGTH'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D51D25] group-hover:bg-[#FFF5F5] group-hover:border-[#D51D25]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#D51D25]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D51D25]/30 group-hover:bg-[#D51D25] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.policyBenefitsButtonLabel || 'POLICY BENEFITS'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D51D25] group-hover:bg-[#FFF5F5] group-hover:border-[#D51D25]/20 transition-all duration-200 shrink-0">
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
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#D51D25]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D51D25]/30 group-hover:bg-[#D51D25] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display leading-tight pr-1">
              {planData.limitationsButtonLabel || 'LIMITATIONS & WAITING PERIODS'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D51D25] group-hover:bg-[#FFF5F5] group-hover:border-[#D51D25]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border border-[#D51D25]/35 p-2.5 sm:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#D51D25] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ring-1 ring-[#D51D25]/10 hover:ring-[#D51D25]/25 `}
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D51D25] transition-colors duration-200" />
            <div className="flex items-center gap-1.5 sm:gap-2.5 relative z-10 min-w-0 pr-1">
              <span className="text-[#D51D25] text-xs sm:text-base font-black select-none shrink-0 group-hover:scale-110 transition-transform duration-200">
                ✦
              </span>
              <h3 className="text-xs sm:text-base font-black text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display tracking-wide uppercase leading-tight truncate">
                {planData.mustKnowButtonLabel || 'MUST KNOW DETAILS'}
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FFF5F5] border border-[#D51D25]/25 flex items-center justify-center text-[#D51D25] group-hover:bg-[#D51D25] group-hover:text-white transition-all duration-200 shrink-0 relative z-10">
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
                ? 'border-[#D51D25] ring-2 ring-[#D51D25]/20'
                : 'border-slate-200/80 hover:border-[#D51D25]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#D51D25]' : 'bg-[#D51D25]/30 group-hover:bg-[#D51D25]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#D51D25] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight uppercase">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D51D25] group-hover:bg-[#FFF5F5] group-hover:border-[#D51D25]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL OVERLAYS (REPORT CARD, COMPANY STRENGTH, LIMITATIONS, MUST KNOW)     */}
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

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg max-h-[85vh] overflow-y-auto z-10 p-4 sm:p-6 custom-scrollbar text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-[#D51D25] text-slate-500 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0 z-20"
                aria-label="Close"
              >
                <FiX />
              </button>

              {/* ───────────────────────────────────────────────────────────── */}
              {/* 1. REPORT CARD MODAL                                          */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeModal === 'ratio' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#D51D25]">
                        Aditya Birla Health Insurance Performance
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      REPORT CARD
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Official claim settlement & operational metrics
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {/* CSR */}
                    {planData.reportCard?.csr && (
                      <div className="border border-slate-200/90 rounded-xl sm:rounded-2xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleReportCard('csr')}
                          className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {planData.reportCard.csr.title}
                            </div>
                            <div className="text-base sm:text-xl font-black text-[#D51D25] font-display">
                              {planData.reportCard.csr.summaryValue}
                            </div>
                            <div className="text-[11px] font-bold text-slate-600">
                              {planData.reportCard.csr.subtitle}
                            </div>
                          </div>
                          <div className={`w-7 h-7 rounded-full bg-[#FFF5F5] text-[#D51D25] flex items-center justify-center transition-transform ${
                            expandedReportCard.csr ? 'rotate-180' : ''
                          }`}>
                            <FiChevronDown className="text-sm" />
                          </div>
                        </button>
                        {expandedReportCard.csr && (
                          <div className="p-3 sm:p-4 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                            <p className="pt-2 font-medium">{planData.reportCard.csr.explanation}</p>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block">{planData.reportCard.csr.singleYearLabel}</span>
                                <span className="font-extrabold text-slate-800">{planData.reportCard.csr.singleYear}</span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block">{planData.reportCard.csr.threeYearAvgLabel}</span>
                                <span className="font-extrabold text-slate-800">{planData.reportCard.csr.threeYearAvg}</span>
                              </div>
                            </div>
                            <WatchVideoButton title={planData.reportCard.csr.videoTitle} videoUrl={demoVideoUrl} onOpenVideo={handleOpenVideo} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* ICR */}
                    {planData.reportCard?.icr && (
                      <div className="border border-slate-200/90 rounded-xl sm:rounded-2xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleReportCard('icr')}
                          className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {planData.reportCard.icr.title}
                            </div>
                            <div className="text-base sm:text-xl font-black text-[#D51D25] font-display">
                              {planData.reportCard.icr.summaryValue}
                            </div>
                            <div className="text-[11px] font-bold text-slate-600">
                              {planData.reportCard.icr.subtitle}
                            </div>
                          </div>
                          <div className={`w-7 h-7 rounded-full bg-[#FFF5F5] text-[#D51D25] flex items-center justify-center transition-transform ${
                            expandedReportCard.icr ? 'rotate-180' : ''
                          }`}>
                            <FiChevronDown className="text-sm" />
                          </div>
                        </button>
                        {expandedReportCard.icr && (
                          <div className="p-3 sm:p-4 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                            <p className="pt-2 font-medium">{planData.reportCard.icr.explanation}</p>
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                              <span className="text-[9px] font-bold text-slate-400 uppercase block">{planData.reportCard.icr.rangeLabel}</span>
                              <span className="font-extrabold text-slate-800">{planData.reportCard.icr.range}</span>
                            </div>
                            <WatchVideoButton title={planData.reportCard.icr.videoTitle} videoUrl={demoVideoUrl} onOpenVideo={handleOpenVideo} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Complaint Volume */}
                    {planData.reportCard?.complaintVolume && (
                      <div className="border border-slate-200/90 rounded-xl sm:rounded-2xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleReportCard('complaint')}
                          className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {planData.reportCard.complaintVolume.title}
                            </div>
                            <div className="text-base sm:text-xl font-black text-[#D51D25] font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </div>
                            <div className="text-[11px] font-bold text-slate-600">
                              {planData.reportCard.complaintVolume.subtitle}
                            </div>
                          </div>
                          <div className={`w-7 h-7 rounded-full bg-[#FFF5F5] text-[#D51D25] flex items-center justify-center transition-transform ${
                            expandedReportCard.complaint ? 'rotate-180' : ''
                          }`}>
                            <FiChevronDown className="text-sm" />
                          </div>
                        </button>
                        {expandedReportCard.complaint && (
                          <div className="p-3 sm:p-4 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                            <p className="pt-2 font-medium">{planData.reportCard.complaintVolume.explanation}</p>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block">{planData.reportCard.complaintVolume.volumeLabel}</span>
                                <span className="font-extrabold text-slate-800">{planData.reportCard.complaintVolume.volume}</span>
                              </div>
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block">{planData.reportCard.complaintVolume.resolutionRateLabel}</span>
                                <span className="font-extrabold text-slate-800">{planData.reportCard.complaintVolume.resolutionRate}</span>
                              </div>
                            </div>
                            <WatchVideoButton title={planData.reportCard.complaintVolume.videoTitle} videoUrl={demoVideoUrl} onOpenVideo={handleOpenVideo} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* 2. COMPANY STRENGTH MODAL                                     */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeModal === 'fundamental' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#D51D25]">
                        Institutional Backing
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      COMPANY STRENGTH
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Promoter profile, capital reserve, and market standing
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {/* Ownership */}
                    {planData.companyStrength?.ownership && (
                      <div className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleCompanyStrength('ownership')}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 block">{planData.companyStrength.ownership.title}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{planData.companyStrength.ownership.summaryValue}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${expandedCompanyStrength.ownership ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCompanyStrength.ownership && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                            <p className="pt-1.5 font-medium">{planData.companyStrength.ownership.explanation}</p>
                            {planData.companyStrength.ownership.promoters && (
                              <div className="space-y-1 pt-1">
                                {planData.companyStrength.ownership.promoters.map((p, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-50 text-[11px]">
                                    <span className="font-bold text-slate-700">{p.name}</span>
                                    <span className="font-extrabold text-[#D51D25]">{p.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Solvency Ratio */}
                    {planData.companyStrength?.creditRating && (
                      <div className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleCompanyStrength('creditRating')}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 block">{planData.companyStrength.creditRating.title}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{planData.companyStrength.creditRating.summaryValue}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${expandedCompanyStrength.creditRating ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCompanyStrength.creditRating && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <p className="pt-1.5 font-medium">{planData.companyStrength.creditRating.explanation}</p>
                            <div className="p-2 bg-slate-50 rounded text-[11px] font-bold text-slate-700">
                              {planData.companyStrength.creditRating.rating}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Capital Strength */}
                    {planData.companyStrength?.capitalStrength && (
                      <div className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleCompanyStrength('capitalStrength')}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 block">{planData.companyStrength.capitalStrength.title}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{planData.companyStrength.capitalStrength.summaryValue}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCompanyStrength.capitalStrength && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <p className="pt-1.5 font-medium">{planData.companyStrength.capitalStrength.explanation}</p>
                            <div className="p-2 bg-slate-50 rounded text-[11px] font-bold text-slate-700">
                              {planData.companyStrength.capitalStrength.aum}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hospital Network */}
                    {planData.companyStrength?.financialBase && (
                      <div className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleCompanyStrength('financialBase')}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 block">{planData.companyStrength.financialBase.title}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{planData.companyStrength.financialBase.summaryValue}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${expandedCompanyStrength.financialBase ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCompanyStrength.financialBase && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <p className="pt-1.5 font-medium">{planData.companyStrength.financialBase.explanation}</p>
                            <div className="p-2 bg-slate-50 rounded text-[11px] font-bold text-slate-700">
                              {planData.companyStrength.financialBase.hospitals}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Wellness Ecosystem */}
                    {planData.companyStrength?.reinsurance && (
                      <div className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => toggleCompanyStrength('reinsurance')}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 block">{planData.companyStrength.reinsurance.title}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{planData.companyStrength.reinsurance.summaryValue}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${expandedCompanyStrength.reinsurance ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCompanyStrength.reinsurance && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <p className="pt-1.5 font-medium">{planData.companyStrength.reinsurance.explanation}</p>
                            <div className="p-2 bg-slate-50 rounded text-[11px] font-bold text-slate-700">
                              {planData.companyStrength.reinsurance.features}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* 3. LIMITATIONS & WAITING PERIODS MODAL                       */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeModal === 'limitations' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#D51D25]">
                        Policy Terms & Clauses
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      LIMITATIONS & WAITING PERIODS
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Standard statutory waiting periods & exclusion schedules
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {planData.limitationsSection?.limitations?.map((lim) => (
                      <div key={lim.id} className="border border-slate-200/90 rounded-xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setActiveLimitationId(activeLimitationId === lim.id ? null : lim.id)}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 block">{lim.title}</span>
                            <span className="text-[10.5px] font-bold text-[#D51D25]">{lim.period}</span>
                          </div>
                          <FiChevronDown className={`text-slate-400 transition-transform ${activeLimitationId === lim.id ? 'rotate-180' : ''}`} />
                        </button>
                        {activeLimitationId === lim.id && (
                          <div className="p-3 pt-0 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <p className="pt-1.5 font-medium leading-relaxed">{lim.description}</p>
                            {lim.policyRef && (
                              <div className="text-[10px] text-slate-400 font-semibold italic">
                                Ref: {lim.policyRef}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* 4. MUST KNOW DETAILS MODAL                                   */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeModal === 'mustKnow' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D51D25]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#D51D25]">
                        Critical Plan Highlights
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      MUST KNOW DETAILS
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Key differentiators and unique benefits of {planData.planName}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {planData.mustKnow?.items?.map((mk) => (
                      <div key={mk.id} className="p-3.5 rounded-xl bg-gradient-to-r from-[#FFF5F5] to-white border border-[#D51D25]/25 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-black text-[#0F172A] font-display">{mk.title}</h4>
                          <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-[#D51D25]/10 text-[#D51D25] border border-[#D51D25]/20">
                            Key Feature
                          </span>
                        </div>
                        <p className="text-[11px] font-extrabold text-[#D51D25]">{mk.highlight}</p>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{mk.description}</p>
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
                    <p className="text-xs text-[#D51D25] font-medium mt-0.5">
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
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D51D25]/30 shadow-2xs space-y-2 text-left hover:border-[#D51D25]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#D51D25] border border-[#D51D25]/20 shrink-0 font-display">
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
                                  <FiCheck className="text-[#D51D25] mt-0.5 shrink-0 text-xs" />
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
