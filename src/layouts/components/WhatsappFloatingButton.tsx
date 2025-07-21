"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useChat } from "@/context/ChatContext";

const WhatsappFloatingButton = () => {

  const openWhatsApp = () => {
    // Reemplazá con tu número o lógica de IA (p.ej., redirección interna)
    window.open("https://wa.me/5491137647253?text=Hola!%20Quiero%20hacer%20una%20consulta", "_blank");
  };


  // const { openChat } = useChat();
  return (
    <button
      onClick={openWhatsApp}
      // onClick={openChat}
      className="whatsapp"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="font-medium text-sm md:text-base">Chatea con Nosotros</span>
    </button>
  );
};

export default WhatsappFloatingButton;
