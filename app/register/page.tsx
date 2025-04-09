import RegisterForm from '../components/RegisterForm';
import styles from '../page.module.css';

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </main>
  );
} 