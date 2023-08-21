import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      locationOptions: [],
    };
  }

handleLogin = async () => {
  const { email, password } = this.state;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    
    if (user) {
      const uid = user.uid;
      console.log(uid);
      this.props.navigation.replace("My Inventory", { uid: uid });
    }
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
  };

  handleSignUp = async () => {
    const { email, password } = this.state;

    try {
      const authResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

       const uid = authResult.user.uid;
    await firebase.firestore().collection(uid).add({// 
    //   docId: 1,
    //   Name: 'Test: you may delete this item',
    //   Qty: '1',
    //   Measure: 'kg',
    //   Location: 'Kitchen',
      // ... other properties
    });        // docId: 1,
        // email: email,
        // uid: authResult.user.uid,
        // locationOptions: this.state.locationOptions,
      // });

      this.props.navigation.replace('AddLocationsScreen', {
        updateLocationOptions: this.updateLocationOptions,
        currentOptions: this.state.locationOptions,
      });
    } catch (error) {
      console.error('Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Sign Up Failed',
          'This email address is already in use. Please use a different email.'
        );
      } else {
        Alert.alert(
          'Sign Up Failed',
          'Failed to create an account. Please try again later.'
        );
      }
    }
  };

  updateLocationOptions = (newOptions) => {
    this.setState({ locationOptions: newOptions });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  input: {
    fontSize: 20,
    width: '85%',
    alignSelf: 'center',
    height: 45,
    borderColor: '#014f00',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    width: '85%',
    alignSelf: 'center',
    height: 45,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#8fb913',
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  signUpButton: {
    width: '40%',
    alignSelf: 'center',
    height: 45,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8fb913',
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
