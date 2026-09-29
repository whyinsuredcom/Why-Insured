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
  FiSliders
} from 'react-icons/fi';
import { getStarHealthPlanData, resolveStarHealthPlanId } from '../data/starHealthPlansData';
import PolicyBenefitsPdfActions from './PolicyBenefitsPdfActions';
import BenefitSearchBar from './BenefitSearchBar';
import { getFilteredAndPrioritizedFeaturesSections, getBenefitSearchResults } from '../utils/benefitSearchHelper';
import { scrollToBenefitCard } from '../utils/scrollToBenefitCard';
import StarSuperStarVariantSelector from './StarSuperStarVariantSelector';

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

// Compact Feature-Wise Inline Video Button Component (Star Health Deep Blue Theme)
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold bg-[#F0F4FF] text-[#003087] border border-[#003087]/25 hover:bg-[#003087] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group align-middle ml-0.5 sm:ml-1"
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current text-[#003087] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Premium "WATCH VIDEO" button — matches Report Card & Modal design (Star Health Deep Blue Theme)
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#003087] border border-[#003087]/25 hover:bg-[#003087] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#003087] group-hover:text-white transition-colors" />
      <span>WATCH VIDEO</span>
    </button>
  </div>
);

// Premium In-Page Video Lightbox Modal (Star Health Theme)
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#003087]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#003087] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <FiX />
          </button>
        </div>

        {/* Video Player Container (16:9) */}
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

// Sub-component for Star Health Features Accordion Items with Scroll Reveal & Stagger
function StarHealthFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  demoVideoUrl
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, steps, isRider, iconType } = item;
  const IconComponent = (iconType && ICON_MAP[iconType]) || FiCheckSquare;

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
          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
          : isExpanded
          ? 'bg-[#F0F4FF]/80 border-[#003087]/60 shadow-md ring-1 ring-[#003087]/20'
          : 'bg-white border-slate-200/80 hover:border-[#003087]/40 shadow-2xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-2.5 sm:p-4 flex items-start sm:items-center justify-between gap-1.5 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded ? 'bg-[#003087] text-white shadow-xs' : 'bg-[#F0F4FF] text-[#003087]'
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
                <VideoButton featureTitle={title} onOpenVideo={onOpenVideo} videoUrl={demoVideoUrl} />
              )}
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/80 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {isRider && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#003087]/10 text-[#003087] tracking-wide shrink-0">
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
          isExpanded ? 'bg-[#003087] text-white rotate-180' : 'bg-[#F0F4FF] text-[#003087]'
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
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#F0F4FF] text-[#003087] border border-[#003087]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#003087]" />
                    {badge}
                  </span>
                </div>
              )}

              {/* Short explanation / Details */}
              <div className="text-[11px] sm:text-sm font-medium leading-relaxed text-slate-600">
                {summary}
              </div>

              {/* Bullet Points with Checkmarks if points present */}
              {item.points && item.points.length > 0 && (
                <div className="space-y-1.5 pt-0.5">
                  <ul className="space-y-1.5 text-[11px] sm:text-sm font-medium text-slate-600 list-none pl-0">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <FiCheck className="text-[#003087] text-xs shrink-0 mt-1" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
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
                          <span className="text-[10px] sm:text-xs font-extrabold text-[#003087] px-0.5">
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

export default function StarHealthPlanDetailSection({ plan, company, planId: planIdProp }) {
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

  const { planId: urlPlanId } = useParams();
  const location = useLocation();
  const isFeaturesPage = location.pathname.endsWith('/features');

  // Resolve to canonical Star Health plan ID — each plan gets independent data
  const currentPlanId = resolveStarHealthPlanId(planIdProp || plan?.id || urlPlanId);
  const staticPlanData = getStarHealthPlanData(currentPlanId);
  const planData = React.useMemo(() => {
    if (!plan || !plan.featuresSections || plan.featuresSections.length === 0) {
      return staticPlanData;
    }
    return {
      ...staticPlanData,
      ...plan,
      featuresSections: (plan.featuresSections && plan.featuresSections.length > 0)
        ? plan.featuresSections
        : staticPlanData?.featuresSections,
      reportCard: (plan.reportCard && (plan.reportCard.csr || plan.reportCard.allMetrics?.length > 0))
        ? plan.reportCard
        : staticPlanData?.reportCard,
      companyStrength: (plan.companyStrength && (plan.companyStrength.ownership || plan.companyStrength.items?.length > 0))
        ? plan.companyStrength
        : staticPlanData?.companyStrength,
      limitationsWaitingPeriods: (plan.limitationsWaitingPeriods?.items && plan.limitationsWaitingPeriods.items.length > 0)
        ? plan.limitationsWaitingPeriods
        : staticPlanData?.limitationsWaitingPeriods,
      mustKnow: (plan.mustKnow?.items && plan.mustKnow.items.length > 0)
        ? plan.mustKnow
        : staticPlanData?.mustKnow,
      bestSuitedFor: (plan.bestSuitedFor?.profiles && plan.bestSuitedFor.profiles.length > 0)
        ? plan.bestSuitedFor
        : staticPlanData?.bestSuitedFor
    };
  }, [plan, staticPlanData]);
  const uiConfig = planData?.uiConfig ?? {};
  const demoVideoUrl = uiConfig.demoVideoUrl ?? DEFAULT_DEMO_VIDEO_URL;
  const { logo, name } = company;
  const isSuperStarVariant = currentPlanId.startsWith('star-super-star-');

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

  // Reset all UI state when switching between plans
  useEffect(() => {
    setActiveModal(null);
    setActiveLimitationId(null);
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
    if (activeModal || videoModalState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, videoModalState.isOpen]);

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
  // STAR HEALTH SUPER STAR: VARIANT SELECTOR SCREEN (5 VARIANTS)
  // =========================================================================
  if (currentPlanId === 'star-super-star') {
    return <StarSuperStarVariantSelector company={company} />;
  }

  // =========================================================================
  // DEDICATED FEATURES PAGE (POLICY BENEFITS — 4 CATEGORIES)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#F0F4FF] min-h-screen overflow-x-hidden relative">
        {/* Subtle Ambient Blue Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#003087]" />

        {/* Page Container — Star Health Theme */}
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
                primaryColor="#003087"
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
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName} <span className="text-[#003087]">—</span> POLICY BENEFITS
              </h1>
              {planData.subtitle && (
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  {planData.subtitle}
                </p>
              )}
              <div className="w-8 sm:w-12 h-1 bg-[#003087] mx-auto mt-1.5 rounded-full" />
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
                <h2 className="text-xs sm:text-sm font-black tracking-wider text-white font-display flex items-center gap-2.5 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-white/80 inline-block shadow-xs shrink-0" />
                  {sec.title}
                </h2>
              </motion.div>
              <div className={`grid ${sec.gridCols || 'grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4`}>
                {sec.items.map((item, itemIdx) => (
                  <StarHealthFeatureAccordionItem
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
  // MAIN STAR HEALTH PLAN DETAIL PAGE (SINGLE VIEWPORT — APPROVED HDFC UX STRUCTURE)
  // =========================================================================
  return (
    <div className="w-full">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        {/* Navigation Breadcrumb - Back to Plans / Super Star Variants */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={isSuperStarVariant ? `/insurance/${company.id}/star-super-star` : `/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" />{' '}
            <span className="hidden sm:inline">
              {isSuperStarVariant ? 'Back to Super Star Variants' : 'Back to Star Health Plans'}
            </span>
            <span className="sm:hidden">
              {isSuperStarVariant ? 'Back to Variants' : 'Back to Plans'}
            </span>
          </Link>
        </div>

        {/* 1. STAR HEALTH LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          {planData.subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              {planData.subtitle}
            </p>
          )}
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#003087] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 6-CARD NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'ratio'
                ? 'border-[#003087] ring-2 ring-[#003087]/20'
                : 'border-slate-200/80 hover:border-[#003087]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'ratio' ? 'bg-[#003087]' : 'bg-[#003087]/30 group-hover:bg-[#003087]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              REPORT CARD
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'fundamental'
                ? 'border-[#003087] ring-2 ring-[#003087]/20'
                : 'border-slate-200/80 hover:border-[#003087]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'fundamental' ? 'bg-[#003087]' : 'bg-[#003087]/30 group-hover:bg-[#003087]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              COMPANY STRENGTH
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#003087]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#003087]/30 group-hover:bg-[#003087] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              POLICY BENEFITS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
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
                ? 'border-[#003087] ring-2 ring-[#003087]/20'
                : 'border-slate-200/80 hover:border-[#003087]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'limitations' ? 'bg-[#003087]' : 'bg-[#003087]/30 group-hover:bg-[#003087]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              LIMITATIONS & WAITING PERIODS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'mustKnow'
                ? 'border-[#003087] ring-2 ring-[#003087]/20'
                : 'border-slate-200/80 hover:border-[#003087]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'mustKnow' ? 'bg-[#003087]' : 'bg-[#003087]/30 group-hover:bg-[#003087]'
            }`} />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#003087] text-xs sm:text-base font-black select-none shrink-0"
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                MUST KNOW DETAILS
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

                    {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'bestSuitedFor'
                ? 'border-[#003087] ring-2 ring-[#003087]/20'
                : 'border-slate-200/80 hover:border-[#003087]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#003087]' : 'bg-[#003087]/30 group-hover:bg-[#003087]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#003087] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight uppercase">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F7FF] group-hover:border-[#003087]/20 transition-all duration-200 shrink-0">
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
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-hidden z-10 p-4 sm:p-8 max-h-[88dvh] sm:max-h-[85vh] overflow-y-auto"
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

              {/* Modal Top Tab Navigation Switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-4 border-b border-slate-100 no-scrollbar pr-8">
                {[
                  { id: 'ratio', label: 'Report Card' },
                  { id: 'fundamental', label: 'Company Strength' },
                  { id: 'features', label: 'Policy Benefits', isLink: true, url: `/insurance/${company.id}/${currentPlanId}/features` },
                  { id: 'limitations', label: 'Limitations' },
                  { id: 'mustKnow', label: 'Must Know Details' },
                  { id: 'bestSuitedFor', label: 'Perfect For' }
                ].map((tab) => {
                  if (tab.isLink) {
                    return (
                      <Link
                        key={tab.id}
                        to={tab.url}
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-slate-600 hover:text-[#003087] hover:bg-[#F0F4FF] border border-transparent whitespace-nowrap transition-colors select-none"
                      >
                        {tab.label}
                      </Link>
                    );
                  }
                  const isActive = activeModal === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveModal(tab.id);
                        if (tab.id === 'limitations') setActiveLimitationId(null);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none ${
                        isActive
                          ? 'bg-[#003087] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-[#003087] hover:bg-[#F0F4FF]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* MODAL 1: REPORT CARD */}
              {activeModal === 'ratio' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      REPORT CARD
                    </h2>
                    <p className="text-xs text-[#003087] font-medium mt-0.5">
                      Star Health Performance
                    </p>
                  </div>

                  {/* 3 EQUAL ACCORDION BOXES — STAR HEALTH DEEP BLUE BORDERS & ACCENTS */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: CSR */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('csr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display shrink-0">
                            CSR
                          </span>
                          {planData.reportCard?.csr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.csr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.csr ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                <span className="text-[11px] sm:text-xs font-semibold text-[#003087] tracking-wide block font-display">
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
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('icr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display shrink-0">
                            ICR
                          </span>
                          {planData.reportCard?.icr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.icr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.icr ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                <span className="text-[11px] sm:text-xs font-semibold text-[#003087] tracking-wide block font-display">
                                  {planData.reportCard.icr.subtitle || 'Incurred Claim Ratio'}
                                </span>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                                  {planData.reportCard.icr.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.reportCard.icr.range}
                                </div>
                                {planData.reportCard.icr.rangeLabel && (
                                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                    {planData.reportCard.icr.rangeLabel}
                                  </div>
                                )}
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
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('complaint')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            COMPLAINT VOLUME
                          </span>
                          {planData.reportCard?.complaintVolume?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.complaint ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.reportCard.complaintVolume.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.reportCard.complaintVolume.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.reportCard.complaintVolume.label || 'Complaints per 10,000 Claims'}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Complaint Volume Metrics"
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      COMPANY STRENGTH
                    </h2>
                    <p className="text-xs text-[#003087] font-medium mt-0.5">
                      How reliable/strong is the insurer?
                    </p>
                  </div>

                  {/* 6 EQUAL ACCORDION BOXES — STAR HEALTH THEME */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: OWNERSHIP / PERCENTAGE */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('ownership')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            OWNERSHIP / PERCENTAGE
                          </span>
                          {planData.companyStrength?.ownership?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.ownership.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.ownership ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.ownership.explanation}
                                </p>
                              </div>

                              <div className="space-y-2 pt-1">
                                {planData.companyStrength.ownership.items.map((item, idx) => (
                                  <div key={idx} className={idx > 0 ? "pt-2 border-t border-slate-100" : ""}>
                                    <div className="text-xs sm:text-sm font-extrabold text-slate-800 font-display">
                                      {item.name}
                                    </div>
                                    <div className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5">
                                      {item.value} <span className="text-slate-500 font-medium text-[11px] sm:text-xs">{item.label}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <WatchVideoButton
                                title="Ownership & Promoters"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 2: CREDIT RATING */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('creditRating')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            CREDIT RATING
                          </span>
                          {planData.companyStrength?.creditRating?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.creditRating.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.creditRating ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.creditRating.explanation}
                                </p>
                              </div>

                              <div className="space-y-2 pt-1">
                                {planData.companyStrength.creditRating.items.map((item, idx) => (
                                  <div key={idx} className={idx > 0 ? "pt-2 border-t border-slate-100" : ""}>
                                    <div className="text-xs sm:text-sm font-extrabold text-slate-800 font-display">
                                      {item.agency}
                                    </div>
                                    <div className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5">
                                      {item.rating}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <WatchVideoButton
                                title="Credit Ratings & Financial Stability"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 3: CAPITAL STRENGTH */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('capitalStrength')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            CAPITAL STRENGTH
                          </span>
                          {planData.companyStrength?.capitalStrength?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.capitalStrength.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.capitalStrength.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.companyStrength.capitalStrength.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.capitalStrength.label}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Capital Strength & Solvency"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 4: FINANCIAL BASE */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('financialBase')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            FINANCIAL BASE
                          </span>
                          {planData.companyStrength?.financialBase?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.financialBase.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.financialBase ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.financialBase.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.companyStrength.financialBase.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.financialBase.label}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Financial Base & Assets"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 5: REINSURANCE STRENGTH */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('reinsurance')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            REINSURANCE STRENGTH
                          </span>
                          {planData.companyStrength?.reinsuranceStrength?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.reinsuranceStrength.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.reinsurance ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.reinsuranceStrength.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.companyStrength.reinsuranceStrength.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.reinsuranceStrength.label}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Reinsurance Security"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 6: MARKET POSITION */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('marketPosition')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display truncate">
                            MARKET POSITION
                          </span>
                          {planData.companyStrength?.marketPosition?.summaryValue && (
                            <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.marketPosition.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF]/60 group-hover:border-[#003087]/25 transition-all duration-300 shrink-0 select-none">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.marketPosition ? 'rotate-180 text-[#003087]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              <div>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                  {planData.companyStrength.marketPosition.explanation}
                                </p>
                              </div>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                  {planData.companyStrength.marketPosition.value}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.companyStrength.marketPosition.label}
                                </div>
                              </div>

                              <WatchVideoButton
                                title="Market Leadership & Reach"
                                onOpenVideo={handleOpenVideo}
                                videoUrl={demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 3: LIMITATIONS & WAITING PERIODS (SAME PAGE MODAL — NO NEXT PAGE) */}
              {activeModal === 'limitations' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#003087] block font-display">
                      {planData.limitationsWaitingPeriods?.subheading || 'TERMS & WAITING PERIODS'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.limitationsWaitingPeriods?.heading || 'LIMITATIONS & WAITING PERIODS'}
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {planData.limitationsWaitingPeriods?.description || 'Interactive policy timelines, specific disease waiting, and permanent exclusions.'}
                    </p>
                  </div>

                  {/* 3 LIMITATION ACCORDION BOXES */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.limitationsWaitingPeriods?.items.map((item) => {
                      const isItemExpanded = activeLimitationId === item.id;
                      const isPermanent = item.id === 'permanent';

                      return (
                        <div
                          key={item.id}
                          className="rounded-xl sm:rounded-2xl border border-[#003087]/35 bg-white overflow-hidden shadow-2xs hover:border-[#003087]/70 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLimitationId(prev => prev === item.id ? null : item.id)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#003087] transition-colors font-display pr-2">
                              {item.title}
                            </span>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#003087] group-hover:bg-[#F0F4FF] group-hover:border-[#003087]/25 transition-all duration-200 shrink-0 select-none">
                              <FiArrowRight
                                className={`text-xs sm:text-sm transition-transform duration-200 ${
                                  isItemExpanded ? 'rotate-90 text-[#003087]' : 'group-hover:translate-x-0.5'
                                }`}
                              />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isItemExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                                  {/* Policy summary */}
                                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                                    {item.summary}
                                  </p>

                                  {/* Highlight (e.g. for Initial Waiting Period) */}
                                  {item.highlight && (
                                    <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                                      <span className="text-emerald-600 font-bold">✓</span>
                                      <span>{item.highlight}</span>
                                    </div>
                                  )}

                                  {/* Disease List (e.g. for Specific Diseases) */}
                                  {item.diseaseList && (
                                    <div className="p-3 sm:p-4 rounded-xl bg-[#F0F4FF]/60 border border-[#003087]/15 space-y-2">
                                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#003087] block font-display">
                                        Covered after 24 Months Continuous Coverage
                                      </span>
                                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                        {item.diseaseList.map((disease, dIdx) => (
                                          <li key={dIdx} className="flex items-start gap-1.5">
                                            <span className="text-[#003087] font-bold">•</span>
                                            <span>{disease}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Exclusions List (e.g. for Permanent Exclusions) */}
                                  {item.exclusionsList && (
                                    <div className="p-3 sm:p-4 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-2">
                                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-rose-600 block font-display">
                                        Permanently Excluded from Coverage
                                      </span>
                                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                        {item.exclusionsList.map((excl, eIdx) => (
                                          <li key={eIdx} className="flex items-start gap-1.5">
                                            <span className="text-rose-600 font-bold">•</span>
                                            <span>{excl}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Policy Ref & Duration Tag */}
                                  {(item.policyRef || item.durationTag) && (
                                    <div className={`pt-2 border-t ${isPermanent ? 'border-rose-200/60' : 'border-slate-200/60'} flex items-center justify-between text-[11px] sm:text-xs text-slate-400 font-semibold`}>
                                      <span>{item.policyRef}</span>
                                      {item.durationTag && (
                                        <span className={isPermanent ? 'text-rose-600 font-bold' : 'text-[#003087] font-bold'}>
                                          {item.durationTag}
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Video Button */}
                                  <WatchVideoButton
                                    title={item.title}
                                    onOpenVideo={handleOpenVideo}
                                    videoUrl={item.videoUrl || demoVideoUrl}
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

              {/* MODAL 4: MUST KNOW DETAILS (SAME-PAGE MODAL) */}
              {activeModal === 'mustKnow' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="must-know-header">
                    <h2 className="must-know-main-heading">
                      {planData.mustKnow?.heading || 'MUST-KNOW DETAILS'}
                    </h2>
                    <p className="must-know-subheading">
                      {planData.mustKnow?.subheading || 'Important policy terms that policyholders should keep in mind'}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-3.5">
                    {planData.mustKnow?.items.map((item) => (
                      <div
                        key={item.id}
                        className="must-know-card border border-[#003087]/20 bg-[#F0F4FF]/40 space-y-2 sm:space-y-2.5 shadow-2xs"
                      >
                        <h4 className="must-know-card-title">
                          <span className="shrink-0 text-base sm:text-lg">{item.icon}</span>
                          <span>{item.title}</span>
                        </h4>
                        <div className="must-know-paragraphs-container">
                          {item.paragraphs.map((paragraph, pIdx) => (
                            <p
                              key={pIdx}
                              className="must-know-body-text"
                            >
                              {paragraph}
                            </p>
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
                    <p className="text-xs text-[#003087] font-medium mt-0.5">
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
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#003087]/30 shadow-2xs space-y-2 text-left hover:border-[#003087]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0F7FF] text-[#003087] border border-[#003087]/20 shrink-0 font-display">
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
                                  <FiCheck className="text-[#003087] mt-0.5 shrink-0 text-xs" />
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
