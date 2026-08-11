import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Code2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Gallery", label: "Gallery" },
    { href: "#Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 300,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 90;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-500 pt-3 sm:pt-4 px-4">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`relative flex items-center justify-between px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-500 ${
            scrolled || isOpen
              ? "bg-white/85 backdrop-blur-xl border border-sky-200/80 shadow-lg shadow-sky-500/10"
              : "bg-white/65 backdrop-blur-md border border-white/60 shadow-sm"
          }`}
        >
          {/* Logo */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0d9488] to-[#059669] text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-slate-900 via-sky-800 to-emerald-700 bg-clip-text text-transparent tracking-tight">
              BilKer
              <span className="text-sky-500 font-black">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-md shadow-sky-500/20"
                      : "text-slate-600 hover:text-sky-700 hover:bg-slate-200/50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] rounded-full transition-all duration-300 -z-10" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* GSA Badge CTA in Header */}
          <div className="hidden lg:flex items-center">
            <a
              href="#Contact"
              onClick={(e) => scrollToSection(e, "#Contact")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 hover:scale-105 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>GSA 2026</span>
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 hover:text-sky-600 transition-all active:scale-95"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden mt-2 transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
          }`}
        >
          <div className="p-4 bg-white/95 backdrop-blur-xl border border-sky-100 rounded-2xl shadow-xl space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] text-white shadow-md shadow-sky-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-white" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
