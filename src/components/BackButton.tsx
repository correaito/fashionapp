import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type BackButtonProps = {
  targetScreen?: string;
};

export function BackButton({ targetScreen }: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (targetScreen) {
      navigation.navigate(targetScreen);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.backButton} onPress={handlePress}>
      <FontAwesome5 name="arrow-left" size={24} color="#8A2BE2" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
});
