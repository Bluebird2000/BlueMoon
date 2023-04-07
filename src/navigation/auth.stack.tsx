import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {Login} from '../screens';

export type AuthStackParamList = {
  Login: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const AuthStack: React.FC = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

export default AuthStack;
