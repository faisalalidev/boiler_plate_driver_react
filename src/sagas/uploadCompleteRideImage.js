import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import {
  API_UPLOAD_COMPLETE_RIDE_IMAGE,
  APPLICATION_TOKEN
} from "../config/WebService";
import { success, failure } from "../actions/UploadCompleteRideImage";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken(),
    token: APPLICATION_TOKEN
  };
  return ApiSauce.post(API_UPLOAD_COMPLETE_RIDE_IMAGE, data, header);
}

import { request as requestDriverCompleteRide } from "../actions/SocketActions/DriverCompleteRide";

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.UPLOAD_COMPLETE_RIDE_IMAGE.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      yield put(requestDriverCompleteRide());
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
