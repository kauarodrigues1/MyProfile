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
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import { EditProfileScreen } from '@/screens/EditProfileScreen';
import { getUser } from '@/services/storageService';
import { Theme } from '@/types/theme';
import { User } from '@/types/user';

const ACCENT_COLOR = '#FF6B00';

export function ProfileScreen() {
  const colors = useTheme();
  const scheme = useColorScheme();
  const theme: Theme = scheme === 'dark' ? 'dark' : 'light';

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
          <ActivityIndicator color={ACCENT_COLOR} />
          <ThemedText type="small" themeColor="textSecondary">
            Carregando perfil...
          </ThemedText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <ThemedText style={styles.centerText}>{error}</ThemedText>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            onPress={loadUser}
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar o perfil novamente">
            <Text style={styles.primaryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      );
    }

    if (!user) {
      return (
        <View style={styles.centered}>
          <ThemedText style={styles.centerText}>Nenhum perfil encontrado.</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
            Faça o cadastro para visualizar seus dados aqui.
          </ThemedText>
        </View>
      );
    }

    return (
      <View style={styles.profileContent}>
        <ThemedText type="subtitle">Perfil</ThemedText>

        <ProfileCard user={user} theme={theme} />

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={() => setIsEditing(true)}
          accessibilityRole="button"
          accessibilityLabel="Editar perfil">
          <Text style={styles.primaryButtonText}>Editar perfil</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>

      {user ? (
        <Modal
          visible={isEditing}
          animationType="slide"
          onRequestClose={() => setIsEditing(false)}>
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
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  content: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  profileContent: {
    gap: Spacing.three,
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
  pressed: {
    opacity: 0.85,
  },
  primaryButton: {
    backgroundColor: ACCENT_COLOR,
    height: 52,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
