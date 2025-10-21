import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cortex Companion</Text>
      <Text style={styles.subtitle}>
        {isAuthenticated
          ? 'Você já está autenticado e pronto para consumir as APIs seguras.'
          : 'Faça login para explorar os recursos protegidos do app.'}
      </Text>
      {!isAuthenticated && (
        <PrimaryButton label="Entrar com OAuth" onPress={login} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0B172A',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default HomeScreen;
