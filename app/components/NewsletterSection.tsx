'use client';

import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Veuillez entrer une adresse email valide');
      return;
    }
    
    setSubmitting(true);
    setStatus('idle');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Inscription réussie !');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Problème de connexion au serveur');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <motion.div 
          className={styles.newsletterContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.newsletterIconContainer}>
            <EnvelopeIcon className={styles.newsletterIcon} />
          </div>
          <h2 className={styles.newsletterTitle}>Restez informé</h2>
          <p className={styles.newsletterText}>
            Abonnez-vous à notre newsletter pour recevoir nos dernières actualités, conseils et offres spéciales directement dans votre boîte mail.
          </p>
          
          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <div className={styles.newsletterInputGroup}>
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.newsletterInput}
                disabled={submitting}
              />
              <button 
                type="submit"
                className={styles.newsletterButton}
                disabled={submitting}
              >
                {submitting ? 'Inscription...' : 'S\'abonner'}
              </button>
            </div>
            
            {status === 'success' && (
              <div className={styles.newsletterSuccess}>
                <CheckCircleIcon className={styles.newsletterStatusIcon} />
                <p>{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className={styles.newsletterError}>
                <XCircleIcon className={styles.newsletterStatusIcon} />
                <p>{message}</p>
              </div>
            )}
            
            <p className={styles.newsletterDisclaimer}>
              En vous inscrivant, vous acceptez de recevoir nos communications par email. Vous pourrez vous désabonner à tout moment.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection; 