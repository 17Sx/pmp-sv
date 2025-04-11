import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { sendBulkNewsletter } from '@/app/lib/email';

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Fonction pour extraire le texte du HTML sans utiliser le DOM
function extractTextFromHtml(html: string): string {
  // Version simplifiée pour extraire le texte en supprimant les balises HTML
  return html
    .replace(/<[^>]*>/g, ' ') // Remplace les balises par des espaces
    .replace(/\s+/g, ' ')     // Normalise les espaces
    .trim()                   // Supprime les espaces au début et à la fin
    .substring(0, 300) + '...'; // Limite la longueur
}

export async function POST(request: Request) {
  console.log("API newsletter/send: Début de la requête");
  try {
    const { articleId, testMode = false } = await request.json();
    console.log(`Traitement de l'article ID: ${articleId}${testMode ? ' (MODE TEST)' : ''}`);

    // Vérifie si l'article existe
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        status: true,
        sentInNewsletter: true
      }
    });

    if (!article) {
      console.log(`Article ID ${articleId} non trouvé`);
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }
    
    console.log(`Article trouvé: "${article.title}", statut: ${article.status}, déjà envoyé: ${article.sentInNewsletter}`);
    
    // Vérifie si l'article est publié
    if (article.status !== 'published' && !testMode) {
      console.log(`L'article n'est pas publié (statut: ${article.status})`);
      return NextResponse.json(
        { error: "Impossible d'envoyer la newsletter pour un article non publié" },
        { status: 400 }
      );
    }

    // Vérifie si l'article a déjà été envoyé
    if (article.sentInNewsletter && !testMode) {
      console.log("L'article a déjà été envoyé en newsletter");
      return NextResponse.json(
        { 
          message: "Cet article a déjà été envoyé en newsletter", 
          alreadySent: true 
        },
        { status: 200 }
      );
    }

    // Récupère tous les abonnés actifs
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      select: { id: true, email: true }
    });

    console.log(`Nombre d'abonnés actifs trouvés: ${subscribers.length}`);
    if (subscribers.length > 0) {
      console.log(`Premier abonné: ${subscribers[0].email}`);
    }

    if (subscribers.length === 0 && !testMode) {
      console.log("Aucun abonné actif trouvé");
      return NextResponse.json(
        { message: "Aucun abonné actif à la newsletter" },
        { status: 200 }
      );
    }

    // En mode test, utiliser un abonné fictif si aucun n'est trouvé
    const subscribersToUse = subscribers.length > 0 ? subscribers : 
      (testMode ? [{ id: 0, email: 'test@example.com' }] : []);

    // Préparation du contenu pour l'envoi
    const articleUrl = `${BASE_URL}/articles/${article.slug}`;
    console.log(`URL de l'article: ${articleUrl}`);
    
    // Préparer un résumé du contenu
    const summary = extractTextFromHtml(article.content);
    console.log(`Résumé généré: ${summary.substring(0, 100)}...`);

    let emailResults: Array<{email: string, success: boolean, error?: any}> = [];
    
    // Envoyer la newsletter à tous les abonnés
    if (!testMode || subscribersToUse.length > 0) {
      console.log(`Début de l'envoi des emails (${testMode ? 'TEST' : 'RÉEL'})...`);
      emailResults = await sendBulkNewsletter({
        subscribers: subscribersToUse,
        subject: `Nouveau sur PMP Solutions: ${article.title}`,
        articleTitle: article.title,
        articleContent: summary,
        articleUrl
      });
      console.log("Envoi des emails terminé");
    } else {
      console.log("Mode test activé mais aucun destinataire - simulation sans envoi");
    }

    // Statistiques d'envoi
    const successCount = emailResults.filter(result => result.success).length;
    console.log(`Emails envoyés avec succès: ${successCount}/${subscribersToUse.length}`);
    
    // Marque l'article comme envoyé en newsletter (sauf en mode test)
    if (!testMode) {
      try {
        console.log("Mise à jour du statut de l'article comme envoyé en newsletter");
        await prisma.article.update({
          where: { id: articleId },
          data: { sentInNewsletter: true },
        });
        console.log("Statut de l'article mis à jour avec succès");
      } catch (dbError) {
        console.error("Erreur lors de la mise à jour du statut de l'article:", dbError);
        return NextResponse.json(
          { 
            message: "Newsletter envoyée mais échec de la mise à jour du statut", 
            error: dbError instanceof Error ? dbError.message : 'Erreur de base de données',
            subscribersCount: subscribersToUse.length,
            successCount,
            failureCount: subscribersToUse.length - successCount
          },
          { status: 207 }  // Succès partiel
        );
      }
    } else {
      console.log("Mode test - Pas de mise à jour de statut d'article");
    }

    return NextResponse.json(
      { 
        message: `Newsletter ${testMode ? 'testée' : 'envoyée'} avec succès`, 
        testMode,
        subscribersCount: subscribersToUse.length,
        successCount,
        failureCount: subscribersToUse.length - successCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la newsletter:', error);
    return NextResponse.json(
      { 
        error: "Une erreur est survenue lors de l'envoi de la newsletter",
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 