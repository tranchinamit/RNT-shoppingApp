import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

export default ({ fImageTaken }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickerLocation, setPickedLocation] = useState();

  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "Permission to access location was denied",
        [{ text: "Okay" }]
      );
      return;
    }

    try {
      setIsFetching(true);
      let location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });
      console.log(location);
      setIsFetching(false);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview location={pickerLocation}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No location chosen yet!.</Text>
          )}
        </MapPreview>
      </View>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
