import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiBook, FiSearch, FiX, FiInfo } from 'react-icons/fi';
import { ACADEMY_DICTIONARY } from '../../data/academyData';

const ALPHABET = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export default function AcademyDictionaryPage() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [selectedLetter, setSelectedLetter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const filteredTerms = useMemo(() => {
    let list = ACADEMY_DICTIONARY;

    if (selectedLetter && selectedLetter !== 'All') {
      list = list.filter((t) => t.letter.toUpperCase() === selectedLetter.toUpperCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedLetter, searchQuery]);

  return (
    <div className="space-y-6 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
            <FiBook />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            A–Z Insurance Dictionary & Glossary
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Plain-English definitions of complex insurance terms, clauses, and medical billing jargon.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:max-w-md">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search glossary terms (e.g. Co-Pay, TPA, Deductible)..."
          className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <FiX className="text-xs" />
          </button>
        )}
      </div>

      {/* Alphabet Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {ALPHABET.map((char) => {
          const isActive = selectedLetter === char;
          return (
            <button
              key={char}
              type="button"
              onClick={() => setSelectedLetter(char)}
              className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center cursor-pointer border ${
                isActive
                  ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
                  : 'border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-xs'
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Glossary Cards Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-mono text-xs flex items-center justify-center font-bold">
                    {item.letter}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#102A43]">
                  {item.term}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.definition}
                </p>
              </div>

              {item.tip && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600 leading-snug flex items-start gap-2">
                  <FiInfo className="text-emerald-600 shrink-0 text-xs mt-0.5" />
                  <span>
                    <strong className="text-slate-700">Practical Tip:</strong> {item.tip}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto my-8 space-y-3">
          <p className="text-xs text-slate-500">
            No terms found for "{selectedLetter !== 'All' ? selectedLetter : searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedLetter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
          >
            Show All Terms
          </button>
        </div>
      )}

    </div>
  );
}

