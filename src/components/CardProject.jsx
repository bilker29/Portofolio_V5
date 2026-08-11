import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, TechStack = [] }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full h-full cursor-pointer">
      <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-2xl glass-card border border-slate-200/90 shadow-md hover:shadow-2xl hover:shadow-sky-500/15 hover:border-sky-300 transition-all duration-500 transform hover:-translate-y-1.5">
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="p-5 flex-1 flex flex-col">
          {/* Image Container with Badge Overlay & Zoom Lens Effect */}
          <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-100 aspect-[16/9]">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>

            {/* Optional Tech Tag Badge Overlay */}
            {TechStack && TechStack.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                {TechStack.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                {Title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mt-1.5">
                {Description}
              </p>
            </div>

            {/* Actions Row */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-1.5 text-sky-600 hover:text-emerald-600 font-bold text-xs sm:text-sm transition-colors duration-200 group/link"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="text-slate-400 text-xs sm:text-sm">
                  Demo N/A
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${toSlug(Title)}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <span className="text-slate-400 text-xs sm:text-sm">
                  Details N/A
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
