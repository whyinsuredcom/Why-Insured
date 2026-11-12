import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import AdvisorAvatar from './AdvisorAvatar';

/**
 * Premium AdvisorCard Component
 * Equal visual importance, balanced dimensions, consistent subtle green accents.
 */
export default function AdvisorCard({ advisor }) {
  if (!advisor) return null;

  const {
    name,
    slug,
    profileImage,
    category,
    shortDescription,
    expertise = []
  } = advisor;

  return (
    <article className="group relative bg-white rounded-3xl border border-[#E4E7EB] hover:border-[#00A86B]/50 shadow-[0_4px_20px_rgba(16,42,67,0.04)] hover:shadow-[0_16px_36px_rgba(16,42,67,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden text-left hover:-translate-y-1.5 h-full">
      <div>
        {/* Profile Photograph Container */}
        <div className="p-3.5 pb-0">
          <div className="overflow-hidden rounded-2xl bg-slate-100 border border-[#E4E7EB]/80">
            <AdvisorAvatar
              name={name}
              image={profileImage}
              aspect="portrait"
              className="w-full"
              imgClassName="group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Category & Name */}
          <div className="space-y-1">
            <span className="block text-[11px] font-semibold text-[#0FA26E] tracking-wide">
              {category}
            </span>

            <Link
              to={`/advisors/${slug}`}
              className="block text-lg sm:text-xl font-bold text-[#102A43] group-hover:text-[#00A86B] transition-colors font-display tracking-tight"
            >
              {name}
            </Link>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[#172B3A]/75 font-normal leading-relaxed line-clamp-3">
            {shortDescription}
          </p>

          {/* Expertise Tags */}
          {expertise && expertise.length > 0 && (
            <div className="pt-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#627D98] mb-2">
                Specialization
              </span>
              <div className="flex flex-wrap gap-1.5">
                {expertise.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F0FDF4] text-[#0B6946] border border-[#00A86B]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E4E7EB] flex items-center justify-between mt-auto">
        <span className="text-[11px] font-medium text-[#627D98]">
          WHYINSURED
        </span>

        <Link
          to={`/advisors/${slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#102A43] hover:bg-[#00A86B] text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <span>View Profile</span>
          <FiArrowUpRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
