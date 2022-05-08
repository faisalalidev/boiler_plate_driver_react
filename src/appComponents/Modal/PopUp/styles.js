// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../../theme";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center"
  },

  buttonContainer: {
    borderTopWidth: 1,
    height: 70,
    borderRadius: 5,
    borderColor: Colors.modalBoder,
    backgroundColor: Colors.background.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    height: 223,
    justifyContent: "center",
    alignItems: "center"
  }
});
