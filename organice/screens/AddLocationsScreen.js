import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddLocationsScreen = ({ route }) => {
  const [newLocation, setNewLocation] = useState("");
  const navigation = useNavigation();

  const handleAddLocation = () => {
    if (!newLocation) {
      return; // No need to proceed if newLocation is empty
    }

    const { updateLocationOptions, currentOptions } = route.params || {}; // Destructure route.params

    if (!currentOptions) {
      console.log("No currentOptions found."); // Debugging
      return;
    }

    if (currentOptions.includes(newLocation)) {
      // Alert or handle duplicate location
      Alert.alert("Duplicate Location", "This location already exists.");
    } else {
      const newOptions = [...currentOptions, newLocation];
      console.log("New options before update:", newOptions);
      updateLocationOptions(newOptions); // Use the function
      setNewLocation("");
      Alert.alert(
        "Location Added",
        "The new location has been added successfully."
      );
    }
  };

  const handleNext = () => {
    navigation.navigate("My Inventory");
  };

  const locationOptions = route.params?.currentOptions || [];

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
      <View style={styles.locationsContainer}>
        {locationOptions.map((location, index) => (
          <Text key={index} style={styles.locationText}>
            {location}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    fontSize: 20,
    width: "85%",
    alignSelf: "center",
    height: 45,
    borderColor: "#014f00",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  addButton: {
    width: "85%",
    alignSelf: "center",
    height: 45,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#8fb913",
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  goBackButton: {
    width: "40%",
    alignSelf: "center",
    height: 45,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8fb913",
    shadowColor: "#014f00",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default AddLocationsScreen;
