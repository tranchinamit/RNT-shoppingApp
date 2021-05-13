import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

import { bAndroidOS } from '../..//utils/helpers';
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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  const submitHandler = useCallback(async () => {

    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the error in the form', [{ text: 'Okay', style: 'default' }])
      return;
    }

    const { title, price, description, imageUrl } = formState.inputValues;
    setError(null);
    setLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct({
            id: prodId,
            title,
            description,
            imageUrl
          }),
        );
      } else {
        await dispatch(
          createProduct({
            price: +price,
            title,
            description,
            imageUrl
          }),
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1
      }}
      behavior={bAndroidOS ? "height" : "padding"}
    >
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
            required
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
            required
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
              required
              min={0.1}
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
            required
            minLength={5}
          />

          {/* <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            />
            <TextInput
              style={styles.input}
            /> */}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
