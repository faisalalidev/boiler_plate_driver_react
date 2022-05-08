import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_REJECT_DRIVE } from "../../config/WebService";
import {
  success as successDriverRejectRide,
  failure as failureDriverRejectRide
} from "../../actions/SocketActions/DriverRejectRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRefrence;
function* requestEmitDriverRejectRide() {
  while (true) {
    const { payload, callBack } = yield take(types.DRIVER_REJECT_RIDE.REQUEST);

    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(
      SocketIO.getInstance().requestEmit,
      API_DRIVER_REJECT_DRIVE,
      payload
    );
  }
}
function channelDriverRejectRide() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("channelDriverRejectRide response  : ", response);
      emitter(response);
    };
    const failure = error => {
      console.log("channelDriverRejectRide failure  : ", error);
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_REJECT_DRIVE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverRejectRide() {
  const socketChannel = yield call(channelDriverRejectRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverRejectRide(response));

      if (callbackRefrence) callbackRefrence(response);
    } catch (err) {
      yield put(failureDriverRejectRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverRejectRide);
  yield fork(requestEmitDriverRejectRide);
}
