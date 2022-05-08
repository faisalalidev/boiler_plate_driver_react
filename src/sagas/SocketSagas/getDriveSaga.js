import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_GET_DRIVE } from "../../config/WebService";

import {
  success as successGetDrive,
  failure as failureGetDrive
} from "../../actions/SocketActions/GetDrive";

import { driverRideStatus } from "../../actions/SocketActions/DriverAcceptRide";
import { getPassengerCancelStatus } from "../../actions/SocketActions/PassengerCancelRide";

import { getUser } from "../../reducers/selectors";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

function* requestEmitGetDrive() {
  while (true) {
    const { payload } = yield take(types.GET_DRIVE.REQUEST);
    yield call(SocketIO.getInstance().requestEmit, API_GET_DRIVE, payload);
  }
}

function channelGetDrive() {
  console.log("channelGetDrive from saga");
  return eventChannel(emitter => {
    console.log("channelGetDrive from saga 1", emitter);
    const success = response => {
      console.log("channelGetDrive from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
      console.log("channelGetDrive failure", response);
    };
    SocketIO.getInstance().requestOn(API_GET_DRIVE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchGetDrive() {
  const socketChannel = yield call(channelGetDrive);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successGetDrive(response));
      yield put(driverRideStatus(false)); // use to reset so again RideAcceptCard can come
      yield put(getPassengerCancelStatus(false));

      // getPassengerCancelStatus make it false
    } catch (err) {
      yield put(failureGetDrive(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchGetDrive);
  //   yield fork(channelGetDrive);

  // yield fork(requestEmitGetDrive);
}
