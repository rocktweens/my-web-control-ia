// app/api/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { htmlText } = body;

    if (!htmlText) {
      return NextResponse.json(
        { success: false, error: "Falta el contenido del correo (htmlText)." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "studentglad@gmail.com",
        pass: process.env.SMTP_PASS || "hwjp kwsi pjqo tzsq", // Usa variables de entorno en producción
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER || "studentglad@gmail.com",
      to: "sallytweens@hotmail.com",
      subject: "Nuevo mensaje desde el formulario web",
      html: htmlText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error en API send:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al enviar el correo." },
      { status: 500 }
    );
  }
}
