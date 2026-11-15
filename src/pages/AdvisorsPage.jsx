import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import AdvisorCard from '../components/advisors/AdvisorCard';
import { AdvisorCardSkeleton } from '../components/advisors/AdvisorSkeleton';
import AdvisorEnquiryModal from '../components/advisors/AdvisorEnquiryModal';
import { fetchAdvisors } from '../services/advisorService';
import { getAdvisorRatingSummary, subscribeToReviews } from '../services/reviewService';

/**
 * Helper to safely parse numeric years from an experience string
 * e.g. "15+ Years (Desk)" -> 15, "8+ Years" -> 8, null -> 0
 */
function parseExperienceYears(exp) {
  if (!exp) return 0;
  const match = String(exp).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Compact Google-Business Style Advisor Directory
 *
 * Design Focus:
 * - Reduced container height and spacing.
 * - Slim, compact advisor rows displaying more advisors above the fold.
 * - One clean search bar and minimal filters (All, Individual, Companies).
 * - Simple sorting by rating and experience.
 * - Subtle separators between listings.
 * - Genuine ratings and review data.
 */
export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'individual' | 'company'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'rating' | 'experience'
  const [selectedContactAdvisor, setSelectedContactAdvisor] = useState(null);
  const [, setReviewRevision] = useState(0);

  // Fetch advisors from API with fallback to static dataset
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdvisors()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setAdvisors(res.data);
          setError(null);
        } else {
          setError('Unable to load advisors at this time.');
        }
      })
      .catch((err) => {
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

  // Listen to review updates so rating sort updates live if reviews are added
  useEffect(() => {
    const unsubscribe = subscribeToReviews(() => {
      setReviewRevision((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  // Dynamic filter counts
  const typeCounts = useMemo(() => {
    return {
      all: advisors.length,
      individual: advisors.filter((a) => a.type === 'individual').length,
      company: advisors.filter((a) => a.type === 'company' || a.isCompany).length
    };
  }, [advisors]);

  // Filter and sort advisors based on search query, type filter, and sort mode
  const filteredAdvisors = useMemo(() => {
    let list = [...advisors];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((advisor) => {
        const name = (advisor.name || '').toLowerCase();
        const company = (advisor.companyName || '').toLowerCase();
        const designation = (advisor.designation || '').toLowerCase();
        const specialization = (advisor.specialization || '').toLowerCase();
        const category = (advisor.category || '').toLowerCase();
        const location = (advisor.consultation?.location || '').toLowerCase();
        const expertise = Array.isArray(advisor.expertise)
          ? advisor.expertise.join(' ').toLowerCase()
          : '';

        return (
          name.includes(q) ||
          company.includes(q) ||
          designation.includes(q) ||
          specialization.includes(q) ||
          category.includes(q) ||
          location.includes(q) ||
          expertise.includes(q)
        );
      });
    }

    // 2. Minimal Filters: All, Individual, Companies
    if (filterType === 'individual') {
      list = list.filter((advisor) => advisor.type === 'individual');
    } else if (filterType === 'company') {
      list = list.filter((advisor) => advisor.type === 'company' || advisor.isCompany);
    }

    // 3. Simple Sorting: Default, Highest Rated, Experience (High to Low)
    if (sortBy === 'rating') {
      list.sort((a, b) => {
        const rateA = getAdvisorRatingSummary(a.slug);
        const rateB = getAdvisorRatingSummary(b.slug);
        // Prioritize advisors with genuine client reviews
        if (rateA.hasReviews !== rateB.hasReviews) {
          return rateA.hasReviews ? -1 : 1;
        }
        if (rateB.averageRating !== rateA.averageRating) {
          return rateB.averageRating - rateA.averageRating;
        }
        return rateB.totalReviews - rateA.totalReviews;
      });
    } else if (sortBy === 'experience') {
      list.sort((a, b) => {
        const expA = parseExperienceYears(a.experience);
        const expB = parseExperienceYears(b.experience);
        return expB - expA;
      });
    }

    return list;
  }, [advisors, searchQuery, filterType, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-26 pb-14 font-sans text-[#172B3A] text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER: Heading, Search Bar, Minimal Filters, and Simple Sorting
        ========================================================================= */}
        <header className="mb-4 sm:mb-5 space-y-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#102A43] font-display tracking-tight">
              Health Insurance Advisors
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Find, evaluate, and contact verified health insurance advisors and institutional desks.
            </p>
          </div>

          {/* One Compact Search Bar */}
          <div className="relative w-full max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="text-sm" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by advisor name, company, specialization, or location..."
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-8 text-xs sm:text-sm font-medium text-[#102A43] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>

          {/* Controls: Minimal Filters + Simple Sorting */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-0.5">
            {/* Minimal Filters: All, Individual, Companies */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200/60 shrink-0">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-white text-[#102A43] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({typeCounts.all})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('individual')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'individual'
                    ? 'bg-white text-[#102A43] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Individual ({typeCounts.individual})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('company')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filterType === 'company'
                    ? 'bg-white text-[#102A43] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Companies ({typeCounts.company})
              </button>
            </div>

            {/* Simple Sorting: Rating & Experience */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <label htmlFor="advisor-sort" className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="advisor-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-[#102A43] focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] cursor-pointer shadow-2xs"
              >
                <option value="default">Default</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Experience (High to Low)</option>
              </select>
            </div>
          </div>
        </header>

        {/* =========================================================================
            COMPACT LISTING: Slim Google-style Rows with Subtle Separators
        ========================================================================= */}
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-xl p-5 text-center max-w-sm mx-auto shadow-sm my-6">
            <p className="text-xs font-semibold text-red-700 mb-2.5">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-3.5 py-1.5 rounded-lg bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reload Advisors
            </button>
          </div>
        ) : filteredAdvisors.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 text-center max-w-sm mx-auto space-y-2 shadow-2xs my-6">
            <h3 className="text-xs font-bold text-[#102A43]">
              No advisors found
            </h3>
            <p className="text-[11px] text-slate-500">
              No results found matching your current filter or search criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setSortBy('default');
              }}
              className="mt-1 px-3 py-1 rounded-lg bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            {filteredAdvisors.map((advisor) => (
              <AdvisorCard
                key={advisor.id || advisor.slug}
                advisor={advisor}
                onContact={(adv) => setSelectedContactAdvisor(adv)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Contact & Consultation Modal */}
      {selectedContactAdvisor && (
        <AdvisorEnquiryModal
          advisor={selectedContactAdvisor}
          isOpen={Boolean(selectedContactAdvisor)}
          onClose={() => setSelectedContactAdvisor(null)}
        />
      )}
    </div>
  );
}
