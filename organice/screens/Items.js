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

export default class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      loc: "",
    };
  }
  getAllItems = (locate) => {
    this.loc = locate;
    db.collection("Items")
      .get()
      .then((snapshot) => {
        var allItems = snapshot.docs.map((doc) => {
          // Include the document ID in the data object
          return { ...doc.data(), docId: doc.id };
        });
        this.loc.setState({ allItems });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  updateItems = () => {
    const { name, qty, measure, location, docId } = this.loc.state;

    // Update the item with the given docId
    db.collection("Items")
      .doc(docId)
      .update({
        Name: name,
        Qty: qty,
        location: location,
        measure: measure,
      })
      .then(() => {
        this.loc.setState({
          name: "",
          qty: "",
          measure: "",
          location: "",
          docId: "", // Reset the docId after updating the item
        });
        this.getAllItems(); // Fetch all items again to reflect the update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  addItems = () => {
    const { name, qty, measure, location } = this.loc.state;

    // Add the new item to the database
    db.collection("Items")
      .add({
        Name: name,
        Qty: qty,
        measure: measure,
        location: location,
      })
      .then(() => {
        // Once the item is added, fetch all items again and update the state
        this.getAllItems();
        this.loc.setState({
          name: "",
          qty: "",
          measure: "",
          location: "",
        });
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  deleteItem = (docId) => {
    db.collection("Items")
      .doc(docId)
      .delete()
      .then(() => {
        this.loc.setState({
          name: "",
          qty: "",
          measure: "",
          location: "",
          docId: "", // Reset the docId after updating the item
        });
        this.getAllItems();
        // Close the view modal after deletion
        this.loc.setState({
          isModalVisible: false,
          isDeleteVisible: false, // Hide the delete button after deletion
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  showModal = () => {
    this.loc.setState({ isModalVisible: true });
  };
  keyExtractor = (index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.Name}
          </ListItem.Title>
          <View style={{ flexDirection: "row" }}>
            <ListItem.Subtitle>{item.Qty}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.measure}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.loc.setState({
              name: item.Name,
              qty: item.Qty,
              measure: item.measure,
              location: item.location,
              docId: item.docId, // Update the docId in the state before opening the modal
              isModalVisible: true,
              isDeleteVisible: true,
            });
          }}
        >
          <Text style={{ color: "#ffff" }}>View</Text>
        </TouchableOpacity>
      </ListItem>
    );
  };
}
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8fb913",
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 5,
  },
});
