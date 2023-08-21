import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddLocationsScreen = ({ navigation, route }) => {
  const [newLocation, setNewLocation] = useState('');
  const [typedLocations, setTypedLocations] = useState([]);

  const handleAddLocation = () => {
    if (newLocation) {
      const newOptions = [...route.params.currentOptions, newLocation];
      route.params.updateLocationOptions(newOptions);
      setTypedLocations([...typedLocations, newLocation]);
      setNewLocation('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter a new location"
        value={newLocation}
        onChangeText={setNewLocation}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleAddLocation} >
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton}
        onPress={() =>
          navigation.navigate('Kitchen', { locationOptions })
        }
      >
        <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AddLocationsScreen;

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
