"use client";

import { createContext } from "react";

export const UserContext = createContext<any | null>(null);

export const UserContextProvider: React.FC<{ value: Object; children: React.ReactNode }> = ({
  value,
  children,
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
