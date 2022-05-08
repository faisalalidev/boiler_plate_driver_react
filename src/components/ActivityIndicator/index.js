// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Colors, Metrics } from "../../theme";

const ActivityIndicat = (props: Object) => {
  const { color, size, style, customStyle, ...rest } = props;
  return (
    <View style={[styles.container, customStyle]}>
      <ActivityIndicator animating color={color} size={size} style={style} />
    </View>
  );
};

ActivityIndicat.propTypes = {
  customStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

ActivityIndicat.defaultProps = {
  customStyle: {},
  color: Colors.blue,
  size: "small"
};

export default ActivityIndicat;
