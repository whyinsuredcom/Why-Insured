import React from 'react';

/**
 * Compact Google-style Horizontal Advisor Listing Skeleton
 */
export function AdvisorCardSkeleton() {
  return (
    <div className="py-3 px-3.5 sm:py-3 sm:px-4 lg:py-3 lg:px-5 animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3.5">
      {/* Left: Compact Thumbnail Skeleton & Info */}
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg bg-slate-200 shrink-0" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-36 sm:w-44 h-4 rounded bg-slate-200" />
            <div className="w-14 h-3.5 rounded bg-slate-100" />
            <div className="w-20 h-3.5 rounded bg-amber-100/70" />
          </div>
          <div className="w-48 sm:w-64 h-3 rounded bg-slate-100" />
          <div className="w-36 sm:w-48 h-3 rounded bg-slate-100" />
        </div>
      </div>

      {/* Right: Actions Skeleton */}
      <div className="shrink-0 flex items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end w-full md:w-auto">
        <div className="w-12 h-7 rounded-lg bg-slate-100" />
        <div className="w-16 h-7 rounded-lg bg-slate-100" />
        <div className="w-16 h-7 rounded-lg bg-slate-200" />
        <div className="w-16 h-7 rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

export function AdvisorDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-pulse space-y-6 text-left">
      <div className="w-32 h-5 rounded-full bg-slate-200 mb-4" />
      
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 rounded-2xl bg-slate-200 shrink-0" />
        <div className="space-y-3 flex-1 w-full">
          <div className="w-28 h-4 rounded-full bg-slate-100" />
          <div className="w-1/2 h-7 rounded-md bg-slate-200" />
          <div className="w-1/3 h-4 rounded-md bg-slate-100" />
          <div className="w-36 h-4 rounded-md bg-amber-100/60" />
        </div>
        <div className="flex gap-2 w-full md:w-auto pt-2 md:pt-0">
          <div className="w-28 h-10 rounded-xl bg-slate-200" />
          <div className="w-28 h-10 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* 2-Column Body Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-36 h-5 rounded bg-slate-200" />
            <div className="w-full h-3 rounded bg-slate-100" />
            <div className="w-5/6 h-3 rounded bg-slate-100" />
            <div className="w-3/4 h-3 rounded bg-slate-100" />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-44 h-5 rounded bg-slate-200" />
            <div className="flex gap-2">
              <div className="w-24 h-6 rounded-lg bg-slate-100" />
              <div className="w-24 h-6 rounded-lg bg-slate-100" />
              <div className="w-24 h-6 rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="w-32 h-4 rounded bg-slate-200" />
            <div className="w-full h-10 rounded-xl bg-slate-200" />
            <div className="w-full h-10 rounded-xl bg-slate-200" />
            <div className="w-full h-36 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

const AdvisorSkeleton = {
  AdvisorCardSkeleton,
  AdvisorDetailSkeleton
};

export default AdvisorSkeleton;
