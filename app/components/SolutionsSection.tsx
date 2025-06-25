import { ShoppingCartIcon, UserGroupIcon, CameraIcon, DocumentTextIcon, ChartBarIcon, XMarkIcon, CheckCircleIcon, ArrowRightIcon, StarIcon, CogIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, ChartPieIcon, DevicePhoneMobileIcon, BuildingStorefrontIcon, DocumentCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import styles from '../page.module.css';
import { useState } from 'react';

const solutions = [
  {
    title: "PMP CDE",
    description: "L'efficacité terrain au service de la pharmacie",
    detailedInfo: "Optimisez vos tournées et vos commandes avec notre application dédiée au secteur pharmaceutique.\n\nConçue pour les délégués pharmaceutiques, notre application de prise de commande simplifie chaque étape de la relation client en officine. En un seul outil, vous accédez à l'ensemble du catalogue produits, aux conditions commerciales personnalisées, aux promotions en cours, aux stocks disponibles et à l'historique d'achat de chaque pharmacie.\n\nGrâce à une interface intuitive la gestion automatisée et personnalisée des conditions commerciales, vous saisissez vos commandes en quelques clics, directement pendant la visite, même en mode hors connexion. L'application intègre également des outils de reporting, de géolocalisation, de suivi d'objectifs, et de gestion des tournées, pour un pilotage optimal de votre activité commerciale.\n\n✅ Avantages clés :\n• Gain de temps lors des visites\n• Réduction des erreurs de saisie\n• Suivi précis des performances commerciales\n• Amélioration de la satisfaction client\n\nGagnez en productivité, valorisez votre relation client et boostez vos ventes en pharmacie.\nNotre solution est 100 % adaptée aux exigences du secteur pharmaceutique.",
    icon: <ShoppingCartIcon className={styles.serviceIcon} />
  },
  {
    title: "PMP VM",
    description: "Renforcez l'impact de vos visites médicales avec une application intelligente",
    detailedInfo: "La visite médicale réinventée, au bout des doigts.\n\nUne solution mobile sur smartphone pour optimiser vos listes médicales.\n\nConçue pour les délégués médicaux, notre application accompagne vos visites en cabinet, clinique ou hôpital. Elle permet de planifier vos rendez-vous, suivre les contacts prescripteurs, tout en respectant le cycle de communication du laboratoire. Vous pouvez aussi enregistrer les retours terrain, les intentions de prescription, et tracer précisément vos interactions.\n\nLa saisie des comptes rendus, la gestion des territoires, l'analyse de la couverture et des fréquences de visite sont centralisées dans un seul outil connecté à votre CRM. L'application reste fonctionnelle hors ligne, pour une utilisation fluide en toutes circonstances.\n\n✅ Avantages pour les visiteurs médicaux :\n• Organisation des tournées et optimisation des trajets\n• Historique des échanges avec chaque médecin\n• Reporting automatisé vers les équipes marketing et réglementaires\n• Respect de la conformité réglementaire (traçabilité, charte de la VM)\n\nSoyez plus impactant à chaque visite. Gagnez en réactivité, en efficacité et en professionnalisme.",
    icon: <UserGroupIcon className={styles.serviceIcon} />
  },
  {
    title: "PMP MERCH",
    description: "Application de merchandising parapharmacie avec prise de photos",
    detailedInfo: "Pilotez vos implantations et valorisez vos marques en point de vente.\n\nConçue pour les équipes terrain intervenant en parapharmacie, notre application permet de réaliser des relevés précis et illustrés directement sur tablette ou smartphone. Elle intègre la prise de photos horodatées et géolocalisées pour documenter l'état réel des rayons, PLV et présentations produits.\n\nFonctionnalités clés :\n• Relevé des facings, prix, ruptures et emplacements concurrents\n• Photos des linéaires, avant/après intervention\n• Contrôle de la bonne mise en place des opérations commerciales\n• Suivi des objectifs merchandising (visibilité, planogrammes, implantations)\n• Synchronisation en temps réel avec votre back-office\n\n✅ Avantages pour les laboratoires et marques :\n• Visibilité terrain claire et fiable\n• Argumentaire renforcé auprès des officines partenaires\n• Reporting visuel pour vos équipes marketing\n• Meilleur respect des guidelines merchandising\n\nMaîtrisez votre présence en parapharmacie, appuyez vos actions par la preuve visuelle.",
    icon: <CameraIcon className={styles.serviceIcon} />
  },
  {
    title: "PMP Signature Électronique",
    description: "Optimisez la gestion de vos documents officiels",
    detailedInfo: "Optimisez la gestion de vos documents officiels (ordonnances, bons de commande, protocoles internes) grâce à un outil sécurisé et conforme aux normes eIDAS et RGPD.\n\n• Gain de temps : signature et validation en quelques clics, sans impression ni scan\n• Sécurité renforcée : horodatage, traçabilité complète, cryptographie à chaque étape\n• Conformité garantie : respect des normes légales pour les documents pharmaceutiques\n• Expérience fluide : interface intuitive pour pharmaciens, employés et prescripteurs\n• Archivage intelligent : conservation automatisée de l'historique, accessible à tout moment",
    icon: <DocumentTextIcon className={styles.serviceIcon} />
  },
  {
    title: "PMP Data BI",
    description: "Analyse Pharmaceutique & Décision",
    detailedInfo: "Exploitez la puissance de vos données terrain, sell-in, sell-out et merchandising pour piloter votre activité pharmaceutique avec précision.\n\n• Tableaux de bord sur mesure : suivez en temps réel les performances par officine, secteur ou produit\n• Analyse des ventes : croisez données sell-in/sell-out pour affiner vos prévisions et vos actions commerciales\n• Pilotage des visites médicales & merchandising : visualisez les retours terrain, le respect des plans d'action et l'engagement des équipes\n• Suivi des campagnes marketing : mesurez l'impact réel en point de vente\n• Accès multi-supports & collaboratif : partagez vos rapports avec les équipes siège et terrain en un clic\n\nPrenez des décisions éclairées, gagnez en réactivité et alignez vos forces commerciales, marketing et logistiques autour de données fiables et activables.",
    icon: <ChartBarIcon className={styles.serviceIcon} />
  }
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: typeof solutions[0] | null;
}

function Modal({ isOpen, onClose, solution }: ModalProps) {
  if (!isOpen || !solution) return null;

  const handleModalScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const parseContent = (text: string) => {
    const sections = text.split('\n\n');
    const content = {
      intro: '',
      description: '',
      features: [] as string[],
      advantages: [] as string[],
      conclusion: ''
    };

    sections.forEach(section => {
      if (section.includes('✅')) {
        const lines = section.split('\n');
        const items = lines.slice(1).map(item => item.replace('•', '').trim()).filter(Boolean);
        content.advantages = items;
      } else if (section.includes('Fonctionnalités clés :')) {
        const lines = section.split('\n');
        const items = lines.slice(1).map(item => item.replace('•', '').trim()).filter(Boolean);
        content.features = items;
      } else if (section.includes('•')) {
        const items = section.split('\n').map(item => item.replace('•', '').trim()).filter(Boolean);
        content.features = items;
      } else if (section.length > 100) {
        if (!content.intro) {
          content.intro = section;
        } else if (!content.description) {
          content.description = section;
        } else {
          content.conclusion = section;
        }
      }
    });

    return content;
  };

  const content = parseContent(solution.detailedInfo);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div 
        className={styles.modalContent}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleModalScroll}
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
          
          <div className={styles.modalContent}>
            {content.intro && (
              <div className={styles.contentSection}>
                <p className={styles.introText}>{content.intro}</p>
              </div>
            )}
            
            {content.description && (
              <div className={styles.contentSection}>
                <p className={styles.descriptionText}>{content.description}</p>
              </div>
            )}
            
            <div className={styles.contentGrid}>
              {content.features.length > 0 && (
                <div className={styles.featuresSection}>
                  <h3>Fonctionnalités</h3>
                  <ul>
                    {content.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {content.advantages.length > 0 && (
                <div className={styles.advantagesSection}>
                  <h3>Avantages</h3>
                  <ul>
                    {content.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {content.conclusion && (
              <div className={styles.contentSection}>
                <p className={styles.conclusionText}>{content.conclusion}</p>
              </div>
            )}
          </div>
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
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