// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text } from "../../components";
import styles from "./styles";

const Timer = (props: Object) => {
  const { image, item } = props;
  return (
    <View style={[styles.container]}>
      <View style={styles.subContainer}>
        <Image source={image} />
        <Text size="medium" color="primary" type="regular">
          {item.time}
        </Text>
      </View>
    </View>
  );
};

Timer.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  image: PropTypes.object,
  item: PropTypes.object
};

Timer.defaultProps = {
  style: {}
};

export default Timer;
