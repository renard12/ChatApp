import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth/react-native';
import { authentication } from 'libs';
import React, { FC, PropsWithChildren, createContext, useState } from 'react';
import { whitespaceRemove } from 'utils/common/whitespaceRemove';

interface ContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  register: (name: string) => void;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        register: async (name: string) => {
          setIsLoading(true);

          try {
            const userCredential = await createUserWithEmailAndPassword(
              authentication,
              `${whitespaceRemove(name)}@chat.com`,
              '123456',
            );

            await updateProfile(authentication.currentUser as User, {
              displayName: name,
            });

            const currentUser = userCredential.user;

            setUser(currentUser);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
