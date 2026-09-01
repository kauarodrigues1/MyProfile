import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { saveUser } from '@/services/storageService';
import { User } from '@/types/user';

const TEST_USER: User = {
  id: '1',
  username: 'felipe',
  password: '123456',
  name: 'Felipe Marceli',
  email: 'felipesmarceli@gmail.com',
  phone: '',
  city: '',
  bio: '',
};

export default function ProfileRouteDevHarness() {
  const { colors } = useThemeContext();

  const [reloadKey, setReloadKey] = useState(0);

  const remount = () => {
    setReloadKey((key) => key + 1);
  };

  const handleSeed = async () => {
    await saveUser(TEST_USER);
    remount();
  };

  const handleClear = async () => {
    await AsyncStorage.removeItem('@myprofile:user');
    remount();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* ÁREA DE TESTE */}
      <View style={styles.devBar}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.createButton,
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleSeed}
          accessibilityRole="button"
          accessibilityLabel="Criar usuário de teste"
        >
          <Text style={styles.createIcon}>+</Text>

          <Text style={styles.createText}>
            Criar usuário de teste
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.clearButton,
            {
              borderColor: colors.error,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Limpar dados salvos"
        >
          <Text
            style={[
              styles.clearIcon,
              {
                color: colors.error,
              },
            ]}
          >
            ×
          </Text>

          <Text
            style={[
              styles.clearText,
              {
                color: colors.error,
              },
            ]}
          >
            Limpar dados
          </Text>
        </Pressable>
      </View>

      {/* PERFIL */}
      <ProfileScreen key={reloadKey} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  devBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 12,

    paddingHorizontal: 16,

    // Deixa espaço para o menu Home / Perfil
    paddingTop: Platform.select({
      web: 72,
      default: 20,
    }),

    paddingBottom: 12,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 42,

    paddingHorizontal: 18,

    borderRadius: 21,
  },

  createButton: {
    backgroundColor: '#16A34A',
  },

  createIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',

    marginRight: 7,

    lineHeight: 22,
  },

  createText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },

  clearIcon: {
    fontSize: 19,
    fontWeight: '700',

    marginRight: 7,

    lineHeight: 21,
  },

  clearText: {
    fontSize: 14,
    fontWeight: '700',
  },
});