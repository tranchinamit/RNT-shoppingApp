import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';

export default () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const arrItems = useSelector(state => {
    const rs = [];
    for (const key in state.cart.items) {
      rs.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return rs;
    // return rs.sort((a, b) => a.id > b.id);
  });
  console.log(arrItems);

  const handleRemove = (id) => {
    console.log(id);
    dispatch(removeFromCart({ id }))
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total:
        <Text style={styles.summaryAmount}>${totalAmount > 0 ? totalAmount?.toFixed(2) : `0.00`}</Text>
        </Text>
        <Button color={Colors.accent} title="Order Now" disabled={!arrItems.length} />
      </View>
      <View>
        <FlatList
          data={arrItems}
          keyExtractor={item => item.id}
          renderItem={itemData =>
            <CartItem
              {...itemData.item}
              fRemove={({ id }) => handleRemove(id)}
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  summaryAmount: {
    color: Colors.primary
  },
})

