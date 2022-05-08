// @flow

import { DRIVER_LOGOUT } from "../ActionTypes";

export function request(data: Object, callBack) {
  return {
    payload: data,
    callBack,
    type: DRIVER_LOGOUT.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_LOGOUT.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_LOGOUT.FAILURE
  };
}
