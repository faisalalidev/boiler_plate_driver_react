import { SHORTEST_PATH, SHORTEST_PATH_INITIAL_STATE } from "../ActionTypes";

export function request(data: Object, callBack) {
  return {
    payload: data,
    callBack,
    type: SHORTEST_PATH.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SHORTEST_PATH.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SHORTEST_PATH.FAILURE
  };
}

export function shortestPathReset() {
  return {
    type: SHORTEST_PATH_INITIAL_STATE
  };
}
