import { take, put, call, fork, select } from "redux-saga/effects";
import * as types from "../../actions/ActionTypes";

import { API_UPDATE_DRIVER_STATUS } from "../../config/WebService";
import {
  success as driverStatusSuccess,
  failure as driverStatusFailure
} from "../../actions/SocketActions/DriverStatus";
import SocketIO from "../../services/SocketIO";
import { eventChannel, END } from "redux-saga";

// function* requestDriverOnlineStatus(data) {
//   console.log(
//     "payload  requestDriverOnlineStatus : ",
//     types.DRIVER_STATUS.REQUEST
//   );

//   console.log("payload  requestDriverOnlineStatus : ", payload);
//   let channel = eventChannel(emitter => {
//     console.log("payload  eventChannel: ", emitter);

//     SocketIO.getInstance().request(
//       API_UPDATE_DRIVER_STATUS,
//       payload,
//       response => {
//         emitter(payload);
//       },
//       error => {
//         emitter(new Error(error));
//       }
//     );
//     return () => {
//       // emitter(END);
//       // Perform any cleanup you need here
//       //   SocketIO.getInstance();
//     };
//   });
//   console.log("channel", channel);
//   while (true) {
//     // channel.put(END);
//       const { payload } = yield take(types.DRIVER_STATUS.REQUEST);

//     try {
//       const response = yield take(channel);
//       console.log("response ******** ", response);
//       yield put(driverStatusSuccess(response));
//       // channel.close();
//     } catch (err) {
//       yield put(driverStatusFailure(err.message));
//       // channel.close();
//     } finally {
//       // emitter(END);
//     }
//   }
// }

export default function* root() {
  yield fork(requestDriverOnlineStatus);
}
