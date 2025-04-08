'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.aboutImage}
        >
          <Image
            src="/img/about.jpg"
            alt="Analyse de données et solutions informatiques"
            width={500}
            height={400}
            className={styles.aboutImage}
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.aboutContent}
        >
          <h2 className={styles.aboutTitle}>À propos de PMP</h2>
          <p className={styles.aboutText}>
            PMP est une entreprise spécialisée dans les solutions informatiques professionnelles.
            Notre expertise couvre un large éventail de services, de la maintenance informatique
            à la cybersécurité en passant par le développement d'applications sur mesure.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 