import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiZap } from 'react-icons/fi';

export default function AcademyShortCard({ video }) {
  const navigate = useNavigate();

  if (!video) return null;

  const handleClick = () => {
    navigate(`/insurance-academy/shorts?id=${video.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col shrink-0 w-44 sm:w-52 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer select-none text-left"
    >
      {/* 9:16 Aspect Ratio Poster */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-gradient-to-b from-[#0C1E38] via-[#102A43] to-[#0A192F] p-3 flex flex-col justify-between">
        
        {/* Subtle mesh background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#10B981_0%,transparent_60%)] opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none" />

        {/* Top: Shorts Pill in Academy Theme */}
        <div className="flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 px-2.5 py-0.5 rounded-full shadow-xs tracking-wider border border-emerald-400/30">
            <FiZap className="text-[10px]" />
            <span>Shorts</span>
          </span>
          <span className="text-[10px] font-bold text-slate-300 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs border border-white/10 font-mono">
            {video.duration || '0:50'}
          </span>
        </div>

        {/* Center: Play Overlay in Academy Theme */}
        <div className="flex items-center justify-center my-auto z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-emerald-500 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300 shadow-xl">
            <FiPlay className="text-lg ml-0.5" />
          </div>
        </div>

        {/* Bottom Details & Views */}
        <div className="z-10 space-y-1">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
            {video.category}
          </span>
          <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
            {video.title}
          </h4>
          <span className="text-[11px] text-slate-300 font-medium block">
            {video.views || '35K views'}
          </span>
        </div>
      </div>
    </div>
  );
}

