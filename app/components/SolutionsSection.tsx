import { MagnifyingGlassIcon, CodeBracketIcon, ComputerDesktopIcon, AcademicCapIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

const solutions = [
  {
    title: "Une étude complète de vos besoins",
    description: "Analyse approfondie de vos processus et identification des solutions les plus adaptées à votre entreprise.",
    icon: <MagnifyingGlassIcon className={styles.serviceIcon} />
  },
  {
    title: "Des applications personnalisées",
    description: "Développement de solutions sur mesure répondant précisément à vos besoins spécifiques.",
    icon: <CodeBracketIcon className={styles.serviceIcon} />
  },
  {
    title: "Des conseils pour le choix du matériel",
    description: "Expertise et recommandations pour sélectionner l'équipement le plus adapté à vos besoins.",
    icon: <ComputerDesktopIcon className={styles.serviceIcon} />
  },
  {
    title: "La formation de tous les utilisateurs",
    description: "Programmes de formation complets pour assurer une adoption efficace des solutions.",
    icon: <AcademicCapIcon className={styles.serviceIcon} />
  },
  {
    title: "Une Hot-line et assistance technique",
    description: "Support technique réactif et assistance continue pour garantir le bon fonctionnement de vos systèmes.",
    icon: <PhoneIcon className={styles.serviceIcon} />
  },
  {
    title: "L'hébergement de vos données en toute confidentialité",
    description: "Solutions d'hébergement sécurisées garantissant la protection et la confidentialité de vos données.",
    icon: <ShieldCheckIcon className={styles.serviceIcon} />
  }
];

export default function SolutionsSection() {
  return (
    <section id='solutions' className={styles.solutionsSection}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Nos Solutions
        </motion.h2>
        
        <div className={styles.solutionsGrid}>
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className={styles.solutionCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.solutionIcon}>
                {solution.icon}
              </div>
              <h3 className={styles.solutionTitle}>{solution.title}</h3>
              <p className={styles.solutionDescription}>{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 