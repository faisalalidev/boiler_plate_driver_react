// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center"
  },
  container: {
    backgroundColor: Colors.transparent,
    // height: 325,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    width: "84%",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 63,
    borderTopWidth: 2,
    width: "100%",
    borderColor: Colors.background.grey
  },
  Heading: {
    // height: 103,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingReview: {
    justifyContent: "center",
    alignItems: "center",
    // height: 38,
    width: 242
  }
});
