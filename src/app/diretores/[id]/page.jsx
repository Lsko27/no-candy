"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

const DirectorPage = () => {
  const params = useParams();
  const directorId = params.id;

  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");

  useEffect(() => {
    async function fetchDirector() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/directors/${directorId}`
        );
        if (!res.ok) throw new Error("Erro ao carregar diretor");
        const data = await res.json();
        setDirector(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (directorId) fetchDirector();
  }, [directorId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Carregando diretor...
      </div>
    );
  }

  if (!director) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Diretor não encontrado.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-32 px-6 md:px-12">
      <h1 className="text-6xl md:text-8xl font-bebas font-bold text-center mb-16">
        {director.name}
      </h1>

      {director.medias && director.medias.length > 0 ? (
        <div className="flex flex-col gap-8">
          {director.medias.map((media) => (
            <motion.div
              key={media.id}
              className="relative w-full overflow-hidden rounded-xl cursor-pointer shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => {
                setModalVideoUrl(
                  `${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`
                );
                setIsModalOpen(true);
              }}
            >
              {media.type === "IMAGE" ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`}
                  alt={media.name}
                  className="w-full h-[60vh] object-cover rounded-xl pointer-events-none"
                />
              ) : (
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`}
                  autoPlay
                  loop
                  muted
                  className="w-full h-[60vh] object-cover rounded-xl pointer-events-none"
                />
              )}

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-bold">
                  {media.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl mt-12">
          Esse diretor ainda não possui nenhuma mídia
        </p>
      )}

      <div className="mt-16 text-center">
        <Link
          href="/diretores"
          className="text-white hover:text-gray-300 transition"
        >
          Voltar para Diretores
        </Link>
      </div>

      <VideoModal
        videoUrl={modalVideoUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DirectorPage;
