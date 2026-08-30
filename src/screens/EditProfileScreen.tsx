import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '@/components/CustomInput';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { updateUser } from '@/services/storageService';
import { User } from '@/types/user';

type EditProfileScreenProps = {
  user: User;
  onCancel: () => void;
  onSaved: (user: User) => void;
};

type FormErrors = Partial<Record<'name' | 'email', string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ACCENT_COLOR = '#FF6B00';
const ERROR_COLOR = '#DC2626';

export function EditProfileScreen({ user, onCancel, onSaved }: EditProfileScreenProps) {
  const colors = useTheme();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [bio, setBio] = useState(user.bio);

  const [errors, setErrors] = useState<FormErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Informe seu nome.';
    }

    if (!email.trim()) {
      newErrors.email = 'Informe seu e-mail.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setSaveError(null);

    if (!validate()) {
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser: User = {
        ...user,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        bio: bio.trim(),
      };

      await updateUser(updatedUser);

      onSaved(updatedUser);
    } catch {
      setSaveError('Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <ThemedText type="subtitle">Editar perfil</ThemedText>

            <View
              style={[
                styles.usernameBox,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.backgroundSelected,
                },
              ]}>
              <ThemedText type="small" themeColor="textSecondary">
                Usuário
              </ThemedText>
              <ThemedText>{user.username}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                O nome de usuário não pode ser alterado.
              </ThemedText>
            </View>

            <CustomInput
              label="Nome completo"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              autoComplete="name"
              textContentType="name"
              error={errors.name}
              editable={!isSaving}
            />

            <CustomInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              textContentType="emailAddress"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSaving}
            />

            <CustomInput
              label="Telefone"
              placeholder="Digite seu telefone"
              value={phone}
              onChangeText={setPhone}
              autoComplete="tel"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              editable={!isSaving}
            />

            <CustomInput
              label="Cidade"
              placeholder="Digite sua cidade"
              value={city}
              onChangeText={setCity}
              autoComplete="postal-address-locality"
              textContentType="addressCity"
              editable={!isSaving}
            />

            <CustomInput
              label="Biografia"
              placeholder="Fale um pouco sobre você"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              editable={!isSaving}
            />

            {saveError ? (
              <Text style={styles.saveError} accessibilityLiveRegion="polite">
                {saveError}
              </Text>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { opacity: isSaving ? 0.6 : pressed ? 0.85 : 1 },
              ]}
              onPress={handleSave}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel="Salvar alteracoes do perfil"
              accessibilityState={{ disabled: isSaving, busy: isSaving }}>
              {isSaving ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.primaryButtonText}>Salvar alterações</Text>
              )}
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { opacity: isSaving ? 0.6 : pressed ? 0.7 : 1 },
              ]}
              onPress={onCancel}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel="Cancelar edicao e voltar ao perfil"
              accessibilityState={{ disabled: isSaving }}>
              <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },
  content: {
    flex: 1,
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
  usernameBox: {
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.half,
  },
  saveError: {
    color: ERROR_COLOR,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: ACCENT_COLOR,
    height: 52,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
