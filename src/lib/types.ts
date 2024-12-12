export type RootDrawerParamList = {
  Home: undefined;
  ProductRegistration: undefined;
  Login: undefined;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
} 