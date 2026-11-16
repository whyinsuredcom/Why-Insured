import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText,
  FiPlay,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight
} from 'react-icons/fi';
import { POLICY_EXPLAINED_TOPICS, ACADEMY_VIDEOS } from '../../data/academyData';

export default function AcademyPolicyExplainedPage() {
  const [activeTopicId, setActiveTopicId] = useState(POLICY_EXPLAINED_TOPICS[0].id);

  const activeTopic = POLICY_EXPLAINED_TOPICS.find((t) => t.id === activeTopicId) || POLICY_EXPLAINED_TOPICS[0];
  const linkedVideo = ACADEMY_VIDEOS.find((v) => v.id === activeTopic.videoId);

  return (
    <div className="space-y-8 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
            <FiFileText />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            Policy Explained: Decode the Fine Print
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          In-depth deconstruction of restrictive clauses, hospital room rent sub-limits, waiting periods, and restoration triggers.
        </p>
      </div>

      {/* Main Grid: Left Topic Selector List, Right Detailed Interactive Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (4 cols): Topic Navigation Pills */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 block">
            Select Policy Clause:
          </span>

          <div className="space-y-2">
            {POLICY_EXPLAINED_TOPICS.map((topic) => {
              const isActive = topic.id === activeTopicId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                      : 'bg-white/60 hover:bg-white border-slate-200/90 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-500/30'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {topic.badge}
                    </span>
                    <FiArrowRight
                      className={`text-xs transition-transform ${
                        isActive ? 'text-emerald-600 translate-x-1' : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xs sm:text-sm font-bold ${
                      isActive ? 'text-[#102A43]' : 'text-slate-700'
                    }`}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {topic.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Deep Breakdown & Related Video */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100/90 text-emerald-800 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {activeTopic.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
                {activeTopic.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTopic.details}
              </p>
            </div>

            {/* Key Policy Takeaways */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Critical Contract Principles:
              </h3>
              <div className="space-y-2.5">
                {activeTopic.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3"
                  >
                    <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Video Lesson */}
            {linkedVideo && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#1A3A5E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Recommended Video Lesson
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {linkedVideo.title}
                  </h4>
                  <span className="text-xs text-slate-300">
                    Duration: {linkedVideo.duration || 'Short lesson'}
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

            {/* Important Advisory Note */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
              <FiAlertCircle className="text-amber-600 mt-0.5 shrink-0 text-base" />
              <div>
                <strong className="block font-bold">Policy Clause Tip:</strong>
                Always request the policy specimen wording before paying your renewal premium. Verify that any modern endorsement doesn't add restrictive co-pays.
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
