import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RouterThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { ThemeProvider } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <RouterThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <AnimatedSplashOverlay />
        <AppTabs />
      </RouterThemeProvider>
    </ThemeProvider>
  );
}