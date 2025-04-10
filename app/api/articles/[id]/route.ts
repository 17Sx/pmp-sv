import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Récupérer un article spécifique par ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await query({
      query: 'SELECT * FROM articles WHERE id = ?',
      values: [params.id]
    });

    // Vérifier si results est un tableau et s'il contient au moins un élément
    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    const article = results[0];
    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un article par ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, slug, status } = await request.json();

    // Vérifier d'abord si l'article existe
    const existingArticle = await query({
      query: 'SELECT * FROM articles WHERE id = ?',
      values: [params.id]
    });

    if (!Array.isArray(existingArticle) || existingArticle.length === 0) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    const result = await query({
      query: `
        UPDATE articles
        SET title = ?, content = ?, slug = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values: [title, content, slug, status, params.id]
    });

    return NextResponse.json(
      { message: 'Article mis à jour avec succès', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'article' },
      { status: 500 }
    );
  }
} 