'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from '../page.module.css';

interface AuthResponse {
  authenticated?: boolean;
  user?: {
    userId?: number;
    email?: string;
    role?: string;
  };
  error?: string;
}

export default function AdminFloatingButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<AuthResponse | null>(null);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        console.log('🔍 Vérification du statut admin...');
        const response = await fetch('/api/auth/check');
        console.log('📊 Réponse API:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('👤 Données utilisateur complètes:', JSON.stringify(data));
          setUserInfo(data);
          
          // AJUSTEMENT TEMPORAIRE: Nous savons que l'utilisateur avec ID 1 est admin
          // À remplacer par une vérification du rôle une fois que le token inclura cette information
          if (data.authenticated && data.user && data.user.userId === 1) {
            console.log('✅ Utilisateur admin confirmé (par ID)');
            setIsAdmin(true);
          } else {
            console.log('❌ Utilisateur non admin ou non authentifié');
            console.log('ID utilisateur:', data.user?.userId);
            
            // Si ce n'est pas l'utilisateur 1, s'assurer que isAdmin est false
            setIsAdmin(false);
          }
        } else {
          console.log('❌ Erreur API:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification du statut admin:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAdminStatus();
  }, []);

  // N'afficher le bouton que si l'utilisateur est admin
  if (loading || !isAdmin) {
    return null;
  }

  return (
    <div className={styles.adminFloatingContainer}>
      {isOpen ? (
        <div className={styles.adminFloatingMenu}>
          <div className={styles.adminFloatingHeader}>
            <h3>Administration</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className={styles.adminCloseButton}
            >
              <XMarkIcon className={styles.adminCloseIcon} />
            </button>
          </div>
          <div className={styles.adminFloatingContent}>
            <Link href="/admin/articles" className={styles.adminFloatingLink}>
              Gestion des articles
            </Link>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className={styles.adminFloatingButton}
          title="Accéder à l'administration"
        >
          <Cog8ToothIcon className={styles.adminIcon} />
        </button>
      )}
    </div>
  );
} 