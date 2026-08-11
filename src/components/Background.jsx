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
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(186,230,253,0.9),rgba(209,250,229,0.7))] bg-gradient-to-br from-sky-200/70 via-teal-100/80 to-emerald-200/70 pointer-events-none -z-50 overflow-hidden">
      {/* Mesh Radial Light Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.45),transparent_70%)] filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.45),transparent_70%)] filter blur-3xl"></div>

      {/* Dynamic Ambient Orbs */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute -top-10 -left-10 md:w-[550px] md:h-[550px] w-80 h-80 bg-sky-400/50 rounded-full mix-blend-multiply filter blur-[90px] animate-blob"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-1/4 -right-10 md:w-[600px] md:h-[600px] w-96 h-96 bg-emerald-400/45 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 hidden sm:block"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute bottom-10 left-10 md:w-[500px] md:h-[500px] w-80 h-80 bg-teal-400/45 rounded-full mix-blend-multiply filter blur-[90px] animate-blob animation-delay-4000"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute top-2/3 right-1/4 md:w-[450px] md:h-[450px] w-72 h-72 bg-cyan-400/40 rounded-full mix-blend-multiply filter blur-[85px] animate-blob hidden sm:block"
        ></div>
      </div>

      {/* Modern Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c71a_1px,transparent_1px),linear-gradient(to_bottom,#0d94881a_1px,transparent_1px)] bg-[size:36px_36px] opacity-80"></div>
    </div>
  );
};

export default AnimatedBackground;
