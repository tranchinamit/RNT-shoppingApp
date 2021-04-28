import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';


const ProductsNavigator = createStackNavigator();

const colorBasedOnOS = Platform.OS !== "ios" ? "white" : Colors.primary;
const colorBgBasedOnOS = Platform.OS !== "ios" ? Colors.primary : "white";

export default ({ drawerNavigation }) => {
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
            fontWeight: "bold",
          },
        }}
      >
        <ProductsNavigator.Screen
          name="ProductsOverviewScreen"
          component={ProductsOverviewScreen}
        // options={{
        //   headerLeft: () => (
        //     <IconButton
        //       icon={{
        //         name: "menu",
        //         size: 28,
        //         color: colorBasedOnOS,
        //         solid: true,
        //       }}
        //       type="clear"
        //       onPress={() => drawerNavigation.toggleDrawer()}
        //     />
        //   ),
        // }}
        />
        {/* <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={{ title: "Category Meals" }}
        /> */}
        {/* Other way pass props */}
        {/* <ProductsNavigator.Screen
          name="MealDetails"
          options={{
            title: "Meal Details - id...",
          }}
        >
          {(props) => <MealDetailsScreen {...props} extraData={"extraData"} />}
        </ProductsNavigator.Screen> */}
      </ProductsNavigator.Navigator>
    </NavigationContainer>
  );
};
