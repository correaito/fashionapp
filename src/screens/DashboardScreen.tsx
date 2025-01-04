import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

export function DashboardScreen() {
  const navigation = useNavigation();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTotalProducts();
  }, []);

  const fetchTotalProducts = async () => {
    try {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      setTotalProducts(count || 0);
    } catch (error) {
      console.error("Erro ao buscar total de produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Cadastrar Produto",
      icon: "plus-circle",
      route: "ProductRegistration",
      description: "Adicione novos produtos ao catálogo",
      color: "#8A2BE2",
    },
    {
      title: "Editar Produtos",
      icon: "edit",
      route: "EditProduct",
      description: "Gerencie os produtos existentes",
      color: "#9400D3",
    },
  ];

  return (
    <LinearGradient
      colors={["#1a1a1a", "#2d1f3f", "#1a1a1a"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <FontAwesome5 name="tachometer-alt" size={40} color="#8A2BE2" />
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Gerenciamento de Produtos</Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route as never)}
            >
              <LinearGradient
                colors={[item.color, item.color + "80"]}
                style={styles.menuItemContent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <FontAwesome5 name={item.icon} size={30} color="#fff" />
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDescription}>
                  {item.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estatísticas Rápidas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsItem}>
              <FontAwesome5 name="box" size={24} color="#8A2BE2" />
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#8A2BE2"
                  style={styles.statsValue}
                />
              ) : (
                <Text style={styles.statsValue}>{totalProducts}</Text>
              )}
              <Text style={styles.statsLabel}>Produtos</Text>
            </View>
            <View style={styles.statsItem}>
              <FontAwesome5 name="shopping-cart" size={24} color="#8A2BE2" />
              <Text style={styles.statsValue}>0</Text>
              <Text style={styles.statsLabel}>Vendas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
  },
  menuGrid: {
    padding: 20,
  },
  menuItem: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItemContent: {
    padding: 20,
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
    marginTop: 5,
    textAlign: "center",
  },
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsItem: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  statsLabel: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
});
