import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MyTab from "./navigation/BottomTabNavigator";
import MyStack from "./navigation/StackNavigator"
import NavigationContainer from "@react-navigation/native"
export default function App() {
  return (
      <MyStack/>
  );
}
