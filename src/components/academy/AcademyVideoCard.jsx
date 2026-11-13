import React, { useState } from 'react';
import { FiPlay, FiClock, FiCheck, FiInfo, FiX, FiExternalLink } from 'react-icons/fi';
import { SiYoutube } from 'react-icons/si';

/**
 * YouTube-style Academy Video Card
 * - Supports long videos and short videos
 * - Compact, rounded card with subtle borders
 * - Includes thumbnail, video title, and duration badge
 * - Ready for embedding YouTube videos later without inventing fake links or dummy video embeds
 */
export default function AcademyVideoCard({ video }) {
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  if (!video) return null;

  const isShort = video.type === 'short';
  const hasYoutube = Boolean(video.youtubeId);

  const handleClick = (e) => {
    e.preventDefault();
    if (hasYoutube) {
      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank', 'noopener,noreferrer');
    } else {
      setShowNoticeModal(true);
    }
  };

  return (
    <>
      <article
        onClick={handleClick}
        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#00A86B]/60 shadow-[0_2px_8px_rgba(16,42,67,0.04)] hover:shadow-[0_8px_20px_rgba(16,42,67,0.08)] transition-all duration-200 flex flex-col justify-between overflow-hidden text-left cursor-pointer select-none h-full"
      >
        <div>
          {/* =========================================================================
              THUMBNAIL CONTAINER (YouTube 16:9 Aspect Ratio)
          ========================================================================= */}
          <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#102A43] via-[#163654] to-[#0A192F] border-b border-slate-100 flex items-center justify-center">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              /* Clean, Authentic WHYINSURED Video Poster Placeholder (No dummy stock photos) */
              <div className="w-full h-full p-3.5 flex flex-col justify-between relative">
                {/* Subtle Radial Mesh Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#00A86B_0%,transparent_60%)] opacity-20 pointer-events-none" />

                {/* Top Row: Category Tag & Format Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold text-white bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded border border-white/15 tracking-wide">
                    {video.category}
                  </span>

                  {isShort ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-white bg-red-600 px-1.5 py-0.5 rounded shadow-xs tracking-wider">
                      <span className="text-[9px]">▶</span>
                      <span>Shorts</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      Academy
                    </span>
                  )}
                </div>

                {/* Center: Play Button */}
                <div className="flex items-center justify-center my-auto z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center group-hover:bg-[#00A86B] group-hover:scale-110 group-hover:border-transparent transition-all duration-200 shadow-md">
                    <FiPlay className="text-sm sm:text-base ml-0.5" />
                  </div>
                </div>

                {/* Topic Hint on Bottom Left */}
                <div className="z-10 truncate pr-16">
                  <span className="text-[10px] font-medium text-slate-300 truncate block">
                    {video.topic}
                  </span>
                </div>
              </div>
            )}

            {/* Duration Badge - YouTube Style in Bottom-Right Corner */}
            <div className="absolute bottom-2 right-2 z-20">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/85 text-white text-[11px] font-semibold tracking-tight shadow-xs">
                {isShort ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>{video.duration || 'Short'}</span>
                  </>
                ) : (
                  <>
                    <FiClock className="text-[10px] text-slate-300" />
                    <span>{video.duration || 'Upcoming'}</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* =========================================================================
              VIDEO INFORMATION AREA
          ========================================================================= */}
          <div className="p-3.5 space-y-2">
            {/* Title */}
            <h3 className="text-xs sm:text-sm font-bold text-[#102A43] group-hover:text-[#00A86B] transition-colors line-clamp-2 leading-snug">
              {video.title}
            </h3>

            {/* Description (Brief) */}
            {video.description && (
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            )}
          </div>
        </div>

        {/* =========================================================================
            CARD FOOTER: Category & Video Format Pill
        ========================================================================= */}
        <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
          <span className="font-medium text-slate-500">
            {video.category}
          </span>

          <span className="inline-flex items-center gap-1 text-slate-600 font-semibold group-hover:text-[#00A86B] transition-colors">
            {hasYoutube ? (
              <>
                <SiYoutube className="text-red-600 text-xs" />
                <span>Watch Video</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
                <span>{isShort ? 'Short Video' : 'Full Guide'}</span>
              </>
            )}
          </span>
        </div>
      </article>

      {/* =========================================================================
          INFO MODAL: Ready for adding YouTube videos later without dummy embeds
      ========================================================================= */}
      {showNoticeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs"
          onClick={() => setShowNoticeModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-xl space-y-3.5 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNoticeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FiX className="text-sm" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A86B] border border-emerald-100 flex items-center justify-center shrink-0">
                <FiInfo className="text-lg" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#102A43]">
                  WHYINSURED Insurance Academy
                </h4>
                <span className="text-[10px] text-slate-400">
                  {video.category} • {isShort ? 'Short Video' : 'Video Guide'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              <h5 className="text-xs font-bold text-[#102A43]">
                {video.title}
              </h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {video.description}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              This learning video is currently in production for the WHYINSURED official YouTube channel. The player will be linked here once published.
            </p>

            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                className="px-4 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

