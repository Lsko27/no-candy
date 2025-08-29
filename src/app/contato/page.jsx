"use client";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviado:", form);
    // Aqui você conecta com backend ou serviço de email
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-6xl font-semibold mb-10 text-center uppercase font-bebas">
          Contato
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Nome */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Nome
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Email
            </label>
          </div>

          {/* Mensagem */}
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            ></textarea>
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Mensagem
            </label>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-all uppercase"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
