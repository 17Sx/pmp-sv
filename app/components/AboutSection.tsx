'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer} style={{ marginBottom: '5rem' }}>
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

    <div className={styles.aboutContainer} style={{ marginBottom: '5rem' }}>
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.aboutSubtitle}>Vos enjeux, nos réponses</h3>
            <div className={styles.challengesList}>
              <motion.div 
                className={styles.challengeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h4>Maximiser la productivité des forces de vente</h4>
                <p>Applications de prise de commande rapide, même hors ligne, synchronisées avec vos systèmes.</p>
              </motion.div>

              <motion.div 
                className={styles.challengeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h4>Améliorer la visibilité de vos produits en officine</h4>
                <p>Outils de merchandising terrain avec reporting visuel, photos avant/après, planogrammes intégrés.</p>
              </motion.div>

              <motion.div 
                className={styles.challengeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h4>Optimisation de la visite médicale</h4>
                <p>Gestion de points de visites, outil de planification optimisé.</p>
              </motion.div>

              <motion.div 
                className={styles.challengeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h4>Piloter l'activité commerciale en temps réel</h4>
                <p>Tableaux de bord personnalisés pour suivre les KPIs clés : nombre de visites, commandes, expositions, ruptures, etc.</p>
              </motion.div>

              <motion.div 
                className={styles.challengeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <h4>Aligner les équipes marketing, commerciale et terrain</h4>
                <p>Plateformes centralisées pour un pilotage cohérent des campagnes et des promotions.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      <div className={styles.aboutContainer}>
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className={styles.aboutSubtitle}>Ce que nous vous apportons</h3>
              <ul className={styles.benefitsList}>
                <li>Une meilleure exécution en point de vente</li>
                <li>Un gain de temps opérationnel pour vos équipes</li>
                <li>Une prise de décision plus rapide, basée sur des données terrain fiables</li>
                <li>Une augmentation mesurable du sell-out</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className={styles.aboutSubtitle}>Focus métier</h3>
              <p className={styles.focusText}>
                Chaque solution PMP est conçue en étroite collaboration avec vos équipes, pour répondre 
                aux spécificités de votre organisation : segmentation client, zones de couverture, 
                politique commerciale, CRM, etc.
              </p>
            </motion.div> 
        </div>
    </section>
  );
};

export default AboutSection; 