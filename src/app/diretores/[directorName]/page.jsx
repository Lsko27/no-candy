"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-32">
      {/* Título */}
      <h1
        className="text-6xl md:text-8xl font-bebas font-bold text-center mb-16"
      >
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
          >
            {/* Vídeo */}
            <video
              src={video.src}
              autoPlay
              loop
              muted
              className="w-full h-96 object-cover rounded-xl"
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
    </div>
  );
};

export default DirectorPage;
