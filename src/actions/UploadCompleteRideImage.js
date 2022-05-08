// @flow

import { UPLOAD_COMPLETE_RIDE_IMAGE } from "./ActionTypes";

export function request(data: Object) {
    return {
        payload: data,
        type: UPLOAD_COMPLETE_RIDE_IMAGE.REQUEST
    };
}

export function success(data: Object) {
    return {
        data,
        type: UPLOAD_COMPLETE_RIDE_IMAGE.SUCCESS
    };
}

export function failure(errorMessage: Object) {
    return {
        errorMessage,
        type: UPLOAD_COMPLETE_RIDE_IMAGE.FAILURE
    };
}