// lib/chatgpt.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptBase =
  "Sos un asistente virtual corporativo amable, claro y breve.";

export async function obtenerRespuestaChatGPT(
  mensaje: string,
): Promise<string> {
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: promptBase },
        { role: "user", content: mensaje },
      ],
      temperature: 0.7,
    });

    return chat.choices[0]?.message?.content ?? "No tengo una respuesta clara.";
  } catch (error) {
    console.error("Error en ChatGPT:", error);
    throw new Error("Error al obtener respuesta de ChatGPT");
  }
}
