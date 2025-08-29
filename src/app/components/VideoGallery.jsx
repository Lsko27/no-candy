"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    src: "video1.mp4",
    title: "Distance",
    subtitle: "Catwalk",
    description: "Directed by Guillaume Allantaz",
  },
  {
    src: "video2.mp4",
    title: "Midnight",
    subtitle: "Dreams",
    description: "Directed by NoCandy",
  },
  {
    src: "video3.mp4",
    title: "Parallel",
    subtitle: "Worlds",
    description: "Directed by 3xCoding",
  },
];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = scroll down, -1 = scroll up

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        setDirection(1);
        setIndex((prev) => (prev + 1) % videos.length);
      } else if (e.deltaY < 0) {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + videos.length) % videos.length);
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  // Define qual vídeo é anterior e qual é atual
  const prevIndex =
    direction === 1
      ? (index - 1 + videos.length) % videos.length
      : (index + 1) % videos.length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Vídeo anterior */}
      <motion.video
        key={`prev-${prevIndex}`}
        src={videos[prevIndex].src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ y: direction === 1 ? "0%" : "0%" }}
        animate={{ y: direction === 1 ? "-100%" : "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Vídeo atual */}
      <motion.video
        key={`current-${index}`}
        src={videos[index].src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ y: direction === 1 ? "100%" : "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Texto */}
      <motion.div
        key={`text-${index}`}
        className="absolute inset-0 flex items-center justify-center pointer-events-none text-center text-white space-y-2 px-4"
        initial={{ y: direction === 1 ? 50 : -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: direction === 1 ? -50 : 50, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h3 className="text-lg font-light uppercase tracking-wider">
          {videos[index].title}
        </h3>
        <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-wide">
          {videos[index].subtitle}
        </h2>
        <p className="text-sm opacity-80">{videos[index].description}</p>
      </motion.div>
    </div>
  );
}
