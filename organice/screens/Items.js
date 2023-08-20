import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from '@rneui/themed';
import db from '../config';

class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      loc: '',
      allItems: [],
      isModalVisible: false,
    };
  }
  getAllItems = () => {
    console.log('Getitems');
    db.collection('Items')
      .get()
      .then((snapshot) => {
        // var all = snapshot.docs.map((doc) => {
        //   return { ...doc.data(), docId: doc.id }; // Include the document ID in the data object
        // });
        // this.setState({ allItems: all });
        this.setState({
          allItems: snapshot.docs.map((doc) => {
            return { ...doc.data(), docId: doc.id };
          }),
        });

        // console.log(snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
        // console.log(this.state.allItems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  updateItems = (docId,name,qty,location,measure) => {
    // const { name, qty, measure, location, docId } = this.loc.state;
    // Update the item with the given docId
    db.collection('Items')
      .doc(docId)
      .update({
        Name: name,
        Qty: qty,
        location: location,
        measure: measure,
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };
  addItems = (name,qty,location,measure) => {
    //const { name, qty, measure, location } = this.loc.state;
    // Add the new item to the database
    db.collection('Items')
      .add({
        Name: name,
        Qty: qty,
        measure: measure,
        location: location,
      })

      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  deleteItem = (docId) => {
    db.collection('Items')
      .doc(docId)
      .delete()
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };
}
export default new Items();
