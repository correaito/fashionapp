import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductRegistrationScreen } from "../screens/ProductRegistrationScreen";
import { ProductDetails } from "../screens/ProductDetails";
import { Cart } from "../screens/Cart";
import { EditProductScreen } from "../screens/EditProductScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { CustomDrawerContent } from "../components/CustomDrawer";
import { useCart } from "./CartContext";
import type { RootStackParamList, RootDrawerParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
  const { state } = useCart();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a1a1a",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#1a1a1a",
          width: 280,
        },
        drawerType: "front",
        drawerLabelStyle: {
          color: "#fff",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Fashion Store",
          drawerLabel: "Home",
        })}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="ProductRegistration"
        component={ProductRegistrationScreen}
        options={{
          title: "Cadastrar Produto",
          drawerLabel: "Cadastrar Produto",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{
          title: "Editar Produtos",
          drawerLabel: "Editar Produtos",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
            title: "Detalhes do Produto",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
            title: "Carrinho",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
