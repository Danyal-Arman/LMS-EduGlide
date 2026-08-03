import { Loader2 } from "lucide-react";

const LoadingScreen = ({ message = "Loading experience" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-8 py-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
