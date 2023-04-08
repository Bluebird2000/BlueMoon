import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthContext = {
  isLoggedIn: false,
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultAuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async (): Promise<void> => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      if (auth !== null) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const navigation = useNavigation();
    if (email !== '' && password !== '') {
      try {
        await AsyncStorage.setItem('auth', 'true');
        await AsyncStorage.setItem('userObject', email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('auth');
      await AsyncStorage.removeItem('userObject');
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
