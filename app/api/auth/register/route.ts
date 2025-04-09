import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('📨 Nouvelle tentative d\'inscription pour:', email);

    // Vérifier si l'email existe déjà
    const existingUsers = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as User[];

    if (existingUsers.length > 0) {
      console.log('❌ Email déjà utilisé:', email);
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔒 Mot de passe haché avec succès');

    // Insérer le nouvel utilisateur
    await query(
      'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())',
      [email, hashedPassword]
    );
    console.log('✅ Utilisateur créé avec succès:', email);

    return NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
} 