"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

const videos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4"];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const progress = useMotionValue(0);

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setIndex((prev) => (prev + 1) % videos.length);
    } else {
      setIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  // Atualiza progresso do vídeo
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const updateProgress = () => {
      const pct = (videoEl.currentTime / videoEl.duration) * 100;
      progress.set(pct);
    };

    videoEl.addEventListener("timeupdate", updateProgress);

    return () => {
      videoEl.removeEventListener("timeupdate", updateProgress);
    };
  }, [index, progress]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onWheel={handleScroll}
    >
      {/* Vídeo */}
      <AnimatePresence>
        <motion.video
          key={index}
          ref={videoRef}
          src={videos[index]}
          autoPlay
          muted
          onEnded={() => setIndex((prev) => (prev + 1) % videos.length)}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Bolinhas de indicador */}
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        {videos.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Círculo de progresso - canto inferior direito */}
      <svg
        className="absolute bottom-5 right-5 w-12 h-12 z-50"
        viewBox="0 0 36 36"
      >
        {/* Fundo do círculo */}
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
        {/* Progresso animado */}
        <motion.circle
          cx="18"
          cy="18"
          r="15.9155"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset={useTransform(progress, [0, 100], [100, 0])}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>
    </div>
  );
}
