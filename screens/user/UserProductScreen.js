import React from 'react';
import { FlatList, Button, Alert, Text, View } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/actions/products';

export default ({ navigation }) => {
  const { userProducts } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    navigation.navigate('EditProduct', { id });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      { text: ' Yes', style: 'destructive', onPress: () => handleDelete(id) },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>No products found, maybe start creating some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem {...item} fSelect={() => handleEdit(item.id)}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => handleEdit(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};
