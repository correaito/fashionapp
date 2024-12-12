import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1f3f']}
      style={styles.drawerContainer}
    >
      <View style={styles.drawerHeader}>
        <FontAwesome5 name="tshirt" size={40} color="#8A2BE2" />
        <Text style={styles.drawerTitle}>FASHION STORE</Text>
      </View>
      <View style={styles.drawerContent}>
        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('Home')}
        >
          <FontAwesome5 name="home" size={20} color="#8A2BE2" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('ProductRegistration')}
        >
          <FontAwesome5 name="plus-circle" size={20} color="#8A2BE2" />
          <Text style={styles.drawerItemText}>Cadastrar Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.drawerItem} 
          onPress={() => props.navigation.navigate('Login')}
        >
          <FontAwesome5 name="sign-out-alt" size={20} color="#8A2BE2" />
          <Text style={styles.drawerItemText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 43, 226, 0.3)',
    alignItems: 'center',
    marginTop: 30,
  },
  drawerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 1,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
}); 