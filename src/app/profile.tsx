import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { USER_STORAGE_KEY } from '@/constants/storage';
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

const CREATE_COLOR = '#16A34A';
const CLEAR_COLOR = '#DC2626';

export default function ProfileRouteDevHarness() {
  const [reloadKey, setReloadKey] = useState(0);

  const remount = () => setReloadKey((key) => key + 1);

  const handleSeed = async () => {
    await saveUser(TEST_USER);
    remount();
  };

  const handleClear = async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    remount();
  };

  return (
    <View style={styles.container}>
      <View style={styles.devBar}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.createButton,
            pressed && styles.pressed,
          ]}
          onPress={handleSeed}
          accessibilityRole="button"
          accessibilityLabel="Criar usuario de teste">
          <Text style={styles.createIcon}>+</Text>
          <Text style={styles.createText}>Criar usuário de teste</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.clearButton,
            pressed && styles.pressed,
          ]}
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Limpar dados salvos">
          <Text style={styles.clearIcon}>×</Text>
          <Text style={styles.clearText}>Limpar dados</Text>
        </Pressable>
      </View>

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
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: Platform.select({ web: 100, default: 48 }),
    paddingBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  createButton: {
    backgroundColor: CREATE_COLOR,
  },
  createIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  clearButton: {
    borderWidth: 2,
    borderColor: CLEAR_COLOR,
  },
  clearIcon: {
    color: CLEAR_COLOR,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  clearText: {
    color: CLEAR_COLOR,
    fontSize: 15,
    fontWeight: '700',
  },
});
