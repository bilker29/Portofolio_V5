import React from "react";
import { ArrowUp, Code2, Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/60 backdrop-blur-xl mt-12 py-10 px-[5%] sm:px-[5%] lg:px-[10%]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0d9488] to-[#059669] text-white shadow-md shadow-sky-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <a
              href="#Home"
              onClick={scrollToTop}
              className="text-lg font-black bg-gradient-to-r from-slate-900 via-sky-900 to-emerald-800 bg-clip-text text-transparent tracking-tight"
            >
              Billy Wicaksono
            </a>
            <p className="text-xs text-slate-500 font-medium">
              Google Student Ambassador 2026 | IT Enthusiast
            </p>
          </div>
        </div>

        {/* Copyright text */}
        <div className="text-center text-xs text-slate-500 font-semibold flex items-center gap-1">
          <span>© {currentYear} BilKer™. Built with passion & precision</span>
        </div>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full glass-card border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-600 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
