import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

import { AnimatedRegion } from "react-native-maps";
import haversine from "haversine";

const initialState = Immutable({
  isFetching: false,
  failure: false,
  errorMessage: "",
  coordinate: {
    latitude: 0,
    longitude: 0
  },
  permissionGranted: null,

  routeCoordinates: [],
  distanceTravelled: 0,
  prevLatLng: {
    // latitude: 0,
    // longitude: 0
  },
  trackingCoordinate: new AnimatedRegion({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  })
});

// const newCoordinate = {
//   latitude,
//   longitude
// };

calcDistance = newLatLng => {
  // const { prevLatLng } = this.state;
  console.log("state.prevLatLng : ", state.prevLatLng);
  return haversine(state.prevLatLng, newLatLng) || 0;
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.USER_LOCATION.REQUEST:
      return Immutable.merge(state, {
        isFetching: action.permissionGranted === "granted",
        failure: false,
        errorMessage: "",
        permissionGranted: action.permissionGranted
      });
    case types.USER_LOCATION.SUCCESS:
      console.log("action.location", state);
      calcDistance = newLatLng => {
        // const { prevLatLng } = this.state;

        return haversine(state.prevLatLng, newLatLng) || 0;
      };
      return Immutable.merge(state, {
        isFetching: false,
        failure: false,
        errorMessage: "",
        coordinate: {
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude
        },
        routeCoordinates: state.routeCoordinates.concat([
          {
            latitude: action.location.coords.latitude,
            longitude: action.location.coords.longitude
          }
        ]),
        distanceTravelled:
          state.distanceTravelled +
          this.calcDistance({
            latitude: action.location.coords.latitude,
            longitude: action.location.coords.longitude
          }),
        prevLatLng: {
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude
        }
      });

    case types.TRACKING_LOCATION:
      console.log("action.location", state);
      calcDistance = newLatLng => {
        // const { prevLatLng } = this.state;
        console.log("state.prevLatLng : ", state.prevLatLng);
        // return haversine(state.prevLatLng, newLatLng) || 0;
        return 0;
      };
      return {
        ...state,
        isFetching: false,
        failure: false,
        errorMessage: "",
        routeCoordinates: state.routeCoordinates.concat([
          {
            latitude: action.location.coords.latitude,
            longitude: action.location.coords.longitude
          }
        ]),
        distanceTravelled:
          state.distanceTravelled +
          this.calcDistance({
            latitude: action.location.coords.latitude,
            longitude: action.location.coords.longitude
          }),
        prevLatLng: {
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude
        }
      };

    case types.USER_LOCATION.FAILURE:
      return Immutable.merge(state, {
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      });

    default:
      return state;
  }
};
