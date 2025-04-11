import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Vérification de base que l'email est valide
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Vérifie si l'email existe déjà
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Vous êtes déjà inscrit à notre newsletter" },
        { status: 200 }
      );
    }

    // Ajoute le nouvel abonné
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        subscribedAt: new Date(),
        active: true,
      },
    });

    return NextResponse.json(
      { message: "Inscription réussie à la newsletter" },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
} 