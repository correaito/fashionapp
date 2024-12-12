import React, { memo } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Product } from '../lib/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export const ProductCard = memo(({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image 
        source={{ uri: product.image_url || 'https://via.placeholder.com/300x400' }} 
        style={styles.productImage} 
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.productInfo}
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  productCard: {
    width: CARD_WIDTH,
    height: 250,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 