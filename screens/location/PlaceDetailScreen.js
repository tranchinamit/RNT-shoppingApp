import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ navigation, route }) => {


  const { id, title } = route.params;

  useEffect(() => {
    title && navigation.setOptions({ title });
  }, [route, navigation]);

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});
