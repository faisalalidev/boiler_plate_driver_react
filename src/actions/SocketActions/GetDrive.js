// @flow

import {
  GET_DRIVE,
  DRIVE_STATUS,
  RESET_GET_DRIVE,
  DRIVE_TIMER
} from "../ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: GET_DRIVE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_DRIVE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_DRIVE.FAILURE
  };
}

export function getDriveStatus(getDriveStatus) {
  return {
    getDriveStatus,
    type: DRIVE_STATUS
  };
}

export function resetGetDrive() {
  return {
    type: RESET_GET_DRIVE
  };
}

export function getDriveTimer(timer) {
  return {
    timer,
    type: DRIVE_TIMER
  };
}
