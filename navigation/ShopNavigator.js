import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import { colorBasedOnOS, colorBgBasedOnOS, bAndroidOS } from '../utils/helpers';
import HeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

//  drawer navigation
const Drawer = createDrawerNavigator();

const LeftDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
};

const OrderNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorBgBasedOnOS,
        },
        headerTintColor: colorBasedOnOS,
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Stack.Screen
        name="Your Order"
        component={OrderScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={bAndroidOS ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const LeftDrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <LeftDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
          activeBackgroundColor: 'lightgray',
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          itemStyle: {
            padding: 4,
            // borderBottomColor: "red",
            // borderBottomWidth: 1,
          },
          style: { margin: 12 },
        }}
        // drawerStyle={
        // {
        // backgroundColor: "#c6cbef",
        // width: 240,
        // }
        // }
        // 2 options below work together
        // hideStatusBar={true}
        // statusBarAnimation={true}
      >
        <Drawer.Screen
          name="Product"
          component={ProductNavigation}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={bAndroidOS ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Order"
          component={OrderNavigation}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={bAndroidOS ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={AdminNavigation}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={bAndroidOS ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Main navigation
const ProductNavigator = createStackNavigator();

const ProductNavigation = () => {
  return (
    <ProductNavigator.Navigator
      // initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: colorBgBasedOnOS,
        },
        headerTintColor: colorBasedOnOS,
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
      }}
    >
      <ProductNavigator.Screen
        name="All Products"
        component={ProductsOverviewScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={bAndroidOS ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={bAndroidOS ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navigation.navigate('CartScreen');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
      <ProductNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
      {/* Other way pass props */}
      {/* <ProductNavigator.Screen
        name="ProductDetail"
        options={{
          title: "Meal Details - id...",
        }}
      >
        {(props) => <ProductDetailScreen {...props} extraData={"extraData"} />}
      </ProductNavigator.Screen> */}
    </ProductNavigator.Navigator>
  );
};

// Admin Navigation
const AdminNavigator = createStackNavigator();

const AdminNavigation = () => {
  return (
    <AdminNavigator.Navigator
      // initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: colorBgBasedOnOS,
        },
        headerTintColor: colorBasedOnOS,
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
      }}
    >
      <AdminNavigator.Screen
        name="Your Product"
        component={UserProductScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={bAndroidOS ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={bAndroidOS ? 'md-create' : 'ios-create'}
                onPress={() => {
                  navigation.navigate('EditProduct');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <AdminNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ navigation, route }) => ({
          title: route?.params?.id ? 'Edit Product' : 'Add Product',
          headerRight: () => {
            const submitFn = route?.params?.submit;
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Save"
                  iconName={bAndroidOS ? 'md-checkmark' : 'ios-checkmark'}
                  onPress={submitFn}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </AdminNavigator.Navigator>
  );
};

export default () => {
  return <LeftDrawerNavigation />;
};
