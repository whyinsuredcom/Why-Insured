/**
 * Safe Browser Storage Utility
 * 
 * Prevents DOMException / SecurityError crashes when accessing
 * localStorage or sessionStorage in restricted contexts:
 * - Third-party cookies/storage blocked
 * - Private / Incognito browsing
 * - Sandboxed iframes
 * - Quota exceeded
 */

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

const memorySession = new MemoryStorage();
const memoryLocal = new MemoryStorage();

export const safeSessionStorage = {
  getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    return memorySession.getItem(key);
  },

  setItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    memorySession.setItem(key, value);
  },

  removeItem(key) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    memorySession.removeItem(key);
  }
};

export const safeLocalStorage = {
  getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    return memoryLocal.getItem(key);
  },

  setItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    memoryLocal.setItem(key, value);
  },

  removeItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (_) {
      // Storage access blocked or restricted
    }
    memoryLocal.removeItem(key);
  }
};

