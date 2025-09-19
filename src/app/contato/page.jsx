"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// === Definindo esquema de validação com Zod ===
const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().trim().email("Email inválido"),
  message: z
    .string()
    .trim()
    .min(5, "Mensagem deve ter pelo menos 5 caracteres"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // Integrando React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    console.log("Enviado:", data);
    setSubmitted(true);
    reset(); // limpa o form
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-6xl font-semibold mb-10 text-center uppercase font-bebas">
          Contato
        </h1>

        {submitted && (
          <p className="text-green-400 text-center mb-6">
            Formulário enviado com sucesso!
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Nome */}
          <div className="relative">
            <input
              type="text"
              {...register("name")}
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Nome
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mensagem */}
          <div className="relative">
            <textarea
              rows={5}
              {...register("message")}
              className="peer w-full border-b-2 border-gray-600 bg-transparent px-2 pt-5 pb-2 text-lg focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
              Mensagem
            </label>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
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
