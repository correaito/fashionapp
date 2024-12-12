import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ProductCard } from '../components/ProductCard';
import type { RootDrawerParamList, Product } from '../lib/types';

type HomeScreenProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList, 'Home'>;
};

const categories = [
  { id: 1, name: 'Camisetas', icon: 'tshirt' },
  { id: 2, name: 'Calças', icon: 'male' },
  { id: 3, name: 'Tênis', icon: 'shoe-prints' },
  { id: 4, name: 'Acessórios', icon: 'clock' },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos. Tente novamente mais tarde.');
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (searchText.trim() === '') {
      return products;
    }
    
    const searchLower = searchText.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }, [searchText, products]);

  const handleCategoryPress = useCallback((categoryName: string) => {
    setSearchText(categoryName);
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    // TODO: Implementar visualização detalhada do produto
    console.log('Produto selecionado:', product);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <LinearGradient
        colors={['#1a1a1a', '#2d1f3f', '#1a1a1a']}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={[styles.header, { marginTop: Platform.OS === 'ios' ? 30 : 20 }]}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Bem-vindo à</Text>
              <Text style={styles.storeName}>FASHION STORE</Text>
            </View>
            <TouchableOpacity style={styles.cartButton}>
              <FontAwesome5 name="shopping-cart" size={24} color="#8A2BE2" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>0</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <FontAwesome5 name="search" size={18} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produtos..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category.name)}
                >
                  <FontAwesome5 name={category.icon} size={24} color="#8A2BE2" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Products */}
          <View style={styles.productsContainer}>
            <Text style={styles.sectionTitle}>Produtos</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#8A2BE2" style={styles.loader} />
            ) : filteredProducts.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsList}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => handleProductPress(product)}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noProductsText}>Nenhum produto encontrado</Text>
            )}
          </View>

          {/* Promotion Banner */}
          <TouchableOpacity style={styles.promotionBanner}>
            <LinearGradient
              colors={['#8A2BE2', '#9400D3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.promotionContent}
            >
              <View>
                <Text style={styles.promotionTitle}>Oferta Especial</Text>
                <Text style={styles.promotionText}>30% OFF em produtos selecionados</Text>
              </View>
              <FontAwesome5 name="arrow-right" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#999',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    width: 100,
  },
  categoryName: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  productsList: {
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  noProductsText: {
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  promotionBanner: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  promotionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  promotionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promotionText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
}); 