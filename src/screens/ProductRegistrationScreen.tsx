import React, { useState } from "react";
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { categories } from "../lib/categories";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BackButton } from "../components/BackButton";

type RootStackParamList = {
  Home: undefined;
  ProductRegistration: undefined;
};

type ProductRegistrationScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "ProductRegistration"
  >;
};

export function ProductRegistrationScreen({
  navigation,
}: ProductRegistrationScreenProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const validateInputs = () => {
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

  const handleRegisterProduct = async () => {
    if (loading) return;
    if (!validateInputs()) return;

    try {
      setLoading(true);

      const { data, error } = await supabase.rpc("insert_product", {
        product_name: name,
        product_description: description,
        product_price: Number(price),
        product_stock: Number(stockQuantity),
        product_category: category,
        product_image_url: imageUrl,
      });

      if (error) {
        console.error("Erro ao cadastrar produto:", error);
        showError("Erro ao cadastrar produto");
        return;
      }

      setSuccessModalVisible(true);
      // Limpar os campos após sucesso
      setName("");
      setDescription("");
      setPrice("");
      setStockQuantity("");
      setCategory("");
      setImageUrl("");

      // Aguardar 2 segundos antes de voltar
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Erro geral:", error);
      showError("Erro ao tentar cadastrar produto");
    } finally {
      setLoading(false);
    }
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
              Produto cadastrado com sucesso!
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

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
              <FontAwesome5 name="box" size={40} color="#8A2BE2" />
              <Text style={styles.title}>Cadastro de Produto</Text>
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
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#8A2BE2"
                  mode="dropdown"
                >
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

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegisterProduct}
              disabled={loading}
            >
              <LinearGradient
                colors={["#8A2BE2", "#9400D3"]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.registerButtonText}>
                  {loading ? "CADASTRANDO..." : "CADASTRAR PRODUTO"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    letterSpacing: 1,
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
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  registerButton: {
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
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
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(138, 43, 226, 0.3)",
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    color: "#666",
    backgroundColor: "transparent",
    marginLeft: Platform.OS === "ios" ? 0 : -10,
    height: Platform.OS === "ios" ? 150 : 50,
    fontSize: 16,
  },
});
