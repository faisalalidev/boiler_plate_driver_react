import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import { DistanceTimeEstimate } from "../../appComponents";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";

const StartDestinationCell = (props: Object) => {
  const {
    style,
    image,
    startPoint,
    startStreet,
    endPoint,
    endStreet,
    ...rest
  } = props;
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      <Image
        source={image}
        style={{ marginTop: 23, marginRight: 10 }}
        resizeMode="contain"
      />
      <View
        style={{
          marginTop: 15,
          flex: 1,
          height: 110,
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text
            size="xSmall"
            color="darkestGrey"
            type="regular"
            numberOfLines={1}
            style={{ justifyContent: "center" }}
          >
            {startPoint}
          </Text>
          <Text
            size="xxSmall"
            color="grey"
            type="regular"
            numberOfLines={2}
            style={{ justifyContent: "center" }}
          >
            {startStreet}
          </Text>
        </View>
        <View>
          <Text
            size="xSmall"
            color="darkestGrey"
            type="regular"
            numberOfLines={1}
          >
            {endPoint}
          </Text>
          <Text size="xxSmall" color="grey" type="regular" numberOfLines={1}>
            {endStreet}
          </Text>
        </View>
      </View>
    </View>
  );
};

StartDestinationCell.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  startPoint: PropTypes.string,
  endPoint: PropTypes.string,
  image: PropTypes.object
};

StartDestinationCell.defaultProps = {
  style: {},
  startPoint: "",
  endPoint: ""
};

export default StartDestinationCell;