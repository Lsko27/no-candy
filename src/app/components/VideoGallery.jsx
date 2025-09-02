"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";

// Lista de vídeos com títulos e diretores
const videoData = [
  { src: "video1.mp4", title: "Infinite Corridor", director: "John Doe" },
  { src: "video2.mp4", title: "Space Orbit", director: "Jane Smith" },
  { src: "video3.mp4", title: "Beauty of Nature", director: "Ava DuVernay" },
  { src: "video4.mp4", title: "The BMW Beast", director: "Christopher Nolan" },
  { src: "video5.mp4", title: "Blackout", director: "Adonis Creed" },
  { src: "video6.mp4", title: "Kia Stinger GT", director: "Yuri Lesko" },
];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const progress = useMotionValue(0);

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setIndex((prev) => (prev + 1) % videoData.length);
    } else {
      setIndex((prev) => (prev - 1 + videoData.length) % videoData.length);
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
          src={videoData[index].src}
          autoPlay
          muted
          onEnded={() => setIndex((prev) => (prev + 1) % videoData.length)}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Máscara escura (overlay) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
        <motion.h2
          key={`title-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          {videoData[index].title}
        </motion.h2>
        <motion.p
          key={`director-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          className="text-xl opacity-80 mt-4 drop-shadow-md"
        >
          Directed by{" "}
          <Link href={`/diretores/${videoData[index].director}`}>
            {videoData[index].director}
          </Link>
        </motion.p>
      </div>

      {/* Indicador lateral */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-30">
        {/* Linha vertical */}
        <div className="absolute top-0 bottom-0 w-[3px] bg-gray-300" />
        {videoData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-5 h-5 rounded-full mb-4 last:mb-0 ${
              i === index ? "bg-white scale-125" : "bg-gray-300"
            }`}
            aria-label={`Ir para o vídeo ${i + 1}`}
            style={{ cursor: "pointer" }}
          >
            {/* Hit area maior */}
            <span className="absolute inset-[-8px]"></span>
          </button>
        ))}
      </div>

      {/* Círculo de progresso */}
      <svg
        className="absolute bottom-5 right-5 w-12 h-12 z-30"
        viewBox="0 0 36 36"
      >
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
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
