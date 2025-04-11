import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
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
    console.error('Error fetching latest articles:', error);
    return NextResponse.json({ 
      articles: [],
      error: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
} 