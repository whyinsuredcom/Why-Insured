import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiPlay
} from 'react-icons/fi';
import { ACADEMY_ARTICLES, ACADEMY_VIDEOS } from '../../data/academyData';

export default function AcademyArticleDetailPage() {
  const { slug } = useParams();

  const article = useMemo(() => {
    return (
      ACADEMY_ARTICLES.find(
        (a) => a.slug.toLowerCase() === String(slug).toLowerCase() || a.id.toLowerCase() === String(slug).toLowerCase()
      ) || ACADEMY_ARTICLES[0]
    );
  }, [slug]);

  const linkedVideo = useMemo(() => {
    return ACADEMY_VIDEOS.find((v) => v.id === article.relatedVideoId);
  }, [article?.relatedVideoId]);

  const otherArticles = useMemo(() => {
    return ACADEMY_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);
  }, [article?.id]);

  if (!article) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-[#102A43]">Article Not Found</h2>
        <Link to="/insurance-academy/guides" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2 inline-block">
          Return to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16 text-left select-none space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/insurance-academy/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors group"
        >
          <FiArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Insurance Guides</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-3 border-b border-slate-200/80 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 border border-emerald-500/30 px-3 py-0.5 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <FiClock />
            <span>{article.readingTime}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <FiCalendar />
            <span>{article.publishedDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102A43] font-display leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed italic border-l-4 border-emerald-500 pl-3 py-0.5">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
          <div className="w-6 h-6 rounded-full bg-[#102A43] text-white flex items-center justify-center font-bold text-[10px]">
            WI
          </div>
          <span>Curated by {article.author || 'WHYINSURED Editorial Team'}</span>
        </div>
      </header>

      {/* Table of Contents Pill Box */}
      {article.toc && article.toc.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Table of Contents
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {article.toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1.5"
              >
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Formatted Article Body */}
      <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-normal space-y-4">
        {article.content.split('\n\n').map((paragraph, pIdx) => {
          if (paragraph.startsWith('### ')) {
            const title = paragraph.replace('### ', '');
            return (
              <h3 key={pIdx} className="text-base sm:text-lg font-bold text-[#102A43] font-display pt-3">
                {title}
              </h3>
            );
          }
          if (paragraph.startsWith('|')) {
            // Simple markdown table representation
            const rows = paragraph.trim().split('\n').filter(r => !r.includes(':---'));
            return (
              <div key={pIdx} className="my-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-xs text-left">
                  <tbody>
                    {rows.map((row, rIdx) => {
                      const cells = row.split('|').filter(c => c.trim().length > 0);
                      return (
                        <tr key={rIdx} className={rIdx === 0 ? 'bg-slate-100 font-bold' : 'border-t border-slate-100'}>
                          {cells.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3 py-2 text-slate-700">
                              {cell.trim()}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
          if (paragraph.startsWith('* ')) {
            const items = paragraph.split('\n').map(i => i.replace('* ', '').trim());
            return (
              <ul key={pIdx} className="space-y-1.5 pl-4 list-disc text-slate-600">
                {items.map((it, iIdx) => (
                  <li key={iIdx}>{it}</li>
                ))}
              </ul>
            );
          }
          if (paragraph.match(/^\d+\.\s/)) {
            const items = paragraph.split('\n').map(i => i.replace(/^\d+\.\s/, '').trim());
            return (
              <ol key={pIdx} className="space-y-1.5 pl-4 list-decimal text-slate-600">
                {items.map((it, iIdx) => (
                  <li key={iIdx}>{it}</li>
                ))}
              </ol>
            );
          }
          return <p key={pIdx}>{paragraph}</p>;
        })}
      </article>

      {/* Key Takeaways Box */}
      {article.takeaways && article.takeaways.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 block">
            Key Policy Takeaways
          </span>
          <div className="space-y-2">
            {article.takeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <FiCheckCircle className="text-emerald-600 text-sm mt-0.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accompanying Video Walkthrough */}
      {linkedVideo && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#1A3A5E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Accompanying Video Walkthrough
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

      {/* Recommended Guides */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-bold text-[#102A43] font-display">
          More Insurance Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherArticles.map((other) => (
            <Link
              key={other.id}
              to={`/insurance-academy/article/${other.slug}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all space-y-1.5 text-left"
            >
              <span className="text-[10px] font-bold text-emerald-700 uppercase">
                {other.category}
              </span>
              <h4 className="text-xs font-bold text-[#102A43] line-clamp-2">
                {other.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
