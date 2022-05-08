// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../../theme";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center"
  },
  container: {
    backgroundColor: Colors.transparent,
    height: 456,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    width: "84%",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  headerImage: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: "15%"
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    borderTopWidth: 2,
    width: "100%",
    borderColor: Colors.background.grey
  }
});
