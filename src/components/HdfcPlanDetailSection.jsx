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
  FiUser,
  FiActivity
} from 'react-icons/fi';
import { getHdfcPlanData } from '../data/hdfcPlansData';
import { resolveHdfcPlanId, isHdfcPlan } from '../data/hdfcPlanRegistry';
import { useOptimaSecurePlusData } from '../hooks/useOptimaSecurePlusData';
import PolicyBenefitsPdfActions from './PolicyBenefitsPdfActions';
import BenefitSearchBar from './BenefitSearchBar';
import { getFilteredAndPrioritizedFeaturesSections, getBenefitSearchResults } from '../utils/benefitSearchHelper';
import { scrollToBenefitCard } from '../utils/scrollToBenefitCard';
import unlimitedVideo from '../assets/unlimited.mp4';
import secureBenefitVideo from '../assets/2x coverage.mp4';
import preventiveVideo from '../assets/Preventive.mp4';

// Default demo video — overridden per plan via planData.uiConfig.demoVideoUrl
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
  user: FiUser,
  activity: FiActivity
};

// Helper to format YouTube or Direct MP4 URLs
const getVideoEmbedUrl = (url) => {
  if (!url) return { type: 'none', url: '' };

  // Preset local video assets from DB
  if (url === 'asset:unlimited') return { type: 'mp4', url: unlimitedVideo };
  if (url === 'asset:2x_coverage') return { type: 'mp4', url: secureBenefitVideo };
  if (url === 'asset:preventive') return { type: 'mp4', url: preventiveVideo };

  // Server uploads
  if (url.startsWith('/uploads/')) {
    const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return { type: 'mp4', url: `${apiBase}${url}` };
  }

  if (url.includes('youtube.com/embed/')) return { type: 'youtube', url };

  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
  }

  if (url.endsWith('.mp4') || url.includes('.mp4?') || url.includes('.mp4') || (typeof url === 'string' && (url.startsWith('data:video') || url.startsWith('blob:') || url.includes('unlimited') || url.includes('Preventive') || url.includes('coverage') || url.includes('/assets/')))) {
    return { type: 'mp4', url };
  }

  return { type: 'iframe', url };
};

// Compact Feature-Wise Inline Video Button Component
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group align-middle ml-0.5 sm:ml-1"
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Premium "WATCH VIDEO" button — matches Report Card design
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E30613] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
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
              playsInline
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

