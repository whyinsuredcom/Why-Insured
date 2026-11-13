import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import AdvisorAvatar from './AdvisorAvatar';
import { getAdvisorRatingSummary, subscribeToReviews } from '../../services/reviewService';

/**
 * Minimal & Professional AdvisorCard Component
 * Contains strictly:
 * 1. Company logo or individual profile photo
 * 2. Advisor or company name
 * 3. Short designation
 * 4. Star rating and review count
 * 5. Main insurance specialization
 * 6. Contact button
 * 7. View Profile link
 */
export default function AdvisorCard({ advisor, onContact }) {
  const slug = advisor?.slug || '';

  const [ratingSummary, setRatingSummary] = useState(() =>
    slug ? getAdvisorRatingSummary(slug) : { hasReviews: false, totalReviews: 0, ratingFormatted: '0.0' }
  );

  useEffect(() => {
    if (!slug) return;
    const unsubscribe = subscribeToReviews((detail) => {
      if (!detail || detail.slug === String(slug).toLowerCase()) {
        setRatingSummary(getAdvisorRatingSummary(slug));
      }
    });
    return unsubscribe;
  }, [slug]);

  if (!advisor) return null;

  const {
    name,
    designation,
    category,
    specialization,
    phone = '+91 98765 43210'
  } = advisor;

  const handleContact = (e) => {
    e.preventDefault();
    if (onContact) {
      onContact(advisor);
    } else {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#00A86B]/60 shadow-[0_2px_8px_rgba(16,42,67,0.04)] hover:shadow-[0_8px_20px_rgba(16,42,67,0.08)] transition-all duration-200 flex flex-col justify-between overflow-hidden text-left h-full">
      <div>
        {/* 1. Company logo or individual profile photo */}
        <div className="p-3 pb-0">
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50 h-36 sm:h-32">
            <Link to={`/advisors/${slug}`} className="block w-full h-full">
              <AdvisorAvatar
                advisor={advisor}
                aspect="compact"
                className="w-full h-full transition-transform duration-300 group-hover:scale-102"
              />
            </Link>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 pt-3 space-y-1.5">
          {/* 2. Advisor or company name */}
          <Link
            to={`/advisors/${slug}`}
            className="block text-base font-bold text-[#102A43] group-hover:text-[#00A86B] transition-colors font-display line-clamp-1 leading-snug"
            title={name}
          >
            {name}
          </Link>

          {/* 3. Short designation */}
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {designation || category}
          </p>

          {/* 4. Star rating and review count */}
          <div className="pt-0.5">
            {ratingSummary.hasReviews ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#102A43]">
                <span className="flex items-center text-amber-500 font-bold">
                  <FiStar className="fill-amber-400 text-amber-400 text-xs mr-1" />
                  {ratingSummary.ratingFormatted}
                </span>
                <span className="text-slate-400 text-[11px] font-normal">
                  ({ratingSummary.totalReviews}{' '}
                  {ratingSummary.totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <FiStar className="text-slate-300 text-xs mr-0.5" />
                <span>No reviews yet</span>
              </div>
            )}
          </div>

          {/* 5. Main insurance specialization */}
          <p className="text-xs text-[#0FA26E] font-medium line-clamp-1 pt-0.5">
            <span className="text-slate-400 font-normal">Specialization: </span>
            {specialization || category}
          </p>
        </div>
      </div>

      {/* 6. Contact button & 7. View Profile link */}
      <div className="p-3.5 pt-3 border-t border-slate-100 bg-[#FAFBFB] mt-auto flex items-center gap-2">
        <button
          type="button"
          onClick={handleContact}
          className="flex-1 py-2 px-3 rounded-xl bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold transition-all shadow-2xs hover:shadow cursor-pointer text-center"
        >
          Contact
        </button>

        <Link
          to={`/advisors/${slug}`}
          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#102A43] hover:text-[#00A86B] text-xs font-semibold transition-all shadow-2xs hover:border-[#00A86B]/40 text-center"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
