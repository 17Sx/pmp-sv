import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query(
      'SELECT id, title, content, slug, created_at FROM articles WHERE status = ? ORDER BY created_at DESC LIMIT 3',
      ['published']
    );

    if (!Array.isArray(results)) {
      return NextResponse.json({ articles: [] });
    }

    return NextResponse.json({ articles: results });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json({ articles: [] });
  }
} 