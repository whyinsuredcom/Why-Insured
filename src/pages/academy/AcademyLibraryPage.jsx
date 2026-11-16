import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FiClock,
  FiBookmark,
  FiTrash2,
  FiPlay,
  FiArrowRight
} from 'react-icons/fi';
import {
  getWatchLaterList,
  toggleWatchLater,
  getSavedItems,
  toggleSaveItem,
  subscribeToAcademyStorage
} from '../../services/academyStorageService';
import { ACADEMY_VIDEOS } from '../../data/academyData';

export default function AcademyLibraryPage() {
  const location = useLocation();
  const isWatchLaterPage = location.pathname.includes('/watch-later');

  const [activeTab, setActiveTab] = useState(isWatchLaterPage ? 'watch-later' : 'saved');
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const loadData = () => {
    setWatchLaterList(getWatchLaterList());
    setSavedItems(getSavedItems());
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToAcademyStorage(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setActiveTab(isWatchLaterPage ? 'watch-later' : 'saved');
  }, [isWatchLaterPage]);

  const handleRemoveWatchLater = (videoId) => {
    toggleWatchLater({ id: videoId });
  };

  const handleRemoveSaved = (item) => {
    toggleSaveItem(item);
  };

  return (
    <div className="space-y-6 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
          Personal Academy Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Your saved video queue and bookmarks for continued insurance learning.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('watch-later')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'watch-later'
              ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
              : 'border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-xs'
          }`}
        >
          <FiClock className="text-sm" />
          <span>Watch Later ({watchLaterList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            activeTab === 'saved'
              ? 'border-emerald-500 bg-emerald-100/90 text-emerald-800 shadow-sm'
              : 'border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-xs'
          }`}
        >
          <FiBookmark className="text-sm" />
          <span>Saved Articles & Resources ({savedItems.length})</span>
        </button>
      </div>

      {/* Tab 1: Watch Later Queue */}
      {activeTab === 'watch-later' && (
        <div className="space-y-3">
          {watchLaterList.length > 0 ? (
            <div className="space-y-3">
              {watchLaterList.map((item) => {
                const fullVideo = ACADEMY_VIDEOS.find((v) => v.id === item.videoId);
                const isShort = item.type === 'short' || fullVideo?.type === 'short';
                const playUrl = isShort
                  ? `/insurance-academy/shorts?id=${item.videoId}`
                  : `/insurance-academy/watch/${item.videoId}`;

                return (
                  <div
                    key={item.videoId}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                        <FiPlay />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">
                          {item.category || 'Health Insurance'} • {item.duration || 'Short'}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-[#102A43] truncate">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <Link
                        to={playUrl}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <FiPlay className="text-xs" />
                        <span>Watch</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleRemoveWatchLater(item.videoId)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove from Watch Later"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3 max-w-md mx-auto my-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
                <FiClock />
              </div>
              <h3 className="text-sm font-bold text-[#102A43]">
                Your Watch Later list is empty
              </h3>
              <p className="text-xs text-slate-500">
                Explore our insurance videos and click the bookmark icon to save lessons for later.
              </p>
              <Link
                to="/insurance-academy/videos"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Browse Videos</span>
                <FiArrowRight className="text-xs" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Articles & Resources */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          {savedItems.length > 0 ? (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0">
                      <FiBookmark />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">
                        {item.category || 'Article'}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-[#102A43] truncate">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleRemoveSaved(item)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3 max-w-md mx-auto my-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
                <FiBookmark />
              </div>
              <h3 className="text-sm font-bold text-[#102A43]">
                No saved articles or resources yet
              </h3>
              <p className="text-xs text-slate-500">
                Bookmark articles and guides to review key takeaways and document checklists.
              </p>
              <Link
                to="/insurance-academy/guides"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Browse Guides</span>
                <FiArrowRight className="text-xs" />
              </Link>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
