import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { CustomInput } from '@/components/CustomInput';

export function RegisterScreen() {
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

    console.log('Cadastro realizado com sucesso:', newUser);

    // Vai diretamente para o MyProfile
    router.replace('/(tabs)');
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
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crie sua conta</Text>

        <CustomInput
          label="Nome completo"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />

        <CustomInput
          label="Nome de usuário"
          placeholder="Escolha um username"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
          autoCapitalize="none"
        />

        <CustomInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Senha"
          placeholder="Crie uma senha"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />

        <CustomInput
          label="Confirme a senha"
          placeholder="Repita sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.replace('/(tabs)')}
          disabled={isLoading}
        >
          <Text style={styles.linkText}>
            Já tem cadastro? Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333333',
  },

  button: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  linkButton: {
    marginTop: 24,
    alignItems: 'center',
  },

  linkText: {
    color: '#FF6B00',
    fontSize: 16,
  },
});