import React from 'react';
import {
  SafeAreaView,
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
  const { colors, theme } = useThemeContext();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.logo,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.logoText}>M</Text>
          </View>

          <View style={styles.headerText}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
              ]}
            >
              MyProfile
            </Text>

            <Text
              style={[
                styles.subtitle,
                { color: colors.textSecondary },
              ]}
            >
              Seu perfil, do seu jeito.
            </Text>
          </View>
        </View>

        <View style={styles.welcome}>
          <Text
            style={[
              styles.welcomeTitle,
              { color: colors.text },
            ]}
          >
            Bem-vindo 👋
          </Text>

          <Text
            style={[
              styles.welcomeText,
              { color: colors.textSecondary },
            ]}
          >
            Gerencie seus dados e personalize
            sua experiência.
          </Text>
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
          <Text
            style={[
              styles.cardTitle,
              { color: colors.text },
            ]}
          >
            Prévia do perfil
          </Text>

          <Text
            style={[
              styles.cardDescription,
              { color: colors.textSecondary },
            ]}
          >
            Este componente será utilizado
            posteriormente na tela de perfil.
          </Text>

          <CustomInput
            label="Nome"
            placeholder="Digite seu nome"
          />

          <CustomInput
            label="E-mail"
            placeholder="seuemail@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PrimaryButton
            title="Salvar alterações"
            onPress={() => {}}
          />
        </View>

        <View style={styles.themeSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Personalização
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              { color: colors.textSecondary },
            ]}
          >
            Tema atual: {theme === 'dark' ? 'Dark' : 'Light'}
          </Text>

          <ThemeSwitch />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  content: {
    padding: 24,
    gap: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 16,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },

  welcome: {
    marginTop: 12,
    gap: 6,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
  },

  welcomeText: {
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },

  themeSection: {
    gap: 8,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
  },

  sectionDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
});