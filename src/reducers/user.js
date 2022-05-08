// @flow
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.LOGIN.REQUEST:
    case types.DRIVER_PROFILE.REQUEST:
    case types.DRIVER_PROFILE_UPDATE.REQUEST:
    case types.CHANGE_PASSWORD.REQUEST:
      // case types.SIGN_UP.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.LOGIN.SUCCESS:
    case types.DRIVER_PROFILE.SUCCESS:
    case types.DRIVER_PROFILE_UPDATE.SUCCESS:
    case types.CHANGE_PASSWORD.SUCCESS:
      // case types.SIGN_UP.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.LOGIN.FAILURE:
    case types.DRIVER_PROFILE.FAILURE:
    case types.DRIVER_PROFILE_UPDATE.FAILURE:
    case types.CHANGE_PASSWORD.FAILURE:
      // case types.SIGN_UP.FAILURE:
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
