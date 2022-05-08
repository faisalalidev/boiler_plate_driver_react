import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_DRIVER_PROFILE } from "../config/WebService";
import { success, failure } from "../actions/DriverProfile";
import { getUser } from "../reducers/selectors";
import Utils from "../util";

function callRequest(data) {
  // console.log("Get ");
  const token = Utils.getUserToken();

  console.log("callRequest : ", token);

  const header = {
    "user-token": Utils.getUserToken()
  };

  return ApiSauce.get(API_DRIVER_PROFILE, data, header);
}

function userToken(token) {
  console.log("userToken saga  : ", token);
  return token;
  //   return ApiSauce.get(API_DRIVER_PROFILE, data);
}

function* watchRequest() {
  while (true) {
    console.log("driver saga ");
    const { payload } = yield take(types.DRIVER_PROFILE.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Utils.MessageAlertSuccess("", response.message);
    } catch (err) {
      // Utils.MessageAlertError("", err.message ? err.message : "");
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
