import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import Lightbox from "react-native-lightbox";
import {
  ProfileImage,
  StartDestinationCell,
  DistanceTimeEstimate,
  RideDetailCard,
  HelpButtons
} from "../../";
import { Text, ButtonView, Separator, AppButton } from "../../../components";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../../theme";
import Utils from "../../../util";

const ConfirmRideCard = (props: Object) => {
  const {
    style,
    image,
    accpetPress,
    rejectPress,
    accpetTitle,
    rejectTitle,
    data,
    oneButtonTitle,
    oneButtonOnPress,
    isFetching,
    ...rest
  } = props;

  return (
    <RideDetailCard style={styles.rideDetailContainer}>
      <View style={styles.acceptRideDetailContainer}>
        <View style={styles.acceptSubContainer}>
          <View style={styles.proContainer}>
            <View>
              <ProfileImage
                image={{
                  uri: Utils.imageUrlConverter(data.passenger.image_url)
                }}
                borderRadius={34}
                imageSize={styles.acceptRideImageSize}
                imageValidation
              />
              <Text
                size="xSmall"
                color="darkestGrey"
                type="regular"
                numberOfLines={1}
                style={{ textAlign: "center" }}
              >
                {data.passenger.name}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1.3 }}>
            <StartDestinationCell
              startPoint={data.address.pickupLocation_main_text}
              startStreet={data.address.pickupLocation_description}
              endPoint={data.address.dropOffLocation_main_text}
              endStreet={data.address.dropOffLocation_description}
              image={Images.startEnd}
            />
          </View>
        </View>
        <Separator style={{ width: 300 }} />
        <DistanceTimeEstimate
          carImage
          style={styles.acceptDistanceTime}
          estimationData={data.estimation}
        />
      </View>
      <View style={{ marginBottom: 30 }}>
        {_.isUndefined(oneButtonOnPress) ? (
          <HelpButtons
            leftTitle={accpetTitle}
            leftOnPress={accpetPress}
            leftButtonStyle={{ marginRight: 2 }}
            rightTitle={rejectTitle}
            rightOnPress={rejectPress}
            rightButtonStyle={{
              backgroundColor: Colors.appbutton.black
            }}
          />
        ) : (
          <AppButton
            style={{
              backgroundColor: Colors.appbutton.primary
              // height: 52.9
            }}
            buttonTitle={oneButtonTitle}
            onPress={oneButtonOnPress}
            isFetching={isFetching}
          />
        )}
      </View>
    </RideDetailCard>
  );
};

ConfirmRideCard.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  icon: PropTypes.object,
  image: PropTypes.object,
  onPress: PropTypes.func,
  btnTitle: PropTypes.string
};

ConfirmRideCard.defaultProps = {
  style: {},
  btnTitle: "Accept Ride"
};

export default ConfirmRideCard;
