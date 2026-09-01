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
      {/* LABEL */}

      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        {label}
      </Text>

      {/* INPUT */}

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundElement,
            color: colors.text,
            borderColor: error
              ? colors.error
              : colors.border,
          },
          style,
        ]}
      />

      {/* ERRO */}

      {error ? (
        <Text
          style={[
            styles.error,
            {
              color: colors.error,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    minHeight: 52,

    borderWidth: 1,
    borderRadius: 14,

    paddingHorizontal: 16,

    fontSize: 16,
  },

  error: {
    marginTop: 6,

    fontSize: 12,
    lineHeight: 18,

    fontWeight: '500',
  },
});