import React, { useState, useMemo } from 'react';
import { FiHelpCircle, FiSearch, FiChevronDown, FiX } from 'react-icons/fi';
import { ACADEMY_FAQS } from '../../data/academyData';

export default function AcademyFaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState(['faq-1', 'faq-2']);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    let list = ACADEMY_FAQS;

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center text-xs shadow-xs">
            <FiHelpCircle />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Clear, factual answers to essential health, motor, and life insurance questions under IRDAI guidelines.
        </p>
      </div>

      {/* Search Bar */}
      <div className="space-y-3.5">
        <div className="relative w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. pre-existing disease, claim rejection, NCB)..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] transition-all shadow-2xs"
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

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Health Insurance', 'Claims', 'Policy Basics', 'Motor Insurance'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#102A43] text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 cursor-pointer transition-colors"
                >
                  <div className="space-y-1 flex-1 pr-2">
                    <span className="text-[10px] font-bold text-[#00A86B] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#102A43]">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-[#00A86B]' : ''
                    }`}
                  >
                    <FiChevronDown className="text-sm" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">
            No questions found matching "{searchQuery}".
          </p>
        </div>
      )}

    </div>
  );
}
