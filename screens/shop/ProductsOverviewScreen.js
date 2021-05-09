import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';
import Colors from '../../constants/Colors';

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const { availableProducts } = useSelector((state) => state.products);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loadedProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message)
    }
    setLoading(false);
  }, [dispatch, setLoading, setError]);

  // Run one time on start
  useEffect(() => {
    loadedProducts();
  }, [loadedProducts])

  const handleViewDetail = (objIdTitle) => {
    navigation.navigate('ProductDetail', objIdTitle);
  };

  const handleAddToCart = (objProduct) => {
    dispatch(addToCart(objProduct));
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again!" onPress={loadedProducts} color={Colors.primary} />
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && !availableProducts.length) {
    return (
      <View style={styles.centered}>
        <Text>
          No products founds. Maybe start adding some!
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          fSelect={() =>
            handleViewDetail({
              id: itemData.item.id,
              title: itemData.item.title,
            })
          }
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() =>
              handleViewDetail({
                id: itemData.item.id,
                title: itemData.item.title,
              })
            }
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => handleAddToCart(itemData.item)}
          />
        </ProductItem>
      )}
    />
  );
};


const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
