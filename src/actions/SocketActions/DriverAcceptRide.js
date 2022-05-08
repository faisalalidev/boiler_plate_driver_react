// @flow

import {
  DRIVER_ACCEPT_RIDE,
  DRIVER_RIDE_STATUS,
  DRIVER_RIDE_REDUCER_RESET
} from "../ActionTypes";

export function request(data: Object, callBack: Function) {
  return {
    payload: data,
    callBack,
    type: DRIVER_ACCEPT_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_ACCEPT_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_ACCEPT_RIDE.FAILURE
  };
}

export function driverRideStatus(driverRideStatus) {
  return {
    driverRideStatus,
    type: DRIVER_RIDE_STATUS
  };
}

export function driverRideReducerReset() {
  return {
    type: DRIVER_RIDE_REDUCER_RESET
  };
}
