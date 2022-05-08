// @flow

import { DRIVER_PROFILE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_PROFILE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_PROFILE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_PROFILE.FAILURE
  };
}
