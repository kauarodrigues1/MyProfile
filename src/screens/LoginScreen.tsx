import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "../hooks/useAuth";

export function LoginScreen() {
  const { login, isLoading } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    setError("");

    if (!username.trim()) {
      setError("Informe seu nome de usuário.");
      return;
    }

    if (!password.trim()) {
      setError("Informe sua senha.");
      return;
    }

    try {
      await login(username.trim(), password);

      router.replace("/profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Não foi possível realizar o login.");
      }
    }
  };

  const handleRegister = (): void => {
    console.log("Rota de cadastro ainda não disponível.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyProfile</Text>

      <Text style={styles.label}>Nome de usuário</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu usuário"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <Text style={styles.label}>Senha</Text>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
        editable={!isLoading}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </Pressable>

      <Text style={styles.registerText}>Ainda não possui cadastro?</Text>

      <Pressable onPress={handleRegister} disabled={isLoading}>
        <Text style={styles.registerButton}>Cadastrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },

  error: {
    fontSize: 14,
    marginTop: 4,
  },

  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  registerText: {
    textAlign: "center",
    marginTop: 20,
  },

  registerButton: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
