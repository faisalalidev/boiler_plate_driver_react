// @flow

import { MY_EARNINGS } from "./ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: MY_EARNINGS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: MY_EARNINGS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: MY_EARNINGS.FAILURE
  };
}
