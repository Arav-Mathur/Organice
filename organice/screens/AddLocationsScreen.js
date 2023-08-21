import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

const AddLocationsScreen = ({ navigation, route }) => {
    const [newLocation, setNewLocation] = useState('');
  const [locationOptions, setLocationOptions] = useState([
    'Kitchen', 'Pantry', 'Fridge'
  ]);

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
      <TouchableOpacity onPress={handleAddLocation} >
        <Text>Add Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Kitchen', { locationOptions })
        }
      >
        <Text>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AddLocationsScreen;
