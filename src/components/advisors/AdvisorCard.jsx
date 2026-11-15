import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiStar,
  FiPhone,
  FiMapPin,
  FiArrowRight
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AdvisorAvatar from './AdvisorAvatar';
import { getAdvisorRatingSummary, subscribeToReviews } from '../../services/reviewService';

/**
 * Compact Google-Business Style Horizontal Advisor Listing Row
 * 
 * Features:
 * - Slim, compact row height and optimized padding.
 * - Reduced photo/logo dimensions.
 * - Name, genuine rating, specialization, and experience on the same compact flow.
 * - Contact and View Profile actions on the right.
 * - Subtle separator between listings.
 * - Responsive layout for desktop, tablet, and mobile with zero horizontal overflow.
 */
export default function AdvisorCard({ advisor, onContact }) {
  const slug = advisor?.slug || '';

  const [ratingSummary, setRatingSummary] = useState(() =>
    slug ? getAdvisorRatingSummary(slug) : { hasReviews: false, totalReviews: 0, ratingFormatted: '0.0', averageRating: 0 }
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
    name = 'Advisor',
    type = 'individual',
    designation = '',
    companyName = '',
    specialization = '',
    category = '',
    experience = null,
    phone = '+91 98765 43210',
    whatsapp = '919876543210',
    consultation = {}
  } = advisor;

  const isCompany = type === 'company' || Boolean(advisor.isCompany);
  const location = consultation?.location || 'India';

  const cleanPhone = (phone || '').replace(/[\s()-]/g, '');
  const cleanWa = (whatsapp || phone || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Hello ${name}, I am contacting you via WHYINSURED regarding health insurance guidance.`
  )}`;

  const handleContact = (e) => {
    e.preventDefault();
    if (onContact) {
      onContact(advisor);
    } else {
      window.location.href = `tel:${cleanPhone}`;
    }
  };

  return (
    <article className="group py-3 px-3.5 sm:py-3 sm:px-4 lg:py-3 lg:px-5 hover:bg-slate-50/80 transition-colors text-left flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3.5 relative">
      {/* =========================================================================
          LEFT: COMPACT PHOTO / LOGO & ESSENTIAL ADVISOR DETAILS
      ========================================================================= */}
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
        {/* Compact Logo / Photo Thumbnail */}
        <div className="shrink-0">
          <Link
            to={`/advisors/${slug}`}
            className="block relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden border border-slate-200/90 bg-white group-hover:border-[#00A86B]/50 transition-colors shadow-2xs"
            title={`View profile of ${name}`}
          >
            <AdvisorAvatar
              advisor={advisor}
              aspect="square"
              className="w-full h-full"
              imgClassName="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Compact Advisor Information */}
        <div className="min-w-0 flex-1 space-y-0.5">
          {/* Row 1: Name, Type Badge & Star Rating */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <Link
              to={`/advisors/${slug}`}
              className="text-sm sm:text-base font-bold text-[#102A43] group-hover:text-[#00A86B] hover:underline transition-colors font-display truncate max-w-[220px] sm:max-w-none"
              title={name}
            >
              {name}
            </Link>

            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border tracking-wide shrink-0 ${
                isCompany
                  ? 'bg-blue-50 text-blue-700 border-blue-200/60'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
              }`}
            >
              {isCompany ? 'Company' : 'Individual'}
            </span>

            {/* Genuine Star Rating on same line */}
            <div className="flex items-center gap-1 text-xs shrink-0">
              {ratingSummary.hasReviews ? (
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#102A43] text-xs">
                    {ratingSummary.ratingFormatted}
                  </span>
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3 h-3 ${
                          star <= Math.round(ratingSummary.averageRating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    ({ratingSummary.totalReviews})
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-[11px] flex items-center gap-0.5">
                  <FiStar className="text-slate-300 text-[11px]" />
                  <span>No reviews</span>
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Designation · Experience · Location */}
          <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-700 truncate max-w-[240px] sm:max-w-none">
              {designation || (isCompany ? 'Institutional Advisory Desk' : 'Health Insurance Advisor')}
            </span>
            {companyName && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 truncate max-w-[160px] sm:max-w-none">{companyName}</span>
              </>
            )}
            {experience && (
              <>
                <span className="text-slate-300">·</span>
                <span className="font-medium text-slate-700">{experience}</span>
              </>
            )}
            {location && (
              <>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-0.5 text-slate-500">
                  <FiMapPin className="text-slate-400 text-[10px]" />
                  <span>{location}</span>
                </span>
              </>
            )}
          </div>

          {/* Row 3: Specialization */}
          <div className="text-xs text-slate-600 truncate">
            <span className="text-slate-400 font-normal">Specialization: </span>
            <span className="font-medium text-[#0FA26E]">
              {specialization || category}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT: COMPACT ACTION BUTTONS (Contact, Call, WhatsApp, View Profile)
      ========================================================================= */}
      <div className="shrink-0 flex items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end w-full md:w-auto">
        {/* Quick Call */}
        <a
          href={`tel:${cleanPhone}`}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
          title={`Call ${name} directly`}
          aria-label={`Call ${name}`}
        >
          <FiPhone className="text-slate-500 text-xs" />
          <span className="hidden sm:inline">Call</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-800 text-xs font-medium flex items-center gap-1 transition-colors"
          title={`WhatsApp ${name}`}
          aria-label={`WhatsApp ${name}`}
        >
          <FaWhatsapp className="text-emerald-600 text-xs" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Primary Contact Button */}
        <button
          type="button"
          onClick={handleContact}
          className="py-1.5 px-3 rounded-lg bg-[#00A86B] hover:bg-[#0FA26E] text-white text-xs font-semibold shadow-2xs hover:shadow transition-all cursor-pointer"
        >
          Contact
        </button>

        {/* View Profile Link */}
        <Link
          to={`/advisors/${slug}`}
          className="py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#102A43] hover:text-[#00A86B] text-xs font-semibold transition-all shadow-2xs flex items-center gap-1"
        >
          <span>Profile</span>
          <FiArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  );
}
