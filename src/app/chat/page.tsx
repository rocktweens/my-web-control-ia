// app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  createChat,
  getChats,
  getClientes,
  updateCliente,
  getUltimosChatsxClientes,
} from "@/lib/strapi";
import { Chat, Cliente } from "@/lib/strapi/types";
import { enviarMensaje } from "@/lib/facebook";
import { FaRobot, FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { set } from "date-fns";

export default function ChatPage() {
  const [mensajes, setMensajes] = useState<Chat[]>([]);
  const [cliente, setCliente] = useState<Cliente>();
  const [clientesConChats, setClientesConChats] = useState<any[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [ultimoCliente, setUltimoCliente] = useState("");
  const [cargando, setCargando] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputNombre, setInputNombre] = useState("");
  const [vistaChatActiva, setVistaChatActiva] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Obtener lista de clientes con chats recientes
  const fetchClientesConChats = async () => {
    try {
      const filtrados = await getUltimosChatsxClientes();
      setClientesConChats(filtrados);
    } catch (error) {
      console.error("Error al obtener clientes con chats:", error);
    }
  };

  const fetchMensajes = async (paramIdCliente: string) => {
    try {
      let res = [] as Chat[];
      if (paramIdCliente) {
        res = await getChats(
          paramIdCliente,
          today.toISOString(),
          "*",
          "asc",
          50,
        );
      }

      console.log("Mensajes del último cliente:", res);
      if (res.length > 0) {
        const idCliente = res[res.length - 1]?.entidad_de || "";
        console.log("Idcliente:", idCliente);
        setUltimoCliente(idCliente);
        const clientes = await getClientes(idCliente);
        console.log("clientes:", clientes);
        setCliente(clientes[0]);
        setInputNombre(clientes[0]?.nombre || "");
        setChecked(clientes[0]?.es_manual || false);

        const chatsUltimoCliente = res.filter(
          (msg) => msg.entidad_de === idCliente,
        );
        console.log("Mensajes del último cliente:", chatsUltimoCliente);
        setMensajes(chatsUltimoCliente);
        setVistaChatActiva(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cargar mensajes desde Strapi al iniciar
  useEffect(() => {
    const interval = setInterval(async () => {
      fetchMensajes(ultimoCliente);
      fetchClientesConChats();
    }, 3000);
    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  const enviarMensajeManual = async () => {
    if (!nuevoMensaje.trim()) return;
    setCargando(true);

    try {
      // Guardar en Strapi y enviar
      await createChat({
        entidad_de: ultimoCliente,
        mensaje: nuevoMensaje,
        remitente: "manual",
        fecha_hora: new Date().toISOString(),
        respondido_manual: true,
      });

      var respEnvio = await fetch("/api/customer/send-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isManual: true,
          from: ultimoCliente,
          reply: nuevoMensaje,
        }),
      });

      //var respEnvio = await enviarMensaje(true, ultimoCliente, nuevoMensaje);
      console.log("Respuesta de envío:", respEnvio);
      const res = await getChats(
        ultimoCliente,
        today.toISOString(),
        "*",
        "asc",
        50,
      );

      setMensajes((prev) => [...prev, ...res]);
      setNuevoMensaje("");
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  // Simulamos el fetch o acción cuando cambia el checkbox
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    try {
      console.log("Actualizando con valor:", ultimoCliente);
      var resp = await updateCliente({
        entidad_de: ultimoCliente,
        es_manual: isChecked,
      });
      console.log("Cliente actualizado isChecked?:", resp);

      if (isChecked) {
        var textsend = "Te va a contestar un agente espera unos minutos...";

        await createChat({
          entidad_de: ultimoCliente,
          mensaje: textsend,
          remitente: "manual",
          fecha_hora: new Date().toISOString(),
          respondido_manual: true,
        });

        var respEnvio = await fetch("/api/customer/send-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isManual: true,
            from: ultimoCliente,
            reply: textsend,
          }),
        });
      }
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };

  // Botón de actualizar
  const handleActualizar = async () => {
    try {
      console.log("Actualizando con valor:", inputNombre);
      var resp = await updateCliente({
        entidad_de: ultimoCliente,
        nombre: inputNombre,
      });
      console.log(resp);
      setInputNombre(resp?.nombre || "");
      // await fetchDataConInput(inputNombre);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // VISTA: LISTADO DE CLIENTES
  if (!vistaChatActiva) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">
          Clientes con Chats Recientes
        </h2>
        <ul className="space-y-3">
          {clientesConChats.map((clienteChats) => (
            <li
              key={clienteChats.entidad_de}
              className="bg-white p-4 shadow rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => fetchMensajes(clienteChats.entidad_de)}
            >
              <span className="font-semibold">
                {clienteChats.nombre || "Sin nombre"}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({clienteChats.entidad_de})
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          <span className="text-white">{`Panel de Chat con cliente ${inputNombre} - ${ultimoCliente}`}</span>
        </h1>
        {/* Controles del header */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <span>Modo Manual</span>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-primary"
            />
          </label>
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="text"
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              placeholder="Actualizar Nombre..."
              className="text-sm text-black px-2 py-1 border border-gray-300 outline-none"
            />
            <button
              onClick={handleActualizar}
              className="px-2 py-1 bg-secondary  hover:bg-primary text-white"
              title="Actualizar"
            >
              <FaCheckCircle size={22} />
              {/* O usa un ícono SVG aquí si prefieres */}
            </button>
          </div>
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <button
              onClick={() => setVistaChatActiva(false)}
              className="px-2 py-1 bg-secondary  hover:bg-primary text-white"
              title="Volver Listado"
            >
              <FaChevronCircleLeft size={22} />
              {/* O usa un ícono SVG aquí si prefieres */}
            </button>
          </div>
        </div>
      </header>

      {/* Lista de mensajes */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensajes.map((msg, i) => {
          let messageStyle = "bg-gray-200 text-gray-800 self-start mr-auto"; // Estilo por defecto

          if (msg.remitente === "cliente") {
            messageStyle = "bg-primary text-white self-end ml-auto";
          } else if (msg.remitente === "manual") {
            messageStyle = "bg-tertiary text-seventy self-start mr-auto"; // Estilo para manual
          } else {
            messageStyle = "bg-gray-100 text-gray-800 self-start mr-auto"; // Estilo para otros
          }

          return (
            <div
              key={`msg.entidad_de_${i}`}
              className={`max-w-xs p-3 rounded-lg shadow-sm ${messageStyle}`}
            >
              <p className="text-sm">{msg.mensaje}</p>
              <span className="text-xs opacity-70 block mt-1">
                {new Date(msg.fecha_hora).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </main>

      {/* Input */}
      <footer className="p-4 bg-white border-t flex space-x-2">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-primary/70"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={enviarMensajeManual}
          disabled={cargando}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#00585a] disabled:opacity-50"
        >
          {cargando ? "..." : "Enviar"}
        </button>
      </footer>
    </div>
  );
}
