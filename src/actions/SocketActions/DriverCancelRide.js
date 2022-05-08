// @flow

import { DRIVER_CANCEL_RIDE } from "../ActionTypes";

export function request(data: Object, callBack: Function) {
  return {
    payload: data,
    callBack,
    type: DRIVER_CANCEL_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_CANCEL_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_CANCEL_RIDE.FAILURE
  };
}
