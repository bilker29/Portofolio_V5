import React from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you would use your router's navigation
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#030f1b] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 animate-bounce">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
            tidak pernah ada.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 shadow-md hover:shadow-lg border border-white/10"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            <Home size={20} />
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
