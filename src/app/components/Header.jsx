"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = ["Diretores", "We are NoCandy", "Gallery", "Contato"];

  return (
    <header className="fixed w-full top-0 left-0 z-50">
      {/* Barra superior com logo e botão */}
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5 bg-transparent">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain z-50 relative"
          />
        </Link>

        {/* Botão menu mobile */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none text-2xl"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-10 font-semibold uppercase font-bebas text-3xl text-white">
          {links.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative group cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                {item}
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu mobile full-screen */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center transition-all duration-500 z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setOpen(false)}
            className="relative group overflow-hidden text-6xl mb-8 text-white font-bebas"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
              {item}
            </span>
            <span className="absolute left-0 bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
