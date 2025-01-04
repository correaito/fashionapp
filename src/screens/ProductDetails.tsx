import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../lib/CartContext';
import { Product } from '../lib/types';
import { useNavigation } from '@react-navigation/native';

interface ProductDetailsProps {
  route: {
    params: {
      product: Product;
    };
  };
}

export function ProductDetails({ route }: ProductDetailsProps) {
  const { product } = route.params;
  const { dispatch } = useCart();
  const navigation = useNavigation();

  function handleAddToCart() {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigation.navigate('Cart' as never);
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.image_url || 'https://via.placeholder.com/300x400' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  price: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#999',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 