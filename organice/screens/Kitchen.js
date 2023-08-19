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

var myitem = new Items();

export default class Kitchen extends Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
      qty: "",
      name: "",
      measure: "",
      location: "",
      isModalVisible: false,
      docId: "",
      isDeleteVisible: false,
    };
    this.requestRef = null;
  }

  componentDidMount() {
    myitem.getAllItems(this);
    MyTab();
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.formTextInput}
              placeholder="Item Name"
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
              value={this.state.name}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder="Quantity"
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.setState({ qty: text });
              }}
              value={this.state.qty}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder="Measure"
              onChangeText={(text) => {
                this.setState({ measure: text });
              }}
              value={this.state.measure}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder="Location"
              onChangeText={(text) => {
                this.setState({ location: text });
              }}
              value={this.state.location}
            />
            <View>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  if (
                    this.state.name != "" &&
                    this.state.qty != "" &&
                    this.state.measure != ""
                  ) {
                    if (Number(this.state.qty) <= 0) {
                      Alert.alert("Quantity must be a positive number");
                      return;
                    }
                    if (this.state.docId) {
                      myitem.updateItems(); // Update existing item
                      console.log("view");
                    } else {
                      myitem.addItems(); // Add new item
                      console.log("additem");
                    }
                    this.setState({ isModalVisible: false });
                    myitem.getAllItems(this);
                    console.log("submit");
                  } else {
                    alert("All Fields Must Be Inputed");
                  }
                }}
              >
                <Text style={styles.registerButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  myitem.deleteItem(this.state.docId);
                  this.setState({ isModalVisible: false });
                  myitem.getAllItems(this);
                }}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <FlatList
          keyExtractor={myitem.keyExtractor}
          data={this.state.allItems}
          renderItem={myitem.renderItem}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              myitem.showModal(), this.setState({ isDeleteVisible: false });
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#014f00",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    backgroundColor: "#8fb913",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2,
  },
  cancelButton: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    backgroundColor: "#8388A4",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    color: "#474B64",
  },
  deleteButton: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    backgroundColor: "#ff5722",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
