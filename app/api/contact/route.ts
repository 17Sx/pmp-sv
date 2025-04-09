import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Données reçues:', data);
    
    const { name, email, subject, message } = data;

    // Validation des données
    if (!name || !email || !subject || !message) {
      console.log('Validation échouée:', { name, email, subject, message });
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP local sans authentification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || '192.168.0.147',
      port: Number(process.env.SMTP_PORT || 25),
      secure: false,
      ignoreTLS: true,
      debug: true,
      logger: true
    } as any);

    const mailOptions = {
      from: `"${name} via PMP" <noa.obringer@pmp.fr>`,
      to: "<noa.obringer@pmp.fr>",
      replyTo: email,
      subject: `Contact PMP - ${subject}`,
      text: `
        Bonjour, ${name} veut vous contacter,

        Voici un récapitulatif du message:

        Sujet: ${subject}
        Message:
        ${message}

      `,
    };

    console.log('Configuration SMTP:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT
    });

    console.log('Tentative d\'envoi d\'email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info);

    return NextResponse.json(
      { 
        message: 'Email envoyé avec succès'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi du message:', error);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de l\'envoi du message',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 