import { take, put, call, fork } from "redux-saga/effects";

import * as types from "../../actions/ActionTypes";
import { API_DISTANCEMATRIX } from "../../config/WebService";
import {
  success,
  failure
} from "../../actions/GoogleApiActions/DistanceMatrixAction";

import Utils from "../../util";
import GoogleApiSauce from "../../services/GoogleApiSauce";

function callRequest(data) {
  return GoogleApiSauce.get(API_DISTANCEMATRIX, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.DISTANCE_MATRIX.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      console.log(" Saga response  distance matrix  : ", response);
      yield put(success(response.data));
    } catch (err) {
      console.log(" Saga Error  : ", err);
      yield put(failure(err));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
