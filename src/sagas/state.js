import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_STATE } from "../config/WebService";
import { successState, failureState } from "../containers/Signup/SignUpAction";

function callRequest(data) {
  // const header = {
  //   "user-token": "token_here"
  // };
  return ApiSauce.get(API_STATE, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.STATE.REQUEST);

    try {
      const response = yield call(callRequest, payload);

      yield put(successState(response.data));
    } catch (err) {
      yield put(failureState(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
