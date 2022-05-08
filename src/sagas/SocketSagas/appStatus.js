import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_APP_STATUS, home_page } from "../../config/WebService";
import { success, failure } from "../../actions/SocketActions/AppStateActions";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

import { resetGetDrive } from "../../actions/SocketActions/GetDrive";
import { driverRideReducerReset } from "../../actions/SocketActions/DriverAcceptRide";
import { resetDriverStartRide } from "../../actions/SocketActions/DriverStartRide";

// Google Actions
import { shortestPathReset } from "../../actions/GoogleApiActions/ShortestPathAction";

function channelAppStatus() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("from saga", error);
    };
    SocketIO.getInstance().requestOn(API_APP_STATUS, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchAppStatus() {
  const socketChannel = yield call(channelAppStatus);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(success(response));
      const userAppStatus = response.user_app_status;
      console.log("userAppStatus ******* : ", userAppStatus);
      if (userAppStatus == home_page) {
        yield put(resetGetDrive());
        yield put(driverRideReducerReset());
        yield put(resetDriverStartRide());
        yield put(shortestPathReset());
      }
      // else if (userAppStatus == ride_accepted) {
      //   yield put(resetGetDrive());
      //   yield put(driverRideReducerReset());
      //   yield put(resetDriverStartRide());
      //   yield put(shortestPathReset());
      // }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchAppStatus);
}
