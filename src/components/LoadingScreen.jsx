import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="relative flex flex-col items-center gap-4 p-8">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-sky-500 animate-spin"></div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-emerald-400 rounded blur opacity-20"></div>
            <span className="relative text-slate-700 font-medium text-sm">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
