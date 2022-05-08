// @flow

import {
  PASSENGER_CANCEL_RIDE,
  RESET_PASSENGER_CANCEL_RIDE,
  PASSENGER_CANCEL_RIDE_STATUS
} from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: PASSENGER_CANCEL_RIDE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: PASSENGER_CANCEL_RIDE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: PASSENGER_CANCEL_RIDE.FAILURE
  };
}
export function getPassengerCancelStatus(getPassengerCancelStatus) {
  return {
    getPassengerCancelStatus,
    type: PASSENGER_CANCEL_RIDE_STATUS
  };
}

export function resetPassengerCancelRide() {
  return {
    type: RESET_PASSENGER_CANCEL_RIDE
  };
}
