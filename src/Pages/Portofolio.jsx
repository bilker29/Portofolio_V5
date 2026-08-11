import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-5 py-2.5 bg-white/90 hover:bg-white text-slate-800 hover:text-sky-700 text-sm font-extrabold rounded-xl border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group active:scale-95"
  >
    <span>{isShowingMore ? "See Less" : "See More"}</span>
    {isShowingMore ? (
      <ChevronUp className="w-4 h-4 text-sky-600 transition-transform group-hover:-translate-y-0.5" />
    ) : (
      <ChevronDown className="w-4 h-4 text-sky-600 transition-transform group-hover:translate-y-0.5" />
    )}
  </button>
);

const FALLBACK_PROJECTS = [
  {
    id: 1,
    Title: "Sistem Informasi Perpustakaan (PUSTANI)",
    Description: "Mengembangkan aplikasi desktop manajemen literatur pertanian menggunakan Java GUI dan database MySQL dengan menerapkan relasi tabel yang optimal untuk manipulasi data.",
    Img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
    TechStack: ["Java GUI", "MySQL", "Java", "SQL"],
    Features: ["Manajemen Literatur", "Relasi Basis Data", "Sistem CRUD Desktop"],
    Link: "https://github.com/bilker29",
    Github: "https://github.com/bilker29",
  },
  {
    id: 2,
    Title: "Infrastruktur Jaringan Bandara (Cisco)",
    Description: "Merancang simulasi topologi jaringan kompleks berskala bandara menggunakan Cisco Packet Tracer dengan implementasi VLAN, Routing (OSPF/Static), dan DHCP Server.",
    Img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    TechStack: ["Cisco Packet Tracer", "VLAN", "OSPF", "Routing", "DHCP Server"],
    Features: ["Simulasi Topologi Jaringan Bandara", "VLAN & Subnetting", "Routing OSPF & Static"],
    Link: "https://github.com/bilker29",
    Github: "https://github.com/bilker29",
  },
  {
    id: 3,
    Title: "Website Portofolio & Company Profile",
    Description: "Membangun platform digital responsif untuk representasi bisnis agrikultur menggunakan HTML, CSS, Bootstrap, dan PHP.",
    Img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    TechStack: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"],
    Features: ["Full-Stack Web Development", "Desain Responsif", "Integrasi Database"],
    Link: "https://billy-wicaksono-website-portofolio.vercel.app/",
    Github: "https://github.com/bilker29",
  },
];

const FALLBACK_CERTIFICATES = [
  {
    id: 1,
    Title: "Sertifikasi Kompetensi Teknisi Komputer dan Jaringan – LSP BNSP",
    Img: "https://images.unsplash.com/photo-1589330694653-aded6fac0243?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    Title: "Sertifikasi Kemampuan Bahasa Inggris TOEIC",
    Img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    Title: "Sertifikasi Sabuk Hitam DAN 1 Karate",
    Img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    Title: "Juara 2 Mahasiswa Kata Perorangan Putra - UPI Karate Cup V 2025",
    Img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    Title: "Juara 2 Mahasiswa Kumite -67 KG - Liga Esa Unggul 2024",
    Img: "https://images.unsplash.com/photo-1517649763962-0c6232661a0b?q=80&w=800&auto=format&fit=crop",
  },
];

const techStacks = [
  { icon: "java.jpg", language: "Java" },
  { icon: "php.jpg", language: "PHP" },
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "sql.jpg", language: "SQL" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "vercel.svg", language: "Vercel" },
];

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [certificates, setCertificates] = useState(FALLBACK_CERTIFICATES);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: false }),
        supabase.from("certificates").select("*").order("id", { ascending: false }),
      ]);

      if (!projectsResponse.error && projectsResponse.data?.length > 0) {
        const formattedProjects = projectsResponse.data.map((item) => ({
          id: item.id,
          Title: item.title || item.Title,
          Description: item.description || item.Description,
          Img: item.img || item.Img,
          TechStack: item.tech_stack || item.techstack || item.TechStack,
          Features: item.features || item.Features,
          Link: item.link || item.Link,
          Github: item.github || item.Github,
        }));
        setProjects(formattedProjects);
        localStorage.setItem("projects", JSON.stringify(formattedProjects));
      } else {
        localStorage.setItem("projects", JSON.stringify(FALLBACK_PROJECTS));
      }

      if (!certificatesResponse.error && certificatesResponse.data?.length > 0) {
        const formattedCertificates = certificatesResponse.data.map((item) => ({
          id: item.id,
          Img: item.img || item.Img,
          Title: item.title || item.Title || "Sertifikat / Prestasi",
        }));
        setCertificates(formattedCertificates);
        localStorage.setItem("certificates", JSON.stringify(formattedCertificates));
      } else {
        localStorage.setItem("certificates", JSON.stringify(FALLBACK_CERTIFICATES));
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && JSON.parse(cachedProjects).length > 0) {
      setProjects(JSON.parse(cachedProjects));
    }
    if (cachedCertificates && JSON.parse(cachedCertificates).length > 0) {
      setCertificates(JSON.parse(cachedCertificates));
    }

    fetchData();
  }, [fetchData]);

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  const TABS = [
    { label: "Projects", icon: Code, count: projects.length },
    { label: "Certificates", icon: Award, count: certificates.length },
    { label: "Tech Stack", icon: Boxes, count: techStacks.length },
  ];

  return (
    <div
      className="md:px-[10%] px-[5%] w-full pt-16 pb-12 overflow-hidden"
      id="Portofolio"
    >
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="800">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          <span className="text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            Featured Works & Skills
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] tracking-tight">
          Portfolio Showcase
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-2 font-medium">
          Jelajahi berbagai proyek teknis, sertifikasi resmi BNSP & GSA, serta keahlian teknologi yang saya kuasai.
        </p>
      </div>

      {/* Modern Custom Glass Tab Switcher */}
      <div className="max-w-2xl mx-auto mb-10 p-2 rounded-2xl glass-card border border-slate-200/90 shadow-md flex items-center justify-between gap-2" data-aos="fade-up">
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`relative flex-1 py-3 px-3 rounded-xl flex items-center justify-center gap-2 font-extrabold text-xs sm:text-sm transition-all duration-300 ${
                isActive
                  ? "text-white shadow-lg shadow-sky-500/25"
                  : "text-slate-600 hover:text-sky-700 hover:bg-slate-100/60"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] rounded-xl transition-all duration-300 -z-10" />
              )}
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-700"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="transition-all duration-500 min-h-[300px]">
        {/* Projects Tab */}
        {activeTab === 0 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    id={project.id}
                    TechStack={project.TechStack}
                  />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="mt-8 flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
            {certificates.length > initialItems && (
              <div className="mt-8 flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Tab */}
        {activeTab === 2 && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <TechStackIcon
                    TechStackIcon={stack.icon}
                    Language={stack.language}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
