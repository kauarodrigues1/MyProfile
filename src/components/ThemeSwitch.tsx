import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

export function ThemeSwitch() {
  const { theme, toggleTheme, colors } = useThemeContext();

  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.option,
          !isDark && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text style={styles.icon}>☀</Text>
      </View>

      <View
        style={[
          styles.option,
          isDark && {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text style={styles.icon}>☾</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 96,
    borderRadius: 24,
    borderWidth: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  option: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});