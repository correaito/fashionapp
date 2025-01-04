import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './src/lib/CartContext';
import { Navigation } from './src/lib/navigation';

export default function App() {
  return (
    <CartProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Navigation />
    </CartProvider>
  );
}
