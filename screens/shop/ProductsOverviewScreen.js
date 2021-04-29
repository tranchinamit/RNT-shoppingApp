import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';

export default ({ navigation }) => {
  const dispatch = useDispatch();

  const { availableProducts } = useSelector(state => state.products);

  const handleViewDetail = (objIdTitle) => {
    navigation.navigate("ProductDetail", objIdTitle)
  }

  const handleAddToCart = (objProduct) => {
    console.log(objProduct);
    dispatch(addToCart(objProduct));
  }

  return <FlatList
    data={availableProducts}
    keyExtractor={item => item.id}
    renderItem={itemData =>
      <ProductItem
        {...itemData.item}
        fViewDetail={(objIdTitle) => handleViewDetail(objIdTitle)}
        fAddToCart={objProduct => handleAddToCart(objProduct)}
      />
    }
  />
}

