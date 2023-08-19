import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import t from 'tcomb-form-native';

import * as firebase from 'firebase';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

export default class LoginScreen extends Component {
  handleLogin = async () => {
  const formData = this.loginForm.getValue();

  if (formData) {
    try {
      const { email, password } = formData;

      await firebase.auth().signInWithEmailAndPassword(email, password);

      // User is authenticated, navigate to the Kitchen screen
      this.props.navigation.navigate('Kitchen');
    } catch (error) {
      console.error('Error:', error);

      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please check your credentials.'
        );
      } else {
        Alert.alert(
          'Login Failed',
          'An error occurred during login. Please try again later.'
        );
      }
    }
  }
};


  handleSignUp = async () => {
  const formData = this.loginForm.getValue();

  if (formData) {
    try {
      const { email, password } = formData;

      // Create a new user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // User is registered, now create a user-specific collection for items
      const user = firebase.auth().currentUser;
      const uid = user.uid; // Get the user's UID

      // Create a user-specific collection for items using the user's UID as the collection name
      const userItemCollection = firebase.firestore().collection(uid);

      // Create a new item document in the user's specific collection
      const newItem = {
        itemName: 'New Item Name',
        // ... other item fields as needed
      };

      // Add the new item document to the user's specific collection
      await userItemCollection.add(newItem);

      // Navigate to the LocationsScreen
      this.props.navigation.navigate('LocationsScreen');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Sign Up Failed', 'Failed to create an account. Please try again.');
    }
  }
};


newUser(){
  
}


  render() {
    return (
      <View style={styles.container}>
        <Text>Login or Sign Up</Text>
        <Form ref={(c) => (this.loginForm = c)} type={User} />
        <Button title="Login" onPress={this.handleLogin} />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
