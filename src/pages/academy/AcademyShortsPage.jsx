import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FiChevronUp,
  FiChevronDown,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiCheck,
  FiPlay,
  FiPause,
  FiZap,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';
import { ACADEMY_VIDEOS } from '../../data/academyData';
import {
  isVideoLiked,
  toggleLikeVideo,
  isWatchLater,
  toggleWatchLater
} from '../../services/academyStorageService';

export default function AcademyShortsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allShorts = ACADEMY_VIDEOS.filter((v) => v.type === 'short');

  const paramId = searchParams.get('id');
  const initialIndex = allShorts.findIndex((s) => s.id === paramId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const currentShort = allShorts[currentIndex] || allShorts[0];

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const lastWheelTime = useRef(0);

  // Sync like and saved states when current short changes
  useEffect(() => {
    if (!currentShort) return;
    setIsLiked(isVideoLiked(currentShort.id));
    setIsSaved(isWatchLater(currentShort.id));
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentShort]);

  const handleNext = useCallback(() => {
    if (currentIndex < allShorts.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSearchParams({ id: allShorts[nextIdx].id });
    }
  }, [currentIndex, allShorts, setSearchParams]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSearchParams({ id: allShorts[prevIdx].id });
    }
  }, [currentIndex, allShorts, setSearchParams]);

  // Keyboard navigation (ArrowUp, ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse wheel navigation with debounce
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 500) return;
    if (e.deltaY > 35) {
      lastWheelTime.current = now;
      handleNext();
    } else if (e.deltaY < -35) {
      lastWheelTime.current = now;
      handlePrev();
    }
  };

  // Touch swipe navigation for mobile
  const handleTouchStart = (e) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    const distance = touchStartY.current - touchEndY.current;
    if (distance > 50) {
      // Swiped UP -> Next Short
      handleNext();
    } else if (distance < -50) {
      // Swiped DOWN -> Prev Short
      handlePrev();
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  const handleLike = () => {
    if (!currentShort) return;
    const next = toggleLikeVideo(currentShort.id);
    setIsLiked(next);
  };

  const handleSave = () => {
    if (!currentShort) return;
    const next = toggleWatchLater(currentShort);
    setIsSaved(next);
  };

  const handleShare = () => {
    if (!currentShort) return;
    const url = `${window.location.origin}/insurance-academy/shorts?id=${currentShort.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  if (!currentShort) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-600">No Shorts videos available right now.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 select-none">
      
      {/* ===================================================================
          1. TOP HEADER ROW WITH TOPIC PILLS (ACADEMY THEME)
      =================================================================== */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Link
            to="/insurance-academy"
            className="p-1.5 rounded-xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            title="Back to Academy"
          >
            <FiArrowLeft className="text-lg" />
          </Link>
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
            <FiZap />
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[#102A43] font-display">
              Insurance Shorts
            </h1>
            <span className="text-xs text-slate-400 font-medium">
              ({currentIndex + 1} of {allShorts.length})
            </span>
          </div>
        </div>

        {/* Quick Topic Chips Styled with Academy Theme */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {allShorts.map((short, idx) => (
            <button
              key={short.id}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setSearchParams({ id: short.id });
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? 'border border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-xs'
                  : 'border border-emerald-500/25 bg-emerald-50/50 text-slate-700 hover:bg-emerald-100/70 hover:text-emerald-800 hover:border-emerald-500/40'
              }`}
            >
              {short.topic || `Short ${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================
          2. MAIN SHORTS CONTAINER: 9:16 PLAYER + ACTION CONTROLS
      =================================================================== */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[580px] sm:min-h-[640px]">
        
        {/* 9:16 Vertical Video Screen */}
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0C1E38] via-[#102A43] to-[#0A192F] shadow-2xl border border-slate-800/80 flex flex-col justify-between p-4 sm:p-5 text-white select-none transition-all duration-300"
        >
          {/* Subtle Emerald Mesh Background Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#10B981_0%,transparent_60%)] opacity-25 pointer-events-none" />

          {/* Actual Video Element if videoUrl exists */}
          {currentShort.videoUrl && (
            <video
              ref={videoRef}
              src={currentShort.videoUrl}
              playsInline
              loop
              autoPlay
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer z-0"
            />
          )}

          {/* YouTube Embed if youtubeId exists */}
          {currentShort.youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${currentShort.youtubeId}?autoplay=1&rel=0&controls=0`}
              title={currentShort.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0 object-cover z-0"
            />
          )}

          {/* Top Bar inside Player */}
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 px-2.5 py-1 rounded-full shadow-xs tracking-wider border border-emerald-400/30">
              <FiZap className="text-[11px]" />
              <span>Shorts</span>
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/50 text-slate-200 border border-white/10 backdrop-blur-xs font-mono">
              {currentShort.duration || '0:50'}
            </span>
          </div>

          {/* Center Play Graphic & Topic Info */}
          <div className="my-auto text-center space-y-4 z-10 px-2">
            <button
              type="button"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl hover:scale-110 hover:shadow-emerald-500/40 transition-all border border-emerald-400/40 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying && currentShort.videoUrl ? (
                <FiPause className="text-2xl" />
              ) : (
                <FiPlay className="text-2xl ml-1" />
              )}
            </button>

            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                {currentShort.category}
              </span>
              <h2 className="text-base sm:text-lg font-bold font-display text-white leading-snug drop-shadow-md">
                {currentShort.title}
              </h2>
            </div>
          </div>

          {/* Bottom Card Information */}
          <div className="space-y-2 z-10 pt-3 border-t border-white/15 text-left bg-gradient-to-t from-black/80 via-black/40 to-transparent -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 sm:p-5 rounded-b-3xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                WI
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block leading-none truncate">
                  WHYINSURED Shorts
                </span>
                <span className="text-[10px] text-slate-300">
                  {currentShort.views || '35K views'} • Verified Guidance
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed font-normal">
              {currentShort.description}
            </p>
          </div>

        </div>

        {/* ===================================================================
            3. ACTION CONTROLS (LIKE, SAVE, SHARE, UP, DOWN)
            - Responsive: Overlaid cleanly on mobile right edge, stacked sidebar on tablet/desktop
        =================================================================== */}
        <div className="absolute right-2 sm:right-auto sm:static bottom-24 sm:bottom-auto z-20 flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Previous Short Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2.5 sm:p-3 rounded-full bg-white/95 sm:bg-white border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer active:scale-95"
            title="Previous Short (Up Arrow / Swipe Down)"
          >
            <FiChevronUp className="text-lg sm:text-xl" />
          </button>

          {/* Like Button */}
          <button
            type="button"
            onClick={handleLike}
            className={`flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-full transition-all cursor-pointer shadow-md active:scale-95 ${
              isLiked
                ? 'border border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                : 'bg-white/95 sm:bg-white border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500/40 hover:bg-emerald-50'
            }`}
            title="Like this short"
          >
            <FiHeart className={`text-lg sm:text-xl ${isLiked ? 'fill-emerald-600 text-emerald-700' : ''}`} />
            <span className="text-[10px] font-bold">
              {isLiked ? 'Liked' : 'Like'}
            </span>
          </button>

          {/* Save to Watch Later */}
          <button
            type="button"
            onClick={handleSave}
            className={`flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-full transition-all cursor-pointer shadow-md active:scale-95 ${
              isSaved
                ? 'border border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                : 'bg-white/95 sm:bg-white border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500/40 hover:bg-emerald-50'
            }`}
            title="Save for Later"
          >
            <FiBookmark className={`text-lg sm:text-xl ${isSaved ? 'fill-emerald-600 text-emerald-700' : ''}`} />
            <span className="text-[10px] font-bold">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className={`flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-full transition-all cursor-pointer shadow-md active:scale-95 ${
              copied
                ? 'border border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                : 'bg-white/95 sm:bg-white border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500/40 hover:bg-emerald-50'
            }`}
            title="Share Short Link"
          >
            {copied ? (
              <FiCheck className="text-lg sm:text-xl text-emerald-700" />
            ) : (
              <FiShare2 className="text-lg sm:text-xl" />
            )}
            <span className="text-[10px] font-bold">
              {copied ? 'Copied' : 'Share'}
            </span>
          </button>

          {/* Next Short Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === allShorts.length - 1}
            className="p-2.5 sm:p-3 rounded-full bg-white/95 sm:bg-white border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer active:scale-95"
            title="Next Short (Down Arrow / Swipe Up)"
          >
            <FiChevronDown className="text-lg sm:text-xl" />
          </button>

        </div>

      </div>

    </div>
  );
}
