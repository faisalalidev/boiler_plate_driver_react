import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_CANCEL_RIDE } from "../../config/WebService";
import {
  success as successDriverCancelRide,
  failure as failureDriverCancelRide
} from "../../actions/SocketActions/DriverCancelRide";

import { resetGetDrive } from "../../actions/SocketActions/GetDrive";
import { driverRideReducerReset } from "../../actions/SocketActions/DriverAcceptRide";
import { shortestPathReset } from "../../actions/GoogleApiActions/ShortestPathAction";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import { NavigationActions } from "react-navigation";

function* requestEmitDriverCancelRide() {
  while (true) {
    const { payload, callBack } = yield take(types.DRIVER_CANCEL_RIDE.REQUEST);

    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(
      SocketIO.getInstance().requestEmit,
      API_DRIVER_CANCEL_RIDE,
      payload
    );
  }
}
function channelDriverCancelRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_CANCEL_RIDE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverCancelRide() {
  const socketChannel = yield call(channelDriverCancelRide);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(successDriverCancelRide(response));

      // all reducer to get there initial state
      yield put(resetGetDrive());
      yield put(shortestPathReset());
      yield put(driverRideReducerReset());
      if (callbackRefrence) callbackRefrence(response);
    } catch (err) {
      yield put(failureDriverCancelRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverCancelRide);
  yield fork(requestEmitDriverCancelRide);
}
