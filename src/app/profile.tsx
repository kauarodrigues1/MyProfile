// ==========================================================================
// ARQUIVO TEMPORARIO DE TESTE - NAO COMMITAR
// Remover com: rm src/app/profile.tsx
// ==========================================================================
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
        <Pressable style={styles.devButton} onPress={handleSeed}>
          <Text style={styles.devButtonText}>Criar usuario</Text>
        </Pressable>

        <Pressable style={styles.devButton} onPress={handleClear}>
          <Text style={styles.devButtonText}>Limpar</Text>
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
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: Platform.select({ web: 100, default: 48 }),
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  devButton: {
    backgroundColor: 'rgba(127,127,127,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  devButtonText: {
    color: '#8A8A8E',
    fontSize: 11,
    fontWeight: '600',
  },
});
