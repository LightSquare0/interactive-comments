"use client";

import { createContext } from "react";

export const UserContext = createContext<UserContext>(null);

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
}

export type UserContext = User | null;

export const UserContextProvider: React.FC<{
  value: UserContext;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
