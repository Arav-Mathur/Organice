import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Kitchen from '../screens/Kitchen';
import ShoppingList from '../screens/ShoppingList';
const Tab = createMaterialBottomTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Kitchen"
      activeColor="white"
      inactiveColor="#014f00"
      barStyle={{ backgroundColor: '#8fb913' }}>
      <Tab.Screen name="Kitchen" component={Kitchen} />
      <Tab.Screen name="Shopping List" component={ShoppingList}/>
    </Tab.Navigator>
  );
};

export default MyTab; // Export the component correctly
