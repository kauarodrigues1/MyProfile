import { DarkTheme, DefaultTheme, ThemeProvider as RouterThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ThemeProvider } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <RouterThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <AnimatedSplashOverlay />

        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="register"
            options={{ headerShown: false }}
          />
        </Stack>
      </RouterThemeProvider>
    </ThemeProvider>
  );
}