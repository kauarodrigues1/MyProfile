import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Theme } from '@/types/theme';
import { User } from '@/types/user';

type ProfileCardProps = {
  user: User;
  theme: Theme;
};

type ProfileField = {
  label: string;
  value: string;
};

const EMPTY_VALUE = 'Não informado';
const ACCENT_COLOR = '#FF6B00';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function ProfileCard({ user, theme }: ProfileCardProps) {
  const colors = useTheme();

  const fields: ProfileField[] = [
    { label: 'E-mail', value: user.email },
    { label: 'Telefone', value: user.phone },
    { label: 'Cidade', value: user.city },
    { label: 'Biografia', value: user.bio },
  ];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.backgroundSelected,
        },
      ]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: ACCENT_COLOR }]}>
          <ThemedText style={styles.avatarText}>{getInitials(user.name)}</ThemedText>
        </View>

        <View style={styles.headerText}>
          <ThemedText style={styles.name}>{user.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            @{user.username}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.backgroundSelected }]} />

      <View style={styles.fields}>
        {fields.map((field) => (
          <View key={field.label} style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              {field.label}
            </ThemedText>
            <ThemedText themeColor={field.value ? 'text' : 'textSecondary'}>
              {field.value || EMPTY_VALUE}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.backgroundSelected }]} />

      <View style={styles.themeRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Tema atual
        </ThemedText>

        <View style={[styles.badge, { backgroundColor: colors.backgroundSelected }]}>
          <ThemedText type="smallBold">{theme === 'dark' ? 'Escuro' : 'Claro'}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
    gap: Spacing.half,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  fields: {
    paddingVertical: Spacing.two,
  },
  row: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.half,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  badge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.five,
  },
});
