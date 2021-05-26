// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import ReduxThunk from 'redux-thunk';

// import ShopNavigator from './navigation/ShopNavigator';
import NavigationContainer from './navigation/NavigationContainer';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import placesReducer from './store/reducers/place';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  places: placesReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

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
      <NavigationContainer />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   wrapper: {
//     fontFamily: 'rubik'
//   },
// });
