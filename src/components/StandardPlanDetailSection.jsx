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

// Compact Feature-Wise Inline Video Button Component
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl, primaryColor }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
      style={{
        backgroundColor: `${primaryColor}10`,
        color: primaryColor,
        border: `1px solid ${primaryColor}40`
      }}
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current" />
      <span>Video</span>
    </button>
  );
};

// Compact "View Details" Pill Button
const ViewDetailsPill = ({ onClick, label = "View Details", primaryColor }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
    style={{
      backgroundColor: `${primaryColor}10`,
      color: primaryColor,
      border: `1px solid ${primaryColor}40`
    }}
  >
    <FiInfo className="text-[9px]" />
    <span>{label}</span>
  </button>
);

// Watch Video Button
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, primaryColor, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white transition-all cursor-pointer shadow-2xs group select-none hover:text-white"
      style={{
        color: primaryColor,
        border: `1px solid ${primaryColor}40`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = primaryColor;
        e.currentTarget.style.color = '#FFFFFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#FFFFFF';
        e.currentTarget.style.color = primaryColor;
      }}
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current" />
      <span>WATCH VIDEO</span>
    </button>
  </div>
);

// In-Page Video Lightbox Modal
const FeatureVideoModal = ({ isOpen, onClose, videoTitle, videoUrl, primaryColor }) => {
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
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <FiX />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
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

// Feature Accordion Item Component
function StandardFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  onOpenDetailsModal,
  demoVideoUrl,
  primaryColor
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
          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/25'
          : isExpanded
          ? 'bg-white shadow-md ring-1'
          : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-xs'
      }`}
      style={{
        borderColor: isExpanded ? primaryColor : undefined,
        boxShadow: isExpanded ? `0 4px 14px -2px ${primaryColor}20` : undefined
      }}
    >
      {/* Header Row */}
      <div className="p-3 sm:p-4 flex items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                isExpanded ? 'text-white shadow-xs' : ''
              }`}
              style={{
                backgroundColor: isExpanded ? primaryColor : `${primaryColor}12`,
                color: isExpanded ? '#FFFFFF' : primaryColor
              }}
            >
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
                <VideoButton featureTitle={title} onOpenVideo={onOpenVideo} videoUrl={demoVideoUrl} primaryColor={primaryColor} />
              )}
              {badge && (
                <span
                  className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wide shrink-0"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor
                  }}
                >
                  {badge}
                </span>
              )}
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 border border-emerald-500/40 tracking-wide shrink-0">
                  Matched
                </span>
              )}
              {hasDetailsModal && onOpenDetailsModal && (
                <ViewDetailsPill
                  label="View Details"
                  onClick={() => onOpenDetailsModal(detailsModalTitle || title, detailsModalContent || summary)}
                  primaryColor={primaryColor}
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
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 self-center ${
            isExpanded ? 'text-white rotate-180' : ''
          }`}
          style={{
            backgroundColor: isExpanded ? primaryColor : `${primaryColor}12`,
            color: isExpanded ? '#FFFFFF' : primaryColor
          }}
        >
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
                  <span
                    className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider border"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                      borderColor: `${primaryColor}30`
                    }}
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
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
                        <FiCheck className="mt-0.5 shrink-0 text-xs font-bold text-emerald-600" />
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
                  primaryColor={primaryColor}
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
// MAIN COMPONENT: StandardPlanDetailSection
// Universal, Template-Based 6-Card Single-Viewport Hub & Features Page
// Used for ALL insurance plans and new companies across WHYINSURED
// =============================================================================
export default function StandardPlanDetailSection({ plan, company, planId: planIdProp }) {
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

  const currentPlanId = planIdProp || plan?.id || plan?.slug || urlPlanId;

  // Company is the strict authoritative source for branding and theme
  const primaryColor = company?.theme?.primary || company?.primary_color || '#0038A8';
  const secondaryColor = company?.theme?.secondary || company?.secondary_color || '#F0F4FF';
  const logo = company?.logo || plan?.companyLogo || '';
  const companyName = company?.name || plan?.companyName || 'Insurance Provider';

  const planData = React.useMemo(() => {
    if (!plan) return {};
    return {
      ...plan,
      planName: plan.name || plan.planName || currentPlanId,
      featuresSections: (plan.featuresSections && plan.featuresSections.length > 0)
        ? plan.featuresSections
        : [],
      reportCard: (plan.reportCard && (plan.reportCard.csr || (plan.reportCard.allMetrics && plan.reportCard.allMetrics.length > 0) || (plan.reportCard.items && plan.reportCard.items.length > 0)))
        ? plan.reportCard
        : null,
      companyStrength: (plan.companyStrength && (plan.companyStrength.ownership || (plan.companyStrength.items && plan.companyStrength.items.length > 0)))
        ? plan.companyStrength
        : null,
      limitationsWaitingPeriods: (plan.limitationsWaitingPeriods?.items && plan.limitationsWaitingPeriods.items.length > 0)
        ? plan.limitationsWaitingPeriods
        : { items: [] },
      mustKnow: (plan.mustKnow?.items && plan.mustKnow.items.length > 0)
        ? plan.mustKnow
        : { items: [] },
      bestSuitedFor: ((plan.bestSuitedFor?.profiles && plan.bestSuitedFor.profiles.length > 0) || (plan.bestSuitedFor?.items && plan.bestSuitedFor.items.length > 0))
        ? plan.bestSuitedFor
        : { profiles: [] },
      variants: (plan.variants && plan.variants.length > 0)
        ? plan.variants
        : []
    };
  }, [plan, currentPlanId]);

  const uiConfig = planData?.uiConfig ?? {};
  const demoVideoUrl = uiConfig.demoVideoUrl ?? DEFAULT_DEMO_VIDEO_URL;

  // Filter & prioritize features sections based on search query
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

  // Reset modal state on plan route change
  useEffect(() => {
    setActiveModal(null);
    setActiveLimitationId(null);
    setDetailsModalState({ isOpen: false, title: '', content: '' });
    setVideoModalState({ isOpen: false, title: '', url: '' });
  }, [currentPlanId]);

  // Lock body scroll during modal view
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
    setVideoModalState({ isOpen: false, title: '', url: '' });
  };

  const handleOpenDetailsModal = (title, content) => {
    setDetailsModalState({ isOpen: true, title, content });
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalState({ isOpen: false, title: '', content: '' });
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
      <div className="w-full pb-20 bg-slate-50/50 min-h-screen overflow-x-hidden relative font-sans">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

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
                to={`/insurance/${company.id || company.slug || currentPlanId}/${currentPlanId}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to {planData.planName}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor={primaryColor}
                searchResults={benefitSearchResults}
                onResultClick={handleBenefitResultClick}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              {logo && (
                <img
                  src={logo}
                  alt={companyName}
                  className="w-24 sm:w-44 h-auto max-h-9 sm:max-h-16 object-contain select-none mb-3.5 sm:mb-4"
                />
              )}
              <span className="text-xs font-bold uppercase tracking-widest block mb-0.5" style={{ color: primaryColor }}>
                {companyName}
              </span>
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName}
              </h1>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider block mt-1 text-emerald-600">
                POLICY BENEFITS
              </span>
              <div className="w-8 sm:w-12 h-1 mx-auto mt-2 rounded-full" style={{ backgroundColor: primaryColor }} />
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

          {/* 4 CATEGORY SECTIONS (MOST IMPORTANT, VALUE ADDED, ADDITIONAL, OPTIONAL) */}
          {prioritizedFeaturesSections && prioritizedFeaturesSections.length > 0 ? (
            prioritizedFeaturesSections.map((sec, secIdx) => (
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
                      <StandardFeatureAccordionItem
                        key={item.id}
                        item={item}
                        index={itemIdx}
                        isExpanded={expandedFeatureId === item.id}
                        onToggle={(id, ref) => toggleAccordionItem(id, ref)}
                        onOpenVideo={handleOpenVideo}
                        onOpenDetailsModal={handleOpenDetailsModal}
                        demoVideoUrl={demoVideoUrl}
                        primaryColor={primaryColor}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs">
              <h3 className="text-sm sm:text-base font-bold text-slate-800 font-display">Policy Benefits Coming Soon</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Detailed policy benefits for {planData.planName} are being compiled from official policy wordings.
              </p>
            </div>
          )}

          {/* FOOTNOTE */}
          <div className="text-right pt-2">
            <span className="text-xs font-bold text-slate-400">
              *Terms & Conditions Apply as per official {planData.fullName || planData.planName || companyName} policy wording.
            </span>
          </div>

        </div>

        {/* IN-PAGE VIDEO MODAL */}
        <FeatureVideoModal
          isOpen={videoModalState.isOpen}
          onClose={handleCloseVideo}
          videoTitle={videoModalState.title}
          videoUrl={videoModalState.url}
          primaryColor={primaryColor}
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
  // MAIN PLAN OVERVIEW PAGE (SINGLE VIEWPORT HUB - STRICT SIX CARDS)
  // =========================================================================
  return (
    <div className="w-full font-sans">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        
        {/* Navigation Breadcrumb - Back to Plans */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id || company.slug || currentPlanId}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" />{' '}
            <span className="hidden sm:inline">
              Back to {companyName} Plans
            </span>
            <span className="sm:hidden">
              Back to Plans
            </span>
          </Link>
        </div>

        {/* 1. COMPANY LOGO */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          {logo ? (
            <img
              src={logo}
              alt={companyName}
              className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
            />
          ) : (
            <div
              className="px-4 py-2 rounded-xl font-black text-sm sm:text-base font-display"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              {companyName}
            </div>
          )}
        </div>

        {/* 2. PLAN NAME HEADING */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          <div
            className="w-7 sm:w-10 h-0.5 sm:h-1 mx-auto mt-1 sm:mt-1.5 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* 3. 6-BUTTON PRIMARY NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            style={{
              borderColor: activeModal === 'ratio' ? primaryColor : undefined,
              boxShadow: activeModal === 'ratio' ? `0 0 0 2px ${primaryColor}30` : undefined
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{
                backgroundColor: activeModal === 'ratio' ? primaryColor : `${primaryColor}50`
              }}
            />
            <h3
              className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight"
            >
              REPORT CARD
            </h3>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              style={{ '--primary': primaryColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            style={{
              borderColor: activeModal === 'fundamental' ? primaryColor : undefined,
              boxShadow: activeModal === 'fundamental' ? `0 0 0 2px ${primaryColor}30` : undefined
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{
                backgroundColor: activeModal === 'fundamental' ? primaryColor : `${primaryColor}50`
              }}
            />
            <h3
              className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight"
            >
              COMPANY STRENGTH
            </h3>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id || company.slug || currentPlanId}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{ backgroundColor: `${primaryColor}50` }}
            />
            <h3
              className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight"
            >
              POLICY BENEFITS
            </h3>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
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
            className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            style={{
              borderColor: activeModal === 'limitations' ? primaryColor : undefined,
              boxShadow: activeModal === 'limitations' ? `0 0 0 2px ${primaryColor}30` : undefined
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{
                backgroundColor: activeModal === 'limitations' ? primaryColor : `${primaryColor}50`
              }}
            />
            <h3
              className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight"
            >
              LIMITATIONS
            </h3>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            style={{
              borderColor: activeModal === 'mustKnow' ? primaryColor : undefined,
              boxShadow: activeModal === 'mustKnow' ? `0 0 0 2px ${primaryColor}30` : undefined
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{
                backgroundColor: activeModal === 'mustKnow' ? primaryColor : `${primaryColor}50`
              }}
            />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs sm:text-base font-black select-none shrink-0"
                style={{ color: primaryColor }}
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                MUST KNOW DETAILS
              </h3>
            </div>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            style={{
              borderColor: activeModal === 'bestSuitedFor' ? primaryColor : undefined,
              boxShadow: activeModal === 'bestSuitedFor' ? `0 0 0 2px ${primaryColor}30` : undefined
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200"
              style={{
                backgroundColor: activeModal === 'bestSuitedFor' ? primaryColor : `${primaryColor}50`
              }}
            />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              PERFECT FOR
            </h3>
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0 group-hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
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
                    <p className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                      {companyName} Official Metrics
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: Claim Settlement Ratio */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleReportCard('csr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.reportCard?.csr?.title || 'Claim Settlement Ratio'}
                          </span>
                          {planData.reportCard?.csr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.csr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.csr ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedReportCard.csr ? primaryColor : undefined }} />
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
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.reportCard?.csr?.explanation || 'Official claim settlement ratio indicates percentage of total claims settled by the insurer in the financial year.'}
                              </p>
                              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                                <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{planData.reportCard?.csr?.singleYearLabel || 'Recent Single Year'}</div>
                                  <div className="text-sm font-black mt-0.5" style={{ color: primaryColor }}>{planData.reportCard?.csr?.singleYear || planData.reportCard?.csr?.summaryValue || 'Available'}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{planData.reportCard?.csr?.threeYearAvgLabel || '3 Years Avg Ratio'}</div>
                                  <div className="text-sm font-black mt-0.5" style={{ color: primaryColor }}>{planData.reportCard?.csr?.threeYearAvg || planData.reportCard?.csr?.summaryValue || 'Available'}</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 2: Incurred Claim Ratio */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleReportCard('icr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.reportCard?.icr?.title || 'Incurred Claim Ratio'}
                          </span>
                          {planData.reportCard?.icr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.icr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.icr ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedReportCard.icr ? primaryColor : undefined }} />
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
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.reportCard?.icr?.explanation || 'Ratio of claims paid out versus total premium collected. An optimal range between 65% and 85% signifies sustainable pricing and reliable claim payouts.'}
                              </p>
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.reportCard?.icr?.rangeLabel || 'Incurred Claim Ratio'}</span>
                                <span className="text-sm font-black" style={{ color: primaryColor }}>{planData.reportCard?.icr?.range || planData.reportCard?.icr?.summaryValue || 'Available'}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 3: Complaint Volume */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleReportCard('complaint')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.reportCard?.complaintVolume?.title || 'Complaints / 10K Claims'}
                          </span>
                          {planData.reportCard?.complaintVolume?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.complaint ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedReportCard.complaint ? primaryColor : undefined }} />
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
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.reportCard?.complaintVolume?.explanation || 'Total complaints filed per 10,000 settled claims according to IRDAI public disclosures.'}
                              </p>
                              <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{planData.reportCard?.complaintVolume?.label || 'Complaints per 10,000 Claims'}</span>
                                <span className="text-sm font-black" style={{ color: primaryColor }}>{planData.reportCard?.complaintVolume?.value || planData.reportCard?.complaintVolume?.summaryValue || 'Available'}</span>
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
                    <p className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                      Insurer Solvency & Capital Health
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* 1. Ownership */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('ownership')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.companyStrength?.ownership?.title || 'OWNERSHIP'}
                          </span>
                          {planData.companyStrength?.ownership?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.ownership.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.ownership ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedCompanyStrength.ownership ? primaryColor : undefined }} />
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
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-2">
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.companyStrength?.ownership?.explanation || `${companyName} is backed by reputable financial promoters with strong domestic and global market standing.`}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2. Solvency / Capital Strength */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('capitalStrength')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.companyStrength?.capitalStrength?.title || 'SOLVENCY / CAPITAL STRENGTH'}
                          </span>
                          {planData.companyStrength?.capitalStrength?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-emerald-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.capitalStrength.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedCompanyStrength.capitalStrength ? primaryColor : undefined }} />
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
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-2">
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.companyStrength?.capitalStrength?.explanation || 'Solvency ratio reflects financial capability to settle all claims in exceptional crisis situations. Regulatory minimum is 1.50 (150%).'}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. Financial Base */}
                    <div
                      className="rounded-xl sm:rounded-2xl border bg-white overflow-hidden shadow-2xs transition-colors"
                      style={{ borderColor: `${primaryColor}35` }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('financialBase')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 transition-colors font-display shrink-0">
                            {planData.companyStrength?.financialBase?.title || 'FINANCIAL BASE (AUM)'}
                          </span>
                          {planData.companyStrength?.financialBase?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.companyStrength.financialBase.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.financialBase ? 'rotate-180' : 'text-slate-400'}`} style={{ color: expandedCompanyStrength.financialBase ? primaryColor : undefined }} />
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
                            <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-2">
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {planData.companyStrength?.financialBase?.explanation || 'Total assets under management managed by the insurer representing capital reserve and investment power.'}
                              </p>
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
                    {planData.limitationsWaitingPeriods?.items && planData.limitationsWaitingPeriods.items.length > 0 ? (
                      planData.limitationsWaitingPeriods.items.map((lim) => {
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
                                      <div className="text-[11px] font-bold flex items-center gap-1.5 pt-0.5" style={{ color: primaryColor }}>
                                        <FiCheck className="text-emerald-600 shrink-0" />
                                        <span>{lim.highlight}</span>
                                      </div>
                                    )}
                                    {lim.exclusionsList && lim.exclusionsList.length > 0 && (
                                      <ul className="space-y-1 pt-1">
                                        {lim.exclusionsList.map((exc, eIdx) => (
                                          <li key={eIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                                            <FiX className="text-rose-500 mt-0.5 shrink-0 text-xs" />
                                            <span>{exc}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                    {lim.diseaseList && lim.diseaseList.length > 0 && (
                                      <div className="pt-1.5">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                          Covered Disease Waiting List:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {lim.diseaseList.map((dis, dIdx) => (
                                            <span key={dIdx} className="text-[10px] bg-white border border-rose-200 px-2 py-0.5 rounded text-rose-700 font-semibold">
                                              {dis}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-center space-y-1">
                        <p className="text-xs text-slate-600 font-semibold">Standard Waiting Periods Apply:</p>
                        <p className="text-xs text-slate-500">30-day initial waiting period for illnesses (except accidental injury). 24 months for specified conditions. 36 months for pre-existing conditions.</p>
                      </div>
                    )}
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
                    <p className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                      Key product takeaways
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.mustKnow?.items && planData.mustKnow.items.length > 0 ? (
                      planData.mustKnow.items.map((mk) => (
                        <div
                          key={mk.id}
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border bg-slate-50/50 space-y-1.5 text-left"
                          style={{ borderColor: `${primaryColor}25` }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">{mk.icon || '🛡️'}</span>
                            <h3 className="text-xs sm:text-sm font-black" style={{ color: primaryColor }}>
                              {mk.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium pl-6 sm:pl-7">
                            {mk.summary}
                          </p>
                          {mk.points && mk.points.length > 0 && (
                            <ul className="pl-6 sm:pl-7 space-y-1 pt-1">
                              {mk.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                                  <FiCheck className="text-emerald-600 mt-0.5 shrink-0 text-xs" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                        <p className="text-xs text-slate-500">Official product disclosure and highlights will be updated shortly.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODAL 5: PERFECT FOR */}
              {activeModal === 'bestSuitedFor' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      PERFECT FOR
                    </h2>
                    <p className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                      Who should choose {planData.planName}?
                    </p>
                  </div>

                  {planData.bestSuitedFor?.profiles && planData.bestSuitedFor.profiles.length > 0 ? (
                    <div className="space-y-3">
                      {planData.bestSuitedFor.profiles.map((profile, idx) => (
                        <div
                          key={profile.id || idx}
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border shadow-2xs space-y-2 text-left transition-colors"
                          style={{ borderColor: `${primaryColor}30` }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span
                                className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 font-display"
                                style={{
                                  backgroundColor: `${primaryColor}10`,
                                  color: primaryColor,
                                  borderColor: `${primaryColor}20`
                                }}
                              >
                                {profile.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {profile.summary || profile.description}
                          </p>
                          {profile.highlights && profile.highlights.length > 0 && (
                            <ul className="space-y-1 pt-1.5 border-t border-slate-100">
                              {profile.highlights.map((hl, hlIdx) => (
                                <li key={hlIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                                  <FiCheck className="mt-0.5 shrink-0 text-xs text-emerald-600" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                      <p className="text-xs text-slate-500">Recommended for individuals and families seeking comprehensive hospital coverage with cash assistance.</p>
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
