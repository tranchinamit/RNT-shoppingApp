import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import NewPlaceScreen from '../screens/location/NewPlaceScreen';
import PlaceDetailScreen from '../screens/location/PlaceDetailScreen';
import PlaceListScreen from '../screens/location/PlaceListScreen';

import { colorBasedOnOS, colorBgBasedOnOS, bAndroidOS } from '../utils/helpers';
import HeaderButton from '../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: colorBgBasedOnOS,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: colorBasedOnOS,
};

const Stack = createStackNavigator();

//  drawer navigation
const Drawer = createDrawerNavigator();

const LeftDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'open-sans-bold',
              fontSize: 18,
            }}
          >
            Logout
          </Text>
        )}
        onPress={async () => {
          try {
            await dispatch(logout());
          } catch (err) {
            console.log(err);
          }
        }}
        style={{ paddingLeft: 40, marginTop: 10 }}
        icon={() => (
          <Ionicons
            name={bAndroidOS ? 'md-log-out-outline' : 'ios-log-out-outline'}
            size={23}
            color={Colors.primary}
          />
        )}
      />
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
    <Stack.Navigator screenOptions={defaultNavOptions}>
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

// Main navigation
const LocationNavigator = createStackNavigator();

const LocationNavigation = () => {
  return (
    <LocationNavigator.Navigator
      // initialRouteName="Categories"
      screenOptions={defaultNavOptions}
    >
      <LocationNavigator.Screen
        name="Places"
        component={PlaceListScreen}
        options={({ navigation, route }) => ({
          title: 'All Places',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add Place"
                iconName={bAndroidOS ? 'md-add' : 'ios-add'}
                onPress={() => {
                  navigation.navigate('NewPlace');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <LocationNavigator.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        // options={{ title: 'Cart' }}
      />
      <LocationNavigator.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={({ navigation, route }) => ({
          title: 'Add Place',
        })}
      />
    </LocationNavigator.Navigator>
  );
};

const LeftDrawerNavigation = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <LeftDrawerContent {...props} mainNavigation={navigation} />
        )}
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
        content
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
        <Drawer.Screen
          name="Location"
          component={LocationNavigation}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={bAndroidOS ? 'md-map' : 'ios-map'}
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
      screenOptions={defaultNavOptions}
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
    <AdminNavigator.Navigator screenOptions={defaultNavOptions}>
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
        })}
      />
    </AdminNavigator.Navigator>
  );
};

const MainNavigator = createAnimatedSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthScreen,
    Shop: LeftDrawerNavigation,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);
const MainNavigatorAndroid = createSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthScreen,
    Shop: LeftDrawerNavigation,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

// Android can run with createSwitchNavigator. So, this is the solution
export default createAppContainer(
  bAndroidOS ? MainNavigatorAndroid : MainNavigator,
);
