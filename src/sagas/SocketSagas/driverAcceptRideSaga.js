import { take, put, call, fork } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";
import { API_DRIVER_ACCEPT_DRIVE } from "../../config/WebService";
import {
  success as successDriverAcceptRide,
  failure as failureDriverAcceptRide
} from "../../actions/SocketActions/DriverAcceptRide";

import { success as successDistanceMatrixAction } from "../../actions/GoogleApiActions/DistanceMatrixAction";
import SocketIO from "../../services/SocketIO";
import { eventChannel } from "redux-saga";

let callbackRefrence;

function* requestEmitDriverAcceptRide() {
  while (true) {
    const { payload, callBack } = yield take(types.DRIVER_ACCEPT_RIDE.REQUEST);
    // console.log("callback request called : ", callBack);

    if (callBack) {
      callbackRefrence = callBack;
    }

    yield call(
      SocketIO.getInstance().requestEmit,
      API_DRIVER_ACCEPT_DRIVE,
      payload
    );
  }
}
function channelDriverAcceptRide() {
  return eventChannel(emitter => {
    const success = response => {
      emitter(response);
    };
    const failure = error => {
      emitter(new Error(error));
    };
    SocketIO.getInstance().requestOn(API_DRIVER_ACCEPT_DRIVE, success, failure);
    const unsubscribe = () => {};
    return unsubscribe;
  });
}
function* watchDriverAcceptRide() {
  const socketChannel = yield call(channelDriverAcceptRide);
  while (true) {
    try {
      let response = yield take(socketChannel);

      yield put(successDriverAcceptRide(response));
      if (callbackRefrence) callbackRefrence(response);

      console.log("ride accept saga response  : ", response);

      // data = {
      //   origins:
      //     this.props.userLocation.coordinate.latitude +
      //     "," +
      //     this.props.userLocation.coordinate.longitude,
      //   destinations: data[0].latitude + "," + data[0].longitude
      // };
      // yield put(successDistanceMatrixAction(data));
    } catch (err) {
      yield put(failureDriverAcceptRide(err.message));
    }
  }
}
export default function* root() {
  yield fork(watchDriverAcceptRide);
  yield fork(requestEmitDriverAcceptRide);
}
