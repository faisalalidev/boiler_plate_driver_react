import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_UPDATE_USER_LOCATION_DRIVER } from "../../config/WebService";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import {
  success as successDriverUpdateLocation,
  failure as failureDriverUpdateLocation
} from "../../actions/SocketActions/DriverUpdateLocation";
import Utils from "../../util";

function* requestEmitDriverUpdateLocation() {
  while (true) {
    const { payload } = yield take(types.DRIVER_UPDATE_LOCATION.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_UPDATE_USER_LOCATION_DRIVER,
      payload
    );
  }
}

function channelDriverUpdateLocation() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_UPDATE_USER_LOCATION_DRIVER,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverUpdateLocation() {
  const socketChannel = yield call(channelDriverUpdateLocation);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverUpdateLocation(response));
    } catch (err) {
      yield put(failureDriverUpdateLocation(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverUpdateLocation);
  yield fork(requestEmitDriverUpdateLocation);
}
