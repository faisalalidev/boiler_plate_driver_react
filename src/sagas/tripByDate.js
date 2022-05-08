import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { MY_EARNINGS, APPLICATION_TOKEN } from "../config/WebService";
import { success, failure } from "../actions/myTripByDateAction";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken(),
    token: APPLICATION_TOKEN
  };
  return ApiSauce.get(`${MY_EARNINGS}?date=${data.params}`, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.TRIP_BY_DATE.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
