import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: 10, y: -10 },
    { x: 20, y: -8 },
    { x: -15, y: 10 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initialPos = initialPositions[index];

        // Smooth scroll offsets
        const xOffset = Math.sin(newScroll / 150 + index * 0.7) * 200;
        const yOffset = Math.cos(newScroll / 150 + index * 0.7) * 50;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.2s ease-out";
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-sky-50/50 to-teal-50/40 pointer-events-none -z-50 overflow-hidden">
      {/* Dynamic Ambient Orbs */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute -top-10 -left-10 md:w-[450px] md:h-[450px] w-72 h-72 bg-sky-400/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-1/4 -right-10 md:w-[500px] md:h-[500px] w-80 h-80 bg-teal-400/25 rounded-full mix-blend-multiply filter blur-[130px] animate-blob animation-delay-2000 hidden sm:block"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute bottom-10 left-10 md:w-[450px] md:h-[450px] w-72 h-72 bg-emerald-400/25 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute top-2/3 right-1/4 md:w-[400px] md:h-[400px] w-64 h-64 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-[110px] animate-blob hidden sm:block"
        ></div>
      </div>

      {/* Modern Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:32px_32px] opacity-60"></div>
    </div>
  );
};

export default AnimatedBackground;
