"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = ["video1.mp4", "video2.mp4", "video3.mp4"];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      // scroll down → próximo
      setIndex((prev) => (prev + 1) % videos.length);
    } else {
      // scroll up → anterior
      setIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onWheel={handleScroll}
    >
      <AnimatePresence>
        <motion.video
          key={index}
          src={videos[index]}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
