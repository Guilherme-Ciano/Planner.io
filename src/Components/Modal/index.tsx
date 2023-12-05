import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { modalStyles } from "./styles";
import { Icon } from "react-native-elements";
import { Pressable } from "react-native";
import { IMembership } from "../../Utils/GlobalModels";
import ModalSelector from "react-native-modal-selector";
import { generateUid } from "../../Utils/GlobalFunctions";

export interface AddMembershipProps {
  isVisible: boolean;
  SetIsVisible: Dispatch<SetStateAction<boolean>>;
  saveFunction: (data: IMembership) => void;
  SetMembershipToEdit: Dispatch<SetStateAction<IMembership | undefined>>;
  membershipToEdit: IMembership | undefined;
  membershipList: IMembership[];
  SetMembershipList: Dispatch<SetStateAction<IMembership[]>>;
}

const dayOptions = Array.from({ length: 31 }, (_, index) => ({
  key: index + 1,
  label: `${index + 1}`,
}));

export default function AddMembership({
  SetIsVisible,
  saveFunction,
  SetMembershipList,
  SetMembershipToEdit,
  isVisible,
  membershipList,
  membershipToEdit = undefined,
}: AddMembershipProps) {
  const [serviceName, setServiceName] = useState("");
  const [subscriptionValue, setSubscriptionValue] = useState<string>("");
  const [paymentDay, setPaymentDay] = useState<number>(0);

  useEffect(() => {
    if (membershipToEdit !== undefined) {
      setPaymentDay(membershipToEdit?.membershipPayday);
      setServiceName(membershipToEdit?.membershipCompany);
      setSubscriptionValue(membershipToEdit?.membershipValue);
    }
  }, [membershipToEdit]);

  const resetStates = () => {
    setServiceName("");
    setSubscriptionValue("");
    setPaymentDay(1);
    SetMembershipToEdit(undefined);
  };

  const substituirPorId = (
    array: IMembership[],
    novoObjeto: IMembership
  ): IMembership[] => {
    const indice = array.findIndex((obj) => obj.id === novoObjeto.id);

    if (indice !== -1) {
      array.splice(indice, 1, novoObjeto);
    } else {
      array.push(novoObjeto);
    }

    return array;
  };

  const deleteById = (
    array: IMembership[],
    novoObjeto: IMembership
  ): IMembership[] => {
    const indice = array.findIndex((obj) => obj.id === novoObjeto.id);

    if (indice !== -1) {
      array.splice(indice, 1);
    }

    resetStates();
    SetIsVisible(false);

    return array;
  };

  const handleSave = () => {
    const data: IMembership = {
      id: membershipToEdit?.id ? membershipToEdit.id : generateUid(),
      membershipCompany: serviceName,
      membershipPayday: paymentDay,
      membershipValue: subscriptionValue,
    };

    if (membershipToEdit) {
      SetMembershipList(substituirPorId(membershipList, data));
    } else {
      saveFunction(data);
    }

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
              defaultValue={membershipToEdit ? serviceName : ""}
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
                defaultValue={membershipToEdit ? subscriptionValue : ""}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9.]/g, "");
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

          <View
            style={{
              display: "flex",
              flexDirection: "row",

              width: "100%",
              justifyContent: membershipToEdit ? "space-between" : "center",
              gap: 8,
            }}
          >
            {membershipToEdit && (
              <Pressable
                style={[modalStyles.SaveBtn]}
                onPress={() => {
                  SetMembershipList(
                    deleteById(membershipList, membershipToEdit)
                  );
                }}
              >
                <Text style={modalStyles.DeleteBtnText}>Excluir</Text>
              </Pressable>
            )}

            <Pressable
              style={[
                modalStyles.SaveBtn,
                {
                  width: membershipToEdit ? "48%" : "100%",
                },
              ]}
              onPress={handleSave}
            >
              <Text style={modalStyles.SaveBtnText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
