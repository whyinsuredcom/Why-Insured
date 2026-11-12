import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import AdvisorCard from '../components/advisors/AdvisorCard';
import { AdvisorCardSkeleton } from '../components/advisors/AdvisorSkeleton';
import { fetchAdvisors } from '../services/advisorService';
import { ADVISOR_CATEGORIES } from '../data/advisorsData';

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdvisors()
      .then(res => {
        if (!isMounted) return;
        if (res.success && Array.isArray(res.data)) {
          setAdvisors(res.data);
          setError(null);
        } else {
          setError('Unable to load advisors at this time.');
        }
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load advisors');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter advisors based on category and search query
  const filteredAdvisors = useMemo(() => {
    return advisors.filter(advisor => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'all' || advisor.categoryKey === selectedCategory;

      // Search Query Match
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchesName = advisor.name.toLowerCase().includes(q);
      const matchesCategoryName = advisor.category && advisor.category.toLowerCase().includes(q);
      const matchesDesc = advisor.shortDescription && advisor.shortDescription.toLowerCase().includes(q);
      const matchesExpertise =
        Array.isArray(advisor.expertise) &&
        advisor.expertise.some(e => e.toLowerCase().includes(q));

      return matchesName || matchesCategoryName || matchesDesc || matchesExpertise;
    });
  }, [advisors, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F7FAF9] pt-28 pb-24 font-sans text-[#172B3A] relative overflow-hidden">

      {/* Refined Brand Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#00A86B]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[400px] bg-[#102A43]/[0.025] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================================
            1. HERO HEADER SECTION
        ========================================================================= */}
        <header className="text-center max-w-3xl mx-auto pt-4 sm:pt-6 pb-10 space-y-3.5">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#00A86B]/20 shadow-[0_2px_8px_rgba(0,168,107,0.06)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0B6946] font-display">
              WHYINSURED ADVISOR DIRECTORY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] leading-tight font-display tracking-tight">
            Meet Our Health Insurance Advisors
          </h1>

          <p className="text-base sm:text-lg text-[#172B3A]/75 font-normal leading-relaxed max-w-2xl mx-auto">
            Find the right guidance for your health insurance needs. Explore advisors across different health insurance categories.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#627D98] text-sm">
                <FiSearch />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search advisor by name or expertise..."
                className="w-full bg-white border border-[#E4E7EB] rounded-2xl py-2.5 pl-10 pr-9 text-xs sm:text-sm font-medium text-[#172B3A] placeholder-[#627D98] focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-[#00A86B]/10 transition-all duration-200 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#627D98] hover:text-[#172B3A] cursor-pointer text-xs"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. CATEGORY FILTERS
        ========================================================================= */}
        <div className="mb-10">
          <div className="flex items-center justify-center flex-wrap gap-2 max-w-5xl mx-auto">
            {ADVISOR_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-[#627D98] hover:text-[#102A43] border border-[#E4E7EB]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            3. BALANCED RESPONSIVE GRID (ALL 8 CARDS EQUAL)
        ========================================================================= */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm">
            <p className="text-sm font-semibold text-red-700 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reload Directory
            </button>
          </div>
        ) : filteredAdvisors.length === 0 ? (
          <div className="bg-white border border-[#E4E7EB] rounded-3xl p-10 text-center max-w-md mx-auto space-y-3 shadow-2xs">
            <h3 className="text-base font-bold text-[#102A43] font-display">
              No matching advisors found
            </h3>
            <p className="text-xs text-[#627D98] leading-relaxed">
              We couldn't locate an advisor matching your search criteria. Clear your search or change category filter to see all advisors.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredAdvisors.map((advisor) => (
              <AdvisorCard
                key={advisor.id || advisor.slug}
                advisor={advisor}
              />
            ))}
          </div>
        )}

        {/* =========================================================================
            4. WHYINSURED ADVISORY VALUES FOOTER
        ========================================================================= */}
        <section className="mt-20 pt-12 border-t border-[#E4E7EB]">
          <div className="bg-white rounded-3xl border border-[#E4E7EB] p-8 sm:p-10 shadow-[0_4px_24px_rgba(16,42,67,0.03)] text-left">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA26E]">
                Independent Healthcare Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] font-display tracking-tight mt-1">
                The WHYINSURED Standard
              </h2>
              <p className="text-xs sm:text-sm text-[#172B3A]/70 font-normal leading-relaxed mt-2">
                We believe health insurance advice should be independent, accessible, and completely focused on protecting policyholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] space-y-1.5">
                <h4 className="text-sm font-bold text-[#102A43]">Objective Guidance</h4>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Advisors review policy contracts, room rent limits, and waiting period clauses without quota-driven sales recommendations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] space-y-1.5">
                <h4 className="text-sm font-bold text-[#102A43]">Specialized Categories</h4>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  From senior citizen co-pays to critical illness and portability, connect with advisors focusing on your exact requirement.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7FAF9] border border-[#E4E7EB] space-y-1.5">
                <h4 className="text-sm font-bold text-[#102A43]">Claim Support Awareness</h4>
                <p className="text-xs text-[#627D98] leading-relaxed">
                  Understand cashless network hospital protocols, pre-authorization, and documentation checklists to avoid hospital bill deductions.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
