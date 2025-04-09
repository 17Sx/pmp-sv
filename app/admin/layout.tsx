'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/login');
        } else {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className={styles.adminLayout}>
      <div className={styles.header}>
        <Header />
      </div>
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <Link href="/admin/articles" className={styles.logo}>
            Administration
          </Link>
          <nav className={styles.nav}>
            <Link href="/admin/articles" className={styles.navLink}>
              Nouvel article
            </Link>
            <Link href="/admin/articles/existing" className={styles.navLink}>
              Articles existants
            </Link>
          </nav>
          <div className={styles.userInfo}>
            {user && (
              <>
                <span className={styles.userName}>
                  Connecté en tant que {user.name}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={styles.adminMain}>
        {children}
      </main>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
} 