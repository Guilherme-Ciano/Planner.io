import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../Utils/GlobalStyles";

const { BoldText, NormalText, Neumorphism } = GlobalStyles;

export const modalStyles = StyleSheet.create({
  ModalContainer: {
    width: 400,

    display: "flex",

    borderRadius: 20,
    backgroundColor: "#FFFFFF",

    borderColor: "#FEFEFE",
    borderWidth: 3,

    gap: 20,

    padding: 8,
  },

  DividerContainer: {
    width: "100%",

    borderBottomWidth: 2,
    borderBottomColor: "#F1F1F1",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginTop: 10,
    marginBottom: 4,
  },

  DividerText: {
    ...BoldText,
  },

  Text: {
    ...NormalText,
  },

  InputContainer: {
    width: "100%",

    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  Searchbar: {
    width: "100%",
    height: 50,

    borderRadius: 8,
    backgroundColor: "white",

    paddingLeft: 10,
    paddingTop: 2,

    fontFamily: "Poppins_400Regular",

    ...Neumorphism,
  },

  SaveBtn: {
    display: "flex",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },

  SaveBtnText: {
    color: "#9AFF8A",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700",
  },
});
