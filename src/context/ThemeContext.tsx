import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Colors } from "../constants/theme";
import { getTheme, saveTheme } from "../services/storageService";

import { Theme } from "../types/theme";

type ThemeContextData = {
  theme: Theme;
  colors: typeof Colors.light | typeof Colors.dark;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await getTheme();

        if (savedTheme) {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.error("Erro ao carregar tema:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTheme();
  }, []);

  async function setTheme(theme: Theme): Promise<void> {
    try {
      setThemeState(theme);
      await saveTheme(theme);
    } catch (error) {
      console.error("Erro ao salvar tema:", error);
    }
  }

  async function toggleTheme(): Promise<void> {
    const newTheme: Theme = theme === "light" ? "dark" : "light";

    await setTheme(newTheme);
  }

  const colors = Colors[theme];

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        theme,
        colors,
        toggleTheme,
        setTheme,
        isLoading,
      },
    },
    children,
  );
}

export function useThemeContext(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext deve ser utilizado dentro de ThemeProvider",
    );
  }

  return context;
}
