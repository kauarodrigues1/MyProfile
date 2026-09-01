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
import { useThemeContext } from '@/context/ThemeContext';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { updateUser } from '@/services/storageService';
import { User } from '@/types/user';

type EditProfileScreenProps = {
  user: User;
  onCancel: () => void;
  onSaved: (user: User) => void;
};

type FormErrors = Partial<Record<'name' | 'email', string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EditProfileScreen({
  user,
  onCancel,
  onSaved,
}: EditProfileScreenProps) {
  const { colors } = useThemeContext();

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
      setSaveError(
        'Não foi possível salvar as alterações. Tente novamente.',
      );
    } finally {
      setIsSaving(false);
    }
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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            {/* =====================================================
                CABEÇALHO
                ===================================================== */}

            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Editar perfil
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Atualize suas informações pessoais.
              </Text>
            </View>

            {/* =====================================================
                USUÁRIO
                ===================================================== */}

            <View
              style={[
                styles.usernameBox,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.usernameLabel,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Usuário
              </Text>

              <Text
                style={[
                  styles.username,
                  {
                    color: colors.text,
                  },
                ]}
              >
                @{user.username}
              </Text>

              <Text
                style={[
                  styles.usernameDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                O nome de usuário não pode ser alterado.
              </Text>
            </View>

            {/* =====================================================
                FORMULÁRIO
                ===================================================== */}

            <View style={styles.form}>

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

            </View>

            {/* =====================================================
                ERRO AO SALVAR
                ===================================================== */}

            {saveError ? (
              <Text
                style={[
                  styles.saveError,
                  {
                    color: colors.error,
                  },
                ]}
                accessibilityLiveRegion="polite"
              >
                {saveError}
              </Text>
            ) : null}

            {/* =====================================================
                SALVAR
                ===================================================== */}

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: colors.primary,
                  opacity: isSaving
                    ? 0.6
                    : pressed
                      ? 0.85
                      : 1,
                },
              ]}
              onPress={handleSave}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel="Salvar alterações do perfil"
              accessibilityState={{
                disabled: isSaving,
                busy: isSaving,
              }}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Salvar alterações
                </Text>
              )}
            </Pressable>

            {/* =====================================================
                CANCELAR
                ===================================================== */}

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                {
                  opacity: isSaving
                    ? 0.5
                    : pressed
                      ? 0.7
                      : 1,
                },
              ]}
              onPress={onCancel}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel="Cancelar edição e voltar ao perfil"
              accessibilityState={{
                disabled: isSaving,
              }}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
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
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },

  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },

  /* =====================================================
     CABEÇALHO
     ===================================================== */

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
  },

  /* =====================================================
     USUÁRIO
     ===================================================== */

  usernameBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },

  usernameLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },

  username: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  usernameDescription: {
    fontSize: 13,
    lineHeight: 19,
  },

  /* =====================================================
     FORMULÁRIO
     ===================================================== */

  form: {
    gap: 4,
  },

  /* =====================================================
     ERRO
     ===================================================== */

  saveError: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },

  /* =====================================================
     BOTÃO PRINCIPAL
     ===================================================== */

  primaryButton: {
    height: 52,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 20,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  /* =====================================================
     CANCELAR
     ===================================================== */

  secondaryButton: {
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 6,
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});