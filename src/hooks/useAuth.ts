import { useEffect, useState } from "react";

import {
    getAuthenticatedUser,
    login as loginService,
    logout as logoutService,
} from "../services/authService";

import { User } from "../types/user";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkSession = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const authenticatedUser = await getAuthenticatedUser();

      setUser(authenticatedUser);
    } catch (error) {
      console.error("Erro ao recuperar sessão:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);

      const authenticatedUser = await loginService(username, password);

      setUser(authenticatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);

      await logoutService();

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    checkSession,
  };
};
