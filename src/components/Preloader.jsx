import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [startLoading, setStartLoading] = useState(false);

  useEffect(() => {
    // Safety watchdog: ensure preloader unmounts even if backgrounded or throttled
    const safetyTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    // Stage 1: Logo fades in first. Trigger progress loading after 200ms.
    const startTimer = setTimeout(() => {
      setStartLoading(true);
    }, 200);

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(startTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!startLoading) return;

    // Stage 2 & 3: Gradual progress increment from 0 to 100 over ~0.7 seconds
    const duration = 700; // total animation time in ms
    const intervalTime = 25; // update frequency
    const steps = duration / intervalTime;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Stage 4: Pause briefly at 100% and then complete the loading sequence
        const exitTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 150);
        return () => clearTimeout(exitTimer);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [startLoading, onComplete]);

  const isCompleted = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] overflow-hidden select-none"
    >
      {/* Soft emerald background aura */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#059669]/5 blur-[90px] pointer-events-none" />

      {/* Loading container */}
      <div className="relative z-10 flex flex-col items-center max-w-[280px] sm:max-w-[320px] w-full text-center px-4">
        
        {/* Stage 1 & Exit Stage: Logo animate */}
        <motion.img
          src={logoImg}
          alt="WHYINSURED Logo"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isCompleted ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="h-12 sm:h-15 w-auto object-contain mb-8 filter brightness-0 invert"
        />

        {/* Stage 2 & 3 & Exit Stage: Loading indicators */}
        <motion.div
          animate={isCompleted ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center space-y-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={startLoading ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
          >
            {progress < 100 ? 'Loading...' : 'Ready'}
          </motion.span>

          {/* Premium Progress Bar */}
          <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              animate={startLoading ? { width: `${progress}%` } : { width: '0%' }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
              className="h-full bg-[#059669]"
            />
          </div>

          {/* Percentage Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={startLoading ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] font-mono text-slate-400 font-bold"
          >
            {progress}%
          </motion.span>
        </motion.div>

      </div>
    </motion.div>
  );
}
