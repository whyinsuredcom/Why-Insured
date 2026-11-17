import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiHeart,
  FiBookmark,
  FiShare2,
  FiCheck,
  FiCheckCircle,
  FiArrowRight,
  FiPlay
} from 'react-icons/fi';
import AcademyVideoPlayer from '../../components/academy/AcademyVideoPlayer';
import { ACADEMY_VIDEOS, ACADEMY_ARTICLES } from '../../data/academyData';
import {
  isVideoLiked,
  toggleLikeVideo,
  isWatchLater,
  toggleWatchLater
} from '../../services/academyStorageService';

export default function AcademyWatchPage() {
  const { videoId } = useParams();
  const [copied, setCopied] = useState(false);

  // Find target video
  const video = useMemo(() => {
    if (!videoId) return (Array.isArray(ACADEMY_VIDEOS) && ACADEMY_VIDEOS[0]) || null;
    const cleanId = String(videoId).toLowerCase();
    return (
      (Array.isArray(ACADEMY_VIDEOS) &&
        ACADEMY_VIDEOS.find(
          (v) => (v?.id && v.id.toLowerCase() === cleanId) || (v?.slug && v.slug.toLowerCase() === cleanId)
        )) ||
      (Array.isArray(ACADEMY_VIDEOS) && ACADEMY_VIDEOS[0]) ||
      null
    );
  }, [videoId]);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!video?.id) return;
    try {
      setIsLiked(isVideoLiked(video.id));
      setIsSaved(isWatchLater(video.id));
    } catch (err) {
      console.warn('[AcademyWatchPage] Error reading storage status:', err);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [video?.id]);

  // Recommended queue (excluding current video)
  const relatedVideos = useMemo(() => {
    if (!Array.isArray(ACADEMY_VIDEOS)) return [];
    return ACADEMY_VIDEOS.filter((v) => v?.id !== video?.id).slice(0, 6);
  }, [video?.id]);

  // Related articles
  const relatedArticle = useMemo(() => {
    if (!Array.isArray(ACADEMY_ARTICLES) || ACADEMY_ARTICLES.length === 0) return null;
    return (
      ACADEMY_ARTICLES.find(
        (a) => (video?.id && a?.relatedVideoId === video.id) || (video?.category && a?.category === video.category)
      ) || ACADEMY_ARTICLES[0] || null
    );
  }, [video?.id, video?.category]);

  const handleLike = () => {
    if (!video?.id) return;
    try {
      const next = toggleLikeVideo(video.id);
      setIsLiked(next);
    } catch (err) {
      console.warn('[AcademyWatchPage] Error toggling like:', err);
    }
  };

  const handleSave = () => {
    if (!video?.id) return;
    try {
      const next = toggleWatchLater(video);
      setIsSaved(next);
    } catch (err) {
      console.warn('[AcademyWatchPage] Error toggling save:', err);
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.warn('[AcademyWatchPage] Clipboard write failed:', err);
      });
    }
  };

  if (!video) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-[#102A43]">Video Not Found</h2>
        <Link to="/insurance-academy" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2 inline-block">
          Return to Academy Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1720px] mx-auto pb-16 text-left select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ===================================================================
            LEFT / MAIN COLUMN (8 cols): PLAYER, TITLE, ACTIONS, DESCRIPTION
        =================================================================== */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 1. Responsive Video Player */}
          <AcademyVideoPlayer video={video} />

          {/* 2. Video Title */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {video.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Topic: {video.topic}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-extrabold text-[#102A43] font-display leading-snug">
              {video.title}
            </h1>
          </div>

          {/* 3. Channel Info & Action Buttons Row (YouTube Style) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
            {/* Channel Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#102A43] to-[#1A3A5E] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                WI
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-1.5">
                  <span>{video.instructor || 'WHYINSURED Advisory Specialists'}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full font-semibold border border-emerald-200/60">
                    Verified
                  </span>
                </h3>
                <span className="text-xs text-slate-500">
                  {video.category} • Insurance Education
                </span>
              </div>
            </div>

            {/* Actions: Like, Watch Later, Share (YouTube Pill Buttons) */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleLike}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <FiHeart className={`text-sm ${isLiked ? 'fill-red-600' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isSaved
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isSaved ? (
                  <>
                    <FiCheck className="text-sm text-emerald-600" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <FiBookmark className="text-sm" />
                    <span>Watch Later</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <FiCheckCircle className="text-sm text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiShare2 className="text-sm" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. Expandable Description Box (YouTube Rounded Gray Container) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span>{video.views || '15K views'}</span>
              <span>•</span>
              <span>{video.uploadDate || 'Recently published'}</span>
              <span>•</span>
              <span className="text-slate-500 font-medium">Duration: {video.duration || 'Full lesson'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {video.description}
            </p>

            {/* Chapters / Timestamps */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Chapters / Timestamps:
                </span>
                <div className="space-y-1.5">
                  {video.chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 hover:text-emerald-700 cursor-pointer transition-colors"
                    >
                      <span className="font-mono text-emerald-600 font-semibold w-10">
                        {chap.time}
                      </span>
                      <span>{chap.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {video.takeaways && video.takeaways.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Policy Takeaways:
                </span>
                <ul className="space-y-1.5">
                  {video.takeaways.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <FiCheckCircle className="text-emerald-500 mt-0.5 shrink-0 text-xs" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 5. Related Educational Article Banner */}
          {relatedArticle && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Accompanying Reading Guide
                </span>
                <h4 className="text-sm font-bold text-[#102A43]">
                  {relatedArticle.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-1">
                  {relatedArticle.excerpt}
                </p>
              </div>

              <Link
                to={`/insurance-academy/article/${relatedArticle.slug}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>Read Guide</span>
                <FiArrowRight className="text-xs" />
              </Link>
            </div>
          )}

        </div>

        {/* ===================================================================
            RIGHT SIDEBAR (4 cols): RECOMMENDED VIDEOS & UP NEXT
        =================================================================== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <h3 className="text-sm font-bold text-[#102A43] font-display">
              Up Next & Related
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Autoplay on
            </span>
          </div>

          <div className="space-y-3">
            {relatedVideos.map((item) => (
              <Link
                key={item.id}
                to={`/insurance-academy/watch/${item.id}`}
                className="group flex gap-3 p-2 rounded-2xl bg-white hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
              >
                {/* 16:9 Mini Thumbnail */}
                <div className="relative w-36 aspect-video rounded-xl overflow-hidden bg-[#102A43] shrink-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs group-hover:bg-emerald-600 group-hover:scale-105 transition-all">
                    <FiPlay className="ml-0.5" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono">
                    {item.duration || 'Short'}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-[#102A43] group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {item.category} • {item.views || '12K views'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
