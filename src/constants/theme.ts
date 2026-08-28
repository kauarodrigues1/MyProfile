import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F7F8FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1F2F4',

    text: '#171717',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',

    primary: '#FF6B00',
    primaryPressed: '#E85F00',

    border: '#E5E7EB',
    error: '#DC2626',
    success: '#16A34A',
  },

  dark: {
    background: '#0F1115',
    backgroundElement: '#181B21',
    backgroundSelected: '#22262E',

    text: '#F5F5F5',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',

    primary: '#FF7A00',
    primaryPressed: '#E66D00',

    border: '#2A2E37',
    error: '#F87171',
    success: '#4ADE80',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset =
  Platform.select({ ios: 50, android: 80 }) ?? 0;

export const MaxContentWidth = 800;