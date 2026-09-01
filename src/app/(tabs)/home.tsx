import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CustomInput } from '@/components/CustomInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useThemeContext } from '@/context/ThemeContext';
import {
  getUser,
  removeSession,
  updateUser,
} from '@/services/storageService';
import type { User } from '@/types/user';

export default function HomeScreen() {
  const { colors } = useThemeContext();

  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);

      const storedUser = await getUser();

      if (!storedUser) {
        router.replace('/');
        return;
      }

      setUser(storedUser);
      setName(storedUser.name);
      setEmail(storedUser.email);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados do usuário.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [loadUser])
  );

  const handleSave = async () => {
    if (!user) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert('Atenção', 'Informe seu nome.');
      return;
    }

    if (!trimmedEmail) {
      Alert.alert('Atenção', 'Informe seu e-mail.');
      return;
    }

    try {
      setIsSaving(true);

      const updatedUser: User = {
        ...user,
        name: trimmedName,
        email: trimmedEmail,
      };

      await updateUser(updatedUser);

      setUser(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email);

      Alert.alert(
        'Sucesso',
        'Seus dados foram atualizados.'
      );
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      Alert.alert(
        'Erro',
        'Não foi possível atualizar seus dados.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await removeSession();

      router.replace('/');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);

      setIsLoggingOut(false);

      Alert.alert(
        'Erro',
        'Não foi possível sair da conta. Tente novamente.'
      );
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Meu perfil
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Atualize seus dados pessoais
            </Text>
          </View>

          <ThemeSwitch />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {name
                ? name.charAt(0).toUpperCase()
                : '?'}
            </Text>
          </View>

          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Dados pessoais
          </Text>

          <Text
            style={[
              styles.cardSubtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Mantenha suas informações atualizadas.
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Nome"
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              editable={!isSaving && !isLoggingOut}
            />

            <CustomInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSaving && !isLoggingOut}
            />

            <PrimaryButton
              title="Salvar alterações"
              onPress={handleSave}
              loading={isSaving}
              disabled={isLoggingOut}
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <Pressable
            onPress={handleLogout}
            disabled={isSaving || isLoggingOut}
            style={({ pressed }) => [
              styles.logoutButton,
              {
                borderColor: colors.error,
                opacity:
                  isSaving || isLoggingOut
                    ? 0.5
                    : pressed
                      ? 0.7
                      : 1,
              },
            ]}
          >
            {isLoggingOut ? (
              <ActivityIndicator
                size="small"
                color={colors.error}
              />
            ) : (
              <Text
                style={[
                  styles.logoutText,
                  {
                    color: colors.error,
                  },
                ]}
              >
                Sair da conta
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 32,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },

  card: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },

  form: {
    width: '100%',
  },

  logoutContainer: {
    width: '100%',
    marginTop: 20,
  },

  logoutButton: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});