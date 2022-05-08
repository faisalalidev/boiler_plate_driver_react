import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_SIGNUP_DRIVER } from "../config/WebService";
import { success, failure } from "../containers/Signup/SignUpAction";
import { NavigationActions } from "react-navigation";
import { API_LOGIN, APPLICATION_TOKEN } from "../config/WebService";
import Utils from "../util";

import { request as requestSocketConnetion } from "../actions/SocketActions/SocketConnetion";

function callRequest(data) {
  const header = {
    "Content-Type": "multipart/form-data"
  };
  return ApiSauce.post(API_SIGNUP_DRIVER, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.SIGN_UP.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Utils.setUserToken(response.data.token);
      yield put(
        requestSocketConnetion({
          "user-token": response.data.token,
          user_id: response.data.id,
          token: APPLICATION_TOKEN
        })
      );

      Utils.MessageAlertSuccess("", response.message);
      yield put(NavigationActions.navigate({ routeName: "login" }));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
