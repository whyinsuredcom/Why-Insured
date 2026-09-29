import React, { useState, useRef } from 'react';
import { 
  FiUpload, FiTrash2, FiVideo, FiPlay, FiImage, 
  FiCheck, FiX, FiShield, FiHeart, FiActivity, FiHome, FiCalendar, FiUsers, FiUser, FiTrendingUp, FiCpu, FiTruck, FiDollarSign, FiEye
} from 'react-icons/fi';
import adminApi from '../services/adminApi';

const ICON_PRESETS = [
  { name: 'shield', icon: FiShield, label: 'Shield' },
  { name: 'heart', icon: FiHeart, label: 'Heart' },
  { name: 'activity', icon: FiActivity, label: 'Activity' },
  { name: 'home', icon: FiHome, label: 'Room/Home' },
  { name: 'calendar', icon: FiCalendar, label: 'Calendar' },
  { name: 'users', icon: FiUsers, label: 'Family' },
  { name: 'user', icon: FiUser, label: 'Individual' },
  { name: 'trending-up', icon: FiTrendingUp, label: 'Bonus' },
  { name: 'cpu', icon: FiCpu, label: 'Robotic' },
  { name: 'truck', icon: FiTruck, label: 'Ambulance' },
  { name: 'dollar-sign', icon: FiDollarSign, label: 'Premium' },
  { name: 'eye', icon: FiEye, label: 'Vision' }
];

export function IconField({ value, onChange, label = 'Icon' }) {
  const [uploading, setUploading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await adminApi.uploadFile(file);
      if (res.data?.url) {
        onChange(res.data.url);
      }
    } catch (err) {
      alert(`Icon upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isUrl = value && (value.startsWith('http') || value.startsWith('/assets') || value.startsWith('/uploads') || value.startsWith('data:'));
  const presetMatch = ICON_PRESETS.find(p => p.name === value);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        {label} <span className="text-slate-400 font-normal lowercase">(SVG, PNG, WebP or Preset)</span>
      </label>

      <div className="flex items-center gap-3">
        {/* Preview Box */}
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative group">
          {value ? (
            isUrl ? (
              <img src={value} alt="Icon Preview" className="w-8 h-8 object-contain" />
            ) : presetMatch ? (
              React.createElement(presetMatch.icon, { className: 'w-6 h-6 text-emerald-600' })
            ) : (
              <span className="text-xs font-bold text-slate-700 uppercase">{value.substring(0, 3)}</span>
            )
          ) : (
            <FiImage className="w-5 h-5 text-slate-400" />
          )}
        </div>

        {/* Action Controls */}
        <div className="flex-1 flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".svg,.png,.webp,.jpg,.jpeg"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <FiUpload className="w-3.5 h-3.5 text-slate-500" />
            <span>{uploading ? 'Uploading...' : value ? 'Replace Icon' : 'Upload Icon'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 transition-colors"
          >
            {showPresets ? 'Hide Presets' : 'Choose Preset'}
          </button>

          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors title='Remove Icon'"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Icons Selection Drawer */}
      {showPresets && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-4 sm:grid-cols-6 gap-2">
          {ICON_PRESETS.map((p) => {
            const IconComp = p.icon;
            const isSelected = value === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  onChange(p.name);
                  setShowPresets(false);
                }}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span className="text-[10px] font-medium leading-none truncate max-w-full">{p.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Manual URL input fallback */}
      <input
        type="text"
        placeholder="Or enter icon name / URL (e.g. /assets/icon.svg)"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </div>
  );
}

export function VideoField({ value, onChange, label = 'Video Explainer' }) {
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await adminApi.uploadFile(file);
      if (res.data?.url) {
        onChange(res.data.url);
      }
    } catch (err) {
      alert(`Video upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isLocalVideo = value && (value.endsWith('.mp4') || value.endsWith('.webm') || value.startsWith('/assets') || value.startsWith('/uploads'));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        {label} <span className="text-slate-400 font-normal lowercase">(Optional MP4 video or URL)</span>
      </label>

      <div className="flex items-center gap-3">
        {/* Video Icon / Preview trigger */}
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
          {value ? (
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full h-full flex items-center justify-center text-emerald-600 hover:text-emerald-700"
              title="Click to preview video"
            >
              <FiPlay className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <FiVideo className="w-5 h-5 text-slate-400" />
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".mp4,.webm,.ogg,.mov"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <FiUpload className="w-3.5 h-3.5 text-slate-500" />
            <span>{uploading ? 'Uploading Video...' : value ? 'Replace Video' : 'Upload Video File'}</span>
          </button>

          {value && (
            <>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 transition-colors"
              >
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove Video"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Video URL Input */}
      <input
        type="text"
        placeholder="Or enter video URL (e.g. /assets/unlimited.mp4 or YouTube URL)"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
      />

      {/* Video Preview Box */}
      {showPreview && value && (
        <div className="mt-2 p-2 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          {isLocalVideo ? (
            <video src={value} controls className="w-full max-h-48 rounded-lg object-contain bg-black" />
          ) : value.includes('youtube.com') || value.includes('youtu.be') ? (
            <div className="aspect-video w-full">
              <iframe
                src={value.replace('watch?v=', 'embed/')}
                title="Video preview"
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-xs text-slate-300 p-2 text-center">Video preview available at: {value}</p>
          )}
        </div>
      )}
    </div>
  );
}
