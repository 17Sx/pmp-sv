import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Récupérer un article spécifique
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await query({
      query: 'SELECT * FROM articles WHERE slug = ?',
      values: [params.slug],
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un article
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { title, content, slug, status } = await request.json();

    const result = await query({
      query: `
        UPDATE articles
        SET title = ?, content = ?, slug = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE slug = ?
      `,
      values: [title, content, slug, status, params.slug],
    });

    return NextResponse.json(
      { message: 'Article mis à jour avec succès', result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'article' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un article
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await query({
      query: 'DELETE FROM articles WHERE slug = ?',
      values: [params.slug],
    });

    return NextResponse.json(
      { message: 'Article supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'article' },
      { status: 500 }
    );
  }
} 