'use client';

import { motion } from 'framer-motion';
import { FaApple, FaAndroid, FaWindows } from 'react-icons/fa';
import styles from '../page.module.css';

const DownloadSection = () => {
  return (
    <section id="telechargement" className={styles.downloadSection}>
      <div className={styles.downloadContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Téléchargez nos applications
        </motion.h2>

        <div className={styles.downloadGrid}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.downloadCard}
          >
            <FaApple className={styles.downloadIcon} />
            <h3>iOS</h3>
            <p>Application mobile pour iPhone et iPad et produit apple</p>
            <a 
              href="https://apps.apple.com/fr/app/pmpcompagnon/id1480675399"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              Télécharger sur l'App Store
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={styles.downloadCard}
          >
            <FaAndroid className={styles.downloadIcon} />
            <h3>Android</h3>
            <p>Application mobile pour smartphones Android</p>
            <a 
              href="https://play.google.com/store/apps/details?id=pmp.fr.pmpcompagnion&gl=FR"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              Télécharger sur Google Play
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={styles.downloadCard}
          >
            <FaWindows className={styles.downloadIcon} />
            <h3>TeamViewer</h3>
            <p>Support à distance pour Windows, Mac et Linux</p>
            <a 
              href="https://get.teamviewer.com/pmpassist"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              Télécharger TeamViewer
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection; 