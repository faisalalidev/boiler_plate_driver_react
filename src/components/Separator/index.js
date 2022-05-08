import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Separator = (props: Object) => {
  const { style } = props;
  return <View style={[styles.container, style]} />;
};

Separator.defaultProps = {
  style: {}
};
Separator.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

export default Separator;
