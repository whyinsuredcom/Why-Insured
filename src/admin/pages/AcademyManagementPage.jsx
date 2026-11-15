import React, { useState, useEffect } from 'react';
import {
  FiVideo,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiSearch,
  FiFileText,
  FiPlay,
  FiZap
} from 'react-icons/fi';
import adminApi from '../services/adminApi';
import { useToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import { ACADEMY_VIDEOS, ACADEMY_ARTICLES, ACADEMY_CATEGORIES } from '../../data/academyData';

export default function AcademyManagementPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'articles'

  // Videos state
  const [videos, setVideos] = useState(ACADEMY_VIDEOS);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Health Insurance',
    type: 'long',
    topic: '',
    duration: '10:00',
    videoUrl: '',
    description: '',
    isFeatured: false,
    isPublished: true
  });

  // Articles state
  const [articles, setArticles] = useState(ACADEMY_ARTICLES);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Policy Basics',
    readingTime: '5 min read',
    excerpt: '',
    content: ''
  });

  // Delete modal state
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: 'video', // 'video' | 'article'
    id: null,
    title: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Fetch latest data from backend API with fallback
  useEffect(() => {
    loadAcademyData();
  }, []);

  const loadAcademyData = async () => {
    try {
      const resV = await adminApi.getAcademyVideos();
      if (resV.success && Array.isArray(resV.data) && resV.data.length > 0) {
        setVideos(resV.data);
      }
      const resA = await adminApi.getAcademyArticles();
      if (resA.success && Array.isArray(resA.data) && resA.data.length > 0) {
        setArticles(resA.data);
      }
    } catch {
      // Keep static fallback
    }
  };

  // Open Create/Edit Video Modal
  const openVideoModal = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setVideoForm({
        title: video.title || '',
        category: video.category || 'Health Insurance',
        type: video.type || 'long',
        topic: video.topic || '',
        duration: video.duration || '10:00',
        videoUrl: video.videoUrl || '',
        description: video.description || '',
        isFeatured: Boolean(video.isFeatured),
        isPublished: Boolean(video.isPublished)
      });
    } else {
      setEditingVideo(null);
      setVideoForm({
        title: '',
        category: 'Health Insurance',
        type: 'long',
        topic: '',
        duration: '10:00',
        videoUrl: '',
        description: '',
        isFeatured: false,
        isPublished: true
      });
    }
    setVideoModalOpen(true);
  };

  // Submit Video
  const handleSaveVideo = async (e) => {
    e.preventDefault();
    if (!videoForm.title.trim()) {
      toast.error('Video title is required');
      return;
    }

    try {
      if (editingVideo) {
        const res = await adminApi.updateAcademyVideo(editingVideo.id, videoForm);
        if (res.success) {
          toast.success('Video updated successfully');
        }
        setVideos((prev) =>
          prev.map((v) => (v.id === editingVideo.id ? { ...v, ...videoForm } : v))
        );
      } else {
        const res = await adminApi.createAcademyVideo(videoForm);
        const newObj = res.success
          ? res.data
          : {
              ...videoForm,
              id: `vid-${Date.now()}`,
              views: '1',
              uploadDate: 'Just now'
            };
        setVideos((prev) => [newObj, ...prev]);
        toast.success('Video created successfully');
      }
      setVideoModalOpen(false);
    } catch {
      toast.error('Failed to save video');
    }
  };

  // Submit Article
  const handleSaveArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      toast.error('Article title is required');
      return;
    }

    try {
      const res = await adminApi.createAcademyArticle(articleForm);
      const newObj = res.success
        ? res.data
        : {
            ...articleForm,
            id: `art-${Date.now()}`,
            slug: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            publishedDate: 'Just now',
            isPublished: true
          };
      setArticles((prev) => [newObj, ...prev]);
      toast.success('Article published successfully');
      setArticleModalOpen(false);
    } catch {
      toast.error('Failed to create article');
    }
  };

  // Handle Deletion
  const handleConfirmDelete = async () => {
    const { type, id } = deleteConfirm;
    if (type === 'video') {
      try {
        await adminApi.deleteAcademyVideo(id);
      } catch {}
      setVideos((prev) => prev.filter((v) => v.id !== id));
      toast.success('Video deleted');
    } else {
      try {
        await adminApi.deleteAcademyArticle(id);
      } catch {}
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success('Article deleted');
    }
    setDeleteConfirm({ open: false, type: 'video', id: null, title: '' });
  };

  const filteredVideos = videos.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (v.title || '').toLowerCase().includes(q) ||
      (v.category || '').toLowerCase().includes(q) ||
      (v.topic || '').toLowerCase().includes(q)
    );
  });

  const filteredArticles = articles.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (a.title || '').toLowerCase().includes(q) ||
      (a.category || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Insurance Academy Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage educational video lessons, shorts, articles, and learning topics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'videos' ? (
            <button
              type="button"
              onClick={() => openVideoModal()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus />
              <span>Add New Video</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setArticleForm({
                  title: '',
                  category: 'Policy Basics',
                  readingTime: '5 min read',
                  excerpt: '',
                  content: ''
                });
                setArticleModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus />
              <span>Publish Article</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Row & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FiVideo />
            <span>Videos ({videos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FiFileText />
            <span>Articles ({articles.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* =====================================================================
          TAB 1: VIDEOS TABLE
      ===================================================================== */}
      {activeTab === 'videos' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Title & Topic</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      {video.type === 'short' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                          <FiZap /> Shorts
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          <FiPlay /> Long
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="font-bold text-slate-800 block truncate">
                        {video.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        Topic: {video.topic || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-600">
                        {video.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {video.duration || '0:50'}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600">
                      {video.views || '10K'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <FiCheck className="text-xs" /> Published
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openVideoModal(video)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirm({
                              open: true,
                              type: 'video',
                              id: video.id,
                              title: video.title
                            })
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: ARTICLES TABLE
      ===================================================================== */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reading Time</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <span className="font-bold text-slate-800 block truncate">
                        {art.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {art.excerpt}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-600">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {art.readingTime}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {art.publishedDate}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirm({
                            open: true,
                            type: 'article',
                            id: art.id,
                            title: art.title
                          })
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT VIDEO MODAL
      ===================================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingVideo ? 'Edit Video Lesson' : 'Add New Educational Video'}
              </h3>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. How 2X Coverage Multipliers Work"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Format *
                  </label>
                  <select
                    value={videoForm.type}
                    onChange={(e) => setVideoForm({ ...videoForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="long">Long Educational (16:9)</option>
                    <option value="short">Shorts Video (9:16)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {ACADEMY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Topic / Key Tag
                  </label>
                  <input
                    type="text"
                    value={videoForm.topic}
                    onChange={(e) => setVideoForm({ ...videoForm, topic: e.target.value })}
                    placeholder="e.g. Restoration Benefits"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Duration (e.g. 10:15)
                  </label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="12:40"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Video URL / Storage Path (Optional)
                </label>
                <input
                  type="text"
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  placeholder="/uploads/my-video.mp4 or YouTube ID"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lesson Description
                </label>
                <textarea
                  rows={3}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Detailed summary of policy lessons..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={videoForm.isFeatured}
                    onChange={(e) => setVideoForm({ ...videoForm, isFeatured: e.target.checked })}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Feature on Academy Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={videoForm.isPublished}
                    onChange={(e) => setVideoForm({ ...videoForm, isPublished: e.target.checked })}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  {editingVideo ? 'Update Video' : 'Create Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD ARTICLE MODAL
      ===================================================================== */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Publish Educational Article
              </h3>
              <button
                type="button"
                onClick={() => setArticleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. Understanding Health Insurance Waiting Periods"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {ACADEMY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    value={articleForm.readingTime}
                    onChange={(e) => setArticleForm({ ...articleForm, readingTime: e.target.value })}
                    placeholder="6 min read"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Excerpt / Lead
                </label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  placeholder="Brief preview of what policyholders will learn..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Article Body (Markdown supported)
                </label>
                <textarea
                  rows={5}
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="Full educational content..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        open={deleteConfirm.open}
        title={`Delete ${deleteConfirm.type === 'video' ? 'Video' : 'Article'}`}
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This cannot be undone.`}
        confirmText="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ open: false, type: 'video', id: null, title: '' })}
      />

    </div>
  );
}
