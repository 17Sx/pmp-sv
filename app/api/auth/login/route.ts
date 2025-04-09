import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Tentative de connexion pour:', email);

    // Vérification dans la base de données
    const results = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log('Résultats de la requête:', results);

    if (!Array.isArray(results) || results.length === 0) {
      console.log('Aucun utilisateur trouvé pour:', email);
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 401 }
      );
    }

    const user = results[0];
    console.log('Utilisateur trouvé:', { id: user.id, email: user.email });

    if (!user.password_hash || typeof user.password_hash !== 'string') {
      console.log('Mot de passe manquant ou invalide pour l\'utilisateur:', user.id);
      return NextResponse.json(
        { error: 'Erreur de configuration du compte' },
        { status: 500 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    console.log('Vérification du mot de passe:', isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json(
      { message: 'Connexion réussie' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
        }
      }
    );
  } catch (error) {
    console.error('Erreur détaillée de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
} 