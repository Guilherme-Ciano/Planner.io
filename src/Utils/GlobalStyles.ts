import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  Neumorphism: {
    shadowColor: "rgba(0, 0, 0, 0.3)", // Cor da sombra alterada
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5, // Opacidade reduzida
    shadowRadius: 10, // Raio da sombra alterado
    elevation: 5,
  },
});