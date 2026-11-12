import React, { useState } from 'react';

/**
 * Generates initials from full name (e.g. "Dishant Gupta" -> "DG")
 */
function getInitials(name) {
  if (!name) return 'WI';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * AdvisorAvatar Component
 * Clean, consistent portrait presentation with facial-centering positioning and monogram fallback
 */
export default function AdvisorAvatar({
  name = 'Advisor',
  image = null,
  aspect = 'portrait', // 'portrait' | 'square' | 'hero'
  className = '',
  imgClassName = ''
}) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const initials = getInitials(name);

  const aspectClasses = {
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    hero: 'aspect-[4/5] sm:aspect-[3/4]'
  };

  const aspectClass = aspectClasses[aspect] || aspectClasses.portrait;
  const showImage = Boolean(image && !imgError);

  return (
    <div
      className={`relative overflow-hidden bg-[#F0F4F8] select-none ${aspectClass} ${className}`}
    >
      {showImage ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
          )}
          <img
            src={image}
            alt={name}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-[center_20%] transition-transform duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </>
      ) : (
        /* Refined Editorial Monogram Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#102A43] via-[#1B3A5A] to-[#0A1A2A] text-white p-6 relative">
          <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-2 shadow-inner">
            <span className="font-display font-light text-xl tracking-widest text-[#00A86B]">
              {initials}
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-wider text-slate-300 uppercase">
            WHYINSURED
          </span>
        </div>
      )}
    </div>
  );
}
