import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";

ContentContaoner = (title, subtitle, totalAmount) => {
  // const { totalAmount } = this.props;
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {_.isEmpty(totalAmount) || _.isUndefined(totalAmount) ? (
        <View>
          <Text size="xxSmall" color="grey" type="regular" numberOfLines={1}>
            {title}
          </Text>
          <Text
            size="xSmall"
            color="darkestGrey"
            type="regular"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        </View>
      ) : (
        <Text
          size="xxLarge"
          color="black"
          type="medium"
          numberOfLines={1}
          style={{ alignSelf: "flex-end" }}
        >
           {"$ " + totalAmount}
        </Text>
      )}
    </View>
  );
};

const DistanceTimeEstimate = (props: Object) => {
  const {
    style,
    startPoint,
    destination,
    carImage,
    estimationData,
    totalAmount,
    ...rest
  } = props;
  return (
    <View style={[styles.container, style]}>
      {!_.isUndefined(carImage) ? (
        <Image source={Images.carBackground} style={{ marginRight: 10 }} />
      ) : null}
      {this.ContentContaoner("Distance", estimationData.estimate_distance)}
      {this.ContentContaoner("Time", estimationData.estimate_time)}
      {this.ContentContaoner(
        "Estimated Fare",
        `$ ${estimationData.estimate_fare}`,
        totalAmount
      )}
    </View>
  );
};

DistanceTimeEstimate.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  startPoint: PropTypes.string,
  destination: PropTypes.string
};

DistanceTimeEstimate.defaultProps = {
  style: {},
  startPoint: "30 Newbury St, 3rd Floor, Boston,",
  destination: "867 Boylston Street, 5th Floor, Boston"
};

export default DistanceTimeEstimate;