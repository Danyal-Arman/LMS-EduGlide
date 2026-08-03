import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
          <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              The app hit an unexpected error. Please refresh the page to continue.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
