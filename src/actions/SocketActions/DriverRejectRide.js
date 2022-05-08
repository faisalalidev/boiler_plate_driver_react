// @flow

import { DRIVER_REJECT_RIDE } from "../ActionTypes";

export function request(data: Object, callBack) {
  return {
    payload: data,
    callBack,
    type: DRIVER_REJECT_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_REJECT_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_REJECT_RIDE.FAILURE
  };
}
