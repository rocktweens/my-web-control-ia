import nodemailer from "nodemailer";
// 🧠 Tipado para richText
type RichText = {
  text: string;
};

// 📤 Función principal para enviar el correo
async function sendMail(htmlText: string): Promise<boolean> {

  // Configuración de envío
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "studentglad@gmail.com",
      pass: "hwjp kwsi pjqo tzsq", // ⚠️ Reemplaza esto con una contraseña segura (idealmente App Password)
    },
  });

  const mailOptions = {
    from: "studentglad@gmail.com",
    to: "studentglad@gmail.com",
    subject: "Excel actualizado",
    html: `
      <p>Hola! 👋</p>
      <p>A continuación, el contenido del Excel:</p>
      ${htmlText}
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("📨 Correo enviado con tabla en el cuerpo");
  return true;
}

export default sendMail;
