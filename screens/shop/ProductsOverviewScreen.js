import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default (props) => {

  const { availableProducts } = useSelector(state => state.products);

  const renderItem = ({ item }) => {
    return (
      <>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </>
    );
  }

  return <FlatList
    data={availableProducts}
    keyExtractor={item => item.id}
    renderItem={renderItem}
  // renderItem={itemData => <Text>{itemData.item.title}</Text>}
  />
}

