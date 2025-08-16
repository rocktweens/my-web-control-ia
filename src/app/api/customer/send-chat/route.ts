import { NextResponse } from "next/server";
// POST → Recepción de mensajes de WhatsApp
export async function POST(req: Request) {
  const { chatId, message } = await req.json();

  // Aquí puedes integrar la API de WhatsApp
  const res = await fetch('https://api.whatsapp.com/send', {
    method: 'POST',
    body: JSON.stringify({
      to: chatId,
      message,
    }),
  });

  if (res.ok) {
    return NextResponse.json({ message: 'Mensaje enviado' });
  } else {
    return NextResponse.json({ message: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
