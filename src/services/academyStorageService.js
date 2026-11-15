/**
 * WHYINSURED Academy Local Storage & Personal Library Service
 * 
 * Manages:
 * - Continue Learning / Watch History
 * - Watch Later queue
 * - Liked Videos
 * - Saved Articles / Resources
 * - Learning Path lesson completion
 * 
 * Real-time event dispatching so components update instantly across navigation.
 */

const STORAGE_KEYS = {
  HISTORY: 'whyinsured_academy_watch_history',
  WATCH_LATER: 'whyinsured_academy_watch_later',
  LIKED: 'whyinsured_academy_liked_videos',
  SAVED_ITEMS: 'whyinsured_academy_saved_items',
  LEARNING_PROGRESS: 'whyinsured_academy_learning_progress'
};

function safeGet(key, fallback = []) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`[academyStorageService] Failed to read ${key}:`, e);
    return fallback;
  }
}

function safeSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('whyinsured_academy_update', { detail: { key, value } }));
  } catch (e) {
    console.error(`[academyStorageService] Failed to save ${key}:`, e);
  }
}

// =============================================================================
// WATCH HISTORY / CONTINUE LEARNING
// =============================================================================
export function getWatchHistory() {
  return safeGet(STORAGE_KEYS.HISTORY, []);
}

export function recordWatchProgress(videoId, currentTime = 0, duration = 0, videoMeta = {}) {
  if (!videoId) return;
  const history = getWatchHistory();
  const existingIdx = history.findIndex((item) => item.videoId === videoId);
  
  const progressPercent = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;

  const entry = {
    videoId,
    currentTime: Math.round(currentTime),
    duration: Math.round(duration),
    progressPercent,
    lastWatchedAt: new Date().toISOString(),
    title: videoMeta.title || (existingIdx >= 0 ? history[existingIdx].title : 'Insurance Video'),
    category: videoMeta.category || (existingIdx >= 0 ? history[existingIdx].category : 'Education'),
    thumbnail: videoMeta.thumbnail || null
  };

  let updated;
  if (existingIdx >= 0) {
    updated = [...history];
    updated[existingIdx] = { ...updated[existingIdx], ...entry };
  } else {
    updated = [entry, ...history].slice(0, 30); // Keep last 30
  }

  safeSet(STORAGE_KEYS.HISTORY, updated);
}

export function clearWatchHistory() {
  safeSet(STORAGE_KEYS.HISTORY, []);
}

// =============================================================================
// WATCH LATER
// =============================================================================
export function getWatchLaterList() {
  return safeGet(STORAGE_KEYS.WATCH_LATER, []);
}

export function isWatchLater(videoId) {
  const list = getWatchLaterList();
  return list.some((item) => item.videoId === videoId);
}

export function toggleWatchLater(video) {
  if (!video || !video.id) return false;
  const list = getWatchLaterList();
  const exists = list.some((item) => item.videoId === video.id);

  let updated;
  if (exists) {
    updated = list.filter((item) => item.videoId !== video.id);
  } else {
    updated = [
      {
        videoId: video.id,
        savedAt: new Date().toISOString(),
        title: video.title,
        category: video.category,
        duration: video.duration,
        type: video.type || 'long',
        thumbnail: video.thumbnail || null
      },
      ...list
    ];
  }

  safeSet(STORAGE_KEYS.WATCH_LATER, updated);
  return !exists;
}

// =============================================================================
// LIKED VIDEOS
// =============================================================================
export function getLikedVideos() {
  return safeGet(STORAGE_KEYS.LIKED, []);
}

export function isVideoLiked(videoId) {
  const list = getLikedVideos();
  return list.includes(videoId);
}

export function toggleLikeVideo(videoId) {
  if (!videoId) return false;
  const list = getLikedVideos();
  const exists = list.includes(videoId);

  const updated = exists ? list.filter((id) => id !== videoId) : [...list, videoId];
  safeSet(STORAGE_KEYS.LIKED, updated);
  return !exists;
}

// =============================================================================
// SAVED ITEMS (VIDEOS & ARTICLES)
// =============================================================================
export function getSavedItems() {
  return safeGet(STORAGE_KEYS.SAVED_ITEMS, []);
}

export function isItemSaved(id) {
  const list = getSavedItems();
  return list.some((item) => item.id === id);
}

export function toggleSaveItem(item) {
  if (!item || !item.id) return false;
  const list = getSavedItems();
  const exists = list.some((i) => i.id === item.id);

  let updated;
  if (exists) {
    updated = list.filter((i) => i.id !== item.id);
  } else {
    updated = [
      {
        id: item.id,
        kind: item.kind || (item.slug ? 'article' : 'video'),
        title: item.title,
        category: item.category,
        savedAt: new Date().toISOString()
      },
      ...list
    ];
  }

  safeSet(STORAGE_KEYS.SAVED_ITEMS, updated);
  return !exists;
}

// =============================================================================
// LEARNING PATH PROGRESS
// =============================================================================
export function getLearningProgress() {
  return safeGet(STORAGE_KEYS.LEARNING_PROGRESS, {});
}

export function isLessonCompleted(pathId, lessonId) {
  const progress = getLearningProgress();
  return Boolean(progress[pathId]?.completedLessons?.includes(lessonId));
}

export function toggleLessonCompletion(pathId, lessonId) {
  if (!pathId || !lessonId) return false;
  const progress = getLearningProgress();
  const pathData = progress[pathId] || { completedLessons: [] };
  const alreadyCompleted = pathData.completedLessons.includes(lessonId);

  const updatedLessons = alreadyCompleted
    ? pathData.completedLessons.filter((id) => id !== lessonId)
    : [...pathData.completedLessons, lessonId];

  const updated = {
    ...progress,
    [pathId]: {
      ...pathData,
      completedLessons: updatedLessons,
      lastUpdated: new Date().toISOString()
    }
  };

  safeSet(STORAGE_KEYS.LEARNING_PROGRESS, updated);
  return !alreadyCompleted;
}

export function subscribeToAcademyStorage(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => callback(e.detail);
  window.addEventListener('whyinsured_academy_update', handler);
  return () => window.removeEventListener('whyinsured_academy_update', handler);
}

export default {
  getWatchHistory,
  recordWatchProgress,
  clearWatchHistory,
  getWatchLaterList,
  isWatchLater,
  toggleWatchLater,
  getLikedVideos,
  isVideoLiked,
  toggleLikeVideo,
  getSavedItems,
  isItemSaved,
  toggleSaveItem,
  getLearningProgress,
  isLessonCompleted,
  toggleLessonCompletion,
  subscribeToAcademyStorage
};

