'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Qu'est-ce que PMP ?
        </motion.h2>
        <div className={styles.aboutSection}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/svg/about.svg"
              alt="À propos"
              width={400}
              height={300}
              className={styles.aboutImage}
            />
          </motion.div>
          <motion.div
            className={styles.aboutContent}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className={styles.aboutText}>
              PMP est une entreprise spécialisée dans les solutions informatiques professionnelles. Nous proposons une gamme complète de services pour répondre à tous vos besoins informatiques.
            </p>
            <p className={styles.aboutText}>
              Notre expertise couvre l'étude de vos besoins, le développement d'applications personnalisées, le conseil en matériel, la formation des utilisateurs, et l'assistance technique.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 