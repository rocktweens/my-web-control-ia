"use client";

import { useChat } from "@/context/ChatContext";
import { useState, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import { AnimatePresence, motion } from "framer-motion";
import ImageFallback from "@/helpers/ImageFallback";


const ChatFloatingWindow = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // 👇 Mensaje de bienvenida al abrir el chat
  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const res = await fetch("/api/customer/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              "Saluda al usuario de forma cordial como asistente virtual.",
          }),
        });

        const data = await res.json();
        if (data.reply) {
          setMessages([`🤖: ${data.reply}`]);
        } else {
          setMessages([`🤖: ¡Hola! ¿En qué podemos ayudarte?`]);
        }
      } catch (error) {
        console.error("Error al obtener saludo:", error);
        setMessages([`🤖: Bienvenido, ¿cómo podemos ayudarte hoy?`]);
      }
    };

    if (isChatOpen && messages.length === 0) {
      fetchWelcomeMessage();
    }
  }, [isChatOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");

    try {
      const res = await fetch("/api/customer/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, `🤖: ${data.reply}`]);
      } else {
        setMessages((prev) => [...prev, `🤖: Lo siento, no pude responder.`]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [...prev, `🤖: Error al contactar al asistente.`]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && <WhatsappFloatingButton />}
        {isChatOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-80 max-h-[80vh] bg-white shadow-2xl border border-gray-200 rounded-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div
              className="text-white px-4 py-3 flex justify-between items-center rounded-t-lg bg-primary"
            >
              <div className="flex items-center gap-2 font-semibold">
                <ImageFallback
                  src={"/images/asistente-30x30.png"}
                  width={30}
                  height={30}
                  alt={""}
                />
                <span>Asistente ControlIA</span>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:text-tertiary transition"
                aria-label="Cerrar chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 text-sm space-y-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className="text-gray-800 whitespace-pre-wrap">
                  {msg}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t-1 border-gray-300  bg-white flex items-center gap-2">
              <input
                className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribí tu mensaje..."
              />
              <button
                onClick={handleSend}
                className="bg-primary hover:bg-twelve text-white text-sm px-4 py-2 rounded-md transition"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatFloatingWindow;
