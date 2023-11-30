import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homepage from "./src/Pages/Home";

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_200ExtraLight,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_200ExtraLight,
    RobotoMono_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Homepage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
