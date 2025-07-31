import { NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// GET → Verificación inicial de webhook
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response('Forbidden', { status: 403 });
  }
}

// POST → Recepción de mensajes de WhatsApp
export async function POST(req: Request) {
  const body = await req.json();

  console.log('Mensaje recibido desde WhatsApp:', JSON.stringify(body, null, 2));

  // Acá podrías integrar con ChatGPT u otro servicio
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
