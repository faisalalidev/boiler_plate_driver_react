// @flow

import { DRIVER_ONLINE_STATUS } from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: DRIVER_ONLINE_STATUS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DRIVER_ONLINE_STATUS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DRIVER_ONLINE_STATUS.FAILURE
  };
}
