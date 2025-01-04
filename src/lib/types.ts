import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
};

export type RootDrawerParamList = {
  HomeScreen: undefined;
  Dashboard: undefined;
  ProductRegistration: undefined;
  EditProduct: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  stock_quantity: number;
  created_at?: string;
}
