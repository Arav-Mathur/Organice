import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

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
      <Button title="Add Location" onPress={handleAddLocation} />
      <Button
        title="Submit"
        onPress={() =>
          navigation.navigate('Kitchen', { locationOptions })
        }
      />
    </View>
  );
};

export default AddLocationsScreen;
