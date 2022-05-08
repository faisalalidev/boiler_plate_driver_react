// NOTE: It's a application button
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView, ActivityIndicator } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

const AppButton = (props: Object) => {
  const { style, buttonTitle, onPress, icon, isFetching, ...rest } = props;
  return (
    <ButtonView
      style={[styles.container, style]}
      onPress={onPress}
      disabled={isFetching}
    >
      {icon ? <Image source={icon} style={{ marginRight: 15 }} /> : null}
      <Text
        type="medium"
        size="medium"
        color="primary"
        style={{
          textAlign: "center",
          fontStyle: "normal",
          letterSpacing: 0
        }}
      >
        {buttonTitle}
      </Text>
      {isFetching ? <ActivityIndicator /> : null}
    </ButtonView>
  );
};

AppButton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  onPress: PropTypes.func,
  icon: PropTypes.object
};

AppButton.defaultProps = {
  style: {},
  title: "Title",
  icon: false
};

export default AppButton;
