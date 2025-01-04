import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCart } from "../lib/CartContext";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Cart() {
  const { state, dispatch } = useCart();
  const navigation = useNavigation();

  function handleRemoveItem(id: string) {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }

  function handleUpdateQuantity(id: string, quantity: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }

  function handleContinueShopping() {
    navigation.navigate("DrawerNavigator" as never);
  }

  if (state.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="shopping-cart" size={64} color="#666" />
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueShoppingButtonText}>
            Continuar Comprando
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{
                uri: item.image_url || "https://via.placeholder.com/300x400",
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Feather name="trash-2" size={24} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {state.total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueShoppingButtonText}>
            Continuar Comprando
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#2ecc71",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#333",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    color: "#fff",
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  continueShoppingButton: {
    backgroundColor: "#8A2BE2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  continueShoppingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
