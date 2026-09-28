import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiActivity,
  FiClock,
  FiZap,
  FiRefreshCw,
  FiTrendingUp,
  FiHeart,
  FiDollarSign,
  FiCheckSquare,
  FiPlay,
  FiX,
  FiHome,
  FiCalendar,
  FiCpu,
  FiSmile,
  FiShield,
  FiClipboard,
  FiTruck,
  FiCreditCard,
  FiUsers
} from 'react-icons/fi';
import {
  FaHospital,
  FaUserMd,
  FaStethoscope,
  FaSyringe,
  FaShieldAlt,
  FaMedkit
} from 'react-icons/fa';
import hdfcErgoLogo from '../assets/hdfc-ergo-logo.png';
import { optimaSecurePlusData as staticOptimaData } from '../data/optimaSecurePlusData';
import { useOptimaSecurePlusData } from '../hooks/useOptimaSecurePlusData';
import unlimitedVideo from '../assets/unlimited.mp4';
import secureBenefitVideo from '../assets/2x coverage.mp4';
import preventiveVideo from '../assets/Preventive.mp4';

// Icon Dictionary Mapping
const ICON_MAP = {
  home: FaHospital,
  heart: FiHeart,
  calendar: FiClock,
  check: FaUserMd,
  cpu: FaStethoscope,
  refresh: FiRefreshCw,
  shield: FaShieldAlt,
  smile: FiSmile,
  trending: FiTrendingUp,
  clipboard: FaSyringe,
  dollar: FiDollarSign,
  activity: FiActivity,
  truck: FiTruck,
  clock: FiClock,
  zap: FiZap,
  users: FiUsers,
  credit: FiCreditCard
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
const VideoButton = ({ featureTitle, videoUrl, onOpenVideo }) => {
  if (!videoUrl || videoUrl.trim() === '') return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenVideo(featureTitle, videoUrl);
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/25 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer select-none shrink-0 shadow-2xs group ml-1.5 align-middle"
    >
      <FiPlay className="text-[9px] fill-current text-[#E30613] group-hover:text-white transition-colors" />
      <span>Video</span>
    </button>
  );
};

// Modal Overlay for In-Page Video Player
const VideoModal = ({ isOpen, onClose, videoTitle, videoUrl }) => {
  if (!isOpen || !videoUrl) return null;

  const embedData = getVideoEmbedUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity"
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
            <span className="truncate">{videoTitle} — Feature Explanation</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E30613] text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
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

