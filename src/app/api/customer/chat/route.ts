import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
  }

  const prompt = "Sos un asistente virtual corporativo amable, claro y breve.";
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4", // podés usar "gpt-4" si tenés acceso
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = chat.choices[0]?.message?.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error en OpenAI:", error);
    return NextResponse.json(
      { error: "Error al generar respuesta" },
      { status: 500 },
    );
  }
}
