import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlay,
  FiClock,
  FiMoreVertical,
  FiBookmark,
  FiShare2,
  FiCheck,
  FiCheckCircle
} from 'react-icons/fi';
import {
  isWatchLater,
  toggleWatchLater,
  getWatchHistory,
  subscribeToAcademyStorage
} from '../../services/academyStorageService';

export default function AcademyVideoCard({ video, showProgress = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inWatchLater, setInWatchLater] = useState(false);
  const [copied, setCopied] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!video?.id) return;
    setInWatchLater(isWatchLater(video.id));

    // Check watch progress
    const history = getWatchHistory();
    const item = history.find((h) => h.videoId === video.id);
    if (item && item.progressPercent) {
      setWatchProgress(item.progressPercent);
    }

    const unsubscribe = subscribeToAcademyStorage(() => {
      setInWatchLater(isWatchLater(video.id));
      const updatedHistory = getWatchHistory();
      const updatedItem = updatedHistory.find((h) => h.videoId === video.id);
      if (updatedItem && updatedItem.progressPercent) {
        setWatchProgress(updatedItem.progressPercent);
      }
    });

    return unsubscribe;
  }, [video?.id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!video) return null;

  const isShort = video.type === 'short';
  const watchUrl = `/insurance-academy/watch/${video.id}`;

  const handleCardClick = (e) => {
    // If clicking menu, don't navigate
    if (e.target.closest('.menu-trigger') || e.target.closest('.menu-dropdown')) {
      return;
    }
    navigate(watchUrl);
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    const state = toggleWatchLater(video);
    setInWatchLater(state);
    setMenuOpen(false);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/insurance-academy/watch/${video.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setMenuOpen(false);
        }, 1500);
      });
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col cursor-pointer select-none text-left w-full transition-all duration-200"
    >
      {/* =====================================================================
          THUMBNAIL CONTAINER (16:9 Aspect Ratio with YouTube styling)
      ===================================================================== */}
      <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#0C1E38] via-[#102A43] to-[#0A192F] flex items-center justify-center shrink-0 shadow-2xs group-hover:shadow-md transition-shadow">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          /* Authentic WHYINSURED Video Poster Placeholder */
          <div className="w-full h-full p-3 sm:p-4 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#10b981_0%,transparent_60%)] opacity-25 pointer-events-none" />

            {/* Top Row: Category Pill */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/15">
                {video.category}
              </span>
              <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30">
                WHYINSURED
              </span>
            </div>

            {/* Center: Play Circle */}
            <div className="flex items-center justify-center my-auto z-10">
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white flex items-center justify-center group-hover:bg-emerald-600 group-hover:scale-110 group-hover:border-transparent transition-all duration-200 shadow-lg">
                <FiPlay className="text-base ml-0.5" />
              </div>
            </div>

            {/* Bottom Topic Hint */}
            <div className="z-10 truncate pr-16">
              <span className="text-[10px] font-medium text-slate-300 truncate block">
                {video.topic || 'Insurance Guide'}
              </span>
            </div>
          </div>
        )}

        {/* Duration Badge - YouTube Style in Bottom-Right Corner */}
        <div className="absolute bottom-2 right-2 z-20">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/85 text-white text-[11px] font-semibold tracking-tight shadow-xs">
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

        {/* Watch Progress Red Line (if partially watched) */}
        {showProgress && watchProgress > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30 z-20 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${watchProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* =====================================================================
          METADATA ROW: AVATAR, TITLE, CHANNEL, & 3-DOT MENU
      ===================================================================== */}
      <div className="pt-3 px-0.5 flex items-start gap-3 flex-1 min-w-0">
        {/* Channel / Desk Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#102A43] to-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5 border border-slate-200/60">
          WI
        </div>

        {/* Details Column */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
            {video.title}
          </h3>

          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium leading-none">
            <span className="text-slate-700 font-semibold truncate max-w-[140px] hover:text-slate-900">
              {video.instructor || 'WHYINSURED Desk'}
            </span>
            <span className="text-slate-400">•</span>
            <span>{video.views || '12K views'}</span>
            <span className="text-slate-400">•</span>
            <span>{video.uploadDate || 'Recently'}</span>
          </div>
        </div>

        {/* 3-Dot Action Menu */}
        <div ref={menuRef} className="relative shrink-0 -mr-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="menu-trigger p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Options"
            aria-label="Action options"
          >
            <FiMoreVertical className="text-base" />
          </button>

          {menuOpen && (
            <div className="menu-dropdown absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 text-xs">
              <button
                type="button"
                onClick={handleWatchLaterClick}
                className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer font-medium"
              >
                {inWatchLater ? (
                  <>
                    <FiCheck className="text-emerald-600 text-sm" />
                    <span>In Watch Later</span>
                  </>
                ) : (
                  <>
                    <FiBookmark className="text-slate-400 text-sm" />
                    <span>Save to Watch Later</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareClick}
                className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer font-medium"
              >
                {copied ? (
                  <>
                    <FiCheckCircle className="text-emerald-600 text-sm" />
                    <span className="text-emerald-700 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <FiShare2 className="text-slate-400 text-sm" />
                    <span>Share Video Link</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
