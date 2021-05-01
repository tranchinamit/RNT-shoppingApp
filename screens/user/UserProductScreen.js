import React from 'react';
import { FlatList, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

export default ({ navigation }) => {
  const { userProducts } = useSelector((state) => state.products);

  const handleViewDetail = (objIdTitle) => {
    navigation.navigate('ProductDetail', objIdTitle);
  };

  const handleAddToCart = (objProduct) => {
    dispatch(addToCart(objProduct));
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem {...item} fSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() =>
              handleEdit({
                id: itemData.item.id,
                title: itemData.item.title,
              })
            }
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => handleDelete(itemData.item)}
          />
        </ProductItem>
      )}
    />
  );
};
