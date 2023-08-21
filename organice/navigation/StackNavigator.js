import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import Kitchen from '../screens/Kitchen';
import MyTab from './BottomTabNavigator';
import AddLocationsScreen from '../screens/AddLocationsScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="My Inventory" component={MyTab} />
        <Stack.Screen name="AddLocationsScreen" component={AddLocationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
