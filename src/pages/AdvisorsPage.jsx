import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import AdvisorCard from '../components/advisors/AdvisorCard';
import { AdvisorCardSkeleton } from '../components/advisors/AdvisorSkeleton';
import AdvisorEnquiryModal from '../components/advisors/AdvisorEnquiryModal';
import { fetchAdvisors } from '../services/advisorService';

/**
 * Minimal & Professional Advisors Page
 * Contains only:
 * 1. Simple heading: Health Insurance Advisors
 * 2. One short subtitle
 * 3. One search bar
 * 4. Four advisor cards visible on desktop in a single row
 */
export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactAdvisor, setSelectedContactAdvisor] = useState(null);

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

  // Filter advisors based on search query
  const filteredAdvisors = useMemo(() => {
    if (!searchQuery.trim()) return advisors;

    const q = searchQuery.toLowerCase().trim();
    return advisors.filter((advisor) => {
      const matchesName = (advisor.name || '').toLowerCase().includes(q);
      const matchesCompany = (advisor.companyName || '').toLowerCase().includes(q);
      const matchesDesignation = (advisor.designation || '').toLowerCase().includes(q);
      const matchesSpecialization = (advisor.specialization || '').toLowerCase().includes(q);
      const matchesCategory = (advisor.category || '').toLowerCase().includes(q);

      return (
        matchesName ||
        matchesCompany ||
        matchesDesignation ||
        matchesSpecialization ||
        matchesCategory
      );
    });
  }, [advisors, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 font-sans text-[#172B3A] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. HEADING, 2. SUBTITLE, 3. SEARCH BAR
        ========================================================================= */}
        <header className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-display tracking-tight">
            Health Insurance Advisors
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Connect with verified advisors and partner desks for unbiased policy guidance.
          </p>

          <div className="mt-5 relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
              <FiSearch />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by advisor name, company, or specialization..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm font-medium text-[#172B3A] placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-[#00A86B]/15 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer text-xs"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </header>

        {/* =========================================================================
            4. FOUR ADVISOR CARDS PER ROW ON DESKTOP
        ========================================================================= */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
            <AdvisorCardSkeleton />
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-2xl p-6 text-center max-w-sm mx-auto shadow-sm my-6">
            <p className="text-xs font-semibold text-red-700 mb-3">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reload Advisors
            </button>
          </div>
        ) : filteredAdvisors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-sm mx-auto space-y-2 shadow-2xs my-6">
            <h3 className="text-sm font-bold text-[#102A43]">
              No advisors found
            </h3>
            <p className="text-xs text-slate-500">
              No results found matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 px-3.5 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
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
