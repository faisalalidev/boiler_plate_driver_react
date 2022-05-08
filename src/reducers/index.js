import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import { routeConfig } from "../navigator";
const navReducer = createNavigationReducer(routeConfig);

import networkInfo from "./networkInfo";
import user from "./user";
import SignUpReducer from "../containers/Signup/SignUpReducer";
import userLocation from "./userLocation";
import notification from "./notification";
import myTrips from "./myTrips";
import tripDetails from "./tripDetails";
import myEarnings from "./myEarnings";
import ForgotPasswordReducer from "../containers/Forgot_password/ForgotPasswordReducer";
import faq from "./faq";

// Socket Reducer
import SocketConnetion from "./SocketReducers/SocketConnetion";
import driverUpdateLocation from "./SocketReducers/driverUpdateLocation";
import driverOnlineStatus from "./SocketReducers/driverOnlineStatus";
import getDrive from "./SocketReducers/getDrive";
import driverRideReducer from "./SocketReducers/driverRideReducer";
import driverStartRide from "./SocketReducers/driverStartRide";
import passengerCancelRide from "./SocketReducers/passengerCancelRide";
import inRideStatus from "./SocketReducers/inRideStatus";
import todayDriverEarning from "./SocketReducers/todayDriverEarning";

// Google Api Reducer
import shortestPathReducer from "./GoogleApiReducers/shortestPathReducer";
import distanceMatrix from "./GoogleApiReducers/distanceMatrix";

export default combineReducers({
  nav: navReducer,
  user,
  networkInfo,
  SignUpReducer,
  userLocation,
  ForgotPasswordReducer,
  // Socket Reducer
  SocketConnetion,
  driverUpdateLocation,
  driverOnlineStatus,
  driverRideReducer,
  getDrive,
  driverStartRide,
  notification,
  myTrips,
  tripDetails,
  myEarnings,
  shortestPathReducer,
  distanceMatrix,
  passengerCancelRide,
  inRideStatus,
  todayDriverEarning,
  faq
});
