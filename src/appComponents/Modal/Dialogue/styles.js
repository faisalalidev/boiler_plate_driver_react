// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../../theme";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center"
  },
  body: {
    padding: Metrics.ratio(24),
    margin: Metrics.ratio(32),
    borderRadius: Metrics.ratio(8),
    backgroundColor: Colors.background.primary,
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    height: Metrics.ratio(50),
    borderTopColor: Colors.modalBoder,
    borderTopWidth: 1,
    // borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.background.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: Colors.background.primary,
    width: Metrics.ratio(350),
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Metrics.baseMargin,
    borderRadius: 5,
    overflow: "hidden"
  },
  button: {
    // flex: 1,
    // height: Metrics.ratio(50),
    // justifyContent: "center",
    // borderRadius: Metrics.borderRadius,
    // backgroundColor: Colors.quaternary,
    // marginRight: Metrics.smallMargin
  },
  descriptionStyle: {
    marginBottom: Metrics.ratio(24),
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  buttonCancel: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    height: Metrics.ratio(50),
    borderColor: Colors.black,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.transparent,
    marginRight: Metrics.smallMargin
  },
  closeView: {
    position: "absolute",
    right: Metrics.smallMargin,
    top: Metrics.smallMargin
  },
  close: {
    width: Metrics.images.small,
    height: Metrics.images.small,
    position: "absolute",
    right: Metrics.smallMargin / 2,
    top: Metrics.smallMargin / 2
  }
});
