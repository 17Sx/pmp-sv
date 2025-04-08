'use client';

import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import styles from '../page.module.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ici, vous pouvez ajouter la logique pour envoyer les données à votre backend
      console.log('Données du formulaire:', formData);
      alert('Message envoyé avec succès !');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Une erreur est survenue lors de l\'envoi du message.');
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.contactTitle}
          >
          Contactez-nous
        </motion.h2>
        
        <div className={styles.contactGrid}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.contactInfo}
          >
            <h3 className={styles.contactSubtitle}>Informations de contact</h3>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>Téléphone</span>
                  <a href="tel:+33182888888" className={styles.contactValue}>01 82 88 88 88</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <EnvelopeIcon className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:contact@pmp.fr" className={styles.contactValue}>contact@pmp.fr</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <MapPinIcon className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>Adresse</span>
                  <span className={styles.contactValue}>2 rue de la Paix<br />75002 Paris</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <ClockIcon className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>Horaires</span>
                  <span className={styles.contactValue}>Lundi - Vendredi<br />9h00 - 18h00</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.contactForm}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Objet de votre message"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Votre message"
                  rows={5}
                  required
                ></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Envoyer le message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 