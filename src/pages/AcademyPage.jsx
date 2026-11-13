import React, { useState, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import AcademyVideoCard from '../components/academy/AcademyVideoCard';
import { ACADEMY_CATEGORIES, ACADEMY_VIDEOS } from '../data/academyVideosData';

/**
 * WHYINSURED – Insurance Academy
 * Simple, clean and modern YouTube-style layout
 * 
 * 1. Page Heading & Subtitle
 * 2. Search bar for title or topic
 * 3. Compact Category Tabs: All Videos, Claims, Documents, Experience, Policy Basics
 * 4. Video Grid: Desktop 4/row, Tablet 2/row, Mobile 1/row
 */
export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Videos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter videos by category and search query (title or topic)
  const filteredVideos = useMemo(() => {
    let list = ACADEMY_VIDEOS;

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All Videos') {
      list = list.filter((v) => v.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((v) => {
        const matchTitle = (v.title || '').toLowerCase().includes(q);
        const matchTopic = (v.topic || '').toLowerCase().includes(q);
        const matchDesc = (v.description || '').toLowerCase().includes(q);
        const matchCat = (v.category || '').toLowerCase().includes(q);
        return matchTitle || matchTopic || matchDesc || matchCat;
      });
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-16 font-sans text-[#172B3A] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. PAGE HEADING
        ========================================================================= */}
        <header className="mb-5 sm:mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#102A43] font-display tracking-tight">
            Insurance Academy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Learn, Understand and Make Better Insurance Decisions.
          </p>
        </header>

        {/* =========================================================================
            2. SEARCH & COMPACT CATEGORY CONTROLS
        ========================================================================= */}
        <div className="space-y-3.5 mb-6">
          
          {/* Simple Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by title or topic..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
                title="Clear search"
              >
                <FiX className="text-xs" />
              </button>
            )}
          </div>

          {/* Category Tabs: Simple and Compact */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            {ACADEMY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#102A43] text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/90'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            3. VIDEO LISTING (4 Desktop, 2 Tablet, 1 Mobile)
        ========================================================================= */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredVideos.map((video) => (
              <AcademyVideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          /* Empty / No Results State */
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center max-w-md mx-auto my-8 space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-[#102A43]">
              No videos found
            </h3>
            <p className="text-xs text-slate-500">
              {searchQuery
                ? `No videos match "${searchQuery}" in ${selectedCategory}.`
                : `No videos are available in ${selectedCategory} right now.`}
            </p>
            {(searchQuery || selectedCategory !== 'All Videos') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Videos');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Show All Videos
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
