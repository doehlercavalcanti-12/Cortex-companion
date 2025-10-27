import { memo } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import useAuth from '../hooks/useAuth.js';
import styles from '../styles/HomeScreen.module.css';

const HomeScreen = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cortex Companion</h1>
      <p className={styles.subtitle}>
        {isAuthenticated
          ? 'Você já está autenticado e pronto para consumir as APIs seguras.'
          : 'Faça login para explorar os recursos protegidos do app.'}
      </p>
      {!isAuthenticated && (
        <PrimaryButton label="Entrar com OAuth" onPress={login} />
      )}
    </main>
  );
};

export default memo(HomeScreen);
