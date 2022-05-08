import { fork } from "redux-saga/effects";

import init from "./init";
import login from "./login";

import state from "./state";
import city from "./city";
import signup from "./signup";
import ForgotPasswordSaga from "../containers/Forgot_password/ForgotPasswordSaga";
import driverProfile from "./driverProfile";
import driverProfileUpdate from "./driverProfileUpdate";
import changePassword from "./changePassword";

import notification from "./notification";
import myTrips from "./myTrips";
import tripDetails from "./tripDetails";
import tripByDate from "./tripByDate";
import myEarnings from "./myEarnings";
import faq from "./faq";
import uploadCompleteRideImage from "./uploadCompleteRideImage";

// Socket Saga
import socketConnectionSaga from "./SocketSagas/socketConnectionSaga";
import driverUpdateLocation from "./SocketSagas/driverUpdateLocation";
import updateLocationBackground from "./updateLocationBackground";
import driverOnlineStatus from "./SocketSagas/driverOnlineStatus";
import getDriveSaga from "./SocketSagas/getDriveSaga";
import driverAcceptRideSaga from "./SocketSagas/driverAcceptRideSaga";
import driverRejectRideSaga from "./SocketSagas/driverRejectRideSaga";
import driverStartRideSaga from "./SocketSagas/driverStartRideSaga";
import driverCancelRideSaga from "./SocketSagas/driverCancelRideSaga";
import passengerCancelRideSaga from "./SocketSagas/passengerCancelRideSaga";
import driverCompleteRide from "./SocketSagas/driverCompleteRide";
import driverLogout from "./SocketSagas/driverLogout";
import appStatus from "./SocketSagas/appStatus";
import todayDriverEarning from "./SocketSagas/todayDriverEarning";

// Google Api Saga
import shortestPathSaga from "./GoogleApiSaga/shortestPathSaga";
import distanceMatrix from "./GoogleApiSaga/distanceMatrix";

// Consider using takeEvery
export default function* root() {
  yield fork(init);
  yield fork(login);
  yield fork(state);
  yield fork(city);
  yield fork(signup);
  yield fork(ForgotPasswordSaga);
  yield fork(driverProfile);
  yield fork(driverProfileUpdate);
  yield fork(changePassword);
  yield fork(notification);
  yield fork(myTrips);
  yield fork(tripDetails);
  yield fork(tripByDate);
  yield fork(myEarnings);
  yield fork(faq);
  yield fork(uploadCompleteRideImage);

  // Socket Saga
  yield fork(socketConnectionSaga);

  yield fork(driverUpdateLocation);
  yield fork(updateLocationBackground);
  yield fork(driverOnlineStatus);
  yield fork(getDriveSaga);
  yield fork(driverAcceptRideSaga);
  yield fork(driverRejectRideSaga);
  yield fork(driverStartRideSaga);
  yield fork(driverCancelRideSaga);
  yield fork(driverCompleteRide);
  yield fork(passengerCancelRideSaga);
  yield fork(driverLogout);
  yield fork(appStatus);
  yield fork(todayDriverEarning);

  // Google API SAGA
  yield fork(shortestPathSaga);
  yield fork(distanceMatrix);
}
