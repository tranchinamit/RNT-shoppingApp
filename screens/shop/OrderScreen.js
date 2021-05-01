import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

export default () => {
  const { orders } = useSelector((state) => state.order);
  console.log(orders);
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
