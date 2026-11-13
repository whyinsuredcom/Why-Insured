import React, { useState } from 'react';

/**
 * Generates initials from name (e.g. "Dishant Gupta" -> "DG")
 */
function getInitials(name) {
  if (!name) return 'WI';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * AdvisorAvatar Component
 * Intelligently switches between:
 * 1. Crisp company logo presentation (object-contain with clean padding) for companies/desks
 * 2. Portrait photography presentation (object-cover) for individual advisors
 * 3. Graceful fallback monogram initials if images fail to load
 */
export default function AdvisorAvatar({
  advisor = null,
  name = 'Advisor',
  image = null,
  isCompany = false,
  aspect = 'portrait', // 'portrait' | 'square' | 'compact' | 'hero'
  className = '',
  imgClassName = ''
}) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive resolved properties from either advisor object or standalone props
  const resolvedName = advisor?.name || name || 'Advisor';
  const resolvedIsCompany = Boolean(
    advisor?.type === 'company' || advisor?.isCompany || isCompany
  );
  const resolvedImage =
    (resolvedIsCompany ? (advisor?.companyLogo || image) : (advisor?.profileImage || image));

  const initials = getInitials(resolvedName);

  const aspectClasses = {
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    compact: 'aspect-[16/11]',
    hero: 'aspect-[4/5] sm:aspect-[3/4]'
  };

  // If a fixed height or h-full is passed via className, avoid forcing conflicting aspect
  const hasCustomHeight = className.includes('h-') || className.includes('h-full');
  const aspectClass = hasCustomHeight ? '' : (aspectClasses[aspect] || aspectClasses.compact);
  const showImage = Boolean(resolvedImage && !imgError);

  if (resolvedIsCompany) {
    return (
      <div
        className={`relative overflow-hidden bg-white select-none flex items-center justify-center p-3.5 sm:p-4 border border-slate-100/80 ${aspectClass} ${className}`}
      >
        {showImage ? (
          <img
            src={resolvedImage}
            alt={`${resolvedName} logo`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImgError(true)}
            className={`max-w-full max-h-full object-contain transition-all duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-[#102A43] p-3 text-center">
            <span className="font-display font-bold text-xs tracking-wider uppercase text-[#00A86B]">
              {resolvedName}
            </span>
            <span className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
              Advisory Desk
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 select-none ${aspectClass} ${className}`}
    >
      {showImage ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
          )}
          <img
            src={resolvedImage}
            alt={resolvedName}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-[center_20%] transition-transform duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </>
      ) : (
        /* Monogram Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#102A43] via-[#1B3A5A] to-[#0A1A2A] text-white p-4 relative">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-1 shadow-inner bg-white/5">
            <span className="font-display font-bold text-base tracking-wider text-[#00A86B]">
              {initials}
            </span>
          </div>
          <span className="text-[9px] font-medium tracking-wider text-slate-300 uppercase">
            WHYINSURED
          </span>
        </div>
      )}
    </div>
  );
}
