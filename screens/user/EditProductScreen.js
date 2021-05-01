import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../../components/UI/HeaderButton';
// import { colorBasedOnOS, colorBgBasedOnOS, bAndroidOS } from '../../utils/helpers';

export default ({ navigation, route }) => {
  const prodId = route?.params?.id;
  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );

  const [szTitle, setTitle] = useState(editedProduct?.title || '');
  const [szImageUrl, setImageUrl] = useState(editedProduct?.imageUrl || '');
  const [szPrice, setPrice] = useState(editedProduct?.price || '');
  const [szDescription, setDescription] = useState(
    editedProduct?.description || '',
  );

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (
  //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //           <Item
  //             title="Save"
  //             iconName={bAndroidOS ? 'md-checkmark' : 'ios-checkmark'}
  //             onPress={() => {
  //               console.log('submie here');
  //             }}
  //           />
  //         </HeaderButtons>
  //       );
  //     },
  //   });
  // }, [navigation]);

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        updateProduct({
          id: prodId,
          title: szTitle,
          description: szDescription,
          imageUrl: szImageUrl,
        }),
      );
    } else {
      dispatch(
        createProduct({
          price: +szPrice,
          title: szTitle,
          description: szDescription,
          imageUrl: szImageUrl,
        }),
      );
    }
    navigation.goBack();
  }, [
    navigation,
    dispatch,
    prodId,
    szTitle,
    szPrice,
    szImageUrl,
    szDescription,
  ]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            // enterKeyHint="abc"
            value={szTitle}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            // enterKeyHint="abc"
            value={szImageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              // enterKeyHint="abc"
              value={szPrice}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            // enterKeyHint="abc"
            value={szDescription}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
