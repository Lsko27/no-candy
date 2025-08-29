"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faVimeo } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6 px-5 border-t border-white/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm md:text-base font-inter">
          © 2024 NoCandy Filmes – Todos os direitos reservados.
        </p>

        {/* Links de redes sociais */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a
            href="https://www.instagram.com/nocandy.film"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="text-white hover:text-secondary transition"
            />
          </a>
          <a
            href="https://vimeo.com/nocandyfilm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faVimeo}
              size="2x"
              className="w-20 h-20 text-white hover:text-secondary transition"
            />
          </a>
        </div>

        {/* Desenvolvido por */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-inter">Desenvolvido por</span>
          <Image src="/3xCoding.png" alt="Logo 3xCode" width={64} height={24} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
