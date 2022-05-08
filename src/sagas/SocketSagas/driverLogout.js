import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_LOGOUT } from "../../config/WebService";

import {
  success as successDriverLogout,
  failure as failureDriverLogout
} from "../../actions/SocketActions/DriverLogout";

import { logout } from "../../actions/Login";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRefrence;
function* requestEmitDriverLogout() {
  while (true) {
    const { payload, callBack } = yield take(types.DRIVER_LOGOUT.REQUEST);
    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(SocketIO.getInstance().requestEmit, API_DRIVER_LOGOUT, payload);
  }
}
function channelDriverLogout() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_LOGOUT, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverLogout() {
  const socketChannel = yield call(channelDriverLogout);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(successDriverLogout({ response }));
      yield put(logout());
      // this.props.logout();
      if (callbackRefrence) callbackRefrence(response);
    } catch (err) {
      yield put(failureDriverLogout(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverLogout);
  yield fork(requestEmitDriverLogout);
}
