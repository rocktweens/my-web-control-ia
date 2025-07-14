"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useChat } from "@/context/ChatContext";

const WhatsappFloatingButton = () => {

  const { openChat } = useChat();
  return (
    <button
      onClick={openChat}
      className="whatsapp"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="font-medium text-sm md:text-base">Chatea con Nosotros</span>
    </button>
  );
};

export default WhatsappFloatingButton;
