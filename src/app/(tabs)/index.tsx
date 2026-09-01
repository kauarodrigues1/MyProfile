import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CustomInput } from '@/components/CustomInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useThemeContext } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useThemeContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert(
        'Atenção',
        'Preencha seu nome e e-mail.'
      );
      return;
    }

    setIsSaving(true);

    try {
      // A lógica de persistência do perfil pode continuar
      // sendo integrada pelo responsável por essa funcionalidade.
      Alert.alert(
        'Sucesso',
        'Alterações salvas com sucesso.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView
      style={[
        styles.scrollView,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <View style={styles.brand}>
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text style={styles.logoText}>M</Text>
            </View>

            <View>
              <Text
                style={[
                  styles.brandTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                MyProfile
              </Text>

              <Text
                style={[
                  styles.brandSubtitle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Seu perfil, do seu jeito.
              </Text>
            </View>
          </View>

          {/* Botão Sol / Lua */}
          <ThemeSwitch />
        </View>

        {/* =====================================================
            BOAS-VINDAS
        ===================================================== */}

        <View style={styles.welcome}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Bem-vindo 👋
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Gerencie seus dados e personalize sua experiência.
          </Text>
        </View>

        {/* =====================================================
            CARD DO PERFIL
        ===================================================== */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Cabeçalho do card */}

          <View style={styles.cardHeader}>
            <View
              style={[
                styles.cardIcon,
                {
                  backgroundColor: colors.backgroundSelected,
                },
              ]}
            >
              <Text
                style={[
                  styles.cardIconText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                👤
              </Text>
            </View>

            <View style={styles.cardHeaderText}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Prévia do perfil
              </Text>

              <Text
                style={[
                  styles.cardDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Este componente será utilizado posteriormente
                na tela de perfil.
              </Text>
            </View>
          </View>

          {/* Formulário */}

          <View style={styles.form}>

            <CustomInput
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              editable={!isSaving}
            />

            <CustomInput
              label="E-mail"
              placeholder="seuemail@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSaving}
            />

            <PrimaryButton
              title="Salvar alterações"
              onPress={handleSave}
              loading={isSaving}
              disabled={isSaving}
            />

          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 32,
  },

  /* =====================================================
     HEADER
     ===================================================== */

  header: {
    width: '100%',
    minHeight: 90,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 18,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  brandTitle: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  brandSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  /* =====================================================
     WELCOME
     ===================================================== */

  welcome: {
    marginTop: 24,
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 7,
  },

  /* =====================================================
     CARD
     ===================================================== */

  card: {
    width: '100%',

    borderWidth: 1,
    borderRadius: 20,

    padding: 24,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 24,
  },

  cardIcon: {
    width: 48,
    height: 48,

    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  cardIconText: {
    fontSize: 21,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
  },

  cardDescription: {
    fontSize: 14,
    marginTop: 4,
  },

  /* =====================================================
     FORM
     ===================================================== */

  form: {
    width: '100%',
    gap: 4,
  },
});