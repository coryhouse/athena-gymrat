import invariant from "invariant";
import { createContext, useContext } from "react";
import { User } from "./types";

const UserContext = createContext<User | null>(null);

type UserContextProviderProps = {
  user: User;
  children: React.ReactNode;
};

export function UserContextProvider({
  user,
  children,
}: UserContextProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  invariant(
    userContext,
    "useUserContext may only be used as a child of UserContextProvider"
  );
  return userContext;
}
