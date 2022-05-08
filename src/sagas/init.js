import { LOAD } from "redux-storage";
import { take, fork, select, put } from "redux-saga/effects";

import { getUser, getUserSocket } from "../reducers/selectors";
import { NavigationActions, StackActions } from "react-navigation";
import Utils from "../util";

import {
  socketInfoListener,
  request
} from "../actions/SocketActions/SocketConnetion";

import { APPLICATION_TOKEN } from "../config/WebService";

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);
    try {
      const { data } = yield select(getUser);

      const condi = data.id && data.token;
      console.log("init user : condiction : ", condi);

      if (data.token) {
        Utils.setUserToken(data.token);

        console.log("if body ", data);
        yield put(
          request({
            "user-token": data.token,
            user_id: data.id,
            token: APPLICATION_TOKEN
          })
        );
        yield put(NavigationActions.navigate({ routeName: "home" }));
      } else {
        console.log("else body ", data);
        NavigationActions.navigate({ routeName: "login" });
        Utils.setDeviceToken("");
        Utils.setSocketAccessToken("");
        Utils.setUserIDFromSocket("");
      }
    } catch (err) {
      console.warn("saga watchReduxLoadFromDisk error: ", err);
    }
  }
}

export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
