'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        const data = await response.json();
        setError(data.error || 'Erreur de connexion');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.loginCard}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.adminWarning}
        >
          <p>Cette page est réservée aux administrateurs. Si vous n&apos;êtes pas administrateur, veuillez retourner à la page d&apos;<Link href="/">accueil</Link>.</p>
        </motion.div>
        
        <div className={styles.logoContainer}>
          <Image 
            src="http://server.pmp.fr/pmp/icon/logo.png" 
            alt="PMP Logo" 
            width={120} 
            height={40} 
            className={styles.logo}
          />
        </div>
        
        <h1>Connexion</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>
        </form>
      </motion.div>
    </div>
  );
} 