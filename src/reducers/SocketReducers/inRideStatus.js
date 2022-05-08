// @flow

import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  completeuploadImage: {}
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_COMPLETE_RIDE.REQUEST:
    case types.UPLOAD_COMPLETE_RIDE_IMAGE.REQUEST:
      return { ...state, isFetching: true };
    case types.DRIVER_COMPLETE_RIDE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.UPLOAD_COMPLETE_RIDE_IMAGE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        completeuploadImage: action.data
      };
    case types.DRIVER_COMPLETE_RIDE.FAILURE:
    case types.UPLOAD_COMPLETE_RIDE_IMAGE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };

    case types.RESET_DRIVER_START_RIDE:
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
