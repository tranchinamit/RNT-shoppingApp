import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

export default (props) => {
  const { amount, date, items } = props;
  const [bShowDetails, setShowDetails] = useState(false);
  console.log(items);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount?.toFixed(2) || 0}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={bShowDetails ? 'Hide details' : 'Show Details'}
        onPress={() => setShowDetails(!bShowDetails)}
      />
      {bShowDetails && (
        <View>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
  },
  summary: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
});
