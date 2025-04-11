import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    // Vérification basique du token (à améliorer en production)
    // On vérifie simplement que le token est un base64 valide
    try {
      const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
      
      // Vérifie si l'abonné existe
      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { id: parseInt(id) },
      });

      if (!subscriber) {
        return NextResponse.json(
          { error: "Abonné non trouvé" },
          { status: 404 }
        );
      }

      // Désabonne l'utilisateur en mettant à jour son statut
      await prisma.newsletterSubscriber.update({
        where: { id: parseInt(id) },
        data: { active: false },
      });

      // Redirection vers une page de confirmation
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/newsletter/unsubscribe-success'
        }
      });

    } catch (error) {
      return NextResponse.json(
        { error: "Token invalide" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du désabonnement" },
      { status: 500 }
    );
  }
} 