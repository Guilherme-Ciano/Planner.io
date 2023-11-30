import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../Utils/GlobalStyles";

const { Neumorphism } = GlobalStyles;

export const styles = StyleSheet.create({
  HomeContainer: {
    display: "flex",

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",

    gap: 16,
  },

  DateContainer: {
    width: 247,
    height: 240,

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "flex-end",

    padding: 0,
    marginTop: 40,

    borderRadius: 20,
    backgroundColor: "#FFF",

    position: "relative",

    ...Neumorphism,
  },

  DateNumber: {
    display: "flex",

    alignItems: "flex-start",
    justifyContent: "flex-start",

    margin: 0,
    padding: 0,

    color: "#2E2E2E",
    fontFamily: "RobotoMono_400Regular",
    fontSize: 178,
    fontWeight: "700",
    textAlign: "center",

    top: -40,

    position: "absolute",
  },

  DateMonth: {
    margin: 0,
    paddingBottom: 5,

    color: "#2E2E2E",
    textAlign: "center",
    fontFamily: "Poppins_300Light",
    fontSize: 36,

    lineHeight: 42,
  },

  Info: {
    display: "flex",
    flexDirection: "row",
  },

  InfoBox: {
    width: 103,
    height: 57,

    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignContent: "center",

    borderRadius: 8,
    backgroundColor: "#FFF",
    margin: 10,

    ...Neumorphism,
  },

  InfoText: {
    margin: 0,
    padding: 0,

    color: "#2E2E2E",
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    fontWeight: "700",

    textAlign: "center",
  },

  InfoSubtext: {
    margin: 0,
    padding: 0,

    color: "#2E2E2E",
    fontFamily: "Poppins_200ExtraLight",
    fontSize: 14,

    textAlign: "center",
  },

  SearchbarContainer: {
    display: "flex",
    flexDirection: "row",

    gap: 8,
  },

  Searchbar: {
    width: 300,
    height: 50,

    borderRadius: 8,
    backgroundColor: "white",

    paddingLeft: 10,
    paddingTop: 2,

    fontFamily: "Poppins_400Regular",

    ...Neumorphism,
  },

  SearchbarBnt: {
    height: 50,
    width: 50,

    display: "flex",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,
    backgroundColor: "white",

    ...Neumorphism,
  },
});
