import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = data;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'contact@pmp.fr',
      subject: `Contact PMP - ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        Nouveau message de contact\n
        Nom : ${name}\n
        Email : ${email}\n
        Sujet : ${subject}\n
        Message :\n
        ${message}
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error: 'Erreur lors de l\'envoi de l\'email' };
  }
} 