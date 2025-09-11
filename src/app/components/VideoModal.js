"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function VideoModal({ videoUrl, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white p-2 rounded-full hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <div className="aspect-video w-full">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
