import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import Colors from '../../constants/Colors';

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const { availableProducts } = useSelector((state) => state.products);

  const handleViewDetail = (objIdTitle) => {
    navigation.navigate('ProductDetail', objIdTitle);
  };

  const handleAddToCart = (objProduct) => {
    dispatch(addToCart(objProduct));
  };

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
