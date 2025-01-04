import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Product } from '../lib/types';

// Dados mockados para exemplo
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    price: 49.90,
    description: 'Camiseta 100% algodão, confortável e durável.',
    image: 'https://via.placeholder.com/300x400',
  },
  {
    id: '2',
    name: 'Calça Jeans',
    price: 129.90,
    description: 'Calça jeans moderna com ótimo caimento.',
    image: 'https://via.placeholder.com/300x400',
  },
  {
    id: '3',
    name: 'Tênis Casual',
    price: 199.90,
    description: 'Tênis confortável para o dia a dia.',
    image: 'https://via.placeholder.com/300x400',
  },
];

export function Home() {
  const navigation = useNavigation();

  function handleProductPress(product: Product) {
    navigation.navigate('ProductDetails' as never, { product } as never);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                R$ {item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: '47%',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
}); 