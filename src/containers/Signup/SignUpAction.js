// @flow

import { STATE, CITY, SIGN_UP } from "../../actions/ActionTypes";

export function request(data: Object) {
  return {
    payload: data,
    type: SIGN_UP.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SIGN_UP.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SIGN_UP.FAILURE
  };
}

export function requestState(data: Object) {
  return {
    payload: data,
    type: STATE.REQUEST
  };
}

export function successState(data: Object) {
  return {
    data,
    type: STATE.SUCCESS
  };
}

export function failureState(errorMessage: Object) {
  return {
    errorMessage,
    type: STATE.FAILURE
  };
}

export function requestCity(data: Object) {
  return {
    payload: data,
    type: CITY.REQUEST
  };
}

export function successCity(data: Object) {
  return {
    data,
    type: CITY.SUCCESS
  };
}

export function failureCity(errorMessage: Object) {
  return {
    errorMessage,
    type: CITY.FAILURE
  };
}
