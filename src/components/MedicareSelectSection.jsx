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
  FiAlertTriangle,
  FiFileText
} from 'react-icons/fi';
import { LuBed, LuBedDouble, LuBedSingle } from 'react-icons/lu';
import { getTataAigPlanData, resolveTataAigPlanId } from '../data/tataAigPlansData';
import PolicyBenefitsPdfActions from './PolicyBenefitsPdfActions';
import BenefitSearchBar from './BenefitSearchBar';
import { getFilteredAndPrioritizedFeaturesSections, getBenefitSearchResults } from '../utils/benefitSearchHelper';
import { scrollToBenefitCard } from '../utils/scrollToBenefitCard';
import TataAigMedicareSelectVariantSelector from './TataAigMedicareSelectVariantSelector';
import RoomCategoryModal from './RoomCategoryModal';
import MedicareSelectDocumentsModal from './MedicareSelectDocumentsModal';

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
const VideoButton = ({ featureTitle, onOpenVideo, videoUrl }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/25 hover:bg-[#0038A8] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
      title={`Watch demo video for ${featureTitle}`}
    >
      <FiPlay className="text-[8px] sm:text-[10px] fill-current text-[#0038A8] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Compact "View Details" Pill Button
const ViewDetailsPill = ({ onClick, label = "View Details" }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/30 hover:bg-[#0038A8] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
  >
    <FiInfo className="text-[9px] text-[#0038A8] group-hover:text-white" />
    <span>{label}</span>
  </button>
);

// Premium "WATCH VIDEO" button
const WatchVideoButton = ({ title, onOpenVideo, videoUrl, className = '', align = 'center' }) => (
  <div className={`pt-1.5 border-t border-slate-100/80 ${align === 'center' ? 'flex justify-center' : ''} ${className}`}>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(title, videoUrl);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-[#0038A8] border border-[#0038A8]/25 hover:bg-[#0038A8] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
    >
      <FiPlay className="text-[9px] sm:text-[10px] fill-current text-[#0038A8] group-hover:text-white transition-colors" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8]" />
            <span className="truncate">{videoTitle} — Feature Demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0038A8] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
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

// Sub-component for Tata AIG Features Accordion Items
function TataAigFeatureAccordionItem({
  item,
  isExpanded,
  onToggle,
  index = 0,
  onOpenVideo,
  onOpenDetailsModal,
  onOpenDiagnosticModal,
  onOpenGlobalCoverModal,
  onOpenTableModal,
  demoVideoUrl,
  hideExpandedBody = false
}) {
  const itemRef = React.useRef(null);
  const { id, title, subtitle, summary, badge, points, steps, tierData, hasDetailsModal, detailsModalTitle, detailsModalContent, isRider, iconType, tableData, tables, tableNote } = item;
  const IconComponent = (iconType && ICON_MAP[iconType]) || FiCheckSquare;
  const hasTable = Boolean(tables || tableData);
  const hasContent = !hideExpandedBody && Boolean(summary || (points && points.length > 0) || (steps && steps.length > 0) || tierData || hasTable);

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
          : isExpanded && hasContent
          ? 'bg-[#F0F4FF]/80 border-[#0038A8]/60 shadow-md ring-1 ring-[#0038A8]/20'
          : 'bg-white border-slate-200/80 hover:border-[#0038A8]/40 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Header Row */}
      <div className="p-3 sm:p-4 flex items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          {IconComponent && (
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isExpanded && hasContent ? 'bg-[#0038A8] text-white shadow-xs' : 'bg-[#F0F4FF] text-[#0038A8]'
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
              {item._isMatched && (
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/80 tracking-wide shrink-0">
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
                <span className="text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#0038A8]/10 text-[#0038A8] tracking-wide shrink-0">
                  Rider
                </span>
              )}
              {hasTable && onOpenTableModal && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTableModal({
                      title,
                      subtitle,
                      tables: tables || (tableData ? [tableData] : []),
                      note: tableNote
                    });
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/30 hover:bg-[#0038A8] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group"
                  title={`View table for ${title}`}
                >
                  <FiFileText className="text-[9px] text-[#0038A8] group-hover:text-white" />
                  <span>View Table</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Controls: View Details Button (for High End Diagnostics) & Plus/Minus Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-center">
          {id === 'high-end-diagnostics' && onOpenDiagnosticModal && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDiagnosticModal();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/25 hover:bg-[#0038A8] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group select-none shrink-0"
              title="View High End Diagnostic details"
            >
              <span>View Details</span>
            </button>
          )}

          {/* Plus / Minus Button */}
          {hasContent && (
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
              isExpanded ? 'bg-[#0038A8] text-white rotate-180' : 'bg-[#F0F4FF] text-[#0038A8]'
            }`}>
              {isExpanded ? (
                <FiMinus className="text-[10px] sm:text-xs stroke-[2.5]" />
              ) : (
                <FiPlus className="text-[10px] sm:text-xs stroke-[2.5]" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Summary & Details (Suppressed if hideExpandedBody is true or hasContent is false) */}
      <AnimatePresence initial={false}>
        {isExpanded && hasContent && (
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
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/20 tracking-wider">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#0038A8]" />
                    {badge}
                  </span>
                )}
              </div>

              {/* Short explanation / Details */}
              {summary && (
                <div className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-600">
                  {summary}
                </div>
              )}

              {/* Points */}
              {points && points.length > 0 && (
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-1.5">
                  <ul className="space-y-1">
                    {points.map((pt, pIdx) => {
                      if (pt === 'OR' || pt === 'or' || pt.trim() === 'OR') {
                        return (
                          <li key={pIdx} className="py-1 font-black text-xs text-[#0038A8] tracking-wider uppercase">
                            OR
                          </li>
                        );
                      }
                      return (
                        <li key={pIdx} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-600 font-medium">
                          <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-xs stroke-[2.5]" />
                          <span>{pt}</span>
                        </li>
                      );
                    })}
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
                        <span className="font-bold text-[#0038A8]">{tItem.value}</span>
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
                        <div className="px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs text-[9px] sm:text-[11px] font-black text-[#0F172A]">
                          {step}
                        </div>
                        {sIdx < steps.length - 1 && (
                          <span className="text-[9px] sm:text-xs font-extrabold text-[#0038A8] px-0.5">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button for Global Cover */}
              {id === 'global-cover' && onOpenGlobalCoverModal && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGlobalCoverModal();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-[#0038A8] text-white hover:bg-[#002670] transition-all duration-200 cursor-pointer shadow-2xs select-none"
                  >
                    <FiInfo className="text-xs" />
                    <span>View Global Cover Details</span>
                  </button>
                </div>
              )}

              {/* Action Button for View Table */}
              {hasTable && onOpenTableModal && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTableModal({
                        title,
                        subtitle,
                        tables: tables || (tableData ? [tableData] : []),
                        note: tableNote
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/25 hover:bg-[#0038A8] hover:text-white transition-all cursor-pointer shadow-2xs group select-none"
                    title={`View table for ${title}`}
                  >
                    <FiFileText className="text-xs text-[#0038A8] group-hover:text-white transition-colors" />
                    <span>View Table</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Premium Floating High End Diagnostic Details Modal / Overlay
function HighEndDiagnosticModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const diagnosticTests = [
    'Brain Perfusion Imaging',
    'CT Guided Biopsy',
    'CT Urography',
    'Digital Subtraction Angiography (DSA)',
    'Liver Biopsy',
    'Magnetic Resonance Cholangiography Scan',
    'PET CT',
    'PET MRI',
    'Renogram'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-lg overflow-y-auto z-10 p-4 sm:p-7 max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FiX className="text-sm sm:text-base" />
        </button>

        {/* Modal Header */}
        <div className="pr-8 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8] shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0038A8]">
              Tata AIG MediCare Premier
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-slate-900 font-display tracking-tight">
            High End Diagnostic
          </h3>
        </div>

        {/* Description Quote Box */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#F0F4FF] border border-[#0038A8]/20 mb-3.5 sm:mb-5">
          <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
            “Expenses incurred on diagnostic tests mentioned below on OPD basis will be covered upto Rs.25,000 per policy year:”
          </p>
        </div>

        {/* Covered Diagnostic Tests Section */}
        <div className="space-y-2 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0038A8]" />
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-display tracking-tight">
              Covered Diagnostic Tests
            </h4>
          </div>

          <div className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-3 sm:p-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-y-2">
              {diagnosticTests.map((test, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700 font-medium leading-snug">
                  <span className="text-[#0038A8] font-black text-sm shrink-0 select-none leading-none mt-0.5">•</span>
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mb-3.5 sm:mb-4">
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <div className="grid grid-cols-3 bg-slate-100/80 border-b border-slate-200 px-3 sm:px-4 py-2 text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-700 font-display">
              <div>Features</div>
              <div className="text-center">MediCare</div>
              <div className="text-right">MediCare Premier</div>
            </div>
            <div className="grid grid-cols-3 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm items-center font-medium bg-white">
              <div className="font-bold text-slate-800 text-[10px] sm:text-xs">
                High End Diagnostic
              </div>
              <div className="text-center font-bold text-slate-400 text-xs">
                NA
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold text-[#0038A8] bg-[#F0F4FF] px-2 py-0.5 rounded-md border border-[#0038A8]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0038A8]" />
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Close Action */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 sm:py-2 rounded-xl bg-[#0038A8] text-white text-xs font-bold hover:bg-[#002670] transition-colors shadow-2xs cursor-pointer select-none"
          >
            Got It
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Premium Floating Global Cover for Planned Hospitalization Details Modal / Overlay
function GlobalCoverDetailsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-xl overflow-y-auto z-10 p-4 sm:p-7 max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FiX className="text-sm sm:text-base" />
        </button>

        {/* Modal Header */}
        <div className="pr-8 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8] shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0038A8]">
              Tata AIG MediCare Premier
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-slate-900 font-display tracking-tight">
            Global Cover for Planned Hospitalization
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Worldwide medical coverage terms, eligibility & practical scenarios.
          </p>
        </div>

        <div className="space-y-4 text-slate-700 text-xs sm:text-sm">
          {/* 1. KEY HIGHLIGHTS */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-black">✅</span>
              <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm uppercase tracking-wide">
                Key Highlights
              </h4>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#F0F4FF] border border-[#0038A8]/20 space-y-1.5">
              <div className="flex items-start gap-2">
                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-sm" />
                <span className="font-medium text-slate-800">The illness/disease must be diagnosed in India first.</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-sm" />
                <span className="font-medium text-slate-800">After diagnosis in India, treatment can be taken outside India.</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-sm" />
                <span className="font-medium text-slate-800">Both In-patient Hospitalization and Day Care Procedures are covered.</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-sm" />
                <span className="font-medium text-slate-800">Claims are primarily settled on a reimbursement basis.</span>
              </div>
            </div>
          </div>

          {/* 2. COVERED SCENARIO */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-black">📌</span>
              <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm">
                Example – Covered Scenario
              </h4>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <ul className="space-y-1 text-slate-700 text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Cancer is diagnosed in India.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Doctor advises treatment in Singapore.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>The insured undergoes hospitalization in Singapore.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-emerald-200/60">
                <span className="font-extrabold text-emerald-900 text-xs sm:text-[13px] block">
                  Eligible hospitalization expenses may be covered as per policy terms.
                </span>
              </div>
            </div>
          </div>

          {/* 3. NOT COVERED SCENARIO */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-black">📌</span>
              <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm">
                Example – Not Covered Scenario
              </h4>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <ul className="space-y-1 text-slate-700 text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>The insured travels to the USA.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>The illness is diagnosed there for the first time.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-rose-200/60">
                <span className="font-extrabold text-rose-900 text-xs sm:text-[13px] block">
                  Global Cover will not be applicable.
                </span>
              </div>
            </div>
          </div>

          {/* 4. IMPORTANT POINTS */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0038A8]" />
              Important Points
            </h4>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#0038A8] font-bold text-sm shrink-0 leading-none mt-0.5">•</span>
                  <span>Pre and Post Hospitalization expenses incurred abroad are not covered.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0038A8] font-bold text-sm shrink-0 leading-none mt-0.5">•</span>
                  <span>Claim payment is made in Indian Rupees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0038A8] font-bold text-sm shrink-0 leading-none mt-0.5">•</span>
                  <span>Foreign medical bills are converted into INR as per the applicable RBI exchange rate.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. DOCUMENTS REQUIRED */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0038A8]" />
              Documents Required
            </h4>
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center font-bold text-xs text-slate-800">
                  Proof of diagnosis in India
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center font-bold text-xs text-slate-800">
                  Passport
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center font-bold text-xs text-slate-800">
                  Visa
                </div>
              </div>
            </div>
          </div>

          {/* 6. CASHLESS FACILITY */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 font-display text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Cashless Facility
            </h4>
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs text-amber-950 font-medium">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold shrink-0">⚠️</span>
                <span>Reimbursement is available as per policy terms.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold shrink-0">⚠️</span>
                <span>
                  Cashless treatment outside India may be arranged on a case-to-case basis and is subject to Tata AIG's approval. Therefore, cashless treatment cannot be guaranteed in every case.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Close Action */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0038A8] text-white text-xs font-bold hover:bg-[#002670] transition-colors shadow-2xs cursor-pointer select-none"
          >
            Got It
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Premium Floating Table Details Modal (View Table System)
function FeatureTableModal({ isOpen, onClose, modalData }) {
  if (!isOpen || !modalData) return null;

  const { title, subtitle, note } = modalData;
  const tables = (modalData.tables && modalData.tables.length > 0)
    ? modalData.tables
    : (modalData.tableData ? [modalData.tableData] : []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 relative pr-12">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="text-sm sm:text-base" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8] shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0038A8]">
              Tata AIG MediCare Select
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-slate-900 font-display tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {tables.map((table, tIdx) => (
            <div key={tIdx} className="space-y-2.5">
              {table.title && table.title !== title && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0038A8]" />
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-display">
                    {table.title}
                  </h4>
                </div>
              )}
              {table.subtitle && (
                <p className="text-[11px] sm:text-xs text-slate-500 -mt-1">
                  {table.subtitle}
                </p>
              )}

              {/* Table Container */}
              <div className="rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0038A8] text-white">
                      {table.columns.map((col, cIdx) => (
                        <th
                          key={cIdx}
                          className="px-3.5 py-2.5 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3.5 py-2.5 text-[11px] sm:text-xs text-slate-700 ${
                              cIdx === 0 ? 'font-semibold text-slate-900' : 'font-medium'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {table.details && table.details.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Screening & Vaccination Details
                  </div>
                  <ul className="space-y-1">
                    {table.details.map((dItem, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium">
                        <span className="text-[#0038A8] font-bold">•</span>
                        <span>{dItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {note && (
            <div className="p-3 rounded-xl bg-[#F0F4FF] border border-[#0038A8]/20">
              <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                <span className="font-bold text-[#0038A8]">Important Note: </span>
                {note}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0038A8] text-white text-xs font-bold hover:bg-[#002670] transition-colors shadow-2xs cursor-pointer select-none"
          >
            Close Table
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MedicareSelectSection({ plan, company, planId: planIdProp }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeLimitationId, setActiveLimitationId] = useState(null);
  const [detailsModalState, setDetailsModalState] = useState({
    isOpen: false,
    title: '',
    content: ''
  });
  const [tableModalState, setTableModalState] = useState({
    isOpen: false,
    data: null
  });
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [isGlobalCoverModalOpen, setIsGlobalCoverModalOpen] = useState(false);
  const [isRoomCategoryModalOpen, setIsRoomCategoryModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [videoModalState, setVideoModalState] = useState({
    isOpen: false,
    title: '',
    url: ''
  });

  const handleOpenTableModal = (modalData) => {
    setTableModalState({
      isOpen: true,
      data: modalData
    });
  };

  const handleCloseTableModal = () => {
    setTableModalState({
      isOpen: false,
      data: null
    });
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

  // Resolve to canonical Tata AIG plan ID — MediCare Premier
  const currentPlanId = resolveTataAigPlanId(planIdProp || plan?.id || urlPlanId) || planIdProp || plan?.id || urlPlanId;
  const staticPlanData = getTataAigPlanData(currentPlanId);
  const isMatchingStatic = Boolean(staticPlanData && (staticPlanData.planId === currentPlanId || staticPlanData.id === currentPlanId));
  const matchedStatic = isMatchingStatic ? staticPlanData : null;
  
  // Merge live dynamic CMS data if available from Admin API, otherwise preserve static data
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
  const isMedicareSelectVariant = Boolean(typeof currentPlanId === 'string' && currentPlanId.startsWith('medicare-select-'));
  const isMedicareSelectPlan = Boolean(typeof currentPlanId === 'string' && (currentPlanId === 'medicare-select' || currentPlanId.startsWith('medicare-select')));

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
    setIsDiagnosticModalOpen(false);
    setIsGlobalCoverModalOpen(false);
    setIsRoomCategoryModalOpen(false);
    setIsDocumentsModalOpen(false);
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
    if (activeModal || videoModalState.isOpen || detailsModalState.isOpen || isDiagnosticModalOpen || isGlobalCoverModalOpen || isRoomCategoryModalOpen || isDocumentsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, videoModalState.isOpen, detailsModalState.isOpen, isDiagnosticModalOpen, isGlobalCoverModalOpen, isRoomCategoryModalOpen, isDocumentsModalOpen]);

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
  // TATA AIG MEDICARE SELECT: VARIANT SELECTOR SCREEN (3 VARIANTS)
  // =========================================================================
  if (currentPlanId === 'medicare-select' && !isFeaturesPage) {
    return <TataAigMedicareSelectVariantSelector company={company} />;
  }

  // =========================================================================
  // DEDICATED FEATURES PAGE (EXACT REFERENCE: 4 COMPACT DARK GREEN CATEGORIES)
  // =========================================================================
  if (isFeaturesPage) {
    return (
      <div className="w-full pb-20 bg-[#F0F4FF] min-h-screen overflow-x-hidden relative font-sans">
        {/* Subtle Ambient Blue Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#0038A8]" />

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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <FiArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back to {planData.planName}</span><span className="sm:hidden">Back to Plan</span>
              </Link>

              <BenefitSearchBar
                searchQuery={benefitSearchQuery}
                onSearchChange={setBenefitSearchQuery}
                totalMatches={totalBenefitMatches}
                hasActiveSearch={hasActiveBenefitSearch}
                primaryColor="#0038A8"
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#0038A8] block mb-0.5">
                Tata AIG
              </span>
              <h1 className="text-base sm:text-2xl font-black text-[#0F172A] tracking-tight font-display">
                {planData.planName}
              </h1>
              <span className="text-xs sm:text-sm font-extrabold text-[#0038A8] uppercase tracking-wider block mt-1">
                POLICY BENEFITS
              </span>
              <div className="w-8 sm:w-12 h-1 bg-[#0038A8] mx-auto mt-2 rounded-full" />
            </div>

            {/* DOCUMENTS / PDF ACTION BUTTON */}
            {isMedicareSelectPlan ? (
              <div className="w-full flex flex-col items-center my-3 sm:my-4 select-none relative z-20">
                <div className="flex items-center justify-center w-full max-w-sm px-2">
                  <button
                    type="button"
                    onClick={() => setIsDocumentsModalOpen(true)}
                    style={{ '--btn-primary': '#0038A8' }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-white text-slate-800 border border-slate-300/80 hover:border-[#0038A8] hover:text-[#0038A8] hover:bg-slate-50/80 active:scale-[0.98] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer text-[11px] sm:text-xs font-black uppercase tracking-wider font-display group"
                    title="View official MediCare Select documents"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 group-hover:bg-[#F0F4FF] flex items-center justify-center text-slate-500 group-hover:text-[#0038A8] transition-colors shrink-0">
                      <FiFileText className="text-[11px] sm:text-xs stroke-[2.5]" />
                    </div>
                    <span className="truncate">Documents</span>
                  </button>
                </div>
              </div>
            ) : (
              <PolicyBenefitsPdfActions
                company={company}
                plan={planData}
                featuresSections={planData.featuresSections}
              />
            )}
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

          {/* 4 COMPACT DARK GREEN CATEGORY SECTIONS (EXACT REFERENCE DESIGN) */}
          {prioritizedFeaturesSections?.map((sec, secIdx) => (
            <div key={sec.id || secIdx} className="space-y-3 sm:space-y-3.5">
              
              {/* Reference Dark Green Category Banner */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="w-full relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#14532D] via-[#052E16] to-[#14532D] px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm border border-emerald-900/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 relative z-10">
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-display flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-xs shrink-0" />
                    {sec.title}
                  </h2>
                  {sec.subtitle && !isMedicareSelectPlan && (
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-200 uppercase tracking-wider pl-4.5 sm:pl-0">
                      {sec.subtitle}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Compact Grid of Cards */}
              <div className={`grid ${sec.gridCols || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-2.5 sm:gap-4`}>
                {sec.items.map((item, itemIdx) => (
                  <TataAigFeatureAccordionItem
                    key={item.id}
                    item={item}
                    index={itemIdx}
                    isExpanded={expandedFeatureId === item.id}
                    onToggle={(id, ref) => {
                      if (id === 'select-room-category') {
                        setIsRoomCategoryModalOpen(true);
                      } else {
                        toggleAccordionItem(id, ref);
                      }
                    }}
                    onOpenVideo={handleOpenVideo}
                    onOpenDetailsModal={handleOpenDetailsModal}
                    onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)}
                    onOpenGlobalCoverModal={() => setIsGlobalCoverModalOpen(true)}
                    onOpenTableModal={handleOpenTableModal}
                    demoVideoUrl={demoVideoUrl}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* FOOTNOTE */}
          <div className="text-right pt-2">
            <span className="text-xs font-bold text-slate-400">
              *Terms & Conditions Apply as per official {planData.fullName || planData.planName || 'Tata AIG'} policy wording.
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

        {/* COMPACT DETAILS MODAL (FOR GLOBAL COVER & COVERAGE DETAILS) */}
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
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-md overflow-hidden z-10 p-5 sm:p-6 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleCloseDetailsModal}
                  className="absolute top-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <FiX className="text-sm sm:text-base" />
                </button>

                <div className="pr-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8]" />
                    <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                      {detailsModalState.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {detailsModalState.content}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseDetailsModal}
                    className="px-5 py-2 rounded-xl bg-[#0038A8] text-white text-xs font-bold hover:bg-[#002670] transition-colors shadow-2xs cursor-pointer select-none"
                  >
                    Got It
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FLOATING HIGH END DIAGNOSTIC DETAILS MODAL */}
        <AnimatePresence>
          {isDiagnosticModalOpen && (
            <HighEndDiagnosticModal
              isOpen={isDiagnosticModalOpen}
              onClose={() => setIsDiagnosticModalOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* FLOATING GLOBAL COVER DETAILS MODAL */}
        <AnimatePresence>
          {isGlobalCoverModalOpen && (
            <GlobalCoverDetailsModal
              isOpen={isGlobalCoverModalOpen}
              onClose={() => setIsGlobalCoverModalOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* FLOATING ROOM CATEGORY DETAILS MODAL */}
        <AnimatePresence>
          {isRoomCategoryModalOpen && (
            <RoomCategoryModal
              isOpen={isRoomCategoryModalOpen}
              onClose={() => setIsRoomCategoryModalOpen(false)}
              item={planData?.featuresSections?.flatMap(s => s.items).find(i => i.id === 'select-room-category')}
              primaryColor={uiConfig.primaryColor || '#0038A8'}
              onOpenVideo={handleOpenVideo}
              demoVideoUrl={demoVideoUrl}
            />
          )}
        </AnimatePresence>

        {/* FLOATING FEATURE TABLE DETAILS MODAL (VIEW TABLE SYSTEM) */}
        <AnimatePresence>
          {tableModalState.isOpen && (
            <FeatureTableModal
              isOpen={tableModalState.isOpen}
              onClose={handleCloseTableModal}
              modalData={tableModalState.data}
            />
          )}
        </AnimatePresence>

        {/* MEDICARE SELECT DOCUMENTS MODAL */}
        <MedicareSelectDocumentsModal
          isOpen={isDocumentsModalOpen}
          onClose={() => setIsDocumentsModalOpen(false)}
          primaryColor="#0038A8"
        />

      </div>
    );
  }

  // =========================================================================
  // MAIN TATA AIG PLAN OVERVIEW PAGE (SINGLE VIEWPORT HUB)
  // =========================================================================
  return (
    <div className="w-full font-sans">
      {/* Single Viewport Container */}
      <div className="max-w-3xl mx-auto flex flex-col justify-start sm:justify-center items-stretch sm:min-h-[calc(100vh-220px)] py-1 sm:py-4 space-y-0">
        
        {/* Navigation Breadcrumb - Back to Plans / MediCare Select Variants */}
        <div className="shrink-0 text-left mb-3.5 sm:mb-5">
          <Link
            to={isMedicareSelectVariant ? `/insurance/${company.id}/medicare-select` : `/insurance/${company.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="text-sm" />{' '}
            <span className="hidden sm:inline">
              {isMedicareSelectVariant ? 'Back to MediCare Select Variants' : 'Back to Tata AIG Plans'}
            </span>
            <span className="sm:hidden">
              {isMedicareSelectVariant ? 'Back to Variants' : 'Back to Plans'}
            </span>
          </Link>
        </div>

        {/* 1. TATA AIG LOGO */}
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
          <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-[#0038A8] mx-auto mt-1 sm:mt-1.5 rounded-full" />
        </div>

        {/* 3. 6-BUTTON PRIMARY NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 w-full">
          {/* Card 1: REPORT CARD */}
          <button
            type="button"
            onClick={() => setActiveModal('ratio')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'ratio'
                ? 'border-[#0038A8] ring-2 ring-[#0038A8]/20'
                : 'border-slate-200/80 hover:border-[#0038A8]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'ratio' ? 'bg-[#0038A8]' : 'bg-[#0038A8]/30 group-hover:bg-[#0038A8]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              REPORT CARD
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 2: COMPANY STRENGTH */}
          <button
            type="button"
            onClick={() => setActiveModal('fundamental')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'fundamental'
                ? 'border-[#0038A8] ring-2 ring-[#0038A8]/20'
                : 'border-slate-200/80 hover:border-[#0038A8]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'fundamental' ? 'bg-[#0038A8]' : 'bg-[#0038A8]/30 group-hover:bg-[#0038A8]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              COMPANY STRENGTH
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 3: POLICY BENEFITS */}
          <Link
            to={`/insurance/${company.id}/${currentPlanId}/features`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:border-[#0038A8]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0038A8]/30 group-hover:bg-[#0038A8] transition-colors duration-200" />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              POLICY BENEFITS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
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
                ? 'border-[#0038A8] ring-2 ring-[#0038A8]/20'
                : 'border-slate-200/80 hover:border-[#0038A8]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'limitations' ? 'bg-[#0038A8]' : 'bg-[#0038A8]/30 group-hover:bg-[#0038A8]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              LIMITATIONS
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 5: MUST KNOW DETAILS */}
          <button
            type="button"
            onClick={() => setActiveModal('mustKnow')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'mustKnow'
                ? 'border-[#0038A8] ring-2 ring-[#0038A8]/20'
                : 'border-slate-200/80 hover:border-[#0038A8]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'mustKnow' ? 'bg-[#0038A8]' : 'bg-[#0038A8]/30 group-hover:bg-[#0038A8]'
            }`} />
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#0038A8] text-xs sm:text-base font-black select-none shrink-0"
              >
                ✦
              </motion.span>
              <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight tracking-tight uppercase">
                MUST KNOW DETAILS
              </h3>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
              <FiArrowRight className="text-xs sm:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>

          {/* Card 6: PERFECT FOR */}
          <button
            type="button"
            onClick={() => setActiveModal('bestSuitedFor')}
            className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group relative overflow-hidden active:scale-[0.98] select-none ${
              activeModal === 'bestSuitedFor'
                ? 'border-[#0038A8] ring-2 ring-[#0038A8]/20'
                : 'border-slate-200/80 hover:border-[#0038A8]/40'
            }`}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-colors duration-200 ${
              activeModal === 'bestSuitedFor' ? 'bg-[#0038A8]' : 'bg-[#0038A8]/30 group-hover:bg-[#0038A8]'
            }`} />
            <h3 className="text-xs sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#0038A8] transition-colors duration-200 font-display leading-tight pr-1 tracking-tight">
              PERFECT FOR
            </h3>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0038A8] group-hover:bg-[#F0F4FF] group-hover:border-[#0038A8]/20 transition-all duration-200 shrink-0">
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
                    <p className="text-xs text-[#0038A8] font-medium mt-0.5">
                      Tata AIG Performance
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Box 1: Claim Settlement Ratio */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('csr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            {planData.reportCard?.csr?.title || 'Claim Settlement Ratio'}
                          </span>
                          {planData.reportCard?.csr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-amber-600 tracking-tight shrink-0 font-display">
                              {planData.reportCard.csr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.csr ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.csr.subtitle && planData.reportCard.csr.subtitle !== planData.reportCard.csr.title && (
                                <span className="text-[11px] sm:text-xs font-semibold text-[#0038A8] tracking-wide block font-display">
                                  {planData.reportCard.csr.subtitle}
                                </span>
                              )}
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.reportCard.csr.explanation}
                              </p>

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
                                    {planData.reportCard.csr.threeYearAvgLabel || '3 Years Avg Ratio'}
                                  </div>
                                </div>
                              </div>

                              <WatchVideoButton
                                title={planData.reportCard?.csr?.title || 'Claim Settlement Ratio'}
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard?.csr?.videoUrl || demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 2: Incurred Claim Ratio */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('icr')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            {planData.reportCard?.icr?.title || 'Incurred Claim Ratio'}
                          </span>
                          {planData.reportCard?.icr?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight shrink-0 font-display">
                              {planData.reportCard.icr.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.icr ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.icr.subtitle && planData.reportCard.icr.subtitle !== planData.reportCard.icr.title && (
                                <span className="text-[11px] sm:text-xs font-semibold text-[#0038A8] tracking-wide block font-display">
                                  {planData.reportCard.icr.subtitle}
                                </span>
                              )}
                              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                                {planData.reportCard.icr.explanation}
                              </p>

                              <div className="pt-1">
                                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                                  {planData.reportCard.icr.range}
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                                  {planData.reportCard.icr.rangeLabel || 'Incurred Claim Ratio'}
                                </div>
                              </div>

                              <WatchVideoButton
                                title={planData.reportCard?.icr?.title || 'Incurred Claim Ratio'}
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard?.icr?.videoUrl || demoVideoUrl}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Box 3: Complaints/10K */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleReportCard('complaint')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            {planData.reportCard?.complaintVolume?.title || 'Complaints/10K'}
                          </span>
                          {planData.reportCard?.complaintVolume?.summaryValue && (
                            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight shrink-0 font-display">
                              {planData.reportCard.complaintVolume.summaryValue}
                            </span>
                          )}
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedReportCard.complaint ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                              {planData.reportCard.complaintVolume.subtitle && planData.reportCard.complaintVolume.subtitle !== planData.reportCard.complaintVolume.title && (
                                <span className="text-[11px] sm:text-xs font-semibold text-[#0038A8] tracking-wide block font-display">
                                  {planData.reportCard.complaintVolume.subtitle}
                                </span>
                              )}
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
                                title={planData.reportCard?.complaintVolume?.title || 'Complaints/10K'}
                                onOpenVideo={handleOpenVideo}
                                videoUrl={planData.reportCard?.complaintVolume?.videoUrl || demoVideoUrl}
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
                    <p className="text-xs text-[#0038A8] font-medium mt-0.5">
                      How reliable/strong is the insurer?
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* OWNERSHIP */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('ownership')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            OWNERSHIP / PERCENTAGE
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.ownership?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.ownership ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                    <span className="font-bold text-[#0038A8]">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CREDIT RATING */}
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('creditRating')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            CREDIT RATING
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-amber-600 font-display">
                            {planData.companyStrength?.creditRating?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.creditRating ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('capitalStrength')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            CAPITAL STRENGTH (SOLVENCY)
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.capitalStrength?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.capitalStrength ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                    <div className="rounded-xl sm:rounded-2xl border border-[#0038A8]/35 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/70 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleCompanyStrength('financialBase')}
                        className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                      >
                        <div className="flex items-center justify-between flex-1 min-w-0 pr-2 sm:pr-3 gap-2">
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#0038A8] transition-colors font-display shrink-0">
                            FINANCIAL BASE (AUM)
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">
                            {planData.companyStrength?.financialBase?.summaryValue}
                          </span>
                        </div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                          <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${expandedCompanyStrength.financialBase ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      LIMITATIONS & WAITING PERIODS
                    </h2>
                    <p className="text-xs text-[#0038A8] font-medium mt-0.5">
                      Terms, Waiting Periods & Exclusions
                    </p>
                  </div>

                  <div className="space-y-3">
                    {planData.limitationsWaitingPeriods?.items?.map((item) => {
                      const isExpanded = activeLimitationId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl sm:rounded-2xl border border-[#0038A8]/30 bg-white overflow-hidden shadow-2xs hover:border-[#0038A8]/60 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setActiveLimitationId(isExpanded ? null : item.id)}
                            className="w-full p-3.5 sm:p-4 bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-colors cursor-pointer select-none group gap-2"
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#0038A8] transition-colors leading-tight">
                                {item.title}
                              </h4>
                              {item.durationTag && (
                                <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/20">
                                  {item.durationTag}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#F0F4FF] transition-all duration-300 shrink-0">
                              <FiChevronDown className={`text-xs sm:text-sm transition-transform duration-300 transform ${isExpanded ? 'rotate-180 text-[#0038A8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#0038A8] shrink-0" />
                                          <span className="truncate">{d}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {item.exclusionsList && (
                                    <ul className="space-y-1 pt-1">
                                      {item.exclusionsList.map((ex, exIdx) => (
                                        <li key={exIdx} className="flex items-start gap-1.5 text-slate-600 font-medium">
                                          <span className="text-rose-500 font-bold shrink-0">✕</span>
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                      MUST KNOW DETAILS
                    </h2>
                    <p className="text-xs text-[#0038A8] font-medium mt-0.5">
                      Key product takeaways
                    </p>
                  </div>

                  <div className="space-y-3">
                    {planData.mustKnow?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white border border-[#0038A8]/30 shadow-2xs space-y-2 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.icon}</span>
                          <h4 className="text-sm font-extrabold text-[#0F172A] font-display">
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
                                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-xs" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.paragraphs && (
                          <div className="space-y-1 pt-1 border-t border-slate-100 text-xs text-slate-600 font-medium">
                            {item.paragraphs.map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
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
                    <p className="text-xs text-[#0038A8] font-medium mt-0.5">
                      {planData.bestSuitedFor?.subheading || 'Who is this plan perfect for?'}
                    </p>
                    {planData.bestSuitedFor?.description && (
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {planData.bestSuitedFor.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {planData.bestSuitedFor?.profiles?.map((profile, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#0038A8]/30 shadow-2xs space-y-2 text-left hover:border-[#0038A8]/60 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl shrink-0 select-none">{profile.icon || '👤'}</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] font-display">
                              {profile.title}
                            </h4>
                          </div>
                          {profile.badge && (
                            <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#0038A8] border border-[#0038A8]/20 shrink-0 font-display">
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
                                <FiCheck className="text-[#0038A8] mt-0.5 shrink-0 text-xs" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
