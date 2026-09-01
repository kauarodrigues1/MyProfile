import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F5F7FF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EEF0FF',

    text: '#151827',
    textSecondary: '#687086',
    textMuted: '#9AA2B5',

    primary: '#5B5FEF',
    primaryPressed: '#484CCF',

    border: '#E1E5F2',
    error: '#DC3B52',
    success: '#20A06B',
  },

  dark: {
    background: '#0B0F1A',
    backgroundElement: '#151B2B',
    backgroundSelected: '#202840',

    text: '#F8F9FF',
    textSecondary: '#A7AEC2',
    textMuted: '#6F7890',

    primary: '#7C82FF',
    primaryPressed: '#656BE8',

    border: '#293149',
    error: '#FF7185',
    success: '#42D39A',
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