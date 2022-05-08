import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_PASSENGER_CANCEL_RIDE } from "../../config/WebService";

import {
  success as successPassengerRejectRide,
  failure as failurePassengerRejectRide
} from "../../actions/SocketActions/PassengerCancelRide";

import { resetGetDrive } from "../../actions/SocketActions/GetDrive";
import { driverRideReducerReset } from "../../actions/SocketActions/DriverAcceptRide";
import { shortestPathReset } from "../../actions/GoogleApiActions/ShortestPathAction";
import { resetDriverStartRide } from "../../actions/SocketActions/DriverStartRide";

import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

import Utils from "../../util";

function* requestEmitGetDrive() {
  while (true) {
    const { payload } = yield take(types.PASSENGER_CANCEL_RIDE.REQUEST);
    yield call(
      SocketIO.getInstance().requestEmit,
      API_PASSENGER_CANCEL_RIDE,
      payload
    );
  }
}

function channelPassengerRejectRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(
      API_PASSENGER_CANCEL_RIDE,
      success,
      failure
    );
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* watchPassengerRejectRide() {
  const socketChannel = yield call(channelPassengerRejectRide);
  while (true) {
    try {
      let response = yield take(socketChannel);
      yield put(successPassengerRejectRide(response));
      yield put(resetGetDrive());
      yield put(shortestPathReset());
      yield put(driverRideReducerReset());
      yield put(resetDriverStartRide());
      Utils.MessageAlertSuccess("", "Passenger has cancel ride");
    } catch (err) {
      yield put(failurePassengerRejectRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchPassengerRejectRide);
}
