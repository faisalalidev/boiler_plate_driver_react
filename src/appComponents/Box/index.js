import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

const Box = (props: Object) => {
  const { style, amount, detail, ...rest } = props;
  return (
    <View style={[styles.container, style]}>
      <Text
        size="xxLarge"
        color="primary"
        type="medium"
        style={{ textAlign: "center" }}
      >
        {amount}
      </Text>
      <Text
        size="small"
        color="primary"
        type="regular"
        style={{ textAlign: "center" }}
      >
        {detail}
      </Text>
    </View>
  );
};

Box.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  amount: PropTypes.string,
  detail: PropTypes.string
};

Box.defaultProps = {
  style: {},
  amount: "100.00",
  detail: "detail"
};

export default Box;
