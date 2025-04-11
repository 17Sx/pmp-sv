import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP avec logs de débogage
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '25'),
  secure: false,
  ignoreTLS: true,
  debug: true,
  logger: true
});

// Fonction pour envoyer un email simple
export async function sendEmail({
  to,
  subject,
  html,
  from = 'PMP Solutions <noreply@pmp-solutions.fr>'
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    console.log(`[EMAIL] Tentative d'envoi d'email à ${to}`);
    console.log(`[EMAIL] Paramètres SMTP: Host=${process.env.SMTP_HOST}, Port=${process.env.SMTP_PORT}`);
    console.log(`[EMAIL] Authentification: User=${process.env.SMTP_USER}`);
    // Vérification de la configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT) {
      console.error('[EMAIL] Configuration SMTP incomplète');
      return { 
        success: false, 
        error: 'Configuration SMTP incomplète' 
      };
    }

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    
    console.log(`[EMAIL] Email envoyé avec succès: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[EMAIL] Erreur lors de l\'envoi de l\'email:', error);
    // Détails supplémentaires de l'erreur
    if (error instanceof Error) {
      console.error('[EMAIL] Message d\'erreur:', error.message);
      console.error('[EMAIL] Stack trace:', error.stack);
    }
    return { success: false, error };
  }
}

// Fonction spécifique pour envoyer une newsletter
export async function sendNewsletter({
  to,
  subject,
  articleTitle,
  articleContent,
  articleUrl,
  unsubscribeUrl = '#'
}: {
  to: string;
  subject: string;
  articleTitle: string;
  articleContent: string;
  articleUrl: string;
  unsubscribeUrl?: string;
}) {
  // Créer un template HTML basique pour la newsletter
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1E3A8A;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-height: 60px;
        }
        .content {
          padding: 20px;
          background: #fff;
        }
        .footer {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .button {
          display: inline-block;
          background-color: #1E3A8A;
          color: white;
          padding: 10px 20px;
          margin: 20px 0;
          text-decoration: none;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://pmpadmin.pmp.fr/img/pmp.png" alt="PMP Solutions" class="logo">
        <h1>Newsletter PMP Solutions</h1>
      </div>
      <div class="content">
        <h2>${articleTitle}</h2>
        <div>${articleContent}</div>
        <a href="${articleUrl}" class="button">Lire l'article complet</a>
      </div>
      <div class="footer">
        <p>Vous recevez cet email car vous êtes inscrit à la newsletter de PMP Solutions.</p>
        <p><a href="${unsubscribeUrl}">Se désabonner</a></p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html: htmlContent
  });
}

// Fonction pour envoyer une newsletter à plusieurs destinataires
export async function sendBulkNewsletter({
  subscribers,
  subject,
  articleTitle,
  articleContent,
  articleUrl,
}: {
  subscribers: { id: number; email: string }[];
  subject: string;
  articleTitle: string;
  articleContent: string;
  articleUrl: string;
}) {
  const results = [];
  
  // Envoyer à chaque abonné un par un pour éviter les problèmes de confidentialité des emails
  for (const subscriber of subscribers) {
    try {
      const unsubscribeUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/newsletter/unsubscribe?id=${subscriber.id}&token=${generateUnsubscribeToken(subscriber.email)}`;
      
      const result = await sendNewsletter({
        to: subscriber.email,
        subject,
        articleTitle,
        articleContent,
        articleUrl,
        unsubscribeUrl
      });
      
      results.push({ email: subscriber.email, success: result.success });
    } catch (error) {
      console.error(`Échec d'envoi à ${subscriber.email}:`, error);
      results.push({ email: subscriber.email, success: false, error });
    }
  }
  
  return results;
}

// Fonction simple pour générer un token pour le lien de désabonnement
function generateUnsubscribeToken(email: string): string {
  // En production, utilisez une méthode plus sécurisée avec des JWT
  return Buffer.from(`${email}-${Date.now()}`).toString('base64');
} 