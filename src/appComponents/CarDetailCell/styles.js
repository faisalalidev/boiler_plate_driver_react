// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    justifyContent: "center",
    paddingVertical: 24
  },
  acceptRideImageSize: {
    width: 58,
    height: 58,
    marginRight: 25,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: Colors.background.grey
  }
});
