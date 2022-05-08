// @flow

import { DRIVER_UPDATE_LOCATION } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_UPDATE_LOCATION.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_UPDATE_LOCATION.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_UPDATE_LOCATION.FAILURE
  };
}
