"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = ["Diretores", "We are NoCandy", "Gallery", "Contato"];

  return (
    <header className="fixed w-full top-0 left-0 bg-transparent text-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold uppercase tracking-widest cursor-pointer">
            NoCandy
          </h1>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-10 font-semibold uppercase">
          {links.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative group cursor-pointer overflow-hidden"
            >
              {/* Texto com leve subida */}
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                {item}
              </span>
              {/* Underline que cresce até ocupar o link */}
              <span className="absolute left-0 bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none text-2xl"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu com animação de slide */}
      <nav
        className={`md:hidden bg-black text-white flex flex-col items-center gap-6 py-5 transition-all duration-500 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        {links.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setOpen(false)}
            className="relative group overflow-hidden text-lg"
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
