import React from 'react';
import logoImg from '../assets/logo.png';

/**
 * Global Error Boundary
 * 
 * Sits at the root of the React component tree (main.jsx).
 * Catches any unhandled render or lifecycle exception across the entire application.
 * Permanently prevents blank white screens by displaying a reliable, on-brand recovery UI.
 */
export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to console for browser debugging
    console.error('[GlobalErrorBoundary] Caught an unhandled React error:', error, errorInfo);
  }

  handleReload = () => {
    try {
      window.location.reload();
    } catch (_) {
      window.location.href = '/';
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV);

      return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 font-sans select-none">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 text-center flex flex-col items-center animate-fadeIn">
            {/* WHYINSURED Logo */}
            <div className="mb-6 flex items-center justify-center">
              <img
                src={logoImg}
                alt="WHYINSURED"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Status Icon */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A86B] mb-5 shadow-xs">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#102A43] tracking-tight mb-2">
              We encountered a temporary display issue
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
              WHYINSURED is still running safely. The current page ran into an unexpected display state. You can reload or return to the homepage to continue exploring.
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A86B] to-[#0fa26e] hover:from-[#0fa26e] hover:to-[#059669] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Refresh Page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102A43] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>

            {/* Technical Diagnostics (Developer Accordion) */}
            <div className="w-full mt-4 text-left border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 flex items-center justify-between w-full cursor-pointer"
              >
                <span>Technical Diagnostics</span>
                <span>{this.state.showDetails ? '▲ Hide' : '▼ Details'}</span>
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3 bg-slate-900 rounded-xl text-left overflow-auto max-h-56 text-[10px] font-mono text-emerald-400 select-text leading-tight">
                  <p className="font-bold text-rose-400 mb-1">
                    {this.state.error?.toString() || 'Unknown Error'}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-slate-300 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                  {isDev && this.state.error?.stack && (
                    <pre className="text-slate-400 mt-2 border-t border-slate-700 pt-2 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

