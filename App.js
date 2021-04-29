// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  let [fontsLoaded] = useFonts({
    // montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    // "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "rubik": require("./assets/fonts/Rubik-Regular.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   wrapper: {
//     fontFamily: 'rubik'
//   },
// });
