"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

function VideoModal({ videoUrl, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-70 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <X size={28} />
          </button>

          <video
            preload="metadata"
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function VideoSlider() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const videoRef = useRef(null);
  const progress = useMotionValue(0);

  // 🔥 Buscar vídeos da API
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-slides`
        );
        if (!res.ok) throw new Error("Erro ao carregar vídeos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, []);

  const strokeOffset = useTransform(progress, [0, 100], [100, 0]);

  const handleScroll = (e) => {
    if (!videos.length) return;
    if (e.deltaY > 0) setIndex((prev) => (prev + 1) % videos.length);
    else setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Atualiza progresso do vídeo
  useEffect(() => {
    if (!videos.length) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const updateProgress = () => {
      const pct = (videoEl.currentTime / videoEl.duration) * 100;
      progress.set(pct);
    };

    videoEl.addEventListener("timeupdate", updateProgress);
    return () => videoEl.removeEventListener("timeupdate", updateProgress);
  }, [index, progress, videos]);

  if (!videos.length) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white">
        Carregando vídeos...
      </div>
    );
  }

  const currentVideo = videos[index];
  const videoUrl = `${process.env.NEXT_PUBLIC_API_URL}${currentVideo.mediaUrl}`;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onWheel={handleScroll}
    >
      {/* Clicar no vídeo abre modal */}
      <div
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={() => {
          setModalVideoUrl(videoUrl);
          setIsModalOpen(true);
        }}
      />

      {/* Vídeo do slider */}
      <AnimatePresence>
        <motion.video
          key={index}
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          onEnded={() => setIndex((prev) => (prev + 1) % videos.length)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-30">
        {currentVideo.album && (
          <motion.p
            key={`album-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
            className="text-2xl opacity-80 mt-2 drop-shadow-md"
          >
            {currentVideo.album}
          </motion.p>
        )}
        <motion.h2
          key={`title-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          {currentVideo.name}
        </motion.h2>

        <motion.p
          key={`director-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          className="text-xl opacity-80 mt-4 drop-shadow-md"
        >
          Directed by{" "}
          <Link href={`/diretores/${currentVideo.director?.slug}`}>
            {currentVideo.director?.name}
          </Link>
        </motion.p>
      </div>

      {/* Indicadores laterais */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-40">
        <div className="absolute top-0 bottom-0 w-[3px] bg-gray-300" />
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-5 h-5 rounded-full mb-4 last:mb-0 ${
              i === index ? "bg-white scale-125" : "bg-gray-300"
            }`}
            aria-label={`Ir para o vídeo ${i + 1}`}
          >
            <span className="absolute inset-[-8px]" />
          </button>
        ))}
      </div>

      {/* Círculo de progresso */}
      <svg
        className="absolute bottom-5 right-5 w-12 h-12 z-40"
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
          strokeDashoffset={strokeOffset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>

      {/* Modal */}
      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