// Shared limitation detail body — plan-specific content only (not Report Card data)
function LimitationDetailContent({ item }) {
  return (
    <>
      <p className="font-medium leading-relaxed text-slate-700 text-[11px] sm:text-xs">
        {item.summary}
      </p>

      {item.highlight && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>{item.highlight}</span>
        </div>
      )}

      {item.diseaseList && (
        <div className="p-3 sm:p-4 rounded-xl bg-[#FFF5F5]/60 border border-[#E30613]/15 space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#E30613] block">
            {item.diseaseListHeader || 'Covered after 24 Months Continuous Coverage'}
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
            {item.diseaseList.map((disease, dIdx) => (
              <li key={dIdx} className="flex items-start gap-1.5">
                <span className="text-[#E30613] font-bold">•</span>
                <span>{disease}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.exclusionsList && (
        <div className="p-3 sm:p-4 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-rose-600 block">
            {item.exclusionsListHeader || 'Permanently Excluded from Coverage'}
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

      {(item.policyRef || item.durationTag) && (
        <div className={`pt-3 border-t ${item.id === 'permanent' ? 'border-rose-200/60' : 'border-slate-200/60'} flex items-center justify-between text-[11px] sm:text-xs text-slate-400 font-semibold`}>
          <span>{item.policyRef}</span>
          {item.durationTag && (
            <span className={item.id === 'permanent' ? 'text-rose-600 font-bold' : 'text-[#E30613]'}>
              {item.durationTag}
            </span>
          )}
        </div>
      )}
    </>
  );
}

// Sub-component for HDFC Features Accordion Items with Scroll Reveal & Stagger (HDFC ERGO Red Theme)
function HdfcFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  demoVideoUrl,
  onOpenHealthCheckupModal
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, steps, isRider, iconType, videoUrl } = item;
  const IconComponent = (iconType && ICON_MAP[iconType]) || FiCheckSquare;
  const currentVideoUrl = videoUrl || (title?.toLowerCase().includes('preventive') ? preventiveVideo : (title?.toLowerCase().includes('unlimited') ? unlimitedVideo : (title?.toLowerCase().includes('secure benefit') || title?.toLowerCase().includes('2x coverage') ? secureBenefitVideo : demoVideoUrl)));

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
          ? 'bg-[#FFF5F5]/80 border-[#E30613]/60 shadow-md ring-1 ring-[#E30613]/20'
          : 'bg-white border-slate-200/80 hover:border-[#E30613]/40 shadow-2xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-2.5 sm:p-4 flex items-start sm:items-center justify-between gap-1.5 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-[#E30613] text-white shadow-xs' : 'bg-[#FFF5F5] text-[#E30613]'
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
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#E30613]/10 text-[#E30613] tracking-wide shrink-0">
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
        <div className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5 sm:mt-0 ${isExpanded ? 'bg-[#E30613] text-white rotate-180' : 'bg-[#FFF5F5] text-[#E30613]'
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
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#E30613]" />
                    {badge}
                  </span>
                </div>
              )}

              {/* Short explanation / Details */}
              {item.points && item.points.length > 0 ? (
                <div className="space-y-1.5 pt-0.5">
                  {item.intro && (
                    <p
                      className="text-[11px] sm:text-sm font-medium leading-relaxed text-slate-600 mb-1"
                      dangerouslySetInnerHTML={{
                        __html: item.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                      }}
                    />
                  )}
                  <ul className="space-y-1.5 text-[11px] sm:text-sm font-medium text-slate-600 list-none pl-0">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#E30613] font-bold text-sm leading-none mt-0.5 shrink-0">•</span>
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
                <div className="text-[11px] sm:text-sm font-medium leading-relaxed text-slate-600">
                  {summary}
                </div>
              )}

              {/* Health Check-up Limits Table Button */}
              {(item.hasHealthCheckupTable || item.healthCheckupLimits) && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenHealthCheckupModal) {
                        onOpenHealthCheckupModal(item);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/30 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none active:scale-95"
                  >
                    <FiActivity className="text-xs shrink-0" />
                    <span>{item.tableButtonLabel || 'View Health Check-up Limits'}</span>
                  </button>
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
                          <span className="text-[10px] sm:text-xs font-extrabold text-[#E30613] px-0.5">
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

export default function HdfcPlanDetailSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeLimitationModal, setActiveLimitationModal] = useState(null);
  const [activeOptimaLimitation, setActiveOptimaLimitation] = useState(null);
  const [healthCheckupModal, setHealthCheckupModal] = useState(null);
  const [productBenefitTableModal, setProductBenefitTableModal] = useState(false);
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

  const toggleLimitation = (key) => {
    setExpandedLimitations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
  const isLimitationsPage = location.pathname.endsWith('/limitations');

  // Resolve to canonical plan ID — every section reads data for exactly this plan
  const currentPlanId = resolveHdfcPlanId(planIdProp || plan?.id || urlPlanId);
  const isOptimaSecurePlus = isHdfcPlan(currentPlanId, 'hdfc-optima-secure-plus');
  const staticPlanData = getHdfcPlanData(currentPlanId);
  const { data: dynamicOptimaData } = useOptimaSecurePlusData();
  const planData = isOptimaSecurePlus ? dynamicOptimaData : staticPlanData;
  const uiConfig = planData?.uiConfig ?? {};
  const primaryColor = uiConfig.primaryColor ?? '#E30613';
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

  // Reset all UI state when switching between plans (prevents cross-plan bleed)
  useEffect(() => {
    setActiveModal(null);
    setActiveLimitationModal(null);
    setActiveOptimaLimitation(null);
    setHealthCheckupModal(null);
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
    if (activeModal || videoModalState.isOpen || activeLimitationModal || healthCheckupModal || productBenefitTableModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, videoModalState.isOpen, activeLimitationModal, healthCheckupModal, productBenefitTableModal]);

  // Close modals on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (healthCheckupModal) setHealthCheckupModal(null);
        if (productBenefitTableModal) setProductBenefitTableModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [healthCheckupModal, productBenefitTableModal]);

  if (!planData || !currentPlanId) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-lg font-bold text-slate-800">Plan Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">Could not load data for this HDFC ERGO plan.</p>
        <Link to={`/insurance/${company.id}`} className="mt-4 text-sm font-semibold text-[#E30613] hover:underline">
          Back to HDFC ERGO Plans
        </Link>
      </div>
    );
  }

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
      // Smart Scroll: Smoothly scroll the opened item into view with top offset for header clearance
      setTimeout(() => {
        if (ref && ref.current) {
          const yOffset = -110;
          const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const isOptimaSecurePlusMustKnow =
    isHdfcPlan(currentPlanId, 'hdfc-optima-secure-plus') &&
    planData.mustKnow?.layout === 'details-modal';

  // =========================================================================
  // DEDICATED LIMITATIONS & WAITING PERIODS PAGE (FOR ALL 5 HDFC ERGO PLANS)
  // =========================================================================
  if (isLimitationsPage) {
    return (
      <div className="w-full pb-20 bg-[#FFF5F5] min-h-screen overflow-x-hidden relative">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#E30613]" />

        {/* Page Container — HDFC ERGO Theme */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 space-y-6 sm:space-y-8 relative z-10">

          {/* Top Navigation & Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-2"
          >
            {/* Back Button */}
            <div className="text-left mb-3.5 sm:mb-5">
              <Link
                to={`/insurance/${company.id}/${currentPlanId}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlanLabel || `Back to ${planData.planName}`}</span><span className="sm:hidden">Back to Plan</span>
              </Link>
            </div>

            {/* HDFC ERGO Logo */}
            <div className="flex flex-col items-center justify-center mb-3 sm:mb-4">
              <img
                src={logo}
                alt={name}
                className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
              />
            </div>

            {/* Heading */}
            <div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E30613] font-display">
                {planData.planName}
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                {planData.limitationsWaitingPeriods?.heading || 'LIMITATIONS & WAITING PERIODS'}
              </h1>
              <div className="w-8 sm:w-12 h-1 bg-[#E30613] mx-auto mt-1.5 rounded-full" />
            </div>
          </motion.div>

          {/* THREE LIMITATION ITEMS (Clicking opens Detail Box Modal) */}
          <div className="space-y-3 sm:space-y-4">
            {planData.limitationsWaitingPeriods.items.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => setActiveLimitationModal(item)}
                className="w-full p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-[#E30613]/40 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none group relative overflow-hidden active:scale-[0.98]"
              >
                {/* Bottom accent indicator bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E30613]/30 group-hover:bg-[#E30613] transition-colors duration-200" />

                <span className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors font-display pr-2">
                  {item.title}
                </span>

                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0 select-none">
                  <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* FOOTNOTE */}
          <div className="text-right pt-1">
            <span className="text-xs font-bold text-slate-400">
              *T&C Apply
            </span>
          </div>

        </div>

        {/* DETAIL BOX MODAL — Optima Secure+ uses Report Card style; other plans unchanged */}
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
                  aria-label="Close details"
                >
                  <FiX className="text-base sm:text-lg" />
                </button>

                {isHdfcPlan(currentPlanId, 'hdfc-optima-secure-plus') ? (
                  /* Report Card pattern — limitations content only */
                  <div className="space-y-4 sm:space-y-5">
                    <div className="pr-8">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E30613] block font-display">
                        {planData.limitationsWaitingPeriods.subheading}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                        {activeLimitationModal.title}
                      </h2>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {planData.limitationsWaitingPeriods.description}
                      </p>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl border border-[#E30613]/35 bg-white overflow-hidden shadow-2xs">
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
                ) : (
                  /* Standard detail box — other HDFC plans */
                  <div className="space-y-4 sm:space-y-5">
                    <div className="pr-8">
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#E30613] block">
                        {planData.planName} • Policy Details
                      </span>
                      <h2 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                        {activeLimitationModal.title}
                      </h2>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-600 space-y-3 pt-1">
                      <LimitationDetailContent item={activeLimitationModal} />
                    </div>
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

  // =========================================================================
  // DEDICATED FEATURES PAGE (MATCHING HDFC ERGO PLAN DETAIL PAGE THEME EXACTLY)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#FFF5F5] min-h-screen overflow-x-hidden relative">
        {/* Subtle Ambient Red Glow matching Plan Detail page */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#E30613]" />

        {/* Page Container — HDFC ERGO Theme */}
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
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlanLabel || `Back to ${planData.planName}`}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor="#E30613"
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
                {planData.planName} <span className="text-[#E30613]">—</span> {planData.featuresHeadingSuffix || (isOptimaSecurePlus ? 'POLICY BENEFITS' : 'FEATURES')}
              </h1>
              <div className="w-8 sm:w-12 h-1 bg-[#E30613] mx-auto mt-1.5 rounded-full" />
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
                  <HdfcFeatureAccordionItem
                    key={item.id}
                    item={item}
                    index={itemIdx}
                    isExpanded={expandedFeatureId === item.id}
                    onToggle={toggleAccordionItem}
                    onOpenVideo={handleOpenVideo}
                    demoVideoUrl={demoVideoUrl}
                    onOpenHealthCheckupModal={setHealthCheckupModal}
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

          {/* VIEW PRODUCT BENEFIT TABLE BUTTON */}
          {planData.productBenefitTable && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex justify-center pt-4 sm:pt-6"
            >
              <button
                type="button"
                onClick={() => setProductBenefitTableModal(true)}
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E30613] to-[#B80510] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none active:scale-[0.97] border border-[#E30613]/50 group"
              >
                <FiActivity className="text-sm sm:text-base group-hover:rotate-12 transition-transform duration-200" />
                <span>{planData.productBenefitTable.buttonLabel || 'View Product Benefit Table'}</span>
                <FiArrowRight className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          )}

        </div>

        {/* HEALTH CHECK-UP LIMITS MODAL (TABLE OVERLAY) */}
        <AnimatePresence>
          {healthCheckupModal && (
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
              onClick={() => setHealthCheckupModal(null)}
            >
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
              />

              {/* Modal Content Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] ${
                  healthCheckupModal.healthCheckupTable ? 'max-w-2xl' : 'max-w-md'
                } overflow-hidden z-10 p-4 sm:p-6`}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#E30613]">
                        {planData.planName}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      {healthCheckupModal.healthCheckupTable?.title || 'Health Check-up Limits'}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {healthCheckupModal.healthCheckupTable?.subtitle || 'Reimbursement limits applicable per policy year'}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setHealthCheckupModal(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E30613] text-slate-500 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0"
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>

                {/* HTML Table Container */}
                {healthCheckupModal.healthCheckupTable ? (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[560px]">
                      <thead>
                        <tr className="bg-[#FFF5F5] border-b border-slate-200 text-[#0F172A]">
                          {healthCheckupModal.healthCheckupTable.headers.map((hdr, hIdx) => (
                            <th
                              key={hIdx}
                              className={`py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-slate-700 whitespace-nowrap ${
                                hIdx === 0 ? 'text-left' : 'text-right'
                              }`}
                            >
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {healthCheckupModal.healthCheckupTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/75 transition-colors">
                            {row.map((val, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-2.5 px-3 sm:px-4 whitespace-nowrap ${
                                  cIdx === 0
                                    ? 'font-bold text-slate-800 text-left'
                                    : 'font-semibold text-slate-700 text-right font-mono'
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-[#FFF5F5] border-b border-slate-200 text-[#0F172A]">
                          <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-left text-slate-700">
                            Base Sum Insured
                          </th>
                          <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-right text-slate-700">
                            Floater
                          </th>
                          <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-right text-slate-700">
                            Individual
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {(healthCheckupModal.healthCheckupLimits || [
                          { baseSI: '₹10 Lakh', floater: '₹5,000', individual: '₹2,000' },
                          { baseSI: '₹15 Lakh', floater: '₹8,000', individual: '₹4,000' },
                          { baseSI: '₹20–50 Lakh', floater: '₹10,000', individual: '₹5,000' },
                          { baseSI: '₹100–200 Lakh', floater: '₹15,000', individual: '₹8,000' }
                        ]).map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/75 transition-colors">
                            <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-800">
                              {row.baseSI}
                            </td>
                            <td className="py-2.5 px-3 sm:px-4 font-semibold text-[#E30613] text-right font-mono">
                              {row.floater}
                            </td>
                            <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-700 text-right font-mono">
                              {row.individual}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Footnote */}
                <div className="mt-3 text-right">
                  <span className="text-[11px] text-slate-400 font-medium">
                    *Subject to policy terms & conditions
                  </span>
                </div>
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

        {/* PRODUCT BENEFIT TABLE MODAL */}
        <AnimatePresence>
          {productBenefitTableModal && planData.productBenefitTable && (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
              onClick={() => setProductBenefitTableModal(false)}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-2xl overflow-hidden z-10 max-h-[90dvh] sm:max-h-[88vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white z-20 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]" />
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#E30613]">
                          {planData.planName}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                        {planData.productBenefitTable.heading || 'Product Benefit Table'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductBenefitTableModal(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E30613] text-slate-500 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0"
                      aria-label="Close"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-5 sm:space-y-6">

                  {/* Product Benefit Table */}
                  <div className="overflow-x-auto -mx-1 px-1">
                    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-2xs min-w-[320px]">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#FFF5F5] border-b border-slate-200">
                            <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-left text-slate-700 w-[40%]">
                              Benefit
                            </th>
                            <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-left text-slate-700">
                              Coverage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {planData.productBenefitTable.tableRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/75 transition-colors">
                              <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-800 text-xs sm:text-sm">
                                {row.label}
                              </td>
                              <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-700 text-xs sm:text-sm">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Detailed Benefits */}
                  {planData.productBenefitTable.detailedBenefits && planData.productBenefitTable.detailedBenefits.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                        Benefit Details
                      </h4>
                      <div className="space-y-2.5">
                        {planData.productBenefitTable.detailedBenefits.map((db, dbIdx) => (
                          <div
                            key={dbIdx}
                            className="p-3 sm:p-4 rounded-xl bg-[#FFF5F5]/60 border border-[#E30613]/15"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                              <span className="text-xs sm:text-sm font-black text-[#0F172A]">
                                {db.title}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-[#E30613] mb-0.5">
                              {db.highlight}
                            </p>
                            {db.description && (
                              <p className="text-[11px] sm:text-xs font-medium text-slate-600 leading-relaxed">
                                {db.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preventive Health Check-up Table */}
                  {planData.productBenefitTable.preventiveHealthCheckup && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                        {planData.productBenefitTable.preventiveHealthCheckup.title || 'Preventive Health Check-up'}
                      </h4>
                      <div className="overflow-x-auto -mx-1 px-1">
                        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-2xs min-w-[320px]">
                          <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                              <tr className="bg-[#FFF5F5] border-b border-slate-200">
                                <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-left text-slate-700">
                                  Sum Insured
                                </th>
                                <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-right text-slate-700">
                                  Individual (per insured)
                                </th>
                                <th className="py-2.5 px-3 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider text-right text-slate-700">
                                  Floater (per policy)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {planData.productBenefitTable.preventiveHealthCheckup.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50/75 transition-colors">
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-800">
                                    {row.sumInsured}
                                  </td>
                                  <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-700 text-right font-mono">
                                    {row.individual}
                                  </td>
                                  <td className="py-2.5 px-3 sm:px-4 font-semibold text-[#E30613] text-right font-mono">
                                    {row.floater}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Base Sum Insured Tags */}
                  {planData.productBenefitTable.baseSumInsured && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                        Available Base Sum Insured
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {planData.productBenefitTable.baseSumInsured.map((si, siIdx) => (
                          <span
                            key={siIdx}
                            className="px-2.5 py-1 rounded-lg bg-[#FFF5F5] text-[#E30613] text-[10px] sm:text-xs font-bold border border-[#E30613]/20"
                          >
                            {si}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footnote */}
                  <div className="text-right pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium">
                      *Subject to policy terms & conditions
                    </span>
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
  // MAIN HDFC ERGO PLAN DETAIL PAGE (SINGLE VIEWPORT — MOBILE & DESKTOP PERFECT)
  // Desktop remains 100% identical. Mobile optimized for 320px–430px single viewport.
  // =========================================================================
  return (
    <div className="w-full">
      {/* Single Viewport Container - Compact Mobile Packing & Balanced Desktop Layout */}
      <div className="max-w-3xl lg:max-w-4xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        {/* Navigation Breadcrumb - Back to Plans (Mobile: 14px | Desktop: 20px) */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={`/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">{planData.backToPlansLabel || 'Back to HDFC ERGO Plans'}</span><span className="sm:hidden">Back to Plans</span>
          </Link>
        </div>

        {/* 1. HDFC ERGO LOGO (Mobile: 10px | Desktop: 16px gap to Plan Name) */}
        <div className="flex flex-col items-center justify-center shrink-0 mb-2.5 sm:mb-4">
          <img
            src={logo}
            alt={name}
            className="w-24 sm:w-48 h-auto max-h-9 sm:max-h-20 object-contain select-none"
          />
        </div>

        {/* 2. PLAN NAME HEADING (Mobile: 14px | Desktop: 24px gap to 4-Button Grid) */}
        <div className="text-center shrink-0 mb-3.5 sm:mb-6">
          <h1 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {planData.planName}
          </h1>
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#E30613] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 6-CARD NAVIGATION GRID (Matching Tata AIG MediCare Select master layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'ratio'
                ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                : 'border-slate-200/80 hover:border-[#E30613]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'ratio' ? 'bg-[#E30613]' : 'bg-[#E30613]/30 group-hover:bg-[#E30613]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              {planData.reportCardButtonLabel || 'REPORT CARD'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'fundamental'
                ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                : 'border-slate-200/80 hover:border-[#E30613]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'fundamental' ? 'bg-[#E30613]' : 'bg-[#E30613]/30 group-hover:bg-[#E30613]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              {planData.companyStrengthButtonLabel || 'COMPANY STRENGTH'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#E30613]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E30613]/30 group-hover:bg-[#E30613] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              {planData.policyBenefitsButtonLabel || (isOptimaSecurePlus ? 'POLICY BENEFITS' : 'FEATURES')}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 4: LIMITATIONS & WAITING PERIODS */}
          {isOptimaSecurePlus ? (
            <button
              type="button"
              onClick={() => {
                setActiveModal('limitations');
                setActiveOptimaLimitation(null);
              }}
              className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
                activeModal === 'limitations'
                  ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                  : 'border-slate-200/80 hover:border-[#E30613]/40'
              }`}
            >
              <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
                activeModal === 'limitations' ? 'bg-[#E30613]' : 'bg-[#E30613]/30 group-hover:bg-[#E30613]'
              }`} />
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
                {planData.limitationsButtonLabel || 'LIMITATIONS & WAITING PERIODS'}
              </h3>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
                <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </button>
          ) : (
            <Link
              to={`/insurance/${company.id}/${currentPlanId}/limitations`}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#E30613]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E30613]/30 group-hover:bg-[#E30613] transition-colors duration-200" />
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
                {planData.limitationsButtonLabel || 'LIMITATIONS & WAITING PERIODS'}
              </h3>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
                <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </Link>
          )}

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'mustKnow'
                ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                : 'border-slate-200/80 hover:border-[#E30613]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'mustKnow' ? 'bg-[#E30613]' : 'bg-[#E30613]/30 group-hover:bg-[#E30613]'
            }`} />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#E30613] text-xs sm:text-base font-black select-none shrink-0"
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                {planData.mustKnowButtonLabel || (isOptimaSecurePlusMustKnow ? planData.mustKnow?.buttonLabel : 'MUST KNOW DETAILS')}
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'bestSuitedFor'
                ? 'border-[#E30613] ring-2 ring-[#E30613]/20'
                : 'border-slate-200/80 hover:border-[#E30613]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#E30613]' : 'bg-[#E30613]/30 group-hover:bg-[#E30613]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#E30613] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              {planData.perfectForButtonLabel || 'PERFECT FOR'}
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL OVERLAYS (REPORT CARD, COMPANY STRENGTH, LIMITATIONS, MUST KNOW)     */}
      {/* Fits inside 1 mobile viewport with internal scroll if content is long    */}
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
            >
              {/* Close Button */}
              <button
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
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-slate-600 hover:text-[#E30613] hover:bg-[#FFF5F5] border border-transparent whitespace-nowrap transition-colors select-none"
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
                        if (tab.id === 'limitations') setActiveOptimaLimitation(null);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none ${
                        isActive
                          ? 'bg-[#E30613] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-[#E30613] hover:bg-[#FFF5F5]'
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
                    {isOptimaSecurePlus ? (
                      <>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                          {planData.reportCard.heading}
                        </h2>
                        <p className="text-xs text-[#E30613] font-medium mt-0.5">
                          {planData.reportCard.subheading}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E30613] block font-display">
                          {planData.reportCard.subheading}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                          {planData.reportCard.heading}
                        </h2>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">
                          {planData.reportCard.description}
                        </p>
                      </>
                    )}
                  </div>

                  {/* DYNAMIC REPORT CARD ACCORDION BOXES */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {(planData.reportCard?.items && planData.reportCard.items.length > 0 ? planData.reportCard.items : [
                      { id: 'csr', title: 'CSR', subtitle: planData.reportCard?.csr?.subtitle, score: planData.reportCard?.csr?.summaryValue, description: planData.reportCard?.csr?.explanation, singleYear: planData.reportCard?.csr?.singleYear, singleYearLabel: planData.reportCard?.csr?.singleYearLabel, threeYearAvg: planData.reportCard?.csr?.threeYearAvg, threeYearAvgLabel: planData.reportCard?.csr?.threeYearAvgLabel, videoTitle: planData.reportCard?.csr?.videoTitle, videoUrl: planData.reportCard?.csr?.videoUrl },
                      { id: 'icr', title: 'ICR', subtitle: planData.reportCard?.icr?.subtitle, score: planData.reportCard?.icr?.summaryValue, description: planData.reportCard?.icr?.explanation, range: planData.reportCard?.icr?.range, rangeLabel: planData.reportCard?.icr?.rangeLabel, videoTitle: planData.reportCard?.icr?.videoTitle, videoUrl: planData.reportCard?.icr?.videoUrl },
                      { id: 'complaint', title: 'COMPLAINT VOLUME', score: planData.reportCard?.complaintVolume?.summaryValue, description: planData.reportCard?.complaintVolume?.explanation, value: planData.reportCard?.complaintVolume?.value, label: planData.reportCard?.complaintVolume?.label, videoTitle: planData.reportCard?.complaintVolume?.videoTitle, videoUrl: planData.reportCard?.complaintVolume?.videoUrl }
                    ]).map((rcItem) => {
                      const isItemExpanded = Boolean(expandedReportCard[rcItem.id] || (rcItem.keyId && expandedReportCard[rcItem.keyId]) || (rcItem.id && expandedReportCard[String(rcItem.id).replace('rc-', '')]));
                      const toggleKey = rcItem.id || 'csr';
                      const summaryScore = rcItem.score || rcItem.summaryValue || rcItem.value || '';
                      const itemVideoUrl = rcItem.videoUrl || rcItem.video_url || demoVideoUrl;

                      return (
                        <div key={rcItem.id} className="rounded-xl sm:rounded-2xl border border-[#E30613]/35 bg-white overflow-hidden shadow-2xs hover:border-[#E30613]/70 transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleReportCard(toggleKey)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#E30613] transition-colors font-display shrink-0">
                                {rcItem.title}
                              </span>
                              {summaryScore && (
                                <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                                  {summaryScore}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5]/60 group-hover:border-[#E30613]/25 transition-all duration-300 shrink-0 select-none">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isItemExpanded ? 'rotate-180 text-[#E30613]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isItemExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                                  {/* Subtitle & Short Explanation */}
                                  {(rcItem.subtitle || rcItem.description || rcItem.explanation) && (
                                    <div>
                                      {rcItem.subtitle && (
                                        <span className="text-[11px] sm:text-xs font-semibold text-[#E30613] tracking-wide block font-display">
                                          {rcItem.subtitle}
                                        </span>
                                      )}
                                      {(rcItem.description || rcItem.explanation) && (
                                        <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                                          {rcItem.description || rcItem.explanation}
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  {/* Metrics Hierarchy (Single Year / 3-Year Avg) */}
                                  {(rcItem.singleYear || rcItem.single_year || rcItem.threeYearAvg || rcItem.three_year_avg) && (
                                    <div className="space-y-2.5 pt-1">
                                      {(rcItem.singleYear || rcItem.single_year) && (
                                        <div>
                                          <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                            {rcItem.singleYear || rcItem.single_year}
                                          </div>
                                          <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                            {rcItem.singleYearLabel || rcItem.single_year_label || 'Recent Single Year'}
                                          </div>
                                        </div>
                                      )}

                                      {(rcItem.threeYearAvg || rcItem.three_year_avg) && (
                                        <div className="pt-2 border-t border-slate-100">
                                          <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                            {rcItem.threeYearAvg || rcItem.three_year_avg}
                                          </div>
                                          <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                            {rcItem.threeYearAvgLabel || rcItem.three_year_avg_label || '3 Year Average'}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Range Metric (for ICR style) */}
                                  {rcItem.range && (
                                    <div className="pt-1">
                                      <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                        {rcItem.range}
                                      </div>
                                      {rcItem.rangeLabel && (
                                        <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                          {rcItem.rangeLabel}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Value / Label Metric (for Complaints or Custom style) */}
                                  {!rcItem.singleYear && !rcItem.single_year && !rcItem.range && rcItem.value && (
                                    <div className="pt-1">
                                      <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                        {rcItem.value}
                                      </div>
                                      {rcItem.label && (
                                        <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                          {rcItem.label}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Video Button */}
                                  {itemVideoUrl && (
                                    <div className="pt-1.5 border-t border-slate-100/80">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenVideo(rcItem.videoTitle || rcItem.video_title || rcItem.title, itemVideoUrl);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
                                      >
                                        <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
                                        <span>WATCH VIDEO</span>
                                      </button>
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
                    {isOptimaSecurePlus ? (
                      <>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                          {planData.companyStrength.heading}
                        </h2>
                        <p className="text-xs text-[#E30613] font-medium mt-0.5">
                          {planData.companyStrength.subheading}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E30613] block font-display">
                          {planData.companyStrength.subheading}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                          {planData.companyStrength.heading}
                        </h2>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">
                          {planData.companyStrength.description}
                        </p>
                      </>
                    )}
                  </div>

                  {/* DYNAMIC COMPANY STRENGTH ACCORDION BOXES */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {(planData.companyStrength?.items && planData.companyStrength.items.length > 0 ? planData.companyStrength.items : [
                      { id: 'ownership', title: 'OWNERSHIP / PERCENTAGE', value: planData.companyStrength?.ownership?.summaryValue, description: planData.companyStrength?.ownership?.explanation, items: planData.companyStrength?.ownership?.items, videoTitle: planData.companyStrength?.ownership?.videoTitle, videoUrl: planData.companyStrength?.ownership?.videoUrl },
                      { id: 'creditRating', title: 'CREDIT RATING', value: planData.companyStrength?.creditRating?.summaryValue, description: planData.companyStrength?.creditRating?.explanation, items: planData.companyStrength?.creditRating?.items, videoTitle: planData.companyStrength?.creditRating?.videoTitle, videoUrl: planData.companyStrength?.creditRating?.videoUrl },
                      { id: 'capitalStrength', title: 'CAPITAL STRENGTH', value: planData.companyStrength?.capitalStrength?.summaryValue, description: planData.companyStrength?.capitalStrength?.explanation, label: planData.companyStrength?.capitalStrength?.label, videoTitle: planData.companyStrength?.capitalStrength?.videoTitle, videoUrl: planData.companyStrength?.capitalStrength?.videoUrl },
                      { id: 'financialBase', title: 'FINANCIAL BASE', value: planData.companyStrength?.financialBase?.summaryValue, description: planData.companyStrength?.financialBase?.explanation, label: planData.companyStrength?.financialBase?.label, videoTitle: planData.companyStrength?.financialBase?.videoTitle, videoUrl: planData.companyStrength?.financialBase?.videoUrl },
                      { id: 'reinsurance', title: 'REINSURANCE STRENGTH', value: planData.companyStrength?.reinsuranceStrength?.summaryValue, description: planData.companyStrength?.reinsuranceStrength?.explanation, label: planData.companyStrength?.reinsuranceStrength?.label, videoTitle: planData.companyStrength?.reinsuranceStrength?.videoTitle, videoUrl: planData.companyStrength?.reinsuranceStrength?.videoUrl },
                      { id: 'marketPosition', title: 'MARKET POSITION', value: planData.companyStrength?.marketPosition?.summaryValue, description: planData.companyStrength?.marketPosition?.explanation, label: planData.companyStrength?.marketPosition?.label, videoTitle: planData.companyStrength?.marketPosition?.videoTitle, videoUrl: planData.companyStrength?.marketPosition?.videoUrl }
                    ]).map((csItem) => {
                      const isItemExpanded = Boolean(expandedCompanyStrength[csItem.id] || (csItem.keyId && expandedCompanyStrength[csItem.keyId]) || (csItem.id && expandedCompanyStrength[String(csItem.id).replace('cs-', '')]));
                      const toggleKey = csItem.id || 'ownership';
                      const summaryScore = csItem.value || csItem.summaryValue || csItem.summary_value || '';
                      const itemVideoUrl = csItem.videoUrl || csItem.video_url || demoVideoUrl;

                      return (
                        <div key={csItem.id} className="rounded-xl sm:rounded-2xl border border-[#E30613]/35 bg-white overflow-hidden shadow-2xs hover:border-[#E30613]/70 transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleCompanyStrength(toggleKey)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#E30613] transition-colors font-display truncate">
                                {csItem.title}
                              </span>
                              {summaryScore && (
                                <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-tight shrink-0 font-display">
                                  {summaryScore}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#FFF5F5]/60 group-hover:border-[#E30613]/25 transition-all duration-300 shrink-0 select-none">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isItemExpanded ? 'rotate-180 text-[#E30613]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isItemExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50/30 space-y-3">
                                  {(csItem.description || csItem.explanation) && (
                                    <div>
                                      <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                        {csItem.description || csItem.explanation}
                                      </p>
                                    </div>
                                  )}

                                  {/* Sub-items array if present (e.g. Ownership shareholding or Credit ratings) */}
                                  {csItem.items && csItem.items.length > 0 && (
                                    <div className="space-y-2 pt-1">
                                      {csItem.items.map((sub, sIdx) => (
                                        <div key={sIdx} className={sIdx > 0 ? "pt-2 border-t border-slate-100" : ""}>
                                          <div className="text-xs sm:text-sm font-extrabold text-slate-800 font-display">
                                            {sub.name || sub.agency || sub.title}
                                          </div>
                                          <div className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5">
                                            {sub.value || sub.rating} {sub.label && <span className="text-slate-500 font-medium text-[11px] sm:text-xs">{sub.label}</span>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Single value + label if no sub-items */}
                                  {(!csItem.items || csItem.items.length === 0) && csItem.value && (
                                    <div className="pt-1">
                                      <div className="text-base sm:text-lg font-bold text-amber-600 tracking-tight font-display">
                                        {csItem.value}
                                      </div>
                                      {csItem.label && (
                                        <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                          {csItem.label}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Video Button */}
                                  {itemVideoUrl && (
                                    <div className="pt-1.5 border-t border-slate-100/80">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenVideo(csItem.videoTitle || csItem.video_title || csItem.title, itemVideoUrl);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
                                      >
                                        <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
                                        <span>WATCH VIDEO</span>
                                      </button>
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

              {/* MODAL 3: LIMITATIONS & WAITING PERIODS (OPTIMA SECURE+ IN-PAGE MODAL) */}
              {(activeModal === 'limitations' || (isOptimaSecurePlus && activeModal === 'condition')) && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-8">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E30613] block font-display">
                      {planData.limitationsWaitingPeriods.subheading || 'TERMS & WAITING PERIODS'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mt-0.5">
                      {planData.limitationsWaitingPeriods.heading || 'LIMITATIONS & WAITING PERIODS'}
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {planData.limitationsWaitingPeriods.description || 'Interactive policy timelines, specific disease waiting, and permanent exclusions.'}
                    </p>
                  </div>

                  {/* THREE LIMITATION ACCORDION BOXES */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.limitationsWaitingPeriods.items.map((item) => {
                      const isItemExpanded = activeOptimaLimitation === item.id;
                      const isPermanent = item.id === 'permanent';

                      return (
                        <div
                          key={item.id}
                          className="rounded-xl sm:rounded-2xl border border-[#E30613]/35 bg-white overflow-hidden shadow-2xs hover:border-[#E30613]/70 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveOptimaLimitation(prev => prev === item.id ? null : item.id)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#E30613] transition-colors font-display pr-2">
                              {item.title}
                            </span>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#E30613] group-hover:bg-[#FFF5F5] group-hover:border-[#E30613]/25 transition-all duration-200 shrink-0 select-none">
                              <FiArrowRight
                                className={`text-xs sm:text-sm transition-transform duration-200 ${isItemExpanded ? 'rotate-90 text-[#E30613]' : 'group-hover:translate-x-0.5'
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

                                  {/* Highlight (for Initial Waiting Period) */}
                                  {item.highlight && (
                                    <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                                      <span className="text-emerald-600 font-bold">✓</span>
                                      <span>{item.highlight}</span>
                                    </div>
                                  )}

                                  {/* Disease List (for 2 Years Specific Diseases) */}
                                  {item.diseaseList && (
                                    <div className="p-3 sm:p-4 rounded-xl bg-[#FFF5F5]/60 border border-[#E30613]/15 space-y-2">
                                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#E30613] block font-display">
                                        Covered after 24 Months Continuous Coverage
                                      </span>
                                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                        {item.diseaseList.map((disease, dIdx) => (
                                          <li key={dIdx} className="flex items-start gap-1.5">
                                            <span className="text-[#E30613] font-bold">•</span>
                                            <span>{disease}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Exclusions List (for Permanent Exclusions) */}
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
                                        <span className={isPermanent ? 'text-rose-600 font-bold' : 'text-[#E30613]'}>
                                          {item.durationTag}
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Video Button */}
                                  <div className="pt-1.5 border-t border-slate-100/80">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenVideo(item.title, item.videoUrl || demoVideoUrl);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
                                    >
                                      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
                                      <span>WATCH VIDEO</span>
                                    </button>
                                  </div>
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

              {/* MODAL 3: LIMITATIONS & WAITING PERIODS (Used for other plans if activeModal === 'condition' and not Optima Secure+) */}
              {activeModal === 'condition' && !isOptimaSecurePlus && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#E30613] block">
                      {planData.limitationsWaitingPeriods.subheading}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                      {planData.limitationsWaitingPeriods.heading}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      {planData.limitationsWaitingPeriods.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {planData.limitationsWaitingPeriods.items.map((item) => {
                      const isItemExpanded = !!expandedLimitations[item.id];
                      const isPermanent = item.id === 'permanent';

                      return (
                        <div key={item.id} className="rounded-xl sm:rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => toggleLimitation(item.id)}
                            className="w-full p-3 sm:p-4 bg-slate-50 hover:bg-[#FFF5F5]/60 flex items-center justify-between text-left transition-colors cursor-pointer select-none"
                          >
                            <span className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                              {item.title}
                            </span>
                            <span className="text-xs sm:text-sm font-black text-[#E30613] ml-2 shrink-0 select-none">
                              {isItemExpanded ? '▲' : '▼'}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isItemExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className={`p-3 sm:p-4 border-t border-slate-100 text-xs text-slate-600 space-y-2.5 ${isPermanent ? 'bg-rose-50/40' : 'bg-white'}`}>
                                  <p className="font-medium leading-relaxed text-slate-700">
                                    {item.summary}
                                  </p>

                                  {item.highlight && (
                                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold flex items-center gap-1.5">
                                      <span className="text-emerald-600 font-bold">✓</span>
                                      <span>{item.highlight}</span>
                                    </div>
                                  )}

                                  {item.diseaseList && (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                      {item.diseaseList.map((disease, dIdx) => (
                                        <li key={dIdx} className="flex items-start gap-1.5">
                                          <span className="text-[#E30613] font-bold">•</span>
                                          <span>{disease}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {item.exclusionsList && (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                      {item.exclusionsList.map((excl, eIdx) => (
                                        <li key={eIdx} className="flex items-start gap-1.5">
                                          <span className="text-rose-600 font-bold">•</span>
                                          <span>{excl}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {(item.policyRef || item.durationTag) && (
                                    <div className={`pt-2 border-t ${isPermanent ? 'border-rose-200/60' : 'border-slate-100'} flex items-center justify-between text-[10px] text-slate-400 font-semibold`}>
                                      <span>{item.policyRef}</span>
                                      {item.durationTag && (
                                        <span className={isPermanent ? 'text-rose-600 font-bold' : 'text-[#E30613]'}>
                                          {item.durationTag}
                                        </span>
                                      )}
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

              {/* MODAL 4: MUST KNOW — Optima Secure+ details modal */}
              {activeModal === 'mustKnow' && isOptimaSecurePlusMustKnow && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="must-know-header">
                    <h2 className="must-know-main-heading">
                      {planData.mustKnow.heading}
                    </h2>
                    <p className="must-know-subheading">
                      {planData.mustKnow.subheading}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-3.5">
                    {planData.mustKnow.items.map((item) => (
                      <div
                        key={item.id}
                        className="must-know-card border border-[#E30613]/20 bg-[#FFF5F5]/40 space-y-2 sm:space-y-2.5 shadow-2xs"
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

              {/* MODAL 4: MUST KNOW (other HDFC plans) */}
              {activeModal === 'mustKnow' && !isOptimaSecurePlusMustKnow && planData.mustKnow?.highlights && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="must-know-header">
                    <div className="flex items-center gap-1.5 must-know-badge-tag text-[#E30613] mb-0.5">
                      <span>★</span>
                      <span>{planData.mustKnow.subheading}</span>
                    </div>
                    <h2 className="must-know-main-heading">
                      {planData.mustKnow.heading}
                    </h2>
                    <p className="must-know-subheading">
                      {planData.mustKnow.description}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-3.5">
                    {planData.mustKnow.highlights.map((hl, hlIdx) => (
                      <div
                        key={hlIdx}
                        className={`must-know-card border space-y-2 sm:space-y-2.5 shadow-2xs ${hl.theme === 'primary'
                          ? 'bg-[#FFF5F5] border-[#E30613]/25'
                          : 'bg-slate-50/80 border-slate-100'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded border ${hl.theme === 'primary'
                            ? 'text-[#E30613] bg-white border-[#E30613]/20'
                            : 'text-slate-700 bg-white border-slate-200'
                            }`}>
                            {hl.badge}
                          </span>
                          <span className={`text-[11px] sm:text-xs font-bold ${hl.theme === 'primary' ? 'text-emerald-600' : 'text-[#E30613]'
                            }`}>
                            {hl.tag}
                          </span>
                        </div>
                        <h4 className="must-know-card-title">
                          {hl.title}
                        </h4>
                        <p className="must-know-body-text">
                          {hl.description}
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
                    <p className="text-xs text-[#E30613] font-medium mt-0.5">
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
                          className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E30613]/30 shadow-2xs space-y-2 text-left hover:border-[#E30613]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                                {profile.title}
                              </h4>
                            </div>
                            {profile.badge && (
                              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/20 shrink-0 font-display">
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
                                  <FiCheck className="text-[#E30613] mt-0.5 shrink-0 text-xs" />
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
