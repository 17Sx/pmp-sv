import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import prisma from '@/app/lib/prisma';

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
    const articles = await prisma.article.findMany({
      where: {
        status: 'published'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true
      }
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des articles',
        details: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      },
      { status: 500 }
    );
  }
}


// POST - Créer un nouvel article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, slug } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Titre, contenu et slug sont requis' },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        slug,
        status: 'draft'
      }
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de l\'article',
        details: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      },
      { status: 500 }
    );
  }
} 