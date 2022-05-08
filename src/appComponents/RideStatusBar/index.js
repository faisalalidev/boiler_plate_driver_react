import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";

const RideStatusBar = (props: Object) => {
  const { style, image, rideTitle, rideTitleStyle, onPress, ...rest } = props;
  return (
    <View style={[styles.container, style]}>
      <Image resizeMethod="resize" resizeMode="contain" source={image} />
      <View style={[styles.titleContainer, rideTitleStyle]}>
        <Text style={styles.rideText} numberOfLines={1}>
          {rideTitle}
        </Text>
      </View>
    </View>
  );
};

RideStatusBar.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  rideTitleStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  image: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  onPress: PropTypes.func
};

RideStatusBar.defaultProps = {
  style: {},
  rideTitle: "Ipsum aute est ipsum quis."
};
export default RideStatusBar;
