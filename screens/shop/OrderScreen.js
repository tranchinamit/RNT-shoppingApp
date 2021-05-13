import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

export default () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loadedOrders = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(fetchOrders());
    } catch (err) {
      setError(err.message)
    }
    setLoading(false);
  }, [dispatch, setLoading, setError]);


  // Run one time on start
  useEffect(() => {
    loadedOrders().then(() => { setLoading(false) });
  }, [loadedOrders, setLoading])


  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && !orders.length) {
    return (
      <View style={styles.centered}>
        <Text>
          No orders founds. Maybe start order some products!
        </Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { totalAmount, date, items } }) => (
          <OrderItem amount={totalAmount} date={date} items={items} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
