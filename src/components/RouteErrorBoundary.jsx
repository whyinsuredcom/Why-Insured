import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Route-Level Error Boundary
 * 
 * Wraps the route outlet in App.jsx with a unique key per route.
 * If a single page crashes, the Navbar, Footer, and Floating Actions remain
 * interactive, while the main content area renders a clean fallback card.
 */
export default class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[RouteErrorBoundary] Route render error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 font-sans">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-xs">
            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-[#102A43] mb-2">
              Unable to Display This Page
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We encountered an issue rendering this section. Your session is active and other sections remain fully available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#00A86B] hover:bg-[#0fa26e] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102A43] text-xs font-semibold transition-colors cursor-pointer"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
