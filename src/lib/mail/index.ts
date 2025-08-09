
export async function enviarMail(
  htmlText: string,
  from: string,
  subject: string
): Promise<any> {
  try {

    if (!htmlText || !from || !subject) {
      throw new Error("Faltan datos para enviar el correo.");
    }

    const response = await fetch("/api/customer/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ htmlText , from, subject }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error en enviarMail:", error);
    throw new Error("Error al enviar el correo");
  }
}
