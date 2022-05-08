import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../../components";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

const CardFrontBackImage = (props: Object) => {
  const { style, image, ...rest } = props;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: image }}
        style={{
          height: 71,
          margin: 5
        }}
      />
    </View>
  );
};

CardFrontBackImage.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  amount: PropTypes.string,
  detail: PropTypes.string
};

CardFrontBackImage.defaultProps = {
  style: {},
  image: ""
};

export default CardFrontBackImage;
