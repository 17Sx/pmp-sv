'use client';

import { motion } from 'framer-motion';
import styles from '../page.module.css';

const BackgroundShapes = () => {
  return (
    <div className={styles.backgroundShapes}>
      {/* Cercle bleu */}
      <motion.div
        className={styles.shapeCircle}
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Triangle vert */}
      <motion.div
        className={styles.shapeTriangle}
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Carré violet */}
      <motion.div
        className={styles.shapeSquare}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Ligne horizontale */}
      <motion.div
        className={styles.shapeLine}
        animate={{
          x: [0, 30, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BackgroundShapes; 