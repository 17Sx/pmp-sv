import { MagnifyingGlassIcon, CodeBracketIcon, ComputerDesktopIcon, AcademicCapIcon, PhoneIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styles from '../page.module.css';
import { useState } from 'react';

const solutions = [
  {
    title: "Une étude complète de vos besoins",
    description: "Analyse approfondie de vos processus et identification des solutions les plus adaptées à votre entreprise.",
    detailedInfo: "Notre équipe d'experts réalise une analyse approfondie de vos processus métiers, identifie les points d'amélioration et conçoit des solutions personnalisées pour optimiser votre efficacité opérationnelle. Nous utilisons des méthodologies éprouvées pour comprendre en profondeur vos défis spécifiques et vous proposer des recommandations adaptées à votre secteur d'activité et à vos objectifs stratégiques.",
    icon: <MagnifyingGlassIcon className={styles.serviceIcon} />
  },
  {
    title: "Des applications personnalisées",
    description: "Développement de solutions sur mesure répondant précisément à vos besoins spécifiques.",
    detailedInfo: "Nos développeurs créent des applications entièrement personnalisées qui répondent précisément à vos besoins spécifiques. Qu'il s'agisse d'applications web, mobiles ou de bureau, nous utilisons les technologies les plus récentes pour garantir performance, évolutivité et sécurité. Chaque solution est conçue pour s'intégrer parfaitement à vos systèmes existants et améliorer votre productivité quotidienne.",
    icon: <CodeBracketIcon className={styles.serviceIcon} />
  },
  {
    title: "Des conseils pour le choix du matériel",
    description: "Expertise et recommandations pour sélectionner l'équipement le plus adapté à vos besoins.",
    detailedInfo: "Notre expertise en matériel informatique vous permet de faire les choix les plus judicieux pour votre infrastructure. Nous vous guidons dans la sélection des équipements adaptés à vos besoins spécifiques et à votre budget. Nos recommandations prennent en compte les dernières innovations technologiques tout en garantissant la compatibilité avec vos systèmes existants pour une transition en douceur.",
    icon: <ComputerDesktopIcon className={styles.serviceIcon} />
  },
  {
    title: "La formation de tous les utilisateurs",
    description: "Programmes de formation complets pour assurer une adoption efficace des solutions.",
    detailedInfo: "Nous proposons des programmes de formation complets et adaptés à tous les niveaux d'expertise. Nos sessions de formation sont conçues pour maximiser l'adoption des nouvelles technologies par vos équipes et garantir une utilisation optimale de vos outils numériques. Des supports de formation détaillés et un suivi personnalisé permettent à chaque utilisateur de maîtriser rapidement les nouvelles solutions.",
    icon: <AcademicCapIcon className={styles.serviceIcon} />
  },
  {
    title: "Une Hot-line et assistance technique",
    description: "Support technique réactif et assistance continue pour garantir le bon fonctionnement de vos systèmes.",
    detailedInfo: "Notre service d'assistance technique est disponible pour résoudre rapidement tout problème que vous pourriez rencontrer. Nous offrons un support réactif par téléphone, email ou via notre plateforme dédiée, avec des temps de réponse garantis selon vos besoins. Notre équipe technique expérimentée assure le bon fonctionnement de vos systèmes et minimise les interruptions potentielles de votre activité.",
    icon: <PhoneIcon className={styles.serviceIcon} />
  },
  {
    title: "L'hébergement de vos données en toute confidentialité",
    description: "Solutions d'hébergement sécurisées garantissant la protection et la confidentialité de vos données.",
    detailedInfo: "Nous proposons des solutions d'hébergement hautement sécurisées pour vos données sensibles. Nos infrastructures respectent les normes les plus strictes en matière de sécurité et de confidentialité, avec des protocoles de chiffrement avancés et des sauvegardes régulières. Nous garantissons la conformité avec les réglementations en vigueur (RGPD, etc.) et assurons la disponibilité permanente de vos services critiques.",
    icon: <ShieldCheckIcon className={styles.serviceIcon} />
  }
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: typeof solutions[0] | null;
}

function Modal({ isOpen, onClose, solution }: ModalProps) {
  if (!isOpen || !solution) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div 
        className={styles.modalContent}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <XMarkIcon className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalIconWrapper}>
            {solution.icon}
          </div>
          <h2 className={styles.modalTitle}>{solution.title}</h2>
          <p className={styles.modalDescription}>{solution.detailedInfo}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<typeof solutions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (solution: typeof solutions[0]) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id='solutions' className={styles.solutionsSection}>
      <div className={styles.solutionsContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.solutionsTitle}
        >
          Nos Solutions
        </motion.h2>
        
        <div className={styles.solutionsGrid}>
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className={`${styles.solutionCard} ${styles.clickable}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openModal(solution)}
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        solution={selectedSolution} 
      />
    </section>
  );
} 