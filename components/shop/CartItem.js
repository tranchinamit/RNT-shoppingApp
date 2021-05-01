import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { bAndroidOS, TouchableCmp } from '../../utils/helpers';

export default ({ fRemove, ...props }) => {
  const { id, title, price, quantity, sum } = props;

  console.log(props);
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText} numberOfLines={1}>
          {' '}
          {title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${sum.toFixed(2)}</Text>
        {fRemove && (
          <TouchableCmp
            onPress={() => fRemove({ id })}
            style={styles.deleteButton}
          >
            <Ionicons
              name={bAndroidOS ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  quantity: {
    fontFamily: 'rubik',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
