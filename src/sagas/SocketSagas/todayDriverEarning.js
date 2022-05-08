import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_TODAY_DRIVER_EARNING } from "../../config/WebService";

import {
  success as successTodayDriverEarning,
  failure as failureTodayDriverEarning
} from "../../actions/SocketActions/TodayDriverEarning";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

function* requestEmitTodayDriverEarning() {
  while (true) {
    const { payload } = yield take(types.TODAY_DRIVER_EARNING.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_TODAY_DRIVER_EARNING,
      payload
    );
  }
}
function channelTodayDriverEarning() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_TODAY_DRIVER_EARNING,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchTodayDriverEarning() {
  const socketChannel = yield call(channelTodayDriverEarning);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(successTodayDriverEarning(response));
    } catch (err) {
      yield put(failureTodayDriverEarning(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchTodayDriverEarning);
  // yield fork(requestEmitTodayDriverEarning);
}
