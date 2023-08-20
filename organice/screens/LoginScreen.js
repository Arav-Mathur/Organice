import React, { Component } from 'react';
import { View, Button, StyleSheet ,Alert, TouchableOpacity, Text} from 'react-native';
import t from 'tcomb-form-native';

import * as firebase from 'firebase'; // Make sure this import is added

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    password: {
      secureTextEntry: true, // Set secureTextEntry to true for the password field
    },
  },
};

export default class LoginScreen extends Component {
  handleLogin = async () => {
    const formData = this.loginForm.getValue();
    if (formData) {
      try {
        const { email, password } = formData;

        await firebase.auth().signInWithEmailAndPassword(email, password);

        // User is authenticated, navigate to the Kitchen screen
        console.log("works")
        this.props.navigation.replace("My Inventory");
        //  return (
        //    <MyTab/>
        //  );
        //navigation.replace("Login")
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

        await firebase.auth().createUserWithEmailAndPassword(email, password);

        // User is registered, you can also automatically log in the user if desired
        this.props.navigation.replace("My Inventory");
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
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={(c) => (this.loginForm = c)}
          type={User}
          options={options} // Pass the options to the Form
        />

        <TouchableOpacity  style={styles.loginButton} onPress={this.handleLogin} >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSignUp} style={styles.signUpButton} >
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: 352.5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8fb913',
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
  },
  },
  signUpButton: {
    width: 352.5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#8fb913',
    shadowColor: '#014f00',
    shadowOffset: {
      width: 0,
      height: 8,
  },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  }
  });
