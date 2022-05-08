// @flow

import { MY_TRIPS } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: MY_TRIPS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: MY_TRIPS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: MY_TRIPS.FAILURE
  };
}