// Main Section Container Component with Split-Border
const MainSectionContainer = ({ children, title, subtitle }) => {
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl p-4 sm:p-7 shadow-xs border border-[#E2E8F0] overflow-hidden">
      {/* TOP BORDER (RED) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E30613] z-10" />
      {/* RIGHT BORDER (RED) */}
      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-[#E30613] z-10" />
      {/* BOTTOM BORDER (ORANGE) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5722] z-10" />
      {/* LEFT BORDER (ORANGE) */}
      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#FF5722] z-10" />

      {/* SECTION HEADER AREA */}
      <div className="relative z-10 flex items-start gap-3 mb-6 sm:mb-8 pb-4 border-b border-[#E2E8F0]">
        <div className="w-1.5 h-6 sm:h-7 bg-[#E30613] rounded-full shrink-0 mt-0.5" />
        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-emerald-700 tracking-tight uppercase font-display">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#475569] font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* SECTION CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Mobile Dual-Accent Split Border Wrapper for Interactive Feature Cards
const DualAccentCard = ({ children, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`relative bg-[#FFFFFF] rounded-xl sm:rounded-2xl shadow-xs transition-all duration-200 overflow-hidden cursor-pointer border border-[#E2E8F0] ${className}`}
  >
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E30613] z-10" />
    <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-[#E30613] z-10" />
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5722] z-10" />
    <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#FF5722] z-10" />

    <div className="relative z-0 p-2.5 sm:p-4">
      {children}
    </div>
  </div>
);

// Motion Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export default function OptimaSecurePlusSection() {
  const { data: optimaSecurePlusData } = useOptimaSecurePlusData();
  const [mobileActive, setMobileActive] = useState({});
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    title: '',
    url: ''
  });
  const [healthCheckupModal, setHealthCheckupModal] = useState(null);

  const handleOpenVideo = (title, url) => {
    setVideoModal({
      isOpen: true,
      title,
      url: url || optimaSecurePlusData.uiConfig.demoVideoUrl
    });
  };

  const handleCloseVideo = () => {
    setVideoModal({
      isOpen: false,
      title: '',
      url: ''
    });
  };

  const toggleMobileCard = (secIdx, featIdx) => {
    setMobileActive(prev => ({
      ...prev,
      [secIdx]: prev[secIdx] === featIdx ? null : featIdx
    }));
  };

  return (
    <div className="space-y-8 sm:space-y-10 font-sans w-full max-w-full overflow-x-hidden text-[#0F172A] bg-[#FFFFFF]">
      {/* ========================================================================= */}
      {/* COMPACT HDFC ERGO BRANDED HEADER                                         */}
      {/* ========================================================================= */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-6 shadow-xs border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <img
            src={hdfcErgoLogo}
            alt="HDFC ERGO"
            className="h-10 sm:h-12 w-auto object-contain select-none shrink-0"
          />
        </div>

        <div className="text-center sm:text-right">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight font-display">
            <span className="text-[#E30613]">{optimaSecurePlusData.planName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-semibold mt-0.5">
            {optimaSecurePlusData.policySubtitle || 'HDFC ERGO Health Insurance Policy'}
          </p>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* DYNAMIC SECTIONS RENDERED FROM optimaSecurePlusData                        */}
      {/* ========================================================================= */}
      {optimaSecurePlusData.featuresSections.map((section, secIdx) => (
        <motion.section
          key={section.id || secIdx}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <MainSectionContainer
            title={section.title}
            subtitle={section.subtitle}
          >
            {/* DESKTOP LAYOUT (768px & ABOVE) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {section.items.map((feat) => {
                const IconComponent = (feat.iconType && ICON_MAP[feat.iconType]) || FiCheckSquare;
                return (
                  <div
                    key={feat.id}
                    className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#E30613]/40 rounded-2xl p-6 shadow-xs transition-all duration-200 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/10 flex items-center justify-center text-lg shrink-0 mb-4">
                        <IconComponent />
                      </div>
                      <div className="min-h-[44px] flex items-start">
                        <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                          {feat.title}
                          <VideoButton
                            featureTitle={feat.videoTitle || feat.title}
                            videoUrl={feat.videoUrl}
                            onOpenVideo={handleOpenVideo}
                          />
                        </h3>
                      </div>

                      {feat.badge && (
                        <div className="min-h-[28px] mt-2 flex items-center">
                          <span className="inline-block text-xs font-bold text-[#E30613] bg-[#FFF5F5] px-2.5 py-0.5 rounded-md border border-[#E30613]/20">
                            {feat.badge}
                          </span>
                        </div>
                      )}

                      {feat.steps && feat.steps.length > 0 && (
                        <div className="bg-[#FFF5F5] border border-[#E2E8F0] rounded-xl p-3 my-3 text-xs sm:text-sm font-semibold text-[#0F172A] font-mono leading-relaxed min-h-[56px] flex items-center">
                          {feat.steps.join(' → ')}
                        </div>
                      )}

                      {feat.points && feat.points.length > 0 ? (
                        <div className="space-y-1.5 mt-3">
                          {feat.intro && (
                            <p
                              className="text-xs sm:text-sm font-medium text-[#475569] leading-relaxed mb-1"
                              dangerouslySetInnerHTML={{
                                __html: feat.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                              }}
                            />
                          )}
                          <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-[#475569] list-none pl-0">
                            {feat.points.map((pt, pIdx) => (
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
                        <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed font-normal">
                          {feat.summary}
                        </p>
                      )}

                      {/* Health Check-up Limits Table Trigger Button */}
                      {(feat.hasHealthCheckupTable || feat.healthCheckupLimits) && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHealthCheckupModal(feat);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/30 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none active:scale-95"
                          >
                            <FiActivity className="text-xs shrink-0" />
                            <span>{feat.tableButtonLabel || 'View Health Check-up Limits'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE INTERACTIVE FEATURE BOXES (BELOW 768px) */}
            <div className="grid grid-cols-2 gap-2.5 md:hidden">
              {section.items.map((feat, idx) => {
                const isExpanded = mobileActive[secIdx] === idx;
                const IconComp = (feat.iconType && ICON_MAP[feat.iconType]) || FiCheckSquare;

                return (
                  <DualAccentCard
                    key={feat.id}
                    onClick={() => toggleMobileCard(secIdx, idx)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/10 flex items-center justify-center text-sm shrink-0">
                          <IconComp />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="text-sm font-bold text-[#0F172A] leading-tight">
                              {feat.title}
                            </h3>
                            <VideoButton
                              featureTitle={feat.videoTitle || feat.title}
                              videoUrl={feat.videoUrl}
                              onOpenVideo={handleOpenVideo}
                            />
                          </div>
                          {feat.badge && (
                            <span className="inline-block text-[11px] font-semibold text-[#E30613] mt-0.5">
                              {feat.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 shrink-0 select-none">
                        {isExpanded ? '▲' : '▼'}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-[#E2E8F0] space-y-2">
                            {feat.steps && feat.steps.length > 0 && (
                              <div className="bg-[#FFF5F5] border border-[#E2E8F0] rounded-lg p-2 text-xs font-semibold text-[#0F172A] font-mono leading-relaxed">
                                {feat.steps.join(' → ')}
                              </div>
                            )}
                            {feat.points && feat.points.length > 0 ? (
                              <div className="space-y-1">
                                {feat.intro && (
                                  <p
                                    className="text-xs font-medium text-[#475569] leading-relaxed mb-1"
                                    dangerouslySetInnerHTML={{
                                      __html: feat.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                                    }}
                                  />
                                )}
                                <ul className="space-y-1 text-xs font-medium text-[#475569] list-none pl-0">
                                  {feat.points.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-1.5">
                                      <span className="text-[#E30613] font-bold text-xs leading-none mt-0.5 shrink-0">•</span>
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
                              <p className="text-xs text-[#475569] leading-relaxed">
                                {feat.summary}
                              </p>
                            )}
                            {(feat.hasHealthCheckupTable || feat.healthCheckupLimits) && (
                              <div className="pt-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHealthCheckupModal(feat);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FFF5F5] text-[#E30613] border border-[#E30613]/30 hover:bg-[#E30613] hover:text-white transition-all cursor-pointer shadow-2xs group select-none active:scale-95"
                                >
                                  <FiActivity className="text-[10px] shrink-0" />
                                  <span>{feat.tableButtonLabel || 'View Health Check-up Limits'}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </DualAccentCard>
                );
              })}
            </div>
          </MainSectionContainer>
        </motion.section>
      ))}

      {/* FOOTNOTE */}
      <div className="text-right pt-1">
        <span className="text-xs font-bold text-slate-400">
          {optimaSecurePlusData.termsFootnote || '*T&C Apply'}
        </span>
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
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl w-[calc(100%-20px)] max-w-md overflow-hidden z-10 p-4 sm:p-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]" />
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#E30613]">
                      {optimaSecurePlusData.planName}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight font-display mt-0.5">
                    Health Check-up Limits
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Reimbursement limits applicable per policy year
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
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 shadow-2xs">
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

      {/* Video Modal Lightbox */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        videoTitle={videoModal.title}
        videoUrl={videoModal.url}
      />
    </div>
  );
}
