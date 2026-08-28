import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

export function ThemeSwitch() {
  const { theme, toggleTheme, colors } = useThemeContext();

  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.info}>
        <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>

        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Tema
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            {isDark ? 'Modo escuro' : 'Modo claro'}
          </Text>
        </View>
      </View>

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 68,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  icon: {
    fontSize: 24,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});