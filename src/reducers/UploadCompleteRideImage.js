// @flow

import * as types from "../actions/ActionTypes";

const initialState = {
    failure: false,
    isFetching: false,
    errorMessage: "",
    data: {}
};

export default (state: Object = initialState, action: Object) => {
    switch (action.type) {
        case types.UPLOAD_COMPLETE_RIDE_IMAGE.REQUEST:
            return { ...state, isFetching: true };
        case types.UPLOAD_COMPLETE_RIDE_IMAGE.SUCCESS:
            return {
                ...state,
                failure: false,
                isFetching: false,
                errorMessage: "",
                data: action.data
            };
        case types.UPLOAD_COMPLETE_RIDE_IMAGE.FAILURE:
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