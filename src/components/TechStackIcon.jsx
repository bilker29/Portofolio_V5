import React from "react";
import { Network, GitBranch, Database, ShieldCheck } from "lucide-react";

const TechStackIcon = ({ TechStackIcon, Language, Category, Color }) => {
  const isCisco = TechStackIcon === "cisco";
  const isGit = TechStackIcon === "git";
  const isSupabase = TechStackIcon === "supabase";

  return (
    <div className="group relative p-5 rounded-2xl glass-card border border-slate-200/90 hover:border-sky-300 transition-all duration-500 ease-out flex flex-col items-center justify-between gap-3 hover:-translate-y-2 hover:rotate-1 cursor-pointer shadow-md hover:shadow-2xl hover:shadow-sky-500/15 overflow-hidden">
      {/* Background Gradient Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          Color || "from-sky-400/15 to-emerald-400/10"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
      />

      {/* Top Category Badge */}
      {Category && (
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100/90 group-hover:bg-white text-slate-600 group-hover:text-sky-700 border border-slate-200/80 transition-colors">
          {Category}
        </span>
      )}

      {/* Icon Wrapper */}
      <div className="relative my-1">
        <div className="absolute -inset-2 bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-50 blur-md transition duration-500 animate-pulse" />
        
        {isCisco ? (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-sky-900/90 text-sky-300 flex flex-col items-center justify-center p-2 shadow-inner border border-sky-400/30 group-hover:scale-110 transition-transform">
            <Network className="w-8 h-8 md:w-10 md:h-10 text-cyan-300 animate-pulse" />
            <span className="text-[9px] font-black tracking-widest mt-1 text-sky-200 uppercase">CISCO</span>
          </div>
        ) : isGit ? (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-orange-600/90 text-white flex flex-col items-center justify-center p-2 shadow-inner border border-orange-400/30 group-hover:scale-110 transition-transform">
            <GitBranch className="w-8 h-8 md:w-10 md:h-10 text-white" />
            <span className="text-[9px] font-black tracking-widest mt-1 text-orange-100 uppercase">GIT</span>
          </div>
        ) : isSupabase ? (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-emerald-950/90 text-emerald-400 flex flex-col items-center justify-center p-2 shadow-inner border border-emerald-400/30 group-hover:scale-110 transition-transform">
            <Database className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            <span className="text-[9px] font-black tracking-widest mt-1 text-emerald-200 uppercase">SUPABASE</span>
          </div>
        ) : (
          <img
            src={TechStackIcon}
            alt={`${Language} icon`}
            className="relative h-14 w-14 md:h-16 md:w-16 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
          />
        )}
      </div>

      {/* Language Name */}
      <span className="text-slate-800 font-extrabold text-xs md:text-sm tracking-wide group-hover:text-sky-600 transition-colors duration-300 text-center line-clamp-1">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
