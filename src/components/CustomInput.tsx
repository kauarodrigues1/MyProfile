import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

type CustomInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function CustomInput({
  label,
  error,
  style,
  ...props
}: CustomInputProps) {
  const { colors } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundElement,
            color: colors.text,
            borderColor: error ? colors.error : colors.border,
          },
          style,
        ]}
      />

      {error ? (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  error: {
    marginTop: 6,
    fontSize: 12,
  },
});