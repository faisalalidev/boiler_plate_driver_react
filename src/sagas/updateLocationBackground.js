import { take, put, call, fork, select } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_DRIVER_UPDATE_LOCATION_BACKGROUND } from "../config/WebService";
import {
  userLocationBackgroundSuccess,
  userLocationBackgroundFailure
} from "../actions/UserLocation";
import { getUser } from "../reducers/selectors";
import Utils from "../util";

function callRequest(data) {
  const header = {
    "user-token": Utils.getUserToken()
  };

  return ApiSauce.post(API_DRIVER_UPDATE_LOCATION_BACKGROUND, data, header);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.USER_LOCATION_BACKGROUND.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(userLocationBackgroundSuccess(response.data));
    } catch (err) {
      yield put(userLocationBackgroundFailure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
