import 'react-native-gesture-handler';
import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Add, Dashboard, Update} from '../screens';

type InventoryStackParamList = {
  Dashboard: undefined;
  Add: undefined;
  Update: undefined;
};

const {Navigator, Screen} = createStackNavigator<InventoryStackParamList>();
const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const InventoryStack: React.FC = () => {
  return (
    <Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Add" component={Add} />
      <Screen name="Update" component={Update} />
    </Navigator>
  );
};

export default InventoryStack;
