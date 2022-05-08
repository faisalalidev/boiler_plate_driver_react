// @flow

import * as types from "./ActionTypes";

export function request(permissionGranted) {
  return {
    permissionGranted,
    type: types.USER_LOCATION.REQUEST
  };
}

export function success(location) {
  return {
    location,
    type: types.USER_LOCATION.SUCCESS
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: types.USER_LOCATION.FAILURE
  };
}

export function trackingLocation(data) {
  return {
    data,
    type: types.TRACKING_LOCATION
  };
}

export function userLocationBackgroundRequest(data) {
  return {
    payload: data,
    type: types.USER_LOCATION_BACKGROUND.REQUEST
  };
}
export function userLocationBackgroundSuccess(data) {
  return {
    data,
    type: types.USER_LOCATION_BACKGROUND.SUCCESS
  };
}
export function userLocationBackgroundFailure(errorMessage) {
  return {
    errorMessage,
    type: types.USER_LOCATION_BACKGROUND.FAILURE
  };
}
