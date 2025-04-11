import Link from 'next/link';
import styles from '../../page.module.css';

export default function UnsubscribeSuccess() {
  return (
    <div className={styles.newsletterSection} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className={styles.newsletterContainer}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterIconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.newsletterIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={styles.newsletterTitle}>Désabonnement confirmé</h1>
          <p className={styles.newsletterText}>
            Vous avez bien été désabonné de notre newsletter. Nous ne vous enverrons plus d'emails.
          </p>
          <p className={styles.newsletterText}>
            Si vous souhaitez vous réabonner à l'avenir, vous pourrez le faire depuis notre site web.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/" className={styles.btnPrimary}>
              Retourner à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 