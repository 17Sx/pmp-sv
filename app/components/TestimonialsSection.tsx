'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

const testimonials = [
  {
    name: "Pierre Martin",
    role: "Directeur de Projet",
    company: "Tech Solutions SA",
    text: "PMP a transformé notre approche de la gestion de projet. Leur expertise et leur professionnalisme sont exceptionnels. Leur support technique est toujours réactif et efficace."
  },
  {
    name: "Sophie Dubois",
    role: "Chef de Projet",
    company: "Innovation Group",
    text: "Une collaboration remarquable avec l'équipe PMP. Leurs solutions sont innovantes et efficaces. Ils ont su comprendre nos besoins spécifiques et y répondre parfaitement."
  },
  {
    name: "Thomas Leroy",
    role: "Directeur Technique",
    company: "Digital Systems",
    text: "PMP a su relever tous les défis de notre projet complexe. Un partenaire de confiance qui nous accompagne depuis plusieurs années dans notre transformation digitale."
  },
  {
    name: "Marie Laurent",
    role: "Directrice des Opérations",
    company: "Global Services",
    text: "La formation dispensée par PMP a permis à nos équipes de monter rapidement en compétence. Leur approche pédagogique est adaptée à tous les niveaux."
  },
  {
    name: "Jean Dupont",
    role: "Responsable IT",
    company: "Industries Modernes",
    text: "Les conseils de PMP pour le choix de notre infrastructure ont été précieux. Leur expertise nous a permis de faire les bons choix technologiques."
  },
  {
    name: "Claire Bernard",
    role: "Directrice Financière",
    company: "Finance & Co",
    text: "L'hébergement sécurisé de nos données par PMP nous donne une totale confiance. Leur service est fiable et leur support toujours disponible."
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.sectionContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Témoignages
        </motion.h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src={`/svg/testimonial-${(index % 3) + 1}.svg`}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className={styles.testimonialImage}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                  <span className={styles.authorCompany}>{testimonial.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 