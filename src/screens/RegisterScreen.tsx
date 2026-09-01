import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

export function RegisterScreen() {
  const { colors } = useThemeContext();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Informe seu nome.';
      isValid = false;
    }

    if (!username.trim()) {
      newErrors.username = 'Informe um nome de usuário.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Informe seu e-mail.';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email = 'Informe um e-mail válido.';
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        'A confirmação de senha é obrigatória.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não são iguais.';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        phone: '',
        city: '',
        bio: '',
      };

      await AsyncStorage.setItem(
        '@myprofile:user',
        JSON.stringify(newUser)
      );

      console.log(
        'Cadastro realizado com sucesso:',
        newUser
      );

      router.replace('/home');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      Alert.alert(
        'Erro',
        'Não foi possível realizar o cadastro. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboard,
        {
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Criar sua conta
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Preencha seus dados para começar
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <CustomInput
              label="Nome completo"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              error={errors.name}
              editable={!isLoading}
            />

            <CustomInput
              label="Nome de usuário"
              placeholder="Escolha um username"
              value={username}
              onChangeText={setUsername}
              error={errors.username}
              autoCapitalize="none"
              editable={!isLoading}
            />

            <CustomInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />

            <CustomInput
              label="Senha"
              placeholder="Crie uma senha"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              editable={!isLoading}
            />

            <CustomInput
              label="Confirme a senha"
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              secureTextEntry
              editable={!isLoading}
            />

            <PrimaryButton
              title="Cadastrar"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Voltar para login */}
          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Já possui uma conta?
            </Text>

            <Text
              style={[
                styles.loginButton,
                {
                  color: colors.primary,
                },
              ]}
              onPress={
                isLoading
                  ? undefined
                  : () => router.replace('/')
              }
            >
              Entrar
            </Text>
          </View>
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
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },

  form: {
    gap: 4,
  },

  footer: {
    alignItems: 'center',
    marginTop: 28,
  },

  footerText: {
    fontSize: 14,
    marginBottom: 8,
  },

  loginButton: {
    fontSize: 16,
    fontWeight: '700',
  },
});