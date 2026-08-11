import React, { useState, useEffect, memo } from "react";
import { Sparkles, Video, Camera, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../supabase";

// Media Items Data
const GALLERY_ROW_TOP = [
  {
    id: "top-1",
    type: "photo",
    aspect: "portrait",
    title: "Seminar & Gathering Pasundan",
    subtitle: "Acara & Kegiatan Mahasiswa",
    date: "2024",
    tag: "Event",
    src: "/gallery/photo1.png",
    caption: "Momen kebersamaan dalam acara kampus Teknik Informatika.",
  },
  {
    id: "top-2",
    type: "video",
    aspect: "landscape",
    title: "Software Engineering & Coding Session",
    subtitle: "Live Project Demo",
    date: "2024",
    tag: "Development",
    src: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42898-large.mp4",
    poster: "/Coding.gif",
    caption: "Proses coding dan eksplorasi arsitektur perangkat lunak.",
  },
  {
    id: "top-3",
    type: "photo",
    aspect: "landscape",
    title: "Kejuaraan Karate Nasional",
    subtitle: "Prestasi & Pertandingan",
    date: "2024",
    tag: "Sports & Karate",
    src: "/gallery/photo2.png",
    caption: "Fokus dan kedisiplinan dalam gelanggang pertandingan Karate.",
  },
  {
    id: "top-4",
    type: "photo",
    aspect: "portrait",
    title: "Presentasi & IT Workshop",
    subtitle: "Pembicara & Diskusi Teknologi",
    date: "2023",
    tag: "Workshop",
    src: "/gallery/photo3.png",
    caption: "Berbagi pengalaman dan wawasan seputar dunia software.",
  },
  {
    id: "top-5",
    type: "video",
    aspect: "portrait",
    title: "Continuous Integration & Tech Workflow",
    subtitle: "Short Clip",
    date: "2024",
    tag: "Engineering",
    src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-computer-keyboard-40330-large.mp4",
    poster: "/Animation1.gif",
    caption: "Keterampilan ngetik & otomasi alur kerja pengembangan web.",
  },
];

const GALLERY_ROW_BOTTOM = [
  {
    id: "bot-1",
    type: "photo",
    aspect: "portrait",
    title: "Pertandingan Bola Voli",
    subtitle: "Tim & Kompetisi Olahraga",
    date: "2024",
    tag: "Volleyball",
    src: "/gallery/photo4.png",
    caption: "Semangat kerjasama tim dalam turnamen bola voli.",
  },
  {
    id: "bot-2",
    type: "video",
    aspect: "landscape",
    title: "Web App & Dashboard Showcase",
    subtitle: "Interactive UI",
    date: "2024",
    tag: "Portfolio Showcase",
    src: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-computer-39886-large.mp4",
    poster: "/Animation1.gif",
    caption: "Membangun antarmuka modern yang responsif dan interaktif.",
  },
  {
    id: "bot-3",
    type: "photo",
    aspect: "landscape",
    title: "Kuliah & Kolaborasi Project",
    subtitle: "Teknik Informatika",
    date: "2023",
    tag: "University",
    src: "/gallery/photo1.png",
    caption: "Kolaborasi bersama rekan-rekan seperjuangan di bangku perkuliahan.",
  },
  {
    id: "bot-4",
    type: "photo",
    aspect: "portrait",
    title: "Sesi Latihan Karate",
    subtitle: "Kedisiplinan & Latihan Otot",
    date: "2024",
    tag: "Karate Do",
    src: "/gallery/photo2.png",
    caption: "Latihan rutin menjaga stamina dan konsentrasi mental.",
  },
  {
    id: "bot-5",
    type: "photo",
    aspect: "landscape",
    title: "Tech Conference & Networking",
    subtitle: "Meetup & Discussion",
    date: "2024",
    tag: "Networking",
    src: "/gallery/photo3.png",
    caption: "Bertukar gagasan bersama para profesional dan antusias IT.",
  },
];

const PolaroidCard = memo(({ item, onClick }) => {
  const isPortrait = item.aspect === "portrait";

  return (
    <div
      onClick={() => onClick(item)}
      className="group cursor-pointer flex-shrink-0 relative transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
    >
      <div
        className={`glass-card border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-sky-300 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-300 ${
          isPortrait ? "w-[250px] sm:w-[280px]" : "w-[310px] sm:w-[360px]"
        }`}
      >
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-100">
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/80">
            {item.type === "video" ? (
              <Video className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span className="text-[11px] font-extrabold text-slate-800">
              {item.tag}
            </span>
          </div>

          {item.type === "video" ? (
            <div className="relative w-full h-[180px] sm:h-[210px] overflow-hidden">
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
          ) : (
            <div className="relative w-full h-[180px] sm:h-[210px] overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
            </div>
          )}
        </div>

        <div className="pt-3 pb-1 px-1 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-sky-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                {item.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {item.date}
            </span>
          </div>

          {item.caption && (
            <p className="text-[11px] text-slate-500 mt-2 italic line-clamp-1">
              "{item.caption}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [rowTop, setRowTop] = useState(GALLERY_ROW_TOP);
  const [rowBottom, setRowBottom] = useState(GALLERY_ROW_BOTTOM);

  useEffect(() => {
    AOS.init({ once: false });

    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          const top = data.filter((item) => item.row !== "bottom");
          const bottom = data.filter((item) => item.row === "bottom");

          if (top.length > 0) setRowTop(top);
          if (bottom.length > 0) setRowBottom(bottom);
        }
      } catch (err) {
        console.error("Error loading gallery items from Supabase:", err);
      }
    };

    fetchGallery();
  }, []);

  const topMarquee = [...rowTop, ...rowTop];
  const bottomMarquee = [...rowBottom, ...rowBottom];

  return (
    <div
      className="py-16 relative overflow-hidden text-slate-800"
      id="Gallery"
    >
      <div className="text-center mb-12 px-4" data-aos="fade-down" data-aos-duration="800">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          <span className="text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            Dokumentasi & Aktivitas
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] tracking-tight">
          Activity Gallery
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
          Kumpulan momen perkuliahan, kejuaraan Karate nasional, seminar IT, serta kebersamaan harian.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-6 relative">
        <div className="overflow-hidden w-full py-2">
          <div className="flex gap-6 w-max animate-marquee-left">
            {topMarquee.map((item, idx) => (
              <PolaroidCard
                key={`${item.id}-${idx}`}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full py-2">
          <div className="flex gap-6 w-max animate-marquee-right">
            {bottomMarquee.map((item, idx) => (
              <PolaroidCard
                key={`${item.id}-${idx}`}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl glass-card border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden text-slate-800 bg-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs">
                  {selectedItem.tag}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 max-h-[450px] flex items-center justify-center">
                {selectedItem.type === "video" ? (
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    loop
                    className="w-full max-h-[450px] object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full max-h-[450px] object-contain"
                  />
                )}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">{selectedItem.subtitle}</span>
                  <span className="font-bold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {selectedItem.date}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  {selectedItem.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
