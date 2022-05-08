// @flow

import { TODAY_DRIVER_EARNING } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: TODAY_DRIVER_EARNING.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: TODAY_DRIVER_EARNING.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: TODAY_DRIVER_EARNING.FAILURE
  };
}
