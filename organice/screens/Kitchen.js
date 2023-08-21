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
import { Picker } from "@react-native-picker/picker";
import db from "../config";
import Items from "./Items"; // Make sure to import your Items file

export default class Kitchen extends Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
      qty: "",
      name: "",
      measure: "",
      location: "",
      locationOptions: ["Kitchen", "Pantry", "Fridge"],
      isModalVisible: false,
      docId: "",
      isDeleteVisible: false,
      search: "",
    };
    this.requestRef = null;
  }
  clearItems = () => {
    this.setState({
      name: "",
      qty: "",
      measure: "",
      location: "",
      docId: "",
      isModalVisible: false,
    });
    this.getAllItems();
  };
  getAllItems = async () => {
    try {
      const snapshot = await db.collection("Items").get();
      const itemsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      this.setState({ allItems: itemsData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  searchItems = async(item) =>{
    var text = String(item).toUpperCase()
    const search =  await db.collection("Items").where('Name','==',text).get()
    this.setState({
      allItems:[...this.state.allItems,doc.data()],
  })
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };
  updateLocationOptions = (newOptions) => {
    this.setState({ locationOptions: newOptions });
  };  
  componentDidMount() {
    this.clearItems();
  }
  render() {
    const { navigation } = this.props; // Get the navigation prop

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
            <Picker
              selectedValue={this.state.location}
              style={styles.formTextInput}
              onValueChange={(itemValue) => {
                this.setState({ location: itemValue });
              }}
            >
              <Picker.Item label="Select Location" value="" />
              {this.state.locationOptions.map((location, index) => (
                <Picker.Item label={location} value={location} key={index} />
              ))}
            </Picker>

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
                      Items.updateItems(
                        this.state.docId,
                        this.state.name,
                        this.state.qty,
                        this.state.location,
                        this.state.measure
                      );
                      this.clearItems();
                    } else {
                      Items.addItems(
                        this.state.name,
                        this.state.qty,
                        this.state.location,
                        this.state.measure
                      );
                      this.clearItems();
                      console.log("additem");
                    }
                    this.setState({ isModalVisible: false });

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
                  this.clearItems();
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                visible={this.state.isDeleteVisible}
                onPress={() => {
                  Items.deleteItem(this.state.docId);
                  this.setState({
                    isModalVisible: false,
                    isDeleteVisible: false,
                  });
                  this.clearItems();
                }}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  navigation.navigate("AddLocationsScreen", {
                    updateLocationOptions: this.updateLocationOptions,
                    currentOptions: this.state.locationOptions,
                  });
                }}
              >
                <Text style={styles.registerButtonText}>
                  Add/Edit Locations
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter item"
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.searchItems(this.state.search);
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.allItems}
          keyExtractor={(item) => item.docId}
          renderItem={({ item, i }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                  {item.Name}
                </ListItem.Title>
                <View style={{ flexDirection: "row" }}>
                  <ListItem.Subtitle>{item.Qty + " "}</ListItem.Subtitle>
                  <ListItem.Subtitle>{item.Measure}</ListItem.Subtitle>
                </View>
              </ListItem.Content>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({
                    name: item.Name,
                    qty: item.Qty,
                    measure: item.Measure,
                    location: item.Location,
                    docId: item.docId,
                    isModalVisible: true,
                    isDeleteVisible: true,
                  });
                  console.log("being pressed");
                }}
              >
                <Text style={{ color: "#ffff" }}>View</Text>
              </TouchableOpacity>
            </ListItem>
          )}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              this.showModal(),
                this.setState({ isDeleteVisible: false, isModalVisible: true });
              console.log("button pressed");
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
  searchBar: {
    flexDirection: "row",
    height: 40,
    width: "auto",
    borderWidth: 0.5,
    alignItems: "center",
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
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
    color: "#474B64",
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
  },
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
