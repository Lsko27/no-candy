"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const directors = [
  { name: "Diretor 1", video: "/video1.mp4" },
  { name: "Diretor 2", video: "/video2.mp4" },
  { name: "Diretor 3", video: "/video3.mp4" },
];

const Directors = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background video com animação */}
      <AnimatePresence>
        {hoveredVideo && (
          <motion.video
            key={hoveredVideo}
            src={hoveredVideo}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Overlay escura para contraste */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Título centralizado */}
      <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-6xl md:text-8xl font-bebas font-bold z-20 text-white uppercase tracking-widest py-32">
        Diretores
      </h1>

      {/* Conteúdo */}
      <div className="relative z-20 grid grid-cols-2 min-h-screen">
        {/* Coluna esquerda - lista de diretores */}
        <div className="flex flex-col items-center justify-center space-y-8 pl-20">
          {directors.map((director, index) => (
            <h2
              key={index}
              onMouseEnter={() => setHoveredVideo(director.video)}
              onMouseLeave={() => setHoveredVideo(null)}
              className="text-5xl font-bold uppercase cursor-pointer transition-all duration-300 hover:text-gray-200 hover:scale-105 hover:tracking-wider"
            >
              {director.name}
            </h2>
          ))}
        </div>

        {/* Coluna direita - vazia */}
        <div />
      </div>
    </div>
  );
};

export default Directors;
