// @flow
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  dataByDate: false
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.MY_EARNINGS.REQUEST:
    case types.TRIP_BY_DATE.REQUEST:
      return { ...state, isFetching: true };
    case types.MY_EARNINGS.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        dataByDate: false
      };
    case types.TRIP_BY_DATE.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        dataByDate: true
      };
    case types.MY_EARNINGS.FAILURE:
    case types.TRIP_BY_DATE.FAILURE:
      return {
        ...state,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
