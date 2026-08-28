import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { CustomInput } from '../components/CustomInput';

// Tipagem básica para a navegação (caso esteja usando React Navigation)
interface RegisterScreenProps {
  navigation: any; 
}

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de controle
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Função de validação
  const validate = () => {
    let isValid = true;
    let newErrors: { [key: string]: string } = {};

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
      // Regex simples para validar formato de e-mail
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
      newErrors.confirmPassword = 'A confirmação de senha é obrigatória.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não são iguais.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Função disparada ao clicar no botão Cadastrar
  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      // Cria o objeto do usuário
      const newUser = {
        id: Date.now().toString(),
        name,
        username,
        email,
        password,
        phone: '',
        city: '',
        bio: '',
      };

      // Simula um tempo de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salva no AsyncStorage
      await AsyncStorage.setItem('@myprofile:user', JSON.stringify(newUser));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o cadastro. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // VEJA AQUI: O KeyboardAvoidingView agora envolve o ScrollView corretamente
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.linkText}>Já tem cadastro? Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});