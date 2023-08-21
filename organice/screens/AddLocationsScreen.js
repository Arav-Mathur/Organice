import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddLocationsScreen = ({ navigation, route }) => {
  const [newLocation, setNewLocation] = useState('');
  const [typedLocations, setTypedLocations] = useState([]);

  const handleAddLocation = () => {
    // Check if a new location is provided
    if (newLocation) {
      // Create a new array of options by adding the new location to the existing options
      const newOptions = [...route.params.currentOptions, newLocation];
      
      // Call the updateLocationOptions function passed from the previous screen
      route.params.updateLocationOptions(newOptions);
      
      // Update the typedLocations state with the new location
      setTypedLocations([...typedLocations, newLocation]);
      
      // Clear the newLocation input field
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
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() =>
          navigation.goBack() // Assuming you want to go back after adding locations
        }
      >
        <Text style={styles.buttonText}>Go Back</Text>
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
  },
});
