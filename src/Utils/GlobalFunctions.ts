import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMembership } from "./GlobalModels";

// Para salvar dados
export const salvarDadosMembership = async (lista: IMembership[]) => {
  try {
    const arrayString = JSON.stringify(lista);
    await AsyncStorage.setItem("membershipList", arrayString);
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
  }
};

export const recuperarArrayMembership = async () => {
  try {
    const arrayString = await AsyncStorage.getItem("membershipList");

    if (arrayString) {
      const array = JSON.parse(arrayString);
      return array;
    }

    return [];
  } catch (error) {
    console.error("Erro ao recuperar array:", error);
  }
};

// Para recuperar dados
export const recuperarDados = async () => {
  try {
    const valor = await AsyncStorage.getItem("chave");
    console.log("Valor recuperado:", valor);
  } catch (error) {
    console.error("Erro ao recuperar dados:", error);
  }
};

const getDayAndMonth = (): { day: number; month: string } => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = monthNames[currentDate.getMonth()];

  return { day, month };
};

export const DataAtual = getDayAndMonth();

export const generateUid = (): string => {
  // Generates a random 4-character segment
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  // Concatenates four random segments separated by hyphens
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};
