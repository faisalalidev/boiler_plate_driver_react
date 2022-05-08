// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
    // alignItems: "center"
    // justifyContent: "center",
  },
  appButtonContainer: {
    // flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    marginBottom: Metrics.xDoubleBaseMargin,
    height: 150,
    bottom: 0,
    left: 0,
    right: 0
  },
  rideDetailContainer: {
    width: Metrics.screenWidth - 35,
    bottom: 23,
    // backgroundColor: Colors.transparent,
    backgroundColor: Colors.red,
    borderRadius: 5,
    shadowColor: "rgba(201, 201, 201, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 9,
    shadowOpacity: 1,
    justifyContent: "space-between",
    height: 330
  },
  rideDetailSubCon: {
    backgroundColor: Colors.white,
    width: "100%",
    alignItems: "center",
    height: 211
  },
  proMainContainer: {
    height: 52,
    width: "100%"
  },
  proSubContainer: {
    position: "absolute",
    bottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0
  },
  confirmRideImageSize: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: Colors.background.grey
  },
  carDetails: {
    height: 52,
    width: "90%"
  },
  driverAddress: {
    height: 52,
    width: "90%"
  },
  distanceTime: {
    height: 52,
    alignItems: "center",
    alignSelf: "center",
    width: "90%"
  },
  helpBtnCon: {
    width: "100%",
    height: 52,
    marginBottom: 24
  },
  appBtn: {
    backgroundColor: Colors.appbutton.danger,
    height: 52,
    marginTop: 10,
    width: "100%"
  },
  separator: {
    width: "90%",
    backgroundColor: Colors.background.grey
  },
  // Confirm Ride Card

  // Accept Ride Card
  acceptRideImageSize: {
    width: 82,
    height: 82,
    borderRadius: 41
  },
  acceptRideDetailContainer: {
    width: Metrics.screenWidth - 35,
    height: 218,
    bottom: 112,
    backgroundColor: Colors.white,
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
    height: 155.1,
    flexDirection: "row"
  },
  proContainer: {
    marginRight: 20
  },
  acceptDistanceTime: {
    width: 300,
    height: 62,
    alignItems: "center",
    alignSelf: "center"
  }
  // Accept Ride Card

  // Complete Ride

  // Complete Ride
});
