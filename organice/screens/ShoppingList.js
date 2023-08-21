import { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { ListItem } from "@rneui/themed";
import db from "../config";
import Items from "./Items";
import MyTab from "../navigation/BottomTabNavigator"

export default class ShoppingList extends Component {
    render(){
        return(
            <Text>hi</Text>
        )
    }
}