import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

export default ({ navigation, route }) => {
  // console.log(navigation);
  const { availableProducts } = useSelector(state => state.products);
  const productId = route.params.id;
  const title = route.params.title;

  const objProduct = availableProducts.find(prod => prod.id === productId);

  useEffect(() => {
    title && navigation.setOptions({ title });
  }, [route, navigation]);


  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: objProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => { }} />
      </View>
      <Text style={styles.price}>${objProduct.price}</Text>
      <Text style={styles.description}>{objProduct.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  },
})

