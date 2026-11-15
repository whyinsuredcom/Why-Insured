import React, { useState, useRef, useEffect } from 'react';
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiRotateCcw,
  FiBookmark,
  FiCheck,
  FiClock,
  FiShield
} from 'react-icons/fi';
import {
  recordWatchProgress,
  isWatchLater,
  toggleWatchLater
} from '../../services/academyStorageService';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function AcademyVideoPlayer({ video, onTimeUpdate = () => {} }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [inWatchLater, setInWatchLater] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (!video?.id) return;
    setInWatchLater(isWatchLater(video.id));
    setCurrentTime(0);
    setIsPlaying(false);
  }, [video?.id]);

  // Handle video element timeupdate
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 0;
    setCurrentTime(current);
    onTimeUpdate(current);

    // Save watch progress periodically (every 5 seconds)
    if (Math.round(current) % 5 === 0 && total > 0) {
      recordWatchProgress(video.id, current, total, video);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    videoRef.current.volume = val;
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const cyclePlaybackRate = () => {
    if (!videoRef.current) return;
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const handleToggleWatchLater = () => {
    const nextState = toggleWatchLater(video);
    setInWatchLater(nextState);
  };

  if (!video) return null;

  // Case 1: Genuine MP4 video asset or URL available
  if (video.videoUrl) {
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center group select-none"
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            recordWatchProgress(video.id, duration, duration, video);
          }}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
          playsInline
        />

        {/* Big Center Play Button Overlay (when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-2xs transition-opacity cursor-pointer z-10"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00A86B] hover:bg-[#0FA26E] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
              <FiPlay className="text-2xl sm:text-3xl ml-1" />
            </div>
          </button>
        )}

        {/* Player Controls Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-8 pb-3 px-4 transition-opacity duration-300 z-20 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Slider */}
          <div className="relative mb-2.5 flex items-center group/scrub">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#00A86B] focus:outline-none"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            {/* Left Controls: Play, Restart, Time, Volume */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-[#00A86B] transition-colors p-1"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <FiPause className="text-lg" /> : <FiPlay className="text-lg" />}
              </button>

              <button
                type="button"
                onClick={restartVideo}
                className="hover:text-[#00A86B] transition-colors p-1"
                title="Restart"
              >
                <FiRotateCcw className="text-base" />
              </button>

              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="hover:text-[#00A86B] transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <FiVolumeX className="text-base text-red-400" />
                  ) : (
                    <FiVolume2 className="text-base" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Right Controls: Speed & Fullscreen */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cyclePlaybackRate}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-bold text-xs transition-colors"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="hover:text-[#00A86B] transition-colors p-1"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <FiMinimize className="text-lg" /> : <FiMaximize className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: YouTube Embed Video
  if (video.youtubeId) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // Case 3: Authentic WHYINSURED Educational Lesson Preview (Upcoming Lesson State)
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0C1E38] via-[#102A43] to-[#0A192F] text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-slate-800 select-none">
      {/* Decorative Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#00A86B_0%,transparent_60%)] opacity-20 pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            WHYINSURED Academy • {video.category}
          </span>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-slate-200">
          Duration: {video.duration || 'Comprehensive Lesson'}
        </span>
      </div>

      {/* Center Topic Overview */}
      <div className="max-w-2xl my-auto z-10 space-y-3 text-left">
        <div className="w-12 h-12 rounded-2xl bg-[#00A86B]/20 border border-[#00A86B]/40 text-[#00A86B] flex items-center justify-center text-xl shadow-lg">
          <FiShield />
        </div>
        <h2 className="text-lg sm:text-2xl font-bold font-display text-white leading-tight">
          {video.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {video.description ||
            'Comprehensive instructional walkthrough decoding policy wording, hospital TPA desks, and claim settlement guidelines.'}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 z-10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FiClock className="text-emerald-400" />
          <span>Curated by {video.instructor || 'WHYINSURED Advisory Specialists'}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleWatchLater}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
              inWatchLater
                ? 'bg-emerald-600 text-white'
                : 'bg-white/15 hover:bg-white/25 border border-white/20 text-white'
            }`}
          >
            {inWatchLater ? (
              <>
                <FiCheck className="text-sm" />
                <span>Saved to Watch Later</span>
              </>
            ) : (
              <>
                <FiBookmark className="text-sm" />
                <span>Save to Watch Later</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

