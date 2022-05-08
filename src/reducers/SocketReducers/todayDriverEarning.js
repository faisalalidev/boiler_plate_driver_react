// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {
    Earning: 0
  }
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.TODAY_DRIVER_EARNING.REQUEST:
      return { ...state, isFetching: true };
    case types.TODAY_DRIVER_EARNING.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      };
    case types.TODAY_DRIVER_EARNING.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
