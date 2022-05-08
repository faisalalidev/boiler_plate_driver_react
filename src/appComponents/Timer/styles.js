// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    height: 64,
    width: Metrics.screenWidth,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 0
  },
  subContainer: {
    height: 64,
    width: Metrics.screenWidth,
    backgroundColor: Colors.background.Valencia,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Metrics.icons.small
  }
});
