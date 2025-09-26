"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

// Modal para vídeos
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

// Modal para imagens
function ImageModal({ imageUrl, isOpen, onClose }) {
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
          <img
            src={imageUrl}
            alt="Imagem"
            className="max-w-full max-h-full object-contain"
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

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

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

  const videos = director.medias.filter((m) => m.type === "VIDEO");
  const images = director.medias.filter((m) => m.type === "IMAGE");

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-32 px-6 md:px-12">
      <h1 className="text-6xl md:text-8xl font-bebas font-bold text-center mb-16">
        {director.name}
      </h1>

      {/* Vídeos */}
      {videos.length > 0 &&
        videos.map((media) => (
          <motion.div
            key={media.id}
            className="relative w-full overflow-hidden rounded-xl cursor-pointer shadow-lg mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              setModalVideoUrl(
                `${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`
              );
              setIsVideoModalOpen(true);
            }}
          >
            <video
              src={`${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`}
              autoPlay
              loop
              muted
              className="w-full h-[60vh] object-cover rounded-xl pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-xl font-bold">{media.name}</span>
            </div>
          </motion.div>
        ))}

      {/* Imagens */}
      {images.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {images.map((media) => (
            <motion.div
              key={media.id}
              className="relative w-60 aspect-square rounded-lg cursor-pointer shadow-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => {
                setModalImageUrl(
                  `${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`
                );
                setIsImageModalOpen(true);
              }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${media.mediaUrl}`}
                alt={media.name}
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-bold">
                  {media.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-12">
          Esse diretor ainda não possui nenhuma mídia
        </p>
      ) : null}

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
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
      <ImageModal
        imageUrl={modalImageUrl}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
};

export default DirectorPage;
