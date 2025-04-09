'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setSuccess(true);
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.contactForm}
    >
      <h2>Créer un compte</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && (
        <div className={styles.successMessage}>
          Inscription réussie ! Vous pouvez maintenant vous connecter.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            minLength={6}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
    </motion.div>
  );
} 