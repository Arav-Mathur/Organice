import * as React from "react";
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

class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
    };
  }

  updateItems = (uid, docId, name, qty, location, measure) => {
    db.collection(uid)
      .doc(docId)
      .update({
        Name: name,
        Qty: qty,
        Location: location,
        Measure: measure,
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };
  addItems = (uid, name, qty, location, measure) => {
    db.collection(uid)
      .add({
        Name: name,
        Qty: qty,
        Measure: measure,
        Location: location,
      })

      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  deleteItem = (uid, docId) => {
    db.collection(uid)
      .doc(docId)
      .delete()
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
}
export default new Items();
