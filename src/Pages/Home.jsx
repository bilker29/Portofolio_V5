import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  PlayCircle,
  Code2,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Award,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float-slow"
    data-aos="zoom-in"
    data-aos-delay="300"
  >
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-700 animate-pulse"></div>
      <div className="relative px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-300 shadow-md flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600 animate-spin-slow" />
        <span className="bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-transparent bg-clip-text sm:text-sm text-xs font-extrabold tracking-wide">
          Google Student Ambassador 2026 | IPK 3.76
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-3" data-aos="fade-up" data-aos-delay="400">
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]">
      <span className="relative inline-block text-slate-900">
        Billy
      </span>
      <br />
      <span className="relative inline-block mt-1 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] bg-clip-text text-transparent filter drop-shadow-sm">
        Wicaksono
      </span>
    </h1>
  </div>
));

const TechStackPill = memo(({ tech }) => (
  <div className="px-3.5 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-700 hover:bg-white hover:border-sky-400 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, primary = false }) => (
  <a href={href} className="w-[160px] block">
    <button className="group relative w-full overflow-hidden rounded-xl p-[2px] transition-all duration-300 active:scale-95">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          primary
            ? "from-[#0284c7] via-[#0d9488] to-[#059669]"
            : "from-slate-300 via-sky-300 to-emerald-300"
        } rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105`}
      ></div>
      <div
        className={`relative flex items-center justify-center gap-2 h-11 px-5 rounded-[10px] text-sm font-extrabold transition-all duration-300 ${
          primary
            ? "bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-white shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40"
            : "bg-white/90 backdrop-blur-xl text-slate-800 hover:bg-white"
        }`}
      >
        <span className="relative z-10">{text}</span>
        <Icon
          className={`w-4 h-4 transition-transform duration-300 z-10 ${
            text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"
          }`}
        />
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative p-2.5 rounded-xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:border-sky-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
    <Icon className="w-5 h-5 text-slate-600 group-hover:text-sky-600 transition-colors" />
  </a>
));

// Floating Tech Badge overlay item
const FloatingBadge = ({ icon: Icon, label, positionClass, delayClass }) => (
  <div
    className={`absolute z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-sky-200/80 shadow-lg shadow-sky-500/10 hover:scale-110 transition-all duration-300 pointer-events-auto ${positionClass} ${delayClass}`}
  >
    <div className="p-1.5 rounded-xl bg-sky-50 text-sky-600">
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
      {label}
    </span>
  </div>
);

const TYPING_SPEED = 90;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 2200;
const WORDS = [
  "Informatics Engineering Student",
  "IT Support & Web Developer",
  "Google Student Ambassador 2026",
  "Junior Software Engineer",
];
const TECH_STACK = ["Java", "PHP", "HTML", "CSS", "SQL", "Bootstrap", "Cisco", "AWS", "Docker"];
const SOCIAL_LINKS = [
  {
    icon: Github,
    link: "https://github.com/bilker29",
    label: "GitHub Profile",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/billy-wicaksono-315898372",
    label: "LinkedIn Profile",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/billy.w.2005?igsh=NmJsaGJpenZrYm05&utm_source=qr",
    label: "Instagram Profile",
  },
  {
    icon: PlayCircle,
    link: "https://www.tiktok.com/@gemers2905?_r=1&_t=ZS-94DfruR8pPA",
    label: "TikTok Profile",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Billy Wicaksono — IT Enthusiast & Web Developer</title>
        <meta
          name="description"
          content="Website resmi Billy Wicaksono, Mahasiswa Teknik Informatika yang antusias dalam bidang Software Engineering, Networking, dan Cyber Security."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://billywicaksono.com" />
        <meta property="og:title" content="Billy Wicaksono — IT Enthusiast" />
        <meta
          property="og:description"
          content="Website resmi dan portofolio Billy Wicaksono."
        />
        <meta property="og:url" content="https://billywicaksono.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Billy Wicaksono",
            "jobTitle": "Informatics Engineering Student",
            "url": "https://billywicaksono.com",
            "sameAs": [
              "https://github.com/bilker29",
              "https://www.linkedin.com/in/billy-wicaksono-315898372",
              "https://www.instagram.com/billy.w.2005?igsh=NmJsaGJpenZrYm05&utm_source=qr",
              "https://www.tiktok.com/@gemers2905?_r=1&_t=ZS-94DfruR8pPA"
            ]
          }
        `}</script>
      </Helmet>

      <div
        className="min-h-screen relative overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-20 sm:pt-24 pb-12"
        id="Home"
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-100px)] gap-10 lg:gap-12">
              {/* Left Column */}
              <div
                className="w-full lg:w-1/2 space-y-6 text-left order-1"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="space-y-5">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div
                    className="h-10 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      {text}
                    </span>
                    <span className="w-1 h-7 bg-[#0284c7] ml-1.5 animate-pulse rounded-full"></span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    Mahasiswa Teknik Informatika Universitas Pasundan (Semester 4) dengan latar belakang SMK TKJ. Berdedikasi tinggi mengombinasikan keunggulan akademik selaku Penerima Beasiswa KIP-Kuliah (IPK 3.76/4.00) dengan sertifikasi IT Support & Jaringan BNSP. Berpengalaman dalam pengembaangan aplikasi Java GUI, full-stack web (PHP & MySQL), manajemen Cisco, dan perwakilan aktif Google Student Ambassador 2026.
                  </p>

                  {/* Tech Stack Pills */}
                  <div
                    className="flex flex-wrap gap-2 sm:gap-2.5 justify-start pt-1"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    {TECH_STACK.map((tech, index) => (
                      <TechStackPill key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons & Social Links */}
                  <div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <div className="flex gap-3">
                      <CTAButton
                        href="#Portofolio"
                        text="Projects"
                        icon={ExternalLink}
                        primary={true}
                      />
                      <CTAButton
                        href="#Contact"
                        text="Contact"
                        icon={Mail}
                        primary={false}
                      />
                    </div>

                    <div className="hidden sm:flex gap-2 items-center pl-2 sm:border-l sm:border-slate-200">
                      {SOCIAL_LINKS.map((social, index) => (
                        <SocialLink key={index} {...social} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Hero Graphic & Floating Tech Badges */}
              <div
                className="w-full lg:w-1/2 relative flex items-center justify-center order-2 py-6 lg:py-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="300"
              >
                {/* Floating Tech Badges around Graphic */}
                <FloatingBadge
                  icon={Code2}
                  label="Java GUI & Web"
                  positionClass="-top-2 left-6 sm:left-12"
                  delayClass="animate-float-slow"
                />
                <FloatingBadge
                  icon={ShieldCheck}
                  label="BNSP IT Certified"
                  positionClass="top-16 right-0 sm:right-6"
                  delayClass="animate-float-reverse"
                />
                <FloatingBadge
                  icon={Terminal}
                  label="Cisco Networking"
                  positionClass="bottom-20 left-2 sm:left-8"
                  delayClass="animate-float-slow"
                />
                <FloatingBadge
                  icon={Award}
                  label="GSA 2026"
                  positionClass="-bottom-4 right-8 sm:right-16"
                  delayClass="animate-float-reverse"
                />

                {/* Animated Graphic Container */}
                <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
                  {/* Outer Glowing Halo Rings */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-teal-400/20 to-emerald-400/20 rounded-full blur-3xl transition-all duration-700 ${
                      isHovering ? "scale-110 opacity-80" : "scale-100 opacity-50"
                    }`}
                  ></div>

                  <div className="absolute inset-4 rounded-3xl border border-sky-200/50 bg-white/40 backdrop-blur-xl shadow-2xl shadow-sky-500/10 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-400/10 to-transparent rounded-bl-full pointer-events-none"></div>

                    <img
                      src="Animation1.gif"
                      alt="Developer Graphic"
                      className={`w-full h-full object-contain p-6 sm:p-10 transition-transform duration-700 ease-out ${
                        isHovering ? "scale-105 rotate-1" : "scale-100"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
