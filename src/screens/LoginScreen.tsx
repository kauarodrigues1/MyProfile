import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CustomInput } from '@/components/CustomInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';

export function LoginScreen() {
  const { login, isLoading } = useAuth();
  const { colors } = useThemeContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (): Promise<void> => {
    setError('');

    if (!username.trim()) {
      setError('Informe seu nome de usuário.');
      return;
    }

    if (!password.trim()) {
      setError('Informe sua senha.');
      return;
    }

    try {
      await login(username.trim(), password);

      router.replace('/(tabs)');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Não foi possível realizar o login.');
      }
    }
  };

  const handleRegister = (): void => {
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboard,
        { backgroundColor: colors.background },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
              ]}
            >
              MyProfile
            </Text>

            <Text
              style={[
                styles.subtitle,
                { color: colors.textSecondary },
              ]}
            >
              Entre na sua conta para continuar
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Nome de usuário"
              placeholder="Digite seu usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
            />

            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />

            {error ? (
              <Text
                style={[
                  styles.error,
                  { color: colors.error },
                ]}
              >
                {error}
              </Text>
            ) : null}

            <PrimaryButton
              title="Entrar"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          <View style={styles.registerArea}>
            <Text
              style={[
                styles.registerText,
                { color: colors.textSecondary },
              ]}
            >
              Ainda não possui cadastro?
            </Text>

            <Text
              style={[
                styles.registerButton,
                { color: colors.primary },
              ]}
              onPress={isLoading ? undefined : handleRegister}
            >
              Cadastrar
            </Text>
          </View>

          {isLoading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.loading}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  container: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },

  form: {
    gap: 4,
  },

  error: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },

  registerArea: {
    alignItems: 'center',
    marginTop: 28,
  },

  registerText: {
    fontSize: 14,
    marginBottom: 8,
  },

  registerButton: {
    fontSize: 16,
    fontWeight: '700',
  },

  loading: {
    marginTop: 16,
  },
});