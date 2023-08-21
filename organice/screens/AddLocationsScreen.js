import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AddLocationsScreen = ({ route }) => {
  const [newLocation, setNewLocation] = useState('');
  const navigation = useNavigation(); // Get the navigation prop

const handleAddLocation = () => {
  if (!newLocation) {
    return; // No need to proceed if newLocation is empty
  }
  const currentOptions = route.params?.currentOptions || [];
  
  if (currentOptions.includes(newLocation)) {
    // Alert or handle duplicate location
    Alert.alert('Duplicate Location', 'This location already exists.');
  } else {
    const newOptions = [...currentOptions, newLocation];
    console.log('New options before update:', newOptions);
    route.params?.updateLocationOptions(newOptions);
    setNewLocation('');
    Alert.alert('Location Added', 'The new location has been added successfully.');
      console.log(updateLocationOptions)
  }
};

  const handleNext = () => {
    navigation.navigate("My Inventory");
  };



return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new location"
        onChangeText={setNewLocation}
        value={newLocation}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  addButton: {
    width: '85%',
    alignSelf: 'center',
    height: 45,
    marginTop: 10,
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
  goBackButton: {
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
  nextButton: {
    width: '85%',
    alignSelf: 'center',
    height: 45,
    marginTop: 10,
    marginBottom: 10,
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

  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default AddLocationsScreen;
