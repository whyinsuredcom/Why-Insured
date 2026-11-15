import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiSearch,
  FiX,
  FiBookmark,
  FiClock,
  FiPlay,
  FiFileText,
  FiBookOpen,
  FiArrowRight,
  FiShield
} from 'react-icons/fi';
import { ACADEMY_VIDEOS, ACADEMY_ARTICLES, ACADEMY_DICTIONARY } from '../../data/academyData';

export default function AcademyNavbar({ onToggleSidebar, isSidebarCollapsed }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Search results across videos, articles, and dictionary
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedVideos = ACADEMY_VIDEOS.filter(
      (v) =>
        (v.title || '').toLowerCase().includes(q) ||
        (v.topic || '').toLowerCase().includes(q) ||
        (v.category || '').toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedArticles = ACADEMY_ARTICLES.filter(
      (a) =>
        (a.title || '').toLowerCase().includes(q) ||
        (a.category || '').toLowerCase().includes(q) ||
        (a.excerpt || '').toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedTerms = ACADEMY_DICTIONARY.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    ).slice(0, 2);

    const total = matchedVideos.length + matchedArticles.length + matchedTerms.length;
    return { videos: matchedVideos, articles: matchedArticles, terms: matchedTerms, total };
  }, [searchQuery]);

  // Handle outside click to close search suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchDropdownOpen(false);
    navigate(`/insurance-academy/videos?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-16 transition-all select-none">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-3 max-w-[1920px] mx-auto">
        
        {/* ===================================================================
            LEFT: SIDEBAR TOGGLE & WHYINSURED ACADEMY BRANDING
        =================================================================== */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
          >
            <FiMenu className="text-xl" />
          </button>

          <Link
            to="/insurance-academy"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A86B] to-[#0FA26E] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FiShield className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold text-[#102A43] font-display tracking-tight leading-none group-hover:text-[#00A86B] transition-colors">
                WHYINSURED
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 leading-none mt-0.5">
                Academy
              </span>
            </div>
          </Link>
        </div>

        {/* ===================================================================
            CENTER: YOUTUBE-STYLE EXPANDED SEARCH BAR & INSTANT DROPDOWN
        =================================================================== */}
        <div ref={searchContainerRef} className="flex-1 max-w-2xl relative mx-2 sm:mx-4">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchQuery.trim().length >= 2) setSearchDropdownOpen(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchDropdownOpen(true);
                }}
                placeholder="Search insurance videos, topics, guides, terms..."
                className={`w-full py-2 pl-4 pr-10 rounded-l-full bg-slate-50 border text-xs sm:text-sm text-[#17212B] placeholder-slate-400 focus:outline-none transition-all ${
                  isSearchFocused
                    ? 'border-[#00A86B] bg-white ring-2 ring-[#00A86B]/15'
                    : 'border-slate-300/80 hover:border-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchDropdownOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                >
                  <FiX className="text-xs sm:text-sm" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-4 sm:px-6 py-2 rounded-r-full bg-slate-100 hover:bg-slate-200 border-y border-r border-slate-300/80 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Search Academy"
            >
              <FiSearch className="text-sm sm:text-base" />
            </button>
          </form>

          {/* Instant Dropdown Search Results */}
          {searchDropdownOpen && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 text-left max-h-[460px] overflow-y-auto">
              {searchResults.total === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching videos or guides found for "{searchQuery}".
                </div>
              ) : (
                <div className="py-2 divide-y divide-slate-100">
                  
                  {/* Videos */}
                  {searchResults.videos.length > 0 && (
                    <div className="py-2">
                      <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Videos ({searchResults.videos.length})
                      </div>
                      {searchResults.videos.map((vid) => (
                        <Link
                          key={vid.id}
                          to={`/insurance-academy/watch/${vid.id}`}
                          onClick={() => setSearchDropdownOpen(false)}
                          className="px-4 py-2 hover:bg-slate-50 flex items-center gap-3 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FiPlay />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-[#102A43] truncate group-hover:text-emerald-700">
                              {vid.title}
                            </h4>
                            <span className="text-[10px] text-slate-400">
                              {vid.category} • {vid.duration || 'Short'}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Articles */}
                  {searchResults.articles.length > 0 && (
                    <div className="py-2">
                      <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Guides & Articles ({searchResults.articles.length})
                      </div>
                      {searchResults.articles.map((art) => (
                        <Link
                          key={art.id}
                          to={`/insurance-academy/article/${art.slug}`}
                          onClick={() => setSearchDropdownOpen(false)}
                          className="px-4 py-2 hover:bg-slate-50 flex items-center gap-3 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FiFileText />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-[#102A43] truncate group-hover:text-blue-700">
                              {art.title}
                            </h4>
                            <span className="text-[10px] text-slate-400">
                              {art.category} • {art.readingTime}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Terms */}
                  {searchResults.terms.length > 0 && (
                    <div className="py-2">
                      <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Dictionary Glossary ({searchResults.terms.length})
                      </div>
                      {searchResults.terms.map((term) => (
                        <Link
                          key={term.term}
                          to={`/insurance-academy/dictionary?q=${encodeURIComponent(term.term)}`}
                          onClick={() => setSearchDropdownOpen(false)}
                          className="px-4 py-2 hover:bg-slate-50 flex items-center gap-3 transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <FiBookOpen />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-[#102A43] truncate group-hover:text-amber-700">
                              {term.term}
                            </h4>
                            <span className="text-[10px] text-slate-400 truncate block">
                              {term.definition}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* View all results button */}
                  <div className="p-2 bg-slate-50 text-center">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View all results for "{searchQuery}"</span>
                      <FiArrowRight className="text-xs" />
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>

        {/* ===================================================================
            RIGHT: SAVED SHORTCUTS & MAIN WEBSITE RETURN
        =================================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            to="/insurance-academy/watch-later"
            className="p-2 rounded-xl text-slate-600 hover:text-[#00A86B] hover:bg-slate-100 transition-colors cursor-pointer relative"
            title="Watch Later"
          >
            <FiClock className="text-lg" />
          </Link>

          <Link
            to="/insurance-academy/saved"
            className="p-2 rounded-xl text-slate-600 hover:text-[#00A86B] hover:bg-slate-100 transition-colors cursor-pointer relative"
            title="Saved Videos & Articles"
          >
            <FiBookmark className="text-lg" />
          </Link>

          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#102A43] px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer ml-1"
          >
            <span>Main Site</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </header>
  );
}

