import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextType {
  isAuthenticated: boolean;
  userObject: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userObject: null,
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
});

const AuthProvider = ({children}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userObject, setUserObject] = useState<string | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const auth = await AsyncStorage.getItem('auth');
    if (auth === 'true') {
      const user = await AsyncStorage.getItem('userObject');
      setIsAuthenticated(true);
      setUserObject(user);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Perform login operation and set state
    setIsAuthenticated(true);
    setUserObject(email);
    await AsyncStorage.setItem('auth', 'true');
    await AsyncStorage.setItem('userObject', email);
  };

  const signOut = async () => {
    // Perform logout operation and set state
    setIsAuthenticated(false);
    setUserObject(null);
    await AsyncStorage.removeItem('auth');
    await AsyncStorage.removeItem('userObject');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userObject,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
