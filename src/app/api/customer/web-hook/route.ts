import { NextResponse } from "next/server";
import { obtenerRespuestaChatGPT } from "@/lib/chatgpt";
import { enviarMail } from "@/lib/mail";
import { enviarMensaje } from "@/lib/facebook";
import { createChat, getChats, getClientes } from "@/lib/strapi";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// GET → Verificación inicial de webhook
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

// POST → Recepción de mensajes de WhatsApp
export async function POST(req: Request) {
  const body = await req.json();
  console.log("Entrada de WhatsApp:", body);

  const messages = body?.entry?.[0]?.changes?.[0]?.value?.messages;
  const from = messages?.[0]?.from;
  const text = messages?.[0]?.text?.body;

  const currentDate = new Date(); // Fecha actual
  currentDate.setHours(currentDate.getHours() - 1); // Restar 1 hora

  if (!from || !text) {
    return NextResponse.json({ status: "ignored" });
  }

  try {
    let reply = "";
    let isManual = false;

    /*  var htmlText =
      "<div><h3>Nuevo mensaje de WhatsApp</h3>" +
      `<p><strong>${from}:</strong> ${text}</p>` +
      `<p><strong>ChatGpt:</strong> ${reply||""}</p></div>`;
 */
    //await enviarMail(htmlText, "whatsapp@controlia.com.ar", `Nuevo mensaje de WhatsApp de ${from}`);
    const clientes = await getClientes(from.toString());

    const checkChatManual = clientes.length > 0 && clientes[0]?.es_manual;

    // Guardar el chat en Strapi
    await createChat({
      entidad_de: from,
      mensaje: text,
      remitente: "cliente",
      fecha_hora: new Date().toISOString(),
    });
    if (
      checkChatManual //||
      /*   (checkChatManual.length > 1 &&
        checkChatManual[1].respondido_manual &&
        checkChatManual[1].remitente == "manual") */
    ) {
      // Si hay un chat manual, no enviar el mensaje a WhatsApp
      reply = "Te va a contestar un agente espera unos minutos...";
      isManual = true;
    } else {
      reply = await obtenerRespuestaChatGPT(text);
    }

    await createChat({
      entidad_de: from,
      mensaje: reply,
      remitente: "bot",
      fecha_hora: new Date().toISOString(),
      respondido_manual: isManual,
    });

    await enviarMensaje(isManual, from, reply);

    return NextResponse.json({ status: "sent", to: from, reply });
  } catch (e: any) {
    console.log("Error en el procesamiento del mensaje:", e);
    return NextResponse.json(
      { error: e?.message || "Error en ChatGPT o WhatsApp" },
      { status: 500 },
    );
  }
}
