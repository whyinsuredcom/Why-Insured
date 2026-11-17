import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FEATURE_FLAGS } from '../config/features';

/**
 * UploadPolicyButton Component
 * 
 * An independent floating action button rendered inside the single parent
 * floating-action flex container.
 * 
 * Visually matches the "Chat with WHYINSURED" action button:
 * - Rounded pill shape (pl-1.5 pr-4 py-1.5 sm:py-2 rounded-full)
 * - Dark slate gradient background (#0F172A to #1E293B)
 * - Circular PDF icon on the left with emerald border and active status dot
 * - Emerald pulsing dot + Bold text "Upload Your Policy"
 * - Navigates to "/upload-policy"
 */
export default function UploadPolicyButton() {
  const location = useLocation();

  // Controlled via central FEATURE_FLAGS
  if (!FEATURE_FLAGS.POLICY_UPLOAD_WIDGET) {
    return null;
  }

  // If user is already on the dedicated Upload Policy page, hide the floating button
  if (location.pathname === '/upload-policy') {
    return null;
  }

  return (
    <Link
      to="/upload-policy"
      className="pointer-events-auto group block cursor-pointer select-none"
      aria-label="Upload Your Policy"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white pl-1.5 pr-4 py-1.5 sm:py-2 rounded-full shadow-xl border border-slate-700/70 hover:border-[#00A86B]/90 transition-all duration-300"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#00A86B]/40 to-[#0fa26e]/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Circular PDF Icon */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#00A86B] via-[#0fa26e] to-[#0F172A] shrink-0 shadow-md">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-white/90 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          
          {/* Status Indicator */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00A86B] border-2 border-white rounded-full">
            <span className="absolute inset-0 rounded-full bg-[#00A86B] animate-ping opacity-75" />
          </span>
        </div>

        {/* Button Text Label */}
        <div className="relative flex items-center gap-1.5 pr-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse shrink-0 shadow-[0_0_6px_#00A86B]" />
          <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white whitespace-nowrap font-sans">
            Upload Your Policy
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
