import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function CustomInput({
  label,
  error,
  ...textInputProps
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        {...textInputProps}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#222',
  },

  inputError: {
    borderColor: '#d32f2f',
  },

  error: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 4,
  },
});