import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_UPDATE_DRIVER_STATUS } from "../../config/WebService";

import {
  success as successDriverOnlineStatus,
  failure as failureDriverOnlineStatus
} from "../../actions/SocketActions/DriverOnlineStatus";

import { success as successDriverProfile } from "../../actions/DriverProfile";

import { getUser } from "../../reducers/selectors";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";
import { request as requestTodayDriverEarning } from "../../actions/SocketActions/TodayDriverEarning";

function* requestEmitDriverOnlineStatus() {
  while (true) {
    const { payload } = yield take(types.DRIVER_ONLINE_STATUS.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_UPDATE_DRIVER_STATUS,
      payload
    );
  }
}
function channelDriverOnlineStatus() {
  return eventChannel(emitter => {
    const success = response => {
      console.log("from saga", response);
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_UPDATE_DRIVER_STATUS,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverOnlineStatus() {
  const socketChannel = yield call(channelDriverOnlineStatus);
  while (true) {
    try {
      let response = yield take(socketChannel);
      console.log("successDriverOnlineStatus response  : ", response);
      const { data } = yield select(getUser);
      const socket_status = response.status ? 1 : 0;

      yield put(successDriverProfile({ ...data, socket_status }));

      yield put(successDriverOnlineStatus(response));
      // yield put(requestTodayDriverEarning());
    } catch (err) {
      yield put(failureDriverOnlineStatus(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverOnlineStatus);
  yield fork(requestEmitDriverOnlineStatus);
}
