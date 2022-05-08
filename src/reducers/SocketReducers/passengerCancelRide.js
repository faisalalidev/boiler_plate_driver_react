// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  getPassengerCancelStatus: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.PASSENGER_CANCEL_RIDE.REQUEST:
      return { ...state, isFetching: true };
    case types.PASSENGER_CANCEL_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        getPassengerCancelStatus: true
      };
    case types.PASSENGER_CANCEL_RIDE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        getPassengerCancelStatus: false,
        errorMessage: action.errorMessage
      };
      case types.PASSENGER_CANCEL_RIDE_STATUS:
        return {
          failure: false,
          isFetching: false,
          getDriveStatus: action.getPassengerCancelStatus,
          errorMessage: ""
        };
    case types.RESET_PASSENGER_CANCEL_RIDE:
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
