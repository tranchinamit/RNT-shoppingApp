import React, { useCallback, useEffect, useReducer, useLayoutEffect } from 'react';
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
import Input from '../../components/UI/Input';

import { colorBasedOnOS, colorBgBasedOnOS, bAndroidOS } from '../..//utils/helpers';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, { type, input, value, isValid }) => {
  if (type === FORM_INPUT_UPDATE) {

    const updatedValues = {
      ...state.inputValues,
      [input]: value
    }

    const updatedValidities = {
      ...state.inputValues,
      [input]: isValid
    }

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
}

export default ({ navigation, route }) => {
  const prodId = route?.params?.id;
  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct?.title || '',
      imageUrl: editedProduct?.imageUrl || '',
      description: editedProduct?.description || '',
      price: editedProduct?.price || ''
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct,
    },
    formIsValid: !!editedProduct
  });

  const submitHandler = useCallback(() => {

    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the error in the form', [{ text: 'Okay', style: 'default' }])
      return;
    }

    const { title, price, description, imageUrl } = formState.inputValues;
    if (editedProduct) {
      dispatch(
        updateProduct({
          id: prodId,
          title,
          description,
          imageUrl
        }),
      );
    } else {
      dispatch(
        createProduct({
          price: +price,
          title,
          description,
          imageUrl
        }),
      );
    }
    navigation.goBack();
  }, [
    dispatch,
    prodId,
    formState
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Save"
              iconName={bAndroidOS ? 'md-checkmark' : 'ios-checkmark'}
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation, submitHandler]);

  // useEffect(() => {
  //   navigation.setParams({ submit: () => submitHandler() });
  // }, [submitHandler]);

  const inputChangeHandler = useCallback((inputIdentifier, text, isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputIdentifier,
      value: text,
      isValid,
    });
  }, [dispatchFormState]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label='Title'
          errorText="Please enter a valid title!"
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?.title || ''}
          initiallyValid={!!editedProduct}
        />

        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image Url!"
          keyboardType='default'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?.imageUrl || ''}
          initiallyValid={!!editedProduct}
        />

        {editedProduct ? null : (
          <Input
            id="price"
            label='Price'
            errorText="Please enter a valid price!"
            keyboardType='decimal-pad'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct?.price || ''}
            initiallyValid={!!editedProduct}
          />
        )}
        <Input
          id="description"
          label='Description'
          errorText="Please enter a valid description!"
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?.description || ''}
          initiallyValid={!!editedProduct}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
