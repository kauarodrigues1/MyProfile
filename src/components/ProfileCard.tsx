import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeContext } from '@/context/ThemeContext';
import { Spacing } from '@/constants/theme';
import { User } from '@/types/user';

type ProfileCardProps = {
  user: User;
};

type ProfileField = {
  label: string;
  value: string;
};

const EMPTY_VALUE = 'Não informado';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export function ProfileCard({ user }: ProfileCardProps) {
  const { colors } = useThemeContext();

  const fields: ProfileField[] = [
    {
      label: 'E-mail',
      value: user.email,
    },
    {
      label: 'Telefone',
      value: user.phone,
    },
    {
      label: 'Cidade',
      value: user.city,
    },
    {
      label: 'Biografia',
      value: user.bio,
    },
  ];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
        },
      ]}
    >
      {/* =====================================================
          CABEÇALHO DO PERFIL
          ===================================================== */}

      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <ThemedText style={styles.avatarText}>
            {getInitials(user.name)}
          </ThemedText>
        </View>

        <View style={styles.headerText}>
          <ThemedText
            style={[
              styles.name,
              {
                color: colors.text,
              },
            ]}
          >
            {user.name}
          </ThemedText>

          <ThemedText
            type="small"
            style={{
              color: colors.textSecondary,
            }}
          >
            @{user.username}
          </ThemedText>
        </View>
      </View>

      {/* =====================================================
          DIVISOR
          ===================================================== */}

      <View
        style={[
          styles.divider,
          {
            backgroundColor: colors.border,
          },
        ]}
      />

      {/* =====================================================
          INFORMAÇÕES
          ===================================================== */}

      <View style={styles.fields}>
        {fields.map((field) => {
          const hasValue = Boolean(field.value?.trim());

          return (
            <View
              key={field.label}
              style={styles.row}
            >
              <ThemedText
                type="small"
                style={{
                  color: colors.textSecondary,
                }}
              >
                {field.label}
              </ThemedText>

              <ThemedText
                style={{
                  color: hasValue
                    ? colors.text
                    : colors.textSecondary,
                }}
              >
                {hasValue
                  ? field.value
                  : EMPTY_VALUE}
              </ThemedText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',

    borderRadius: 20,
    borderWidth: 1,

    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 24,
  },

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 29,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 16,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  headerText: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,

    marginBottom: 3,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
  },

  fields: {
    paddingVertical: 12,
  },

  row: {
    paddingHorizontal: 24,
    paddingVertical: 10,

    gap: 4,
  },
});