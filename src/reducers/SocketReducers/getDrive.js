// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  getDriveStatus: false,
  getDriverTimer: 0
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.GET_DRIVE.REQUEST:
      return { ...state, isFetching: true };
    case types.GET_DRIVE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        getDriveStatus: true
      };
    case types.GET_DRIVE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        getDriveStatus: false,
        errorMessage: action.errorMessage
      };
    case types.DRIVE_STATUS:
      return {
        failure: false,
        isFetching: false,
        getDriveStatus: action.getDriveStatus,
        errorMessage: ""
      };

    case types.DRIVE_TIMER:
      return {
        ...state,
        failure: false,
        isFetching: false,
        getDriverTimer: action.timer,
        errorMessage: ""
      };
    case types.RESET_GET_DRIVE:
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
