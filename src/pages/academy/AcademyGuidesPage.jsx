import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiSearch, FiX, FiArrowRight, FiClock } from 'react-icons/fi';
import { ACADEMY_ARTICLES, ACADEMY_CATEGORIES } from '../../data/academyData';

export default function AcademyGuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let list = ACADEMY_ARTICLES;

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center text-xs shadow-xs">
            <FiBookOpen />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            Insurance Guides & Educational Articles
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          In-depth written guides decoding policy contracts, portability rules, and hospital admission checklists.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-3.5">
        <div className="relative w-full sm:max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by title or keyword..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] transition-all shadow-2xs"
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#102A43] text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/insurance-academy/article/${article.slug}`}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#00A86B]/60 hover:shadow-md transition-all duration-200 text-left space-y-4 cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-[#00A86B] font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-slate-300" />
                    <span>{article.readingTime}</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#102A43] group-hover:text-[#00A86B] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Read Full Article</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto my-8 space-y-3">
          <p className="text-xs text-slate-500">
            No articles match "{searchQuery}" in {selectedCategory}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
          >
            Show All Articles
          </button>
        </div>
      )}

    </div>
  );
}

