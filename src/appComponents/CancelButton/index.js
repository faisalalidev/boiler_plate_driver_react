import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../../components";
import { Modal } from "../../appComponents";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import Utils from "../../util";
import { request as requestDriverCancelRide } from "../../actions/SocketActions/DriverCancelRide";

class CancelButton extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };
  static defaultProps = {
    style: {}
  };

  _cancelRidePop = () => {
    return (
      <Modal.Dialogue
        ref={ref => {
          this.cancelRide = ref;
        }}
        description="Are you sure you want to cancel ride ?"
        title="Cancel Ride"
        leftButton="Yes"
        rightButton="No"
        isButton
        leftButtonPress={() => {
          // this.props.logout();
          // alert("Yes Press ");
          // api paay hit jaay tou cancel ki tou  requestgetDriveStatus use karou
          this.cancelRide.hide();

          this.props.requestDriverCancelRide({}, data => {
            this.props.navigation.setParams({ showCancelButton: false });
          });

          // driverRideReducer.driverRideStatus
          // reducer mai ja kaar false karna hai
        }}
        rightButtonPress={() => this.cancelRide.hide()}
      />
    );
  };

  render() {
    const { style, navigation, driverRideReducer,driverStartRide, ...rest } = this.props;
    console.log("navigation Cancel button : ", navigation, driverRideReducer);
    return driverRideReducer.driverRideStatus &&
    !driverStartRide.startTripStatus ? (
      <ButtonView
        onPress={
          //   navigation.state.params && navigation.state.params.onCancelPress
          () => this.cancelRide.show()
        }
        style={{
          marginRight: 4
        }}
      >
        <Text size="large" type="regular" color="grey">
          Cancel Ride
        </Text>
        {this._cancelRidePop()}
      </ButtonView>
    ) : null;
  }
}
const mapStateToProps = state => ({
  getDrive: state.getDrive,
  driverAcceptRide: state.driverRideReducer.driverAcceptData,
  driverRideReducer: state.driverRideReducer,
  driverStartRide: state.driverStartRide
});

const actions = { requestDriverCancelRide };
export default connect(
  mapStateToProps,
  actions
)(CancelButton);
