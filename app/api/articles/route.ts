import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pmpwebsite',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET - Récupérer tous les articles
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [articles] = await connection.execute(`
      SELECT a.*, 
             JSON_ARRAYAGG(
               JSON_OBJECT(
                 'id', ai.id,
                 'image_path', ai.image_path,
                 'alt_text', ai.alt_text,
                 'position', ai.position
               )
             ) as images
      FROM articles a
      LEFT JOIN article_images ai ON a.id = ai.article_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `);

    connection.release();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles', details: error.message },
      { status: 500 }
    );
  }
}


// POST - Créer un nouvel article
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const status = formData.get('status') as string;
    const images = formData.getAll('images') as File[];
    const imagePositions = JSON.parse(formData.get('image_positions') as string || '{}');

    const connection = await pool.getConnection();

    // Commencer une transaction
    await connection.beginTransaction();

    try {
      // Insérer l'article
      const [result] = await connection.execute(
        `INSERT INTO articles (title, content, slug, status) 
         VALUES (?, ?, ?, ?)`,
        [title, content, slug, status]
      );

      const articleId = (result as any).insertId;

      // Gérer les images
      for (const image of images) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Créer un nom de fichier unique
        const timestamp = Date.now();
        const filename = `${slug}-${timestamp}-${image.name}`;
        const path = join(process.cwd(), 'public', 'uploads', filename);
        
        // Sauvegarder le fichier
        await writeFile(path, buffer);
        
        // Insérer l'image dans la base de données
        await connection.execute(
          `INSERT INTO article_images (article_id, image_path, alt_text, position) 
           VALUES (?, ?, ?, ?)`,
          [articleId, `/uploads/${filename}`, image.name, imagePositions[image.name] || 0]
        );
      }

      // Valider la transaction
      await connection.commit();
      connection.release();

      return NextResponse.json({ success: true, articleId });
    } catch (error) {
      // En cas d'erreur, annuler la transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article', details: error.message },
      { status: 500 }
    );
  }
} 