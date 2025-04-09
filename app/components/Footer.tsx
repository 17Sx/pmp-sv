import Link from 'next/link';
import styles from '../page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div>
          <img
            src="/img/logo.png"
            alt="PMP Logo"
            className={styles.footerLogo}
          />
          <p className={styles.footerText}>
            Solutions informatiques professionnelles pour les entreprises.
          </p>
        </div>
        <div>
          <h3 className={styles.footerTitle}>Liens rapides</h3>
          <div className={styles.footerLinks}>
            <Link href="/#solutions" className={styles.footerLink}>
              Solutions
            </Link>
            <Link href="/#about" className={styles.footerLink}>
              À propos
            </Link>
            <Link href="/#contact" className={styles.footerLink}>
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h3 className={styles.footerTitle}>Contact</h3>
          <div className={styles.footerContact}>
            <div className={styles.contactItem}>
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className={styles.contactItem}>
              <span>contact@pmp.fr</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} PMP. Tous droits réservés.
      </div>
    </footer>
  );
}
