import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_START_RIDE } from "../../config/WebService";
import {
  success as successDriverStartRide,
  failure as failureDriverStartRide
} from "../../actions/SocketActions/DriverStartRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRefrence;
function* requestEmitDriverStartRide() {
  while (true) {
    const { payload, callBack } = yield take(types.DRIVER_START_RIDE.REQUEST);

    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(SocketIO.getInstance().requestEmit, API_START_RIDE, payload);
  }
}
function channelDriverStartRide() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("channelDriverStartRide response  : ", response);
      emitter(response);
    };
    const failure = error => {
      console.log("channelDriverStartRide failure  : ", error);
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_START_RIDE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverStartRide() {
  const socketChannel = yield call(channelDriverStartRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successDriverStartRide(response));

      if (callbackRefrence) callbackRefrence(response);
    } catch (err) {
      yield put(failureDriverStartRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverStartRide);
  yield fork(requestEmitDriverStartRide);
}
