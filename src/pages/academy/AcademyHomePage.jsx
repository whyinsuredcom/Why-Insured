import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlay,
  FiZap,
  FiArrowRight,
  FiTrendingUp,
  FiRotateCcw,
  FiHelpCircle,
  FiBookOpen,
  FiShield,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import AcademyVideoCard from '../../components/academy/AcademyVideoCard';
import AcademyShortCard from '../../components/academy/AcademyShortCard';
import {
  ACADEMY_CATEGORIES,
  ACADEMY_VIDEOS,
  ACADEMY_ARTICLES,
  ACADEMY_MYTHS,
  POLICY_EXPLAINED_TOPICS,
  CLAIM_ACADEMY_GUIDES
} from '../../data/academyData';
import {
  fetchAcademyCategories,
  fetchAcademyVideos,
  fetchAcademyArticles
} from '../../services/academyService';
import {
  getWatchHistory,
  clearWatchHistory,
  subscribeToAcademyStorage
} from '../../services/academyStorageService';

export default function AcademyHomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [watchHistory, setWatchHistory] = useState([]);
  const [categories, setCategories] = useState(ACADEMY_CATEGORIES);
  const [videos, setVideos] = useState(ACADEMY_VIDEOS);
  const [articles, setArticles] = useState(ACADEMY_ARTICLES);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    setWatchHistory(getWatchHistory());
    const unsubscribe = subscribeToAcademyStorage(() => {
      setWatchHistory(getWatchHistory());
    });
    return unsubscribe;
  }, []);

  // Gracefully fetch live data from backend API with automatic fallback to static academy dataset
  useEffect(() => {
    let isMounted = true;
    async function loadContent() {
      try {
        const [catsRes, vidsRes, artsRes] = await Promise.allSettled([
          fetchAcademyCategories(),
          fetchAcademyVideos(),
          fetchAcademyArticles()
        ]);

        if (!isMounted) return;

        if (catsRes.status === 'fulfilled' && catsRes.value?.success && Array.isArray(catsRes.value.data) && catsRes.value.data.length > 0) {
          setCategories(catsRes.value.data);
        }
        if (vidsRes.status === 'fulfilled' && vidsRes.value?.success && Array.isArray(vidsRes.value.data) && vidsRes.value.data.length > 0) {
          setVideos(vidsRes.value.data);
        }
        if (artsRes.status === 'fulfilled' && artsRes.value?.success && Array.isArray(artsRes.value.data) && artsRes.value.data.length > 0) {
          setArticles(artsRes.value.data);
        }
      } catch (err) {
        console.warn('[AcademyHomePage] Failed to fetch live content, using static dataset fallback:', err);
        if (isMounted) {
          setDataError('Using offline educational content. Full features remain available.');
        }
      }
    }

    loadContent();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered Long Videos based on Category
  const filteredVideos = useMemo(() => {
    const sourceList = Array.isArray(videos) && videos.length > 0 ? videos : ACADEMY_VIDEOS;
    let list = sourceList.filter((v) => v?.type === 'long');
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((v) => v?.category && v.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    return list;
  }, [videos, selectedCategory]);

  // Short 9:16 Videos
  const shortVideos = useMemo(() => {
    const sourceList = Array.isArray(videos) && videos.length > 0 ? videos : ACADEMY_VIDEOS;
    return sourceList.filter((v) => v?.type === 'short');
  }, [videos]);

  // Trending Videos (Sorted by viewsCount descending)
  const trendingVideos = useMemo(() => {
    const sourceList = Array.isArray(videos) && videos.length > 0 ? videos : ACADEMY_VIDEOS;
    return [...sourceList]
      .filter((v) => v?.type === 'long')
      .sort((a, b) => (b?.viewsCount || 0) - (a?.viewsCount || 0))
      .slice(0, 4);
  }, [videos]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Optional offline notice */}
      {dataError && (
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between">
          <span>{dataError}</span>
          <button
            type="button"
            onClick={() => setDataError(null)}
            className="text-amber-700 hover:text-amber-900 font-bold ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =====================================================================
          1. CATEGORY NAVIGATION CHIPS (EXPLORE TOPICS)
      ===================================================================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
            Explore Topics
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Filter lessons by insurance domain
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {(Array.isArray(categories) && categories.length > 0 ? categories : ACADEMY_CATEGORIES).map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 cursor-pointer select-none border ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                    : 'border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500/40 hover:shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          F. CONTINUE LEARNING (SHOWS IF USER HAS WATCH HISTORY)
      ===================================================================== */}
      {watchHistory.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiRotateCcw className="text-emerald-600 text-lg" />
              <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
                Continue Learning
              </h2>
            </div>
            <button
              type="button"
              onClick={clearWatchHistory}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchHistory.slice(0, 4).map((item) => {
              const fullVideo = ACADEMY_VIDEOS.find((v) => v.id === item.videoId);
              const targetVideo = fullVideo || {
                id: item.videoId,
                title: item.title,
                category: item.category,
                duration: `${Math.round(item.duration / 60)}m`
              };
              return (
                <AcademyVideoCard
                  key={item.videoId}
                  video={targetVideo}
                  showProgress={true}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          D. SHORT VIDEOS SECTION (HORIZONTAL SCROLLING VERTICAL 9:16 CARDS)
      ===================================================================== */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
              <FiZap />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
              Insurance Shorts
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              • 60-second quick answers
            </span>
          </div>

          <Link
            to="/insurance-academy/shorts"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Shorts</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Scrollable Horizontal Shorts Row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar">
          {shortVideos.map((video) => (
            <AcademyShortCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          C. RECOMMENDED VIDEOS GRID (RESPONSIVE 4/3/2/1 COLUMN GRID)
      ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
              Recommended Educational Lessons
            </h2>
            <p className="text-xs text-slate-500">
              In-depth video tutorials covering hospital network policies, waiting periods, and deductions.
            </p>
          </div>

          <Link
            to="/insurance-academy/videos"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Browse Library</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredVideos.map((video) => (
              <AcademyVideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500">
              No videos found in "{selectedCategory}".
            </p>
          </div>
        )}
      </section>

      {/* =====================================================================
          E. TRENDING INSURANCE VIDEOS (LONG VIDEOS)
      ===================================================================== */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <FiTrendingUp />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
              Trending Educational Lessons
            </h2>
          </div>

          <Link
            to="/insurance-academy/videos"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Long Videos</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trendingVideos.map((video) => (
            <AcademyVideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          POLICY EXPLAINED SECTION (DECODE THE FINE PRINT)
      ===================================================================== */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
              <FiFileText />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
                Policy Explained
              </h2>
              <p className="text-xs text-slate-500">
                Understand restrictive clauses, room rent sub-limits, waiting periods, and restoration triggers.
              </p>
            </div>
          </div>

          <Link
            to="/insurance-academy/policy-explained"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Explore All Clauses</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(POLICY_EXPLAINED_TOPICS || []).slice(0, 3).map((topic) => (
            <Link
              key={topic.id}
              to="/insurance-academy/policy-explained"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer text-left group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {topic.badge}
                  </span>
                  <FiArrowRight className="text-xs text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-bold text-[#102A43] group-hover:text-emerald-700 transition-colors leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
                <FiCheckCircle className="text-emerald-500 text-xs shrink-0" />
                <span className="truncate">{topic.keyPoints?.[0] || 'Understand policy wording'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CLAIM ACADEMY SECTION (STEP-BY-STEP SETTLEMENT GUIDANCE)
      ===================================================================== */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
              <FiShield />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
                Claim Academy
              </h2>
              <p className="text-xs text-slate-500">
                Step-by-step guidance for cashless pre-auth, reimbursement claims, and grievance escalation.
              </p>
            </div>
          </div>

          <Link
            to="/insurance-academy/claim-academy"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View Claim Guides</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(CLAIM_ACADEMY_GUIDES || []).slice(0, 3).map((guide) => (
            <Link
              key={guide.id}
              to="/insurance-academy/claim-academy"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer text-left group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  {guide.category}
                </span>
                <h3 className="text-sm font-bold text-[#102A43] group-hover:text-emerald-700 transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>{guide.steps?.length || 4} Sequential Steps</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          G. LATEST INSURANCE GUIDES & EDITORIAL ARTICLES
      ===================================================================== */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiBookOpen className="text-emerald-600 text-lg" />
            <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
              Latest Insurance Guides
            </h2>
          </div>

          <Link
            to="/insurance-academy/guides"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Guides</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {(Array.isArray(articles) && articles.length > 0 ? articles : ACADEMY_ARTICLES).slice(0, 3).map((article) => (
            <Link
              key={article.id}
              to={`/insurance-academy/article/${article.slug}`}
              className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left space-y-3 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-emerald-700 font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span>{article.readingTime}</span>
                </div>

                <h3 className="text-sm font-bold text-[#102A43] group-hover:text-emerald-700 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Read Full Article</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          H. INSURANCE MYTHS VS FACTS
      ===================================================================== */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiHelpCircle className="text-amber-500 text-lg" />
            <h2 className="text-base sm:text-lg font-bold text-[#102A43] font-display">
              Insurance Myths vs. Facts
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Common misconceptions debunked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACADEMY_MYTHS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 text-left shadow-2xs"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full inline-block">
                  Myth
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 italic">
                  "{item.myth}"
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
                  Fact
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
