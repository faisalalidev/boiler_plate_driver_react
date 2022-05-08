import {take, put, call, fork} from 'redux-saga/effects';
import ApiSauce from '../services/ApiSauce';
import * as types from '../actions/ActionTypes';
import {API_LOGIN, APPLICATION_TOKEN} from '../config/WebService';
import {success, failure} from '../actions/Login';
import {NavigationActions} from 'react-navigation';
import Utils from '../util';
import {request as requestSocketConnetion} from '../actions/SocketActions/SocketConnetion';

function callRequest(data) {
  return ApiSauce.post(API_LOGIN, data);
}

function* watchRequest() {
  while (true) {
    const {payload, callBack} = yield take(types.LOGIN.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      if (callBack) {
        callBack(response);
      }
      Utils.setUserToken(response.data.token);
      yield put(success(response.data));
      yield put(
        requestSocketConnetion({
          'user-token': response.data.token,
          user_id: response.data.id,
          token: APPLICATION_TOKEN,
        }),
      );
      yield put(NavigationActions.navigate({routeName: 'home'}));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
