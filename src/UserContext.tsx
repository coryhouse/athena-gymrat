import invariant from "invariant";
import { createContext, useContext } from "react";
import { User } from "./types";

export type UserContextValue = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextValue | null>(null);

type UserContextProviderProps = UserContextValue & {
  children: React.ReactNode;
};

export function UserContextProvider({
  user,
  setUser,
  children,
}: UserContextProviderProps) {
  const value: UserContextValue = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  invariant(
    userContext,
    "useUserContext may only be used as a child of UserContextProvider"
  );
  return {
    user: userContext.user,
    setUser: userContext.setUser,
  };
}
