// @flow

import { TRIP_BY_DATE } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: TRIP_BY_DATE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: TRIP_BY_DATE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: TRIP_BY_DATE.FAILURE
  };
}
