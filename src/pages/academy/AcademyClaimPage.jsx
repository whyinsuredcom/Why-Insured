import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShield,
  FiPlay,
  FiAlertTriangle
} from 'react-icons/fi';
import { CLAIM_ACADEMY_GUIDES, ACADEMY_VIDEOS } from '../../data/academyData';

export default function AcademyClaimPage() {
  const [selectedGuideId, setSelectedGuideId] = useState(CLAIM_ACADEMY_GUIDES[0].id);

  const activeGuide = CLAIM_ACADEMY_GUIDES.find((g) => g.id === selectedGuideId) || CLAIM_ACADEMY_GUIDES[0];
  const linkedVideo = ACADEMY_VIDEOS.find((v) => v.id === activeGuide.videoId);

  return (
    <div className="space-y-8 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
            <FiShield />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            Claim Academy: Step-by-Step Settlement Guidance
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Learn how cashless pre-authorizations, reimbursement filings, and IRDAI grievance escalations work.
        </p>
      </div>

      {/* Mandatory Regulatory / Educational Legal Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-3.5 text-xs text-amber-950 shadow-2xs">
        <FiAlertTriangle className="text-amber-600 text-lg shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-amber-900 block">
            Educational Guidance Notice:
          </strong>
          <p className="leading-relaxed">
            The guidance provided in the WHYINSURED Claim Academy is solely for policyholder education and understanding of IRDAI claims processes. <strong>WHYINSURED is not an insurance company, Third Party Administrator (TPA), or claim settlement desk.</strong> Actual claim approvals, medical necessity evaluations, and payouts are governed strictly by your respective insurance company under your policy contract.
          </p>
        </div>
      </div>

      {/* Guide Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CLAIM_ACADEMY_GUIDES.map((guide) => {
          const isActive = guide.id === selectedGuideId;
          return (
            <button
              key={guide.id}
              type="button"
              onClick={() => setSelectedGuideId(guide.id)}
              className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                isActive
                  ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                {guide.category}
              </span>
              <h3 className="text-xs font-bold text-[#102A43] line-clamp-2 leading-snug">
                {guide.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Guide Deep Dive */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        
        <div className="border-b border-slate-100 pb-4 space-y-1.5">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-block">
            {activeGuide.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            {activeGuide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {activeGuide.description}
          </p>
        </div>

        {/* Numbered Step-by-Step Cards */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Sequential Action Steps:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGuide.steps.map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#102A43] text-white flex items-center justify-center font-bold font-mono text-xs shadow-2xs">
                    0{st.step}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                    Required Step
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#102A43]">
                  {st.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Linked Video Lesson */}
        {linkedVideo && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#1A3A5E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Recommended Video Walkthrough
              </span>
              <h4 className="text-sm font-bold text-white">
                {linkedVideo.title}
              </h4>
              <span className="text-xs text-slate-300">
                Duration: {linkedVideo.duration || 'Short guide'}
              </span>
            </div>

            <Link
              to={
                linkedVideo.type === 'short'
                  ? `/insurance-academy/shorts?id=${linkedVideo.id}`
                  : `/insurance-academy/watch/${linkedVideo.id}`
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <FiPlay className="text-xs" />
              <span>Watch Video</span>
            </Link>
          </div>
        )}

      </div>

    </div>
  );
}
