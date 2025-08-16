export async function enviarMensaje(
  isManual: boolean,
  from: string,
  reply: string,
): Promise<any> {
  try {
    if (!from || !reply) {
      throw new Error("Faltan datos para enviar el mensaje.");
    }

    var params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_VERIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply || "No tengo una respuesta clara." },
      }),
    };
    var paramUrl = `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    console.log("URL de envío:", paramUrl);
    console.log("Parámetros de envío:", params);

    var response = await fetch(
      paramUrl,
      params
    );

    return await response.json();
  } catch (error) {
    console.error("Error en enviarMensaje:", error);
    throw new Error("Error al enviar el mensaje");
  }
}
