import React from 'react';

export function AdvisorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3 animate-pulse text-left space-y-3 flex flex-col justify-between h-full">
      <div className="space-y-2.5">
        {/* Logo / Photo */}
        <div className="h-32 rounded-xl bg-slate-200" />
        
        {/* Info */}
        <div className="space-y-1.5 p-1">
          <div className="w-3/4 h-4.5 rounded bg-slate-200" />
          <div className="w-1/2 h-3.5 rounded bg-slate-100" />
          <div className="w-24 h-3 rounded bg-amber-100/60" />
          <div className="w-4/5 h-3 rounded bg-slate-100 pt-1" />
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <div className="flex-1 h-8 rounded-xl bg-slate-200" />
        <div className="flex-1 h-8 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export function AdvisorDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-pulse space-y-6 text-left">
      <div className="w-32 h-5 rounded-full bg-slate-200 mb-4" />
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-56 h-64 rounded-xl bg-slate-200 shrink-0" />
        <div className="space-y-3 flex-1 w-full">
          <div className="w-24 h-4 rounded-full bg-slate-100" />
          <div className="w-1/2 h-7 rounded-md bg-slate-200" />
          <div className="w-1/3 h-3.5 rounded-md bg-slate-100" />
          <div className="w-36 h-4 rounded-md bg-amber-100/60" />
          <div className="space-y-1.5 pt-2">
            <div className="w-full h-2.5 rounded bg-slate-100" />
            <div className="w-5/6 h-2.5 rounded bg-slate-100" />
            <div className="w-2/3 h-2.5 rounded bg-slate-100" />
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
