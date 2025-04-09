'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor2() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Combinaison de méthodes pour cacher la souris
    document.body.style.cursor = 'none';
    document.body.requestPointerLock();
    
    // Cacher le curseur sur tous les éléments
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.cursor = 'none';
      }
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      document.exitPointerLock();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999999 }}>
      {/* Halo externe */}
      <motion.div
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          filter: 'blur(2px)',
          left: position.x - 20,
          top: position.y - 20,
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      
      {/* Cercle moyen */}
      <motion.div
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          left: position.x - 10,
          top: position.y - 10,
        }}
        animate={{
          scale: isHovering ? 1.2 : isClicking ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      
      {/* Point central */}
      <motion.div
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: 'black',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          left: position.x - 4,
          top: position.y - 4,
        }}
        animate={{
          scale: isHovering ? 0.5 : isClicking ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
    </div>
  );
} 