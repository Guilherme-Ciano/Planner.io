import React, { useEffect, useState, memo } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Pressable } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { generateUid } from "../../Utils/GlobalFunctions";
import { IMembership } from "../../Utils/GlobalModels";
import { modalStyles } from "./styles";

export interface AddMembershipProps {
  isVisible: boolean;
  SetIsVisible: (isVisible: boolean) => void;
  saveFunction: (data: IMembership) => void;
  SetMembershipToEdit: (membership: IMembership | undefined) => void;
  membershipToEdit?: IMembership;
  membershipList: IMembership[];
  SetMembershipList: (membershipList: IMembership[]) => void;
}

const dayOptions = Array.from({ length: 31 }, (_, index) => ({
  key: index + 1,
  label: `${index + 1}`,
}));

const AddMembership = memo(
  ({
    SetIsVisible,
    saveFunction,
    SetMembershipList,
    SetMembershipToEdit,
    isVisible,
    membershipList,
    membershipToEdit = undefined,
  }: AddMembershipProps) => {
    const [serviceName, setServiceName] = useState("");
    const [subscriptionValue, setSubscriptionValue] = useState<string>("");
    const [paymentDay, setPaymentDay] = useState<number>(1);

    useEffect(() => {
      if (membershipToEdit) {
        setPaymentDay(membershipToEdit.membershipPayday);
        setServiceName(membershipToEdit.membershipCompany);
        setSubscriptionValue(membershipToEdit.membershipValue);
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
      const newArray = [...array];
      const indice = newArray.findIndex((obj) => obj.id === novoObjeto.id);

      if (indice !== -1) {
        newArray.splice(indice, 1, novoObjeto);
      } else {
        newArray.push(novoObjeto);
      }

      return newArray;
    };

    const deleteById = (
      array: IMembership[],
      novoObjeto: IMembership
    ): IMembership[] => {
      const newArray = [...array];
      const indice = newArray.findIndex((obj) => obj.id === novoObjeto.id);

      if (indice !== -1) {
        newArray.splice(indice, 1);
      }

      resetStates();
      SetIsVisible(false);

      return newArray;
    };

    const handleSave = () => {
      const data: IMembership = {
        id: membershipToEdit?.id || generateUid(),
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
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={modalStyles.overlay}>
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

            <View style={modalStyles.BottomInputs}>
              <View
                style={(modalStyles.InputContainer, modalStyles.InputReduced)}
              >
                <Text style={modalStyles.Text}>Valor da assinatura</Text>
                <TextInput
                  style={modalStyles.Searchbar}
                  placeholder="R$ 50,00"
                  inputMode="numeric"
                  defaultValue={membershipToEdit ? subscriptionValue : ""}
                  onChangeText={(text) => {
                    const cleanedText = text.replace(/[^0-9.]/g, "");
                    const formattedText = cleanedText.replace(
                      /(\..*)\./g,
                      "$1"
                    );
                    setSubscriptionValue(parseFloat(formattedText).toFixed(2));
                  }}
                />
              </View>

              <View
                style={(modalStyles.InputContainer, modalStyles.InputReduced)}
              >
                <Text style={modalStyles.Text}>Dia do pagamento</Text>
                <ModalSelector
                  style={modalStyles.ModalSelector}
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
            <View style={modalStyles.ButtonsContainer}>
              {membershipToEdit && (
                <Pressable
                  style={modalStyles.DeleteBtn}
                  onPress={() => {
                    SetMembershipList(
                      deleteById(membershipList, membershipToEdit)
                    );
                  }}
                >
                  <Text style={modalStyles.DeleteBtnText}>Excluir</Text>
                </Pressable>
              )}

              <Pressable style={modalStyles.SaveBtn} onPress={handleSave}>
                <Text style={modalStyles.SaveBtnText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

export default AddMembership;
