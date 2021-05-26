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

const tempKey = `AIzaSyAuqtG8XhmKQPGoYpFi9dqZmhZTDWGCxE0`;

export default ({ location, children }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${tempKey}`;
  }

  return (
    <View style={styles.mapPreview}>
      {location?.lat ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 4,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
