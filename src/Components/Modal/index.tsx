import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { modalStyles } from "./styles";
import { Icon } from "react-native-elements";
import { Pressable } from "react-native";
import { IMembership } from "../../Utils/GlobalModels";
import RNPickerSelect from "react-native-picker-select";
import ModalSelector from "react-native-modal-selector";

export interface AddMembershipProps {
  isVisible: boolean;
  SetIsVisible: Dispatch<SetStateAction<boolean>>;
  saveFunction: (data: IMembership) => void;
}

export default function AddMembership({
  isVisible,
  SetIsVisible,
  saveFunction,
}: AddMembershipProps) {
  const dayOptions = Array.from({ length: 31 }, (_, index) => ({
    key: index + 1,
    label: `${index + 1}`,
  }));

  const [serviceName, setServiceName] = useState("");
  const [subscriptionValue, setSubscriptionValue] = useState<string>("");
  const [paymentDay, setPaymentDay] = useState<number>(0);

  const resetStates = () => {
    setServiceName("");
    setSubscriptionValue("");
    setPaymentDay(1);
  };

  const handleSave = () => {
    const data: IMembership = {
      membershipCompany: serviceName,
      membershipPayday: paymentDay,
      membershipValue: subscriptionValue,
    };

    saveFunction(data);
    SetIsVisible(false);
    resetStates();
  };

  return (
    <Modal
      visible={isVisible}
      style={{
        height: 100,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      transparent
      animationType="fade"
    >
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0.5,0.5,0.5, 0.5)",
          marginTop: 22,
        }}
      >
        <View style={modalStyles.ModalContainer}>
          <View style={modalStyles.DividerContainer}>
            <Text style={modalStyles.DividerText}>Nova Assinatura</Text>
            <TouchableOpacity
              onPress={() => {
                SetIsVisible(false);
                resetStates();
              }}
            >
              <Icon name="close" type="material" />
            </TouchableOpacity>
          </View>

          <View style={modalStyles.InputContainer}>
            <Text style={modalStyles.Text}>Nome do serviço</Text>
            <TextInput
              style={modalStyles.Searchbar}
              placeholder="Netflix, Amazon Prime, HBO"
              onChangeText={(text) => setServiceName(text)}
              //   value={serviceName}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              width: "95%",
            }}
          >
            <View style={{ ...modalStyles.InputContainer, width: "50%" }}>
              <Text style={modalStyles.Text}>Valor da assinatura</Text>
              <TextInput
                style={modalStyles.Searchbar}
                placeholder="R$ 50,00"
                inputMode="numeric"
                onChangeText={(text) => {
                  // Remova caracteres não numéricos, exceto o ponto
                  const cleanedText = text.replace(/[^0-9.]/g, "");
                  // Certifique-se de que o ponto apareça no máximo uma vez
                  const formattedText = cleanedText.replace(/(\..*)\./g, "$1");
                  setSubscriptionValue(parseFloat(formattedText).toFixed(2));
                }}
              />
            </View>

            <View style={{ ...modalStyles.InputContainer, width: "50%" }}>
              <Text style={modalStyles.Text}>Dia do pagamento</Text>
              <ModalSelector
                style={{
                  width: "100%",
                }}
                data={dayOptions}
                initValue="Selecione o dia"
                accessible={true}
                scrollViewAccessibilityLabel={"Scrollable options"}
                cancelButtonAccessibilityLabel={"Cancelar"}
                onChange={(option) => setPaymentDay(parseInt(option.label))}
              >
                <TextInput
                  style={modalStyles.Searchbar}
                  placeholder="Selecione o dia"
                  value={paymentDay.toString()}
                />
              </ModalSelector>
            </View>
          </View>

          <Pressable style={[modalStyles.SaveBtn]} onPress={handleSave}>
            <Text style={modalStyles.SaveBtnText}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
