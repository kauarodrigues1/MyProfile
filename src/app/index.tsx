import { Redirect, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { LoginScreen } from '../screens/LoginScreen';
import { getAuthenticatedUser } from '../services/authService';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const checkSession = async () => {
        try {
          setIsLoading(true);

          const user =
            await getAuthenticatedUser();

          if (isActive) {
            setIsAuthenticated(
              user !== null
            );
          }
        } catch (error) {
          console.error(
            'Erro ao verificar sessão:',
            error
          );

          if (isActive) {
            setIsAuthenticated(false);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      checkSession();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <LoginScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});