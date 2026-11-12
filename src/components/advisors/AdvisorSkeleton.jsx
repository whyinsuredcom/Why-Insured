import React from 'react';

export function AdvisorCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-[#E4E7EB] p-3.5 animate-pulse text-left space-y-4">
      <div className="aspect-[4/5] rounded-2xl bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="w-3/4 h-5 rounded-md bg-slate-200" />
        <div className="w-1/2 h-3.5 rounded-md bg-slate-100" />
        <div className="space-y-1.5 pt-2">
          <div className="w-full h-3 rounded bg-slate-100" />
          <div className="w-5/6 h-3 rounded bg-slate-100" />
        </div>
        <div className="pt-3 flex gap-1.5">
          <div className="w-16 h-5 rounded-full bg-slate-100" />
          <div className="w-20 h-5 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export function AdvisorDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse space-y-8 text-left">
      <div className="w-32 h-6 rounded-full bg-slate-200 mb-6" />
      <div className="bg-white rounded-3xl border border-[#E4E7EB] p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-48 h-64 rounded-2xl bg-slate-200 shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="w-1/3 h-8 rounded-md bg-slate-200" />
          <div className="w-1/4 h-5 rounded-md bg-slate-100" />
          <div className="w-full h-4 rounded-md bg-slate-100" />
          <div className="w-4/5 h-4 rounded-md bg-slate-100" />
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
