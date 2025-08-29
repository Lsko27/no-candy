"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background - vídeo ou imagem */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src="/hero-video.mp4" // substitua pelo vídeo real
        />
        <div className="absolute inset-0 bg-black/50"></div>{" "}
        {/* overlay escuro */}
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 text-center px-5">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-4 opacity-0 animate-fadeIn">
          NoCandy
        </h1>
        <p className="text-lg md:text-2xl mb-8 opacity-0 animate-fadeIn delay-200">
          Criando experiências visuais inesquecíveis
        </p>
        <a
          href="#gallery"
          className="inline-block px-6 py-3 border border-white rounded uppercase font-semibold tracking-widest hover:bg-white hover:text-black transition"
        >
          Ver Produções
        </a>
      </div>
    </section>
  );
}
