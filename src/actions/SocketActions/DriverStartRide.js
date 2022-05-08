// @flow

import { DRIVER_START_RIDE, RESET_DRIVER_START_RIDE } from "../ActionTypes";

export function request(data: Object, callBack) {
  return {
    payload: data,
    callBack,
    type: DRIVER_START_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_START_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_START_RIDE.FAILURE
  };
}

export function resetDriverStartRide() {
  return {
    type: RESET_DRIVER_START_RIDE
  };
}
