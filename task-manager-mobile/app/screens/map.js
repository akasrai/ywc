import * as Location from "expo-location";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";

import { calculateDistance } from "../../utils/location-utils";

export default DeviceFeatureScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Location Retrieved",
        text2: "Your location has been successfully!",
        topOffset: 10,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to retrieve location.");
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      latitude,
      longitude
    );

    setDistance(distance);
  };

  return (
    <View style={styles.container}>
      {selectedLocation && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location Selected</Text>
          <Text>{`Latitude: ${selectedLocation.latitude}`}</Text>
          <Text>{`Longitude: ${selectedLocation.longitude}`}</Text>
          <Text>{`Selected location is ${distance}km far from your location.`}</Text>
        </View>
      )}
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {location.latitude && location.longitude && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
          )}

          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Selected Location"
              description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
              pinColor="green"
            />
          )}
        </MapView>
      ) : (
        <Text>{errorMsg || "Loading your location..."}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <MaterialCommunityIcons name="crosshairs-gps" color="#fff" size={20} />
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  card: {
    width: "91%",
    padding: 15,
    margin: 15,
    position: "absolute",
    top: 5,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
