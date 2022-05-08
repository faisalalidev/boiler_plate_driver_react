// @flow
import { StyleSheet, PixelRatio } from "react-native";
import { Metrics, Colors } from "../../../theme";

export default StyleSheet.create({
  appButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginBottom: Metrics.baseMargin,
    bottom: 0,
    left: 0,
    right: 0
  },
  rideDetailContainer: {
    width: Metrics.screenWidth - 35,
    // bottom: 36,
    backgroundColor: Colors.transparent,
    // backgroundColor: "red",
    borderRadius: 5,
    shadowColor: "rgba(201, 201, 201, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 9,
    shadowOpacity: 1,
    padding: 10,
    // backgroundColor: "yellow",
    justifyContent: "center",
    height: 331
    // height: "80%"
  },

  distanceTime: {
    height: 52,
    alignItems: "center",
    alignSelf: "center",
    width: "90%"
  },

  separator: {
    // width: "90%",
    width: 291.1,
    backgroundColor: Colors.background.grey
  },
  // Confirm Ride Card

  // Accept Ride Card
  acceptRideImageSize: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: "#E9E9E9",
    marginTop: 19
  },
  acceptRideDetailContainer: {
    width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    height: 217,
    bottom: 5,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "rgba(201, 201, 201, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 9,
    shadowOpacity: 1
  },
  acceptSubContainer: {
    width: 300,
    height: 155,
    flexDirection: "row"
  },
  proContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  acceptDistanceTime: {
    width: 300,
    height: 62,
    alignItems: "center",
    alignSelf: "center"
  }
});
