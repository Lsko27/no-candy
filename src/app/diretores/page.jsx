"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Buscar diretores da API
  useEffect(() => {
    async function fetchDirectors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/directors`);
        if (!res.ok) throw new Error("Erro ao carregar diretores");
        const data = await res.json();

        // Transformar a URL de vídeo para absoluta
        const mapped = data.map((d) => ({
          ...d,
          videoUrl: d.homeSlides?.[0]?.mediaUrl
            ? `${process.env.NEXT_PUBLIC_API_URL}${d.homeSlides[0].mediaUrl}`
            : null,
        }));

        setDirectors(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDirectors();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Carregando diretores...
      </div>
    );
  }

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
        <div className="flex flex-col items-center justify-center space-y-3 pl-20">
          {directors.map((director) => (
            <h2
              key={director.id}
              onMouseEnter={() => setHoveredVideo(director.videoUrl)}
              onMouseLeave={() => setHoveredVideo(null)}
              className="text-3xl font-bold uppercase cursor-pointer transition-all duration-300 hover:text-gray-200 hover:scale-105 hover:tracking-wider"
            >
              <Link href={`/diretores/${director.id}`}>{director.name}</Link>
            </h2>
          ))}
        </div>

        {/* Coluna direita - pode usar para detalhes ou galeria */}
        <div />
      </div>
    </div>
  );
};

export default Directors;
