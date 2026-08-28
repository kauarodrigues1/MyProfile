import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SESSION_STORAGE_KEY,
  THEME_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "../constants/storage";

import { Session } from "../types/auth";
import { Theme } from "../types/theme";
import { User } from "../types/user";

export const saveUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(user)
  );
};

export const getUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem(USER_STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as User;
};

export const updateUser = async (user: User): Promise<void> => {
  await saveUser(user);
};

export const saveSession = async (
  session: Session
): Promise<void> => {
  await AsyncStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session)
  );
};

export const getSession = async (): Promise<Session | null> => {
  const data = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as Session;
};

export const removeSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
};

export const saveTheme = async (
  theme: Theme
): Promise<void> => {
  await AsyncStorage.setItem(
    THEME_STORAGE_KEY,
    theme
  );
};

export const getTheme = async (): Promise<Theme | null> => {
  const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

  if (theme !== "light" && theme !== "dark") {
    return null;
  }

  return theme;
};