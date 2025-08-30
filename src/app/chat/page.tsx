// app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import ChatBot from "@/components/chat";

export default function Chat() {
  const [clave, setClave] = useState("");
  const [permitido, setPermitido] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
/*     if (!permitido) return; // solo si ingresó la clave

    // Registrar Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service worker registrado", reg))
        .catch((err) => console.error("Error registrando SW", err));
    } */

    // Capturar el evento antes de instalar PWA
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e); // guardamos el prompt para mostrar botón
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleClave = () => {
    if (clave === "1234") {
      setPermitido(true);
    } else {
      alert("Clave incorrecta");
    }
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("PWA install outcome:", outcome);
    setDeferredPrompt(null);
  };

  if (!permitido) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">
          Ingresa clave para acceder al chat
        </h2>
        <input
          type="password"
          placeholder="Clave secreta"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="border px-3 py-2 rounded mb-4 w-64"
        />
        <button
          onClick={handleClave}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Validar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {deferredPrompt && (
        <div className="p-2 bg-tertiary text-black text-center">
          <button
            onClick={handleInstallPWA}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
          >
            Instalar ChatBot PWA
          </button>
        </div>
      )}

      {/* Renderizamos el componente de chat */}
      <ChatBot />
    </div>
  );
}
