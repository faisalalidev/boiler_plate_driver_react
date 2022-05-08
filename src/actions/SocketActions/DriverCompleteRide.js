// @flow

import { DRIVER_COMPLETE_RIDE } from "../ActionTypes";

export function request(data: Object, callBack: Function) {
  return {
    payload: data,
    callBack,
    type: DRIVER_COMPLETE_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_COMPLETE_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_COMPLETE_RIDE.FAILURE
  };
}
