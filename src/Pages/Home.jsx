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
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-emerald-50/90 backdrop-blur-xl border border-emerald-200 shadow-sm">
        <span className="bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-bold flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-emerald-600" />
          Google Student Ambassador 2026 | IPK 3.76
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
      <span className="relative inline-block">
        <span className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
          Billy
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="relative bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] bg-clip-text text-transparent">
          Wicaksono
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-sm font-medium text-slate-700 hover:bg-white hover:border-sky-300 shadow-sm transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl opacity-40 blur-sm group-hover:opacity-80 transition-all duration-500"></div>
      <div className="relative h-11 bg-white backdrop-blur-xl rounded-lg border border-slate-200 leading-none overflow-hidden shadow-sm">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#0284c7]/10 to-[#059669]/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-slate-800 font-bold z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-slate-700 ${text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"} transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl blur opacity-15 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative rounded-xl bg-white/90 backdrop-blur-xl p-2 flex items-center justify-center border border-slate-200 group-hover:border-sky-300 shadow-sm transition-all duration-300">
        <Icon className="w-5 h-5 text-slate-600 group-hover:text-sky-600 transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
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
        <title>Billy Wicaksono — IT Enthusiast</title>
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
        className="min-h-screen bg-slate-50 overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
        id="Home"
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="container mx-auto min-h-screen">
            {/* BAGIAN INI YANG DIPERBAIKI: Mengganti h-screen menjadi min-h-screen dan menambah py-20 */}
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-20 md:justify-between gap-0 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div
                className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div
                    className="h-8 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="text-xl md:text-2xl text-sky-700 font-semibold">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#0284c7] to-[#059669] ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-normal"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    Mahasiswa Teknik Informatika Universitas Pasundan (Semester 4) dengan latar belakang SMK Teknik Komputer dan Jaringan (TKJ). Berdedikasi tinggi mengombinasikan keunggulan akademik selaku Penerima Beasiswa KIP-Kuliah (IPK 3.76/4.00) dengan sertifikasi kompetensi IT Support & Jaringan dari BNSP. Memiliki pengalaman praktis dalam pengembangan aplikasi Java GUI, full-stack web development (PHP & MySQL), manajemen infrastruktur Cisco, serta aktif sebagai Google Student Ambassador 2026.
                  </p>

                  {/* Tech Stack */}
                  <div
                    className="flex flex-wrap gap-3 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className="flex flex-row gap-3 w-full justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButton
                      href="#Portofolio"
                      text="Projects"
                      icon={ExternalLink}
                    />
                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                  </div>

                  {/* Social Links */}
                  <div
                    className="hidden sm:flex gap-4 justify-start pb-4"
                    data-aos="fade-up"
                    data-aos-delay="1600"
                  >
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - WebM Video */}
              <div
                className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2  mt-5 sm:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-full opacity-90">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#38bdf8]/10 to-[#34d399]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                      isHovering
                        ? "opacity-50 scale-105"
                        : "opacity-20 scale-100"
                    }`}
                  ></div>

                  <div
                    className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                      isHovering ? "scale-105" : "scale-100"
                    }`}
                  >
                    <img
                      src="Animation1.gif"
                      alt="Developer Animation"
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering
                          ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2"
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                      isHovering ? "opacity-50" : "opacity-20"
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                        isHovering ? "scale-110" : "scale-100"
                      }`}
                    ></div>
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
