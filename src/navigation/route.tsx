import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AuthStack, InventoryStack } from '.';

const Stack = createStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

type RootStackParamList = {
  Auth: undefined;
  Inventory: undefined;
};

export type ScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Inventory'>;
};

const Router: React.FC = (props) => {
  return (
    <NavigationContainer>
      <Navigator
        {...props}
        screenOptions={{ headerShown: false }}
        initialRouteName="Auth"
      >
        <Screen name="Auth" component={AuthStack} />
        <Screen name="Inventory" component={InventoryStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export const replaceScreen = (
  navigation: StackNavigationProp<RootStackParamList>,
  name: keyof RootStackParamList,
  params?: object,
) => {
  navigation.replace(name);
};

export default Router;
