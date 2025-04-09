import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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

export async function GET() {
  try {
    console.log('Tentative de connexion à la base de données avec les paramètres:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });

    const connection = await pool.getConnection();
    console.log('Connexion à la base de données établie');

    // Test simple pour vérifier que la table existe
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Tables disponibles:', tables);

    // Si la table articles n'existe pas, la créer
    const [articlesTable] = await connection.execute(
      `CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        status VARCHAR(50) DEFAULT 'PUBLISHED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );
    console.log('Table articles vérifiée/créée');

    // Insérer un article de test si la table est vide
    const [existingArticles] = await connection.execute('SELECT COUNT(*) as count FROM articles');
    if (existingArticles[0].count === 0) {
      await connection.execute(
        `INSERT INTO articles (title, content, slug, status) 
         VALUES (?, ?, ?, ?)`,
        [
          'Premier article',
          'Ceci est un article de test pour vérifier que tout fonctionne correctement.',
          'premier-article',
          'PUBLISHED'
        ]
      );
      console.log('Article de test inséré');
    }

    // Récupérer les articles
    const [rows] = await connection.execute(
      `SELECT id, title, content, slug, created_at 
       FROM articles 
       WHERE status = 'PUBLISHED' 
       ORDER BY created_at DESC 
       LIMIT 3`
    );
    console.log('Articles récupérés:', rows);

    connection.release();

    // S'assurer que rows est un tableau
    const articles = Array.isArray(rows) ? rows : [];
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles', details: error.message },
      { status: 500 }
    );
  }
} 