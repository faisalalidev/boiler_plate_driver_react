// @flow

import { DRIVER_PROFILE_UPDATE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_PROFILE_UPDATE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_PROFILE_UPDATE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_PROFILE_UPDATE.FAILURE
  };
}
