import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_COMPLETE_RIDE } from "../../config/WebService";
import {
  success as successDriverCompleteRide,
  failure
} from "../../actions/SocketActions/DriverCompleteRide";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

import { resetGetDrive } from "../../actions/SocketActions/GetDrive";
import { driverRideReducerReset } from "../../actions/SocketActions/DriverAcceptRide";
import { shortestPathReset } from "../../actions/GoogleApiActions/ShortestPathAction";

import { resetDriverStartRide } from "../../actions/SocketActions/DriverStartRide";
import { request as requestTodayDriverEarning } from "../../actions/SocketActions/TodayDriverEarning";
import { request as requestDriverOnlineStatus } from "../../actions/SocketActions/DriverOnlineStatus";
import Utils from "../../util";

let callbackRefrence;
function* requestEmitDriverCompleteRide() {
  while (true) {
    const { payload, callBack } = yield take(
      types.DRIVER_COMPLETE_RIDE.REQUEST
    );

    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(
      SocketIO.getInstance().requestEmit,
      API_DRIVER_COMPLETE_RIDE,
      payload
    );
  }
}
function channelDriverCompleteRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_DRIVER_COMPLETE_RIDE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchDriverCompleteRide() {
  const socketChannel = yield call(channelDriverCompleteRide);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(successDriverCompleteRide(response));
      Utils.MessageAlertSuccess("Ride Completed");

      yield put(resetGetDrive());
      yield put(shortestPathReset());
      yield put(driverRideReducerReset());

      yield put(resetDriverStartRide());
      // yield put(requestTodayDriverEarning());
      yield put(requestDriverOnlineStatus({ status: 1 })); // extra hit to make driver online again

      if (callbackRefrence) callbackRefrence(response);
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverCompleteRide);
  yield fork(requestEmitDriverCompleteRide);
}
