// app/api/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { htmlText, from, subject } = body;

    if (!htmlText) {
      return NextResponse.json(
        { success: false, error: "Falta el contenido del correo (htmlText)." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "noreply@controlia.com.ar",
        pass: process.env.SMTP_PASS || "Consultas2025", // Usa variables de entorno en producción
      },
    });

    const result = await transporter.sendMail({
      from: process.env.SMTP_USER || "noreply@controlia.com.ar",
      to: "consultas@controlia.com.ar",
      replyTo: from,
      subject: subject,
      html: htmlText,
    });

    const isOk = result?.rejected.length === 0 ? true : false;

    return NextResponse.json({
      success: isOk,
      message: !isOk ? result?.response : "Correo enviado correctamente",
      result, // devuelve los datos de nodemailer (como messageId, accepted, etc.)
    });
  } catch (error) {
    console.error("❌ Error en API send:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al enviar el correo." },
      { status: 500 },
    );
  }
}
