import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import {
  DataAtual,
  recuperarArrayMembership,
  salvarDadosMembership,
} from "../../Utils/GlobalFunctions";
import { useEffect, useState } from "react";
import AddMembership from "../../Components/Modal";
import { IMembership } from "../../Utils/GlobalModels";
import { Icon } from "react-native-elements";

export default function Homepage() {
  const [isVisible, SetIsVisisble] = useState(false);
  const [membershipList, SetMembershipList] = useState<IMembership[]>([]);
  const [membershipToEdit, SetMembershipToEdit] = useState<
    IMembership | undefined
  >();
  const [searchText, setSearchText] = useState<string>("");

  const createNewMembership = (data: IMembership) => {
    const newMembership = {
      id: "",
      ...data,
    };

    SetMembershipList([...membershipList, newMembership]);
  };

  const getAllExpenses = () => {
    let total: number = 0;

    membershipList.map((item) => {
      total = total + parseFloat(parseFloat(item.membershipValue).toFixed(2));
    });

    return total.toFixed(2);
  };

  const getNextPayment = () => {
    const total = membershipList
      .sort((a, b) => a.membershipPayday - b.membershipPayday)
      .find((item: IMembership) =>
        item.membershipPayday >= DataAtual.day ? item : undefined
      );

    return total ? parseFloat(total.membershipValue).toFixed(2) : "0.00";
  };

  const getAllFuturePayments = () => {
    let total: number = 0;

    membershipList
      .sort((a, b) => a.membershipPayday - b.membershipPayday)
      .map((item: IMembership) => {
        if (item.membershipPayday >= DataAtual.day) {
          total =
            total + parseFloat(parseFloat(item.membershipValue).toFixed(2));
        }
      });

    return total.toFixed(2);
  };

  const ordenarPorPayday = (membershipVariableList: IMembership[]) => {
    return membershipVariableList.sort(
      (a, b) => a.membershipPayday - b.membershipPayday
    );
  };

  const renderMembershipCard = () => {
    let filteredMemberships = membershipList;

    if (searchText.trim() !== "") {
      filteredMemberships = membershipList.filter((item) =>
        item.membershipCompany.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filteredMemberships.length !== 0) {
      return (
        <>
          {ordenarPorPayday(filteredMemberships).map((item) => (
            <View
              style={styles.MembershipCard}
              key={`${item.membershipCompany}-${item.membershipPayday}`}
            >
              <Text style={styles.Deadline}>{item.membershipPayday}</Text>

              <View style={styles.MembershipInfo}>
                <Text style={styles.MembershipCompany}>
                  {item.membershipCompany}
                </Text>
                <Text style={styles.MembershipValue}>
                  Assinatura no valor de: R$ {item.membershipValue}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  SetMembershipToEdit(item);
                  SetIsVisisble(true);
                }}
              >
                <Text>✏️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      );
    }

    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          height: 100,
        }}
      >
        <Text>Você ainda não possui assinaturas cadastradas...</Text>
      </View>
    );
  };

  const redeemFromMemory = async () => {
    const array = await recuperarArrayMembership();
    SetMembershipList(array as IMembership[]);
  };

  useEffect(() => {
    redeemFromMemory();
  }, []);

  useEffect(() => {
    salvarDadosMembership(membershipList);
  }, [membershipList, isVisible]);

  const clearSearch = () => setSearchText("");
  const search = () => {};

  useEffect(() => {}, [searchText]);

  return (
    <ScrollView contentContainerStyle={styles.HomeContainer}>
      <View style={styles.DateContainer}>
        <Text style={styles.DateNumber}>{DataAtual.day}</Text>
        <Text style={styles.DateMonth}>{DataAtual.month}</Text>
      </View>
      <View style={styles.Info}>
        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>Total gasto</Text>
          <Text style={styles.InfoSubtext}>R${getAllExpenses()}</Text>
        </View>

        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>Próximo</Text>
          <Text style={styles.InfoSubtext}>R${getNextPayment()}</Text>
        </View>

        <View style={styles.InfoBox}>
          <Text style={styles.InfoText}>A pagar</Text>
          <Text style={styles.InfoSubtext}>R${getAllFuturePayments()}</Text>
        </View>
      </View>
      <View style={styles.SearchbarContainer}>
        <TextInput
          style={styles.Searchbar}
          placeholder="Pesquisar assinatura..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText ?? ""}
        />

        <TouchableOpacity
          style={styles.SearchbarBnt}
          onPress={() => (searchText === "" ? search() : clearSearch())}
        >
          <Text>{searchText === "" ? "🔎" : "💣"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.DividerContainer}>
        <Text style={styles.DividerText}>Assinaturas</Text>

        <TouchableOpacity onPress={() => SetIsVisisble(true)}>
          <Icon name="add" type="material" />
        </TouchableOpacity>
      </View>

      {renderMembershipCard()}

      <AddMembership
        isVisible={isVisible}
        SetIsVisible={SetIsVisisble}
        saveFunction={createNewMembership}
        membershipList={membershipList}
        SetMembershipList={SetMembershipList}
        SetMembershipToEdit={SetMembershipToEdit}
        membershipToEdit={membershipToEdit}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}
