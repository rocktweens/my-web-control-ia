import { NextResponse } from "next/server";
import { obtenerRespuestaChatGPT } from "@/lib/chatgpt";
import { enviarMail } from "@/lib/mail";
import { createChat } from "@/lib/strapi";

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

  const messages = body?.entry?.[0]?.changes?.[0]?.value?.messages;
  const from = messages?.[0]?.from;
  const text = messages?.[0]?.text?.body;

  if (!from || !text) {
    return NextResponse.json({ status: "ignored" });
  }

  try {
    const reply = await obtenerRespuestaChatGPT(text);
    var htmlText =
      "<div><h3>Nuevo mensaje de WhatsApp</h3>" +
      `<p><strong>${from}:</strong> ${text}</p>` +
      `<p><strong>ChatGpt:</strong> ${reply||""}</p></div>`;

    //await enviarMail(htmlText, "whatsapp@controlia.com.ar", `Nuevo mensaje de WhatsApp de ${from}`);

    // Guardar el chat en Strapi
    await createChat({
      entidad_de: from,
      mensaje: text,
      remitente: "cliente",
      fecha_hora: new Date().toISOString(),
    });

    await createChat({
      entidad_de: from,
      mensaje: reply,
      remitente: "bot",
      fecha_hora: new Date().toISOString(),
      respondido_manual: false
    });

    await fetch(
      `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_VERIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: from,
          text: { body: reply|| "No tengo una respuesta clara." },
        }),
      },
    );


    return NextResponse.json({ status: "sent", to: from, reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en ChatGPT o WhatsApp" },
      { status: 500 },
    );
  }
}
