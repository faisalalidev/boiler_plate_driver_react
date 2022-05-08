// @flow
import { StyleSheet, Platform } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    marginLeft: Metrics.baseMargin,
    marginTop: Platform.OS === "ios" ? 25 : Metrics.smallMargin,
    flexDirection: "row"
  }
});
