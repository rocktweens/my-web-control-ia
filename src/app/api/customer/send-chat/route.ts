import { NextResponse } from "next/server";
import { enviarMensaje } from "@/lib/facebook";

// POST → Recepción de mensajes de WhatsApp
export async function POST(req: Request) {
  const { isManual, from, reply } = await req.json();

  // Aquí puedes integrar la API de WhatsApp
  await enviarMensaje(isManual, from, reply);

  return NextResponse.json({ message: "Mensaje enviado" });
}
