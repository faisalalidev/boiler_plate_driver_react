// @flow
import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  driverStatus: false
  // 0 is offline
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.DRIVER_ONLINE_STATUS.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.DRIVER_ONLINE_STATUS.SUCCESS:
      console.log("Driver status ", action.data);
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data,
        driverStatus: action.data.status
      });
    case types.DRIVER_ONLINE_STATUS.FAILURE:
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
