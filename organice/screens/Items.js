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
      allItems: [],
    };
  }

  // componentDidMount() {
  //   this.getAllItems();
  // }

  // getAllItems = async () => {
  //   try {
  //     const snapshot = await db.collection('Items').get();
  //     const itemsData = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       docId: doc.id,
  //     }));
  //     this.setState({ allItems: itemsData });
  //     console.log('Fetched Items:', itemsData); // Log fetched items to console
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  updateItems = (docId, name, qty, location, measure) => {
    db.collection('Items')
      .doc(docId)
      .update({
        Name: name,
        Qty: qty,
        Location: location,
        Measure: measure,
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };
  addItems = (name, qty, location, measure) => {
    db.collection('Items')
      .add({
        Name: name,
        Qty: qty,
        Measure: measure,
        Location: location,
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


}
export default new Items();
