"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Buscar imagens da API
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`);
        if (!res.ok) throw new Error("Erro ao carregar imagens");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const openModal = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Carregando imagens...
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 md:px-12">
      <h1 className="font-bebas text-6xl text-center mb-12">Gallery Page</h1>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma imagem disponível</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(img.url)}
            >
              <Image
                src={img.url || "/placeholder.png"}
                alt={img.name || "preview"}
                width={300}
                height={300}
                className="w-full h-40 object-cover rounded"
                unoptimized
              />
              <p className="text-center mt-2 font-medium">{img.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20 z-60"
          >
            <X size={28} />
          </button>

          <Image
            src={selectedImage}
            alt="Preview"
            width={800}
            height={800}
            className="max-w-full max-h-full object-contain"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
