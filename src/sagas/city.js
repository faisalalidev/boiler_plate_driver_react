import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_CITY } from "../config/WebService";
import { successCity, failureCity } from "../containers/Signup/SignUpAction";

function callRequest(data) {
  // const header = {
  //   "user-token": "token_here"
  // };
  return ApiSauce.get(API_CITY, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.CITY.REQUEST);

    try {
      const response = yield call(callRequest, payload);

      yield put(successCity(response.data));
    } catch (err) {
      yield put(failureCity(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
