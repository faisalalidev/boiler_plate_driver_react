import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

import { Text, Separator, AppButton } from "../../../components";
import {
  CarDetailCell,
  DriveAddress,
  RideDetailCard,
  DistanceTimeEstimate
} from "../../";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../../theme";

const CompleteRideCard = (props: Object) => {
  const {
    style,
    image,
    navImg,
    btnText,
    onPress,
    data,
    userData,
    isFetching,
    ...rest
  } = props;
  console.log("userData complete card : ", data);

  return (
    <RideDetailCard style={{ borderRadius: 0 }}>
      <View
        style={{
          width:
            Metrics.screenWidth -
            (Metrics.doubleBaseMargin + Metrics.baseMargin)
        }}
      >
        <DriveAddress
          style={styles.completedDriverAddress}
          startPoint={data.address.pickupLocation_main_text}
          endPoint={data.address.dropOffLocation_main_text}
          navImage={navImg}
          textColor={Colors.text.aztec}
        />
        <DistanceTimeEstimate
          estimationData={data.estimation}
          totalAmount={data.estimation.estimate_fare}
          style={{ height: 64 }}
        />
        <Separator style={{ opacity: 0.4 }} />
        <CarDetailCell
          userData={userData}
          image_url={data.passenger.image_url}
        />
        <Separator style={{ opacity: 0.4 }} />
        <AppButton
          buttonTitle={btnText}
          onPress={onPress}
          style={{
            backgroundColor: Colors.appbutton.primary,
            marginTop: 43
          }}
          isFetching={isFetching}
        />
      </View>
    </RideDetailCard>
  );
};

CompleteRideCard.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  icon: PropTypes.object,
  image: PropTypes.object,
  onPress: PropTypes.func,
  btnText: PropTypes.string,
  navImg: PropTypes.object
};

CompleteRideCard.defaultProps = {
  style: {},
  btnText: "",
  navImg: Images.doneSelectDestination
};

export default CompleteRideCard;
