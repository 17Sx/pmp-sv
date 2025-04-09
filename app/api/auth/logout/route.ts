import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('auth_token');

    return NextResponse.json(
      { message: 'Déconnexion réussie' },
      { 
        status: 200,
        headers: {
          'Set-Cookie': 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
} 