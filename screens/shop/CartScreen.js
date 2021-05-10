import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

export default () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const arrItems = useSelector((state) => {
    const rs = [];
    for (const key in state.cart.items) {
      rs.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return rs;
    // return rs.sort((a, b) => a.id > b.id);
  });
  const [isLoading, setLoading] = useState(false);


  console.log(arrItems);

  const handleRemove = (id) => {
    console.log(id);
    dispatch(removeFromCart({ id }));
  };

  const handleOrder = async () => {
    setLoading(true)
    try {
      await dispatch(addOrder({ items: arrItems, totalAmount }));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.summaryAmount}>
            $
            {totalAmount > 0
              ? Math.round(totalAmount?.toFixed(2) * 100) / 100
              : `0.00`}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={!arrItems.length}
            onPress={handleOrder}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={arrItems}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CartItem
              {...itemData.item}
              fRemove={({ id }) => handleRemove(id)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  summaryAmount: {
    color: Colors.primary,
  },
});
