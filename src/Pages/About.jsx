import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  MapPin,
  Building2,
  Laptop,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2 font-medium"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-emerald-600" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-emerald-600" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center sm:p-6 p-0 py-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-105 border-4 border-white">
          <img
            src="/Photo.jpg"
            alt="Billy Wicaksono"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/90 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-sky-50 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-sky-600" />
          </div>
          <span
            className="text-3xl font-extrabold text-slate-800"
            data-aos="fade-up-left"
            data-aos-duration="1500"
          >
            {value}
          </span>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-1">
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  ),
);

const AboutPage = () => {
  const { totalProjects, totalCertificates } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]",
    );
    return {
      totalProjects: storedProjects.length || 3,
      totalCertificates: storedCertificates.length || 5,
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: GraduationCap,
        color: "from-[#0284c7] to-[#059669]",
        value: "3.76",
        label: "IPK (KIP-Kuliah)",
        description: "Universitas Pasundan",
        animation: "fade-right",
      },
      {
        icon: Code,
        color: "from-[#059669] to-[#0284c7]",
        value: `${totalProjects}+`,
        label: "Technical Projects",
        description: "Java GUI, Full-Stack Web & Cisco",
        animation: "fade-up",
      },
      {
        icon: Award,
        color: "from-[#0284c7] to-[#059669]",
        value: "BNSP & GSA",
        label: "Certifications",
        description: "IT Support, TOEIC & Karate DAN 1",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates],
  );

  const EDUCATION = [
    {
      institution: "Universitas Pasundan",
      location: "Bandung, Indonesia",
      degree: "S1 Teknik Informatika",
      period: "2024 – Sekarang",
      grade: "IPK: 3.76 / 4.00",
      description: "Penerima Beasiswa penuh KIP-Kuliah atas prestasi akademik.",
      icon: GraduationCap,
    },
    {
      institution: "SMKN 1 Cikarang Barat",
      location: "Bekasi, Indonesia",
      degree: "Teknik Komputer dan Jaringan (TKJ)",
      period: "2020 – 2023",
      grade: "Rata-rata Nilai: 80.6 / 100",
      description: "Lulusan Peringkat 4 Besar.",
      icon: Laptop,
    },
  ];

  const EXPERIENCES = [
    {
      company: "PT Berkah Teknologi Terdepan",
      role: "Junior Software Engineer (Intern)",
      period: "2026",
      type: "Internship",
      details: [
        "Mengembangkan dan mengimplementasikan fitur full-stack web yang responsif untuk meningkatkan fungsionalitas sistem dan pengalaman pengguna secara menyeluruh.",
        "Melakukan pengujian komprehensif (unit & integration testing) serta debugging proaktif untuk memastikan stabilitas sistem dan kinerja aplikasi yang optimal di lingkungan production.",
      ],
    },
    {
      company: "Pop Survey",
      role: "Campus Ambassador",
      period: "2026 – Sekarang",
      type: "Ambassador",
      details: [
        "Mewakili brand Pop Survey dalam membangun awareness dan engagement di lingkungan kampus melalui aktivasi program strategis.",
        "Memfasilitasi pengumpulan data riset mahasiswa serta berperan aktif dalam mengomunikasikan nilai tambah platform kepada komunitas pengguna di universitas.",
      ],
    },
    {
      company: "Google Student Ambassador (GSA)",
      role: "Perwakilan Universitas",
      period: "2026 – Sekarang",
      type: "Official Role",
      details: [
        "Menjadi jembatan komunikasi resmi antara Google dan komunitas kampus untuk mengenalkan inovasi teknologi dan program developer kepada mahasiswa.",
        "Mengoordinasikan aktivasi komunitas dan terpilih sebagai perwakilan universitas dalam rangkaian Inauguration & Office Tour di Kantor Google Jakarta.",
      ],
    },
    {
      company: "Asisten Laboratorium",
      role: "Pengajar Praktikum Pemrograman 1 (Java)",
      period: "2026",
      type: "Academic Staff",
      details: [
        "Membimbing dan menginstruksikan implementasi logika pemrograman dasar, algoritma, dan struktur data menggunakan bahasa Java kepada mahasiswa secara intensif.",
        "Mengelola kelas praktikum, menyusun modul evaluasi, dan membantu mahasiswa menyelesaikan kendala eror (debugging) pada kode program.",
      ],
    },
    {
      company: "Asisten Dosen",
      role: "Penguji Mata Kuliah Internet Teknologi Web (ITW)",
      period: "2025",
      type: "Academic Staff",
      details: [
        "Membimbing serta mengevaluasi kompetensi teknis pengerjaan tugas besar berbasis Web (HTML, CSS, PHP) terhadap 10 mahasiswa dalam dua sesi pengujian mendalam.",
        "Memberikan penilaian objektif terkait arsitektur kode, fungsionalitas aplikasi web, dan integrasi basis data.",
      ],
    },
    {
      company: "PT Suzuki Sejahtera Buana Trada",
      role: "Asisten IT (Magang)",
      period: "Jan 2022 – Mar 2022",
      type: "Internship",
      details: [
        "Bertanggung jawab atas pemeliharaan rutin perangkat keras komputer (hardware maintenance), instalasi sistem operasi, dan pemecahan masalah jaringan internal.",
        "Melakukan migrasi data pengguna secara aman untuk memastikan stabilitas operasional IT dan meminimalkan downtime perusahaan.",
      ],
    },
  ];

  return (
    <div
      className="h-auto pb-16 text-slate-800 overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      {/* Profile Overview */}
      <div className="w-full mx-auto pt-6 sm:pt-10 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold" data-aos="fade-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-slate-800">
                Billy Wicaksono
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify font-normal">
              Mahasiswa Teknik Informatika Universitas Pasundan (Semester 4) dengan latar belakang SMK Teknik Komputer dan Jaringan (TKJ). Berdedikasi tinggi mengombinasikan keunggulan akademik selaku Penerima Beasiswa KIP-Kuliah (IPK 3.76/4.00) dengan sertifikasi kompetensi IT Support & Jaringan dari BNSP. Memiliki pengalaman praktis dalam pengembangan aplikasi Java GUI, full-stack web development (PHP & MySQL), manajemen infrastruktur Cisco, serta aktif sebagai Google Student Ambassador 2026. Berorientasi pada solusi, disiplin, dan siap berkontribusi dalam tim teknis.
            </p>

            {/* Quote Section */}
            <div className="relative bg-sky-50/80 border border-sky-200 rounded-2xl p-4 my-6 backdrop-blur-md shadow-sm overflow-hidden" data-aos="fade-up">
              <div className="absolute top-3 left-4 text-sky-600 opacity-40">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>
              <blockquote className="text-slate-700 text-center lg:text-left italic font-semibold text-sm relative z-10 pl-6">
                "Disiplin, berorientasi pada solusi, dan memadukan keunggulan akademis dengan pengalaman praktis IT."
              </blockquote>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full">
              <a
                href="/CV Billy Wicaksono.pdf"
                download="CV_Billy_Wicaksono.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-white font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <FileText className="w-5 h-5" /> Download Official CV
                </button>
              </a>

              <a href="#Portofolio" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-emerald-50">
                  <Code className="w-5 h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* EDUCATION SECTION */}
        <div className="mt-16 space-y-8" data-aos="fade-up">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Pendidikan (Education)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Riwayat akademis & kualifikasi pendidikan formal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-100 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {edu.period}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
                      {edu.grade}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-extrabold text-slate-800 group-hover:text-sky-600 transition-colors">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {edu.location}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-slate-700">
                    {edu.degree}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCES SECTION */}
        <div className="mt-16 space-y-8" data-aos="fade-up">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Pengalaman Profesional (Work Experience)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Pengalaman kerja, magang, ambassador, serta asisten akademik & laboratorium
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-sky-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[11px] font-bold">
                      {exp.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-slate-800 group-hover:text-sky-600 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" /> {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
