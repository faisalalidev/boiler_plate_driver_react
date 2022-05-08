import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import { Images, Metrics } from "../../theme";
import styles from "./styles";

const ApplogoText = (props: Object) => {
  const { style } = props;
  return (
    <Image
      source={Images.appLogo}
      resizeMode="contain"
      style={[styles.container, style]}
    />
  );
};

ApplogoText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

export default ApplogoText;
