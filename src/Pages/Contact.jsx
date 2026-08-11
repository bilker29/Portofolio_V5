import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Sparkles } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu selagi kami mengirim pesan Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/billywicaksono.999@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "Pesan Baru dari Website Portfolio");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda telah berhasil terkirim!",
        icon: "success",
        confirmButtonColor: "#059669",
        background: "#ffffff",
        color: "#0f172a",
        timer: 2200,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Berhasil!",
          text: "Pesan Anda telah berhasil terkirim!",
          icon: "success",
          confirmButtonColor: "#059669",
          background: "#ffffff",
          color: "#0f172a",
          timer: 2200,
          timerProgressBar: true,
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan. Silakan coba lagi nanti.",
          icon: "error",
          confirmButtonColor: "#059669",
          background: "#ffffff",
          color: "#0f172a",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] pt-16 pb-12" id="Contact">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-3 shadow-sm" data-aos="fade-down">
          <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          <span className="text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            Let's Talk & Collaborate
          </span>
        </div>
        <h2
          data-aos="fade-down"
          data-aos-duration="900"
          className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] tracking-tight"
        >
          Hubungi Saya
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-2 font-medium"
        >
          Punya tawaran proyek, kolaborasi, atau pertanyaan? Kirim pesan dan mari berdiskusi.
        </p>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="lg:col-span-5 glass-card border border-slate-200/90 rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669]">
                  Send Message
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Isi formulir di bawah ini dan saya akan merespons secepatnya.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                <Share2 className="w-6 h-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group" data-aos="fade-up">
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3.5 pl-12 bg-slate-50/80 rounded-xl border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm disabled:opacity-50"
                  required
                />
              </div>

              <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3.5 pl-12 bg-slate-50/80 rounded-xl border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm disabled:opacity-50"
                  required
                />
              </div>

              <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-3.5 pl-12 bg-slate-50/80 rounded-xl border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm h-36 disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-white py-3.5 rounded-xl font-extrabold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <SocialLinks />
            </div>
          </div>

          {/* Right Comments Box */}
          <div className="lg:col-span-7 glass-card border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
