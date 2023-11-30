import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { DataAtual } from "../../Utils/GlobalFunctions";

export default function Homepage() {
  return (
    <View style={styles.HomeContainer}>
      <View style={styles.DateContainer}>
        <Text style={styles.DateNumber}>{DataAtual.day}</Text>
        <Text style={styles.DateMonth}>{DataAtual.month}</Text>
      </View>

      <View style={styles.Info}>
        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>Total gasto</Text>
          <Text style={styles.InfoSubtext}>R$450,35</Text>
        </View>

        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>Próximo</Text>
          <Text style={styles.InfoSubtext}>R$120,65</Text>
        </View>

        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>A pagar</Text>
          <Text style={styles.InfoSubtext}>R$120,40</Text>
        </View>
      </View>

      <View style={styles.SearchbarContainer}>
        <TextInput
          style={styles.Searchbar}
          placeholder="Pesquisar assinatura..."
        />

        <TouchableOpacity style={styles.SearchbarBnt} onPress={() => {}}>
          <Text>🔎</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
