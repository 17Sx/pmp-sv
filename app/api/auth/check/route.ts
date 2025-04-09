import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, JWT_SECRET);

    return NextResponse.json(
      { authenticated: true, user: decoded },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }
} 