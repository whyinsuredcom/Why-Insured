import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX, FiVideo } from 'react-icons/fi';
import AcademyVideoCard from '../../components/academy/AcademyVideoCard';
import { ACADEMY_CATEGORIES, ACADEMY_VIDEOS } from '../../data/academyData';

export default function AcademyVideosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'latest'

  const filteredVideos = useMemo(() => {
    let list = ACADEMY_VIDEOS.filter((v) => v.type === 'long');

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((v) => {
        const matchTitle = (v.title || '').toLowerCase().includes(q);
        const matchTopic = (v.topic || '').toLowerCase().includes(q);
        const matchDesc = (v.description || '').toLowerCase().includes(q);
        const matchCat = (v.category || '').toLowerCase().includes(q);
        const matchTag = Array.isArray(v.tags) && v.tags.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchTopic || matchDesc || matchCat || matchTag;
      });
    }

    if (sortBy === 'popular') {
      list = [...list].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
              <FiVideo />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
              Educational Video Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse comprehensive lessons decoding policy wording, network hospital procedures, and claim defense.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs"
          >
            <option value="popular">Most Popular</option>
            <option value="latest">Latest Uploads</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3.5">
        <div className="relative w-full sm:max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, topic, or policy keyword..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
            >
              <FiX className="text-xs" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {ACADEMY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer select-none border ${
                  isActive
                    ? 'border-[#102A43] bg-[#102A43] text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
          {filteredVideos.map((video) => (
            <AcademyVideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto my-8 space-y-3 shadow-2xs">
          <h3 className="text-sm font-bold text-[#102A43]">
            No videos found
          </h3>
          <p className="text-xs text-slate-500">
            {searchQuery
              ? `No videos match "${searchQuery}" in ${selectedCategory}.`
              : `No educational videos available in ${selectedCategory} right now.`}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Show All Videos
          </button>
        </div>
      )}

    </div>
  );
}

