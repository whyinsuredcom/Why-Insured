import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FiChevronUp,
  FiChevronDown,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiCheck,
  FiPlay,
  FiZap,
  FiArrowLeft
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

  useEffect(() => {
    if (!currentShort) return;
    setIsLiked(isVideoLiked(currentShort.id));
    setIsSaved(isWatchLater(currentShort.id));
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

  if (!currentShort) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-600">No Shorts videos available right now.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 select-none">
      
      {/* Top Header Row with Topic Pills */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link
            to="/insurance-academy"
            className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-600 transition-colors"
            title="Back to Academy"
          >
            <FiArrowLeft className="text-lg" />
          </Link>
          <span className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
            <FiZap />
          </span>
          <h1 className="text-lg font-bold text-[#102A43] font-display">
            Insurance Shorts
          </h1>
          <span className="text-xs text-slate-400 font-medium">
            ({currentIndex + 1} of {allShorts.length})
          </span>
        </div>

        {/* Quick Topic Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {allShorts.map((short, idx) => (
            <button
              key={short.id}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setSearchParams({ id: short.id });
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {short.topic || `Short ${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Shorts Container: Player (9:16) + Floating Right Action Sidebar */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[620px]">
        
        {/* 9:16 Vertical Video Screen */}
        <div className="relative w-full max-w-[360px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0C1E38] via-[#102A43] to-[#0A192F] shadow-2xl border border-slate-800 flex flex-col justify-between p-5 text-white">
          
          {/* Subtle Accent Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#EF4444_0%,transparent_60%)] opacity-25 pointer-events-none" />

          {/* Top Bar inside Player */}
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-white bg-red-600 px-2 py-0.5 rounded-full shadow-xs tracking-wider">
              <FiZap className="text-[10px]" />
              <span>Shorts</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/50 text-slate-200 backdrop-blur-xs font-mono">
              {currentShort.duration || '0:50'}
            </span>
          </div>

          {/* Center Play Graphic */}
          <div className="my-auto text-center space-y-4 z-10 px-2">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform cursor-pointer">
              <FiPlay className="text-2xl ml-1" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                {currentShort.category}
              </span>
              <h2 className="text-base sm:text-lg font-bold font-display text-white leading-snug">
                {currentShort.title}
              </h2>
            </div>
          </div>

          {/* Bottom Card Information */}
          <div className="space-y-2 z-10 pt-3 border-t border-white/10 text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                WI
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-none">
                  WHYINSURED Shorts
                </span>
                <span className="text-[10px] text-slate-400">
                  {currentShort.views || '35K views'} • Verified Guidance
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
              {currentShort.description}
            </p>
          </div>

        </div>

        {/* Right Floating Actions (Like, Save, Share, Up, Down) */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          
          {/* Previous Short Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#00A86B] hover:border-[#00A86B] disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
            title="Previous Short (Up Arrow)"
          >
            <FiChevronUp className="text-xl" />
          </button>

          {/* Like Button */}
          <button
            type="button"
            onClick={handleLike}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isLiked
                ? 'bg-red-50 border border-red-200 text-red-600'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:bg-slate-50'
            }`}
            title="Like this short"
          >
            <FiHeart className={`text-xl ${isLiked ? 'fill-red-600' : ''}`} />
            <span className="text-[10px] font-bold">
              {isLiked ? 'Liked' : 'Like'}
            </span>
          </button>

          {/* Save to Watch Later */}
          <button
            type="button"
            onClick={handleSave}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all cursor-pointer shadow-md ${
              isSaved
                ? 'bg-emerald-50 border border-emerald-200 text-[#00A86B]'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-[#00A86B] hover:bg-slate-50'
            }`}
            title="Save for Later"
          >
            <FiBookmark className={`text-xl ${isSaved ? 'fill-[#00A86B]' : ''}`} />
            <span className="text-[10px] font-bold">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex flex-col items-center gap-1 p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#00A86B] hover:bg-slate-50 shadow-md transition-all cursor-pointer"
            title="Share Short Link"
          >
            {copied ? (
              <FiCheck className="text-xl text-emerald-600" />
            ) : (
              <FiShare2 className="text-xl" />
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
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#00A86B] hover:border-[#00A86B] disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
            title="Next Short (Down Arrow)"
          >
            <FiChevronDown className="text-xl" />
          </button>

        </div>

      </div>

    </div>
  );
}
