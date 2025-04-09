import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// GET - Récupérer tous les articles
export async function GET() {
  try {
    console.log('Tentative de récupération des articles...');
    const articles = await query(
      'SELECT * FROM articles ORDER BY created_at DESC',
      []
    );
    console.log('Articles récupérés:', articles);

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Données reçues:', body);
    const { title, content, slug, status = 'draft' } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Les champs title, content et slug sont requis' },
        { status: 400 }
      );
    }

    // Récupérer l'ID de l'utilisateur connecté depuis le token
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');
    let author_id = 1; // Valeur par défaut si pas de token

    if (token) {
      try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'your-secret-key');
        author_id = decoded.userId;
      } catch (error) {
        console.log('Erreur lors de la vérification du token, utilisation de l\'ID par défaut');
      }
    }

    console.log('Tentative de création d\'article avec:', { title, slug, author_id, status });
    const result = await query(
      `INSERT INTO articles (title, content, slug, author_id, status)
       VALUES (?, ?, ?, ?, ?)`,
      [title, content, slug, author_id, status]
    );
    console.log('Résultat de l\'insertion:', result);

    return NextResponse.json(
      { message: 'Article créé avec succès', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur détaillée lors de la création de l\'article:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
} 