import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast('success', msg, dur),
    error: (msg, dur) => addToast('error', msg, dur),
    info: (msg, dur) => addToast('info', msg, dur)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-md w-[calc(100%-40px)] pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border text-xs sm:text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              t.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-700/80 backdrop-blur-md'
                : t.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700/80 backdrop-blur-md'
                : 'bg-slate-900/90 text-white border-slate-700/80 backdrop-blur-md'
            }`}
          >
            <span className="shrink-0 text-base mt-0.5">
              {t.type === 'success' && <FiCheckCircle className="text-emerald-400" />}
              {t.type === 'error' && <FiAlertCircle className="text-rose-400" />}
              {t.type === 'info' && <FiInfo className="text-sky-400" />}
            </span>
            <span className="flex-grow leading-snug">{t.message}</span>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-white/60 hover:text-white shrink-0 p-0.5 rounded cursor-pointer"
            >
              <FiX className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
