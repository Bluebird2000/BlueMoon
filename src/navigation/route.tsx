import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack, InventoryStack } from '.';

const Stack = createStackNavigator<RootStackParamList>();
const { Navigator, Screen } = Stack;

type RootStackParamList = {
  Auth: undefined;
  Inventory: undefined;
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

export default Router;
