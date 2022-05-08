// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text } from "../../components";
import styles from "./styles";

const DriveAddress = (props: Object) => {
  const { style, startPoint, endPoint, navImage, textColor, ...rest } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.navImage}>
        <Image source={navImage} resizeMode="contain" />
      </View>
      <View style={styles.navTextCon}>
        <Text size="xSmall" color={textColor} numberOfLines={1} type="regular">
          {startPoint}
        </Text>
        <Text size="xSmall" color={textColor} numberOfLines={1} type="regular">
          {endPoint}
        </Text>
      </View>
    </View>
  );
};

DriveAddress.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  startPoint: PropTypes.string,
  endPoint: PropTypes.string,
  navImage: PropTypes.object,
  textColor: PropTypes.string
};
DriveAddress.defaultProps = {
  style: {}
};

export default DriveAddress;
