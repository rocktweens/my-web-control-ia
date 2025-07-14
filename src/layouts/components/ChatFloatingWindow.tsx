"use client";

import { useChat } from "@/context/ChatContext";
import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import { AnimatePresence, motion } from "framer-motion";

const corporateColor = "#006d71";

const ChatFloatingWindow = () => {
  const { isChatOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");

    try {
      const res = await fetch("/api/customer/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
              className="text-white px-4 py-3 flex justify-between items-center rounded-t-lg"
              style={{ backgroundColor: corporateColor }}
            >
              <div className="flex items-center gap-2 font-semibold">
                <FaRobot className="text-lg" />
                <span>Asistente Virtual</span>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200 transition"
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
            <div className="p-3 border-t bg-white flex items-center gap-2">
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
