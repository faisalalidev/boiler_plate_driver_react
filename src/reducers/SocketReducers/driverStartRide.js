// @flow
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  startTripStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_START_RIDE.REQUEST:
      return { ...state, isFetching: true };
    case types.DRIVER_START_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        startTripStatus: true
      };
    case types.DRIVER_START_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        startTripStatus: false,
        errorMessage: action.errorMessage
      };
    case types.LOGOUT:
    case types.RESET_DRIVER_START_RIDE:
      return initialState;

    default:
      return state;
  }
};
