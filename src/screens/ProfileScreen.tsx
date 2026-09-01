import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileCard } from '@/components/ProfileCard';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/context/ThemeContext';
import { EditProfileScreen } from '@/screens/EditProfileScreen';
import { getUser } from '@/services/storageService';
import { User } from '@/types/user';

export function ProfileScreen() {
  const { colors } = useThemeContext();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const storedUser = await getUser();
      setUser(storedUser);
    } catch {
      setError('Não foi possível carregar o perfil.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleSaved = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />

          <ThemedText type="small" themeColor="textSecondary">
            Carregando perfil...
          </ThemedText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <ThemedText style={styles.centerText}>
            {error}
          </ThemedText>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={loadUser}
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar o perfil novamente"
          >
            <Text style={styles.primaryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      );
    }

    if (!user) {
      return (
        <View style={styles.centered}>
          <ThemedText style={styles.centerText}>
            Nenhum perfil encontrado.
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.centerText}
          >
            Faça o cadastro para visualizar seus dados aqui.
          </ThemedText>
        </View>
      );
    }

    return (
      <View style={styles.profileContent}>
        <View>
          <ThemedText style={styles.title}>
            Perfil
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.subtitle}
          >
            Visualize e gerencie suas informações pessoais.
          </ThemedText>
        </View>

        <ProfileCard
          user={user}
        />

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={() => setIsEditing(true)}
          accessibilityRole="button"
          accessibilityLabel="Editar perfil"
        >
          <Text style={styles.primaryButtonText}>
            Editar perfil
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>

      {user ? (
        <Modal
          visible={isEditing}
          animationType="slide"
          onRequestClose={() => setIsEditing(false)}
        >
          <EditProfileScreen
            user={user}
            onCancel={() => setIsEditing(false)}
            onSaved={handleSaved}
          />
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.four,
  },

  content: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },

  profileContent: {
    gap: Spacing.three,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },

  centerText: {
    textAlign: 'center',
  },

  primaryButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});