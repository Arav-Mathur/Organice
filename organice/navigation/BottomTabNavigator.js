import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Kitchen from "../screens/Kitchen";
import Fridge from "../screens/Fridge";
import Storage from "../screens/Storage";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();

const MyTab = () => {
  return (
    //style={{backgroundColor:"#8fb913"}}
    //<ion-icon name="rstaurant"></ion-icon>
    //<ion-icon name="snow"></ion-icon>
    //<ion-icon name="basket"></ion-icon>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LoginScreen"
        activeColor="white"
        inactiveColor="#014f00"
        barStyle={{ backgroundColor: "#8fb913" }}
      >
        <Tab.Screen name="LoginScreen" component={LoginScreen} />
        <Tab.Screen
          name="Kitchen"
          component={Kitchen} //options={{tabBarIcon:({ color }) => (
          //  <Ionicons name="basket"/>
          //  ),}}
        />
        <Tab.Screen name="Fridge" component={Fridge} />
        <Tab.Screen name="Storage" component={Storage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MyTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
