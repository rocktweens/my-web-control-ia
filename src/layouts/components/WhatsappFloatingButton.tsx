"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsappFloatingButton = () => {
  const openWhatsApp = () => {
    // Reemplazá con tu número o lógica de IA (p.ej., redirección interna)
    window.open("https://wa.me/5491112345678?text=Hola!%20Quiero%20hacer%20una%20consulta", "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="whatsapp"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="font-medium text-sm md:text-base">Chatea con Nosotros</span>
    </button>
  );
};

export default WhatsappFloatingButton;
