import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { categories } from "../lib/categories";
import type { Product } from "../lib/types";
import { BackButton } from "../components/BackButton";

type EditProductScreenProps = {
  navigation: any;
};

export function EditProductScreen({ navigation }: EditProductScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os produtos");
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setStockQuantity(product.stock_quantity.toString());
    setCategory(product.category);
    setImageUrl(product.image_url || "");
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const validateInputs = () => {
    if (!selectedProduct) {
      showError("Selecione um produto para editar");
      return false;
    }
    if (!name.trim()) {
      showError("Nome do produto é obrigatório");
      return false;
    }
    if (!price.trim() || isNaN(Number(price))) {
      showError("Preço inválido");
      return false;
    }
    if (!stockQuantity.trim() || isNaN(Number(stockQuantity))) {
      showError("Quantidade em estoque inválida");
      return false;
    }
    return true;
  };

  const handleUpdateProduct = async () => {
    if (loading) return;
    if (!validateInputs()) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: Number(price),
          stock_quantity: Number(stockQuantity),
          category,
          image_url: imageUrl,
        })
        .eq("id", selectedProduct?.id);

      if (error) throw error;

      setSuccessModalVisible(true);
      fetchProducts(); // Atualiza a lista de produtos

      setTimeout(() => {
        setSuccessModalVisible(false);
        setSelectedProduct(null);
        setName("");
        setDescription("");
        setPrice("");
        setStockQuantity("");
        setCategory("");
        setImageUrl("");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      showError("Erro ao atualizar produto");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", selectedProduct.id);

              if (error) throw error;

              Alert.alert("Sucesso", "Produto excluído com sucesso");
              fetchProducts();
              setSelectedProduct(null);
              setName("");
              setDescription("");
              setPrice("");
              setStockQuantity("");
              setCategory("");
              setImageUrl("");
            } catch (error) {
              console.error("Erro ao excluir produto:", error);
              Alert.alert("Erro", "Não foi possível excluir o produto");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const ErrorModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={errorModalVisible}
      onRequestClose={() => setErrorModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setErrorModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <FontAwesome5
                name="exclamation-circle"
                size={50}
                color="#FF6B6B"
              />
            </View>
            <Text style={styles.modalTitle}>Ops!</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const SuccessModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={successModalVisible}
      onRequestClose={() => setSuccessModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setSuccessModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <FontAwesome5 name="check-circle" size={50} color="#4BB543" />
            </View>
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Text style={styles.modalMessage}>
              Produto atualizado com sucesso!
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  if (loadingProducts) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#1a1a1a", "#2d1f3f", "#1a1a1a"]}
        style={styles.container}
      >
        <BackButton targetScreen="Dashboard" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <FontAwesome5 name="edit" size={40} color="#8A2BE2" />
              <Text style={styles.title}>Editar Produto</Text>
            </View>

            <View style={styles.pickerWrapper}>
              <FontAwesome5
                name="box"
                size={20}
                color="#8A2BE2"
                style={styles.inputIcon}
              />
              <Picker
                selectedValue={selectedProduct?.id}
                onValueChange={(itemValue) => {
                  const product = products.find((p) => p.id === itemValue);
                  if (product) handleProductSelect(product);
                }}
                style={styles.picker}
                dropdownIconColor="#8A2BE2"
              >
                <Picker.Item
                  label="Selecione um produto"
                  value=""
                  color={Platform.OS === "ios" ? "#fff" : "#666"}
                />
                {products.map((product) => (
                  <Picker.Item
                    key={product.id}
                    label={product.name}
                    value={product.id}
                    color={Platform.OS === "ios" ? "#fff" : "#666"}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <FontAwesome5
                  name="tag"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nome do produto"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesome5
                  name="align-left"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descrição"
                  placeholderTextColor="#666"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesome5
                  name="dollar-sign"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Preço"
                  placeholderTextColor="#666"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesome5
                  name="boxes"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade em estoque"
                  placeholderTextColor="#666"
                  value={stockQuantity}
                  onChangeText={setStockQuantity}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.pickerWrapper}>
                <FontAwesome5
                  name="list"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <Picker
                  selectedValue={category}
                  onValueChange={setCategory}
                  style={styles.picker}
                  dropdownIconColor="#8A2BE2"
                >
                  <Picker.Item
                    label="Selecione uma categoria"
                    value=""
                    color={Platform.OS === "ios" ? "#fff" : "#666"}
                  />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat.id}
                      label={cat.name}
                      value={cat.name}
                      color={Platform.OS === "ios" ? "#fff" : "#666"}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesome5
                  name="image"
                  size={20}
                  color="#8A2BE2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL da imagem"
                  placeholderTextColor="#666"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={handleUpdateProduct}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Atualizando..." : "Atualizar Produto"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDeleteProduct}
                disabled={loading || !selectedProduct}
              >
                <Text style={styles.buttonText}>Excluir Produto</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <ErrorModal />
        <SuccessModal />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(138, 43, 226, 0.3)",
  },
  inputIcon: {
    padding: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 15,
    paddingRight: 15,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(138, 43, 226, 0.3)",
  },
  picker: {
    flex: 1,
    color: "#fff",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#8A2BE2",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#8A2BE2",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
