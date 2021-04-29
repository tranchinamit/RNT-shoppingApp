import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

import { colorBasedOnOS, colorBgBasedOnOS, bAndroidOS } from '../utils/helpers';
import HeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';



const ProductsNavigator = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <ProductsNavigator.Navigator
        // initialRouteName="Categories"
        screenOptions={{
          headerStyle: {
            backgroundColor: colorBgBasedOnOS,
          },
          headerTintColor: colorBasedOnOS,
          headerTitleStyle: {
            fontFamily: 'open-sans-bold'
          },
          headerBackTitleStyle: {
            fontFamily: 'open-sans'
          }
        }}
      >
        <ProductsNavigator.Screen
          name="All Products"
          component={ProductsOverviewScreen}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={bAndroidOS ? 'md-cart' : 'ios-cart'}
                  onPress={() => {
                    navigation.navigate('CartScreen')
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <ProductsNavigator.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Product Detail" }}
        />
        <ProductsNavigator.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ title: "Cart" }}
        />
        {/* Other way pass props */}
        {/* <ProductsNavigator.Screen
          name="ProductDetail"
          options={{
            title: "Meal Details - id...",
          }}
        >
          {(props) => <ProductDetailScreen {...props} extraData={"extraData"} />}
        </ProductsNavigator.Screen> */}
      </ProductsNavigator.Navigator>
    </NavigationContainer>
  );
};
