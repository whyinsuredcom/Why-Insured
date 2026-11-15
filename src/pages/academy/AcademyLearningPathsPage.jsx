import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiAward,
  FiCheckCircle,
  FiPlay
} from 'react-icons/fi';
import { ACADEMY_LEARNING_PATHS } from '../../data/academyData';
import {
  getLearningProgress,
  isLessonCompleted,
  toggleLessonCompletion,
  subscribeToAcademyStorage
} from '../../services/academyStorageService';

export default function AcademyLearningPathsPage() {
  const [progressState, setProgressState] = useState({});

  useEffect(() => {
    setProgressState(getLearningProgress());
    const unsubscribe = subscribeToAcademyStorage(() => {
      setProgressState(getLearningProgress());
    });
    return unsubscribe;
  }, []);

  const handleToggle = (pathId, lessonId) => {
    toggleLessonCompletion(pathId, lessonId);
  };

  return (
    <div className="space-y-8 pb-16 text-left select-none">
      
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center text-xs shadow-xs">
            <FiAward />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] font-display">
            Curated Insurance Learning Paths
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Structured step-by-step masterclasses to build genuine literacy from foundational terms to advanced claim defense.
        </p>
      </div>

      {/* 3 Learning Paths: Beginner, Intermediate, Advanced */}
      <div className="space-y-8">
        {ACADEMY_LEARNING_PATHS.map((path) => {
          const pathData = progressState[path.id] || { completedLessons: [] };
          const completedCount = pathData.completedLessons?.length || 0;
          const totalCount = path.lessons.length;
          const percent = Math.round((completedCount / totalCount) * 100);

          return (
            <div
              key={path.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6"
            >
              {/* Path Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        path.level === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : path.level === 'Intermediate'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}
                    >
                      {path.level} Path • {path.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Est. Time: {path.estimatedTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[#102A43] font-display">
                    {path.title}
                  </h2>

                  <p className="text-xs text-slate-600 max-w-2xl">
                    {path.description}
                  </p>
                </div>

                {/* Progress Meter */}
                <div className="w-full sm:w-56 shrink-0 space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center justify-between text-xs font-bold text-[#102A43]">
                    <span>Your Progress</span>
                    <span className="font-mono text-emerald-600">{percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#00A86B] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block text-right">
                    {completedCount} of {totalCount} lessons completed
                  </span>
                </div>
              </div>

              {/* Sequential Lessons List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Course Modules:
                </h3>

                <div className="space-y-2.5">
                  {path.lessons.map((lesson, idx) => {
                    const isDone = isLessonCompleted(path.id, lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isDone
                            ? 'bg-emerald-50/40 border-emerald-200/60'
                            : 'bg-slate-50/60 hover:bg-white border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                          {/* Complete Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggle(path.id, lesson.id)}
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                              isDone
                                ? 'bg-[#00A86B] border-[#00A86B] text-white shadow-2xs'
                                : 'bg-white border-slate-300 hover:border-[#00A86B] text-transparent'
                            }`}
                            title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            <FiCheckCircle className="text-sm" />
                          </button>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#102A43]">
                                Lesson 0{idx + 1}: {lesson.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                • {lesson.duration}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              {lesson.summary}
                            </p>
                          </div>
                        </div>

                        {/* Action Link to Video / Watch */}
                        {lesson.videoId && (
                          <Link
                            to={`/insurance-academy/watch/${lesson.videoId}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#102A43] hover:text-[#00A86B] transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                          >
                            <FiPlay className="text-xs text-emerald-600" />
                            <span>Start Lesson</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
