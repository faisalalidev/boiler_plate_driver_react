// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.grey,
    borderRadius: Metrics.borderRadius,
    width: Metrics.screenWidth,
    height: 403,
    alignItems: "center",
    alignSelf: "center",
    // paddingVertical: Metrics.baseMargin,

    position: "absolute",
    bottom: 0
  }
});
