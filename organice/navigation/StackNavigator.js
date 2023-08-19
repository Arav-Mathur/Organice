import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTab from "./BottomTabNavigator";
//import AddItem from "../screens/AddItem"

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      initialRouteName="MyTab"
      <Stack.Screen name="MyTab" component={MyTab} />
      // <Stack.Screen name="AddItem" component={AddItem} />
    </Stack.Navigator>
  );
}
