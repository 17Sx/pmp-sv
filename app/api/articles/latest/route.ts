import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    console.log('🔍 Récupération des derniers articles...');
    
    // Récupérer les articles avec leurs images de bannière
    const results = await query(`
      SELECT 
        a.id, 
        a.title, 
        a.content, 
        a.slug, 
        a.created_at,
        (
          SELECT image_path 
          FROM article_images 
          WHERE article_id = a.id 
          ORDER BY position ASC 
          LIMIT 1
        ) AS banner_image
      FROM articles a
      WHERE a.status = ?
      ORDER BY a.created_at DESC 
      LIMIT 3
    `, ['published']);

    console.log('📊 Résultats obtenus:', JSON.stringify(results));

    if (!results || !Array.isArray(results) || results.length === 0) {
      console.log('❌ Aucun article trouvé ou format incorrect');
      return NextResponse.json({ articles: [] });
    }

    console.log(`✅ ${results.length} articles récupérés avec succès`);
    return NextResponse.json({ articles: results });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des articles:', error);
    return NextResponse.json({ 
      articles: [],
      error: error.message 
    });
  }
} 