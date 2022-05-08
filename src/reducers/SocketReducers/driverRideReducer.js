// @flow
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  driverAcceptData: {},
  driverRejectData: {},
  driverRideStatus: false,
  driverRideRejectStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_ACCEPT_RIDE.REQUEST:
    case types.DRIVER_REJECT_RIDE.REQUEST:
      return { ...state, isFetching: true };
    case types.DRIVER_ACCEPT_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        driverAcceptData: action.data,
        driverRideStatus: true
      };
    case types.DRIVER_REJECT_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        driverRejectData: action.data,
        driverRideRejectStatus: true
      };
    case types.DRIVER_ACCEPT_RIDE.FAILURE:
    case types.DRIVER_REJECT_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
        driverRideRejectStatus: false,
        driverRideStatus: false
      };

    case types.DRIVER_RIDE_STATUS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        driverRideStatus: action.driverRideStatus
      };
    case types.DRIVER_RIDE_REDUCER_RESET:
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
