import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import db from '../config';
import Items from './Items'; 

export default class Kitchen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      qty: '',
      name: '',
      measure: '',
      location: '',
      locationOptions: ['Kitchen', 'Basement Pantry','Upstairs Pantry','Fridge', "Garage Fridge"],
      isModalVisible: false,
      docId: '',
      isDeleteVisible: false,
      search: '',
      uid: this.props.route.params?.uid
    };
    this.requestRef = null;
  };

  clearItems = () => {
    this.setState({
      name: '',
      qty: '',
      measure: '',
      location: '',
      docId: '',
      isModalVisible: false,
    });
    this.getAllItems(this.state.uid);
  };

  getAllItems = async (uid) => {
    try {
      const snapshot = await db.collection(uid).get();
      const itemsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      this.setState({ allItems: itemsData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  searchItems = async (uid, item) => {
    try {
      const search = await db.collection(uid).where('Name', '==', item).get();
      const searchData = search.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id, 
      }));
      this.setState({ allItems: searchData });
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  updateLocationOptions = (newOptions) => {
    this.setState({ locationOptions: newOptions });
  };

componentDidMount() {
    this.clearItems();
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.locationOptions !== this.state.locationOptions) {
    // Update the Picker options with the new locationOptions
    this.setState({ locationOptions: this.state.locationOptions });
  }
}

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Edit Item</Text>
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
              }}>
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
                    this.state.name != '' &&
                    this.state.qty != '' &&
                    this.state.measure != ''
                  ) {
                    if (Number(this.state.qty) <= 0) {
                      Alert.alert('Quantity must be a positive number');
                      return;
                    }
                    if (this.state.docId) {
                      Items.updateItems(
                        this.state.uid,
                        this.state.docId,
                        this.state.name,
                        this.state.qty,
                        this.state.location,
                        this.state.measure
                      );
                      this.clearItems();
                    } else {
                      console.log(this.state.uid)
                      Items.addItems(
                        this.state.uid,
                        this.state.name,
                        this.state.qty,
                        this.state.location,
                        this.state.measure
                      );
                      this.clearItems();
                      console.log('additem');
                    }
                    this.setState({ isModalVisible: false });

                    console.log('submit');
                  } else {
                    alert('All Fields Must Be Inputed');
                  }
                }}>
                <Text style={styles.registerButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  this.clearItems();
                  this.setState({ isModalVisible: false });
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                visible={this.state.isDeleteVisible}
                onPress={() => {
                  Items.deleteItem(this.state.uid, this.state.docId);
                  this.setState({
                    isModalVisible: false,
                    isDeleteVisible: false,
                  });
                  this.clearItems();
                }}>
                <Text style={styles.registerButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  navigation.navigate('AddLocationsScreen', {
                    updateLocationOptions: this.updateLocationOptions,
                    currentOptions: this.state.locationOptions,
                  });
                  this.setState({ isModalVisible: false });
                }}>
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
              this.searchItems(this.state.uid, this.state.search);
            }}>
            <Text style={styles.registerButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
             this.getAllItems(this.state.uid)
            }}>  
            <Text style={styles.registerButtonText}>X</Text>
          </TouchableOpacity>
          </View>

<FlatList
  data={this.state.allItems}
  keyExtractor={(item) => item.docId}
  renderItem={({ item, i }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
          {item.Name}
        </ListItem.Title>
        <View style={{ flexDirection: 'row' }}>
          <ListItem.Subtitle>{item.Qty + ' '}</ListItem.Subtitle>
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
          console.log(this.state);
        }}>
        <Text style={{ color: '#ffff' }}>View</Text>
      </TouchableOpacity>
    </ListItem>
  )}
/>
<View>
  <TouchableOpacity
    onPress={() => {
      this.showModal(),
        this.setState({ isDeleteVisible: false, isModalVisible: true });
      console.log(this.state.isModalVisible);
    }}>
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
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // modalContainer: {
  //   flex: 1,
  //   borderRadius: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#ffff',
  //   marginHorizontal: Dimensions.get('window').width * 0.05,
  //   marginVertical: Dimensions.get('window').height * 0.2,
  // },
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: Dimensions.get('window').width * 0.05,
  marginVertical: Dimensions.get('window').width * 0.15,
  borderRadius: 20,
  backgroundColor: 'rgb(255, 255, 255)', 
},
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    alignItems: 'center',
    marginBottom: 10,
  },
  bar: {
    width: '65%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#014f00',
    borderRadius: 10,
    borderWidth: 2,
    marginRight: '2%',
    marginBottom: 10,
    padding: 10,
  },
  searchButton: {
    width: '25%',
    height: 35,
    alignSelf: 'center',
    backgroundColor: '#8fb913',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#014f00',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#014f00',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
  },
  registerButton: {
    width: 150,
    height: 35,
    alignSelf: 'center',
    backgroundColor: '#8fb913',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#014f00',
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    width: 100,
    height: 35,
    alignSelf: 'center',
    backgroundColor: '#8388A4',
    justifyContent: 'center',
    borderRadius: 10,
    color: '#474B64',
    shadowColor: '#014f00',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8fb913',
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 5,
  },
  deleteButton: {
    width: 150,
    height: 35,
    alignSelf: 'center',
    backgroundColor: '#ff5722',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
