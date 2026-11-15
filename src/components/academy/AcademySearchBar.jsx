import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiX,
  FiPlay,
  FiFileText,
  FiBookOpen,
  FiArrowRight
} from 'react-icons/fi';
import { ACADEMY_VIDEOS, ACADEMY_ARTICLES, ACADEMY_DICTIONARY } from '../../data/academyData';

export default function AcademySearchBar({ className = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Filter videos, articles, and topics/glossary based on query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedVideos = ACADEMY_VIDEOS.filter(
      (v) =>
        (v?.title || '').toLowerCase().includes(q) ||
        (v?.topic || '').toLowerCase().includes(q) ||
        (v?.category || '').toLowerCase().includes(q) ||
        (v?.description || '').toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedArticles = ACADEMY_ARTICLES.filter(
      (a) =>
        (a?.title || '').toLowerCase().includes(q) ||
        (a?.category || '').toLowerCase().includes(q) ||
        (a?.excerpt || '').toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedTerms = ACADEMY_DICTIONARY.filter(
      (t) =>
        (t?.term || '').toLowerCase().includes(q) ||
        (t?.definition || '').toLowerCase().includes(q)
    ).slice(0, 2);

    const total = matchedVideos.length + matchedArticles.length + matchedTerms.length;
    return { videos: matchedVideos, articles: matchedArticles, terms: matchedTerms, total };
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setDropdownOpen(false);
    navigate(`/insurance-academy/videos?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div ref={searchContainerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none flex items-center">
          <FiSearch className={isFocused ? 'text-[#00A86B]' : 'text-slate-400'} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.trim().length >= 2) setDropdownOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true);
          }}
          placeholder="Search Academy videos, articles, topics and guides..."
          className={`w-full h-11 sm:h-12 pl-11 pr-24 sm:pr-28 rounded-2xl bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:outline-none ${
            isFocused
              ? 'border-[#00A86B] ring-2 ring-[#00A86B]/20 shadow-sm'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDropdownOpen(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear search"
            >
              <FiX className="text-sm" />
            </button>
          )}
          <button
            type="submit"
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#00A86B] hover:bg-[#008f5b] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Autocomplete / Instant Suggestions Dropdown */}
      {dropdownOpen && searchResults && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden z-50 text-left max-h-[420px] overflow-y-auto">
          {searchResults.total === 0 ? (
            <div className="p-5 text-center text-xs sm:text-sm text-slate-500">
              No matching lessons found for "<span className="font-semibold text-slate-700">{searchQuery}</span>".
            </div>
          ) : (
            <div className="py-2 divide-y divide-slate-100">
              {/* Videos */}
              {searchResults.videos.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Videos</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                      {searchResults.videos.length} found
                    </span>
                  </div>
                  {searchResults.videos.map((vid) => (
                    <Link
                      key={vid.id}
                      to={`/insurance-academy/watch/${vid.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-50/80 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-[#00A86B] group-hover:text-white transition-colors">
                        <FiPlay className="text-xs" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#102A43] truncate group-hover:text-[#00A86B] transition-colors">
                          {vid.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {vid.category} • {vid.duration || 'Video'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Articles & Guides */}
              {searchResults.articles.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Articles & Guides</span>
                    <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-full">
                      {searchResults.articles.length} found
                    </span>
                  </div>
                  {searchResults.articles.map((art) => (
                    <Link
                      key={art.id}
                      to={`/insurance-academy/article/${art.slug}`}
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-50/80 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FiFileText className="text-xs" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#102A43] truncate group-hover:text-blue-600 transition-colors">
                          {art.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {art.category} • {art.readingTime || 'Guide'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Glossary / Terms */}
              {searchResults.terms.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Glossary Terms
                  </div>
                  {searchResults.terms.map((term) => (
                    <Link
                      key={term.term}
                      to={`/insurance-academy/dictionary?q=${encodeURIComponent(term.term)}`}
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-50/80 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <FiBookOpen className="text-xs" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#102A43] truncate group-hover:text-amber-600 transition-colors">
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
              <div className="p-2.5 bg-slate-50/90 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-bold text-[#00A86B] hover:text-[#008f5b] inline-flex items-center gap-1.5 cursor-pointer py-1"
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
  );
}
