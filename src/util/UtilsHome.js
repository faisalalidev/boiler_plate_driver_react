class UtilsHome {
  _renderConfirmRideCard = (getDrive) => {
    return (
      <BottomSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={328}
        // height=
        duration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            // backgroundColor: "red",
            position: 'absolute',
            bottom: 0,
          },
        }}>
        <RideAcceptCard
          accpetTitle="Accept Ride"
          rejectTitle="Reject Ride"
          data={getDrive.data}
          accpetPress={() => {
            const payload = {
              trip_id: this.props.getDrive.data.trip_id,
              socket_id: this.props.getDrive.data.socket_id,
              data: this.props.getDrive.data,
            };

            this.props.requestDriverAcceptRide(
              payload,
              this.onRideAcceptSuccess,
            );
          }}
          rejectPress={() => {
            const payload = {
              trip_id: this.props.getDrive.data.trip_id,
              socket_id: this.props.getDrive.data.socket_id,
              data: this.props.getDrive.data,
            };
            this.props.requestDriverRejectRide(
              payload,
              this._onRideRejectSuccess,
            );
          }}
        />
      </BottomSheet>
    );
  };
}
export default new UtilsHome();
