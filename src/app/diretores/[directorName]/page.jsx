"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-70 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <X size={28} />
          </button>

          {/* Vídeo full-screen */}
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

// Exemplo de dados do diretor
const directorData = {
  videos: [
    { title: "Video 1", src: "/video1.mp4" },
    { title: "Video 2", src: "/video2.mp4" },
    { title: "Video 3", src: "/video3.mp4" },
    { title: "Video 4", src: "/video4.mp4" },
  ],
};

const DirectorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-32">
      {/* Título */}
      <h1 className="text-6xl md:text-8xl font-bebas font-bold text-center mb-16">
        {directorData.name}
      </h1>

      {/* Container de vídeos */}
      <div className="flex flex-col gap-12">
        {directorData.videos.map((video, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              setModalVideoUrl(video.src);
              setIsModalOpen(true);
            }}
          >
            {/* Vídeo */}
            <video
              src={video.src}
              autoPlay
              loop
              muted
              className="w-full h-96 object-cover rounded-xl pointer-events-none"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-2xl font-bold">
                {video.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Voltar para a lista de diretores */}
      <div className="mt-16 text-center">
        <Link
          href="/diretores"
          className="text-white underline hover:text-gray-300 transition"
        >
          ← Voltar para Diretores
        </Link>
      </div>

      {/* Modal */}
      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DirectorPage;
