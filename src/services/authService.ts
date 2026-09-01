import { Session } from "../types/auth";
import { User } from "../types/user";
import {
    getSession,
    getUser,
    removeSession,
    saveSession,
} from "./storageService";

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const user = await getUser();

  if (!user) {
    throw new Error("Nenhum usuário cadastrado.");
  }

  const isValidUsername = user.username === username;
  const isValidPassword = user.password === password;

  if (!isValidUsername || !isValidPassword) {
    throw new Error("Usuário ou senha incorretos.");
  }

  const session: Session = {
    userId: user.id,
  };

  await saveSession(session);

  return user;
};

export const getAuthenticatedUser = async (): Promise<User | null> => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await getUser();

  if (!user) {
    await removeSession();
    return null;
  }

  if (user.id !== session.userId) {
    await removeSession();
    return null;
  }

  return user;
};

export const logout = async (): Promise<void> => {
  await removeSession();
};
