// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  sateData: {},
  cityData: {},
  data: {}
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.SIGN_UP.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.SIGN_UP.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.SIGN_UP.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });

    case types.STATE.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.STATE.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        sateData: action.data
      });
    case types.STATE.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });

    case types.CITY.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.CITY.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        cityData: action.data
      });
    case types.CITY.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });

    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
