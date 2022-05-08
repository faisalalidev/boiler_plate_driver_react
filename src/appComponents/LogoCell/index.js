import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView, AppButton, Separator } from "../../components";
import { DistanceTimeEstimate } from "../../appComponents";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import Utils from "../../util";

const LogoCell = (props: Object) => {
  const { style, image, ...rest } = props;
  return (
    <View style={[styles.container, style]}>
      <Image
        style={{
          width: 68.3,
          height: 68.3,
          backgroundColor: "#ffffff",
          //   padding: 10,
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: Colors.separator,
          borderRadius: 30,
          marginLeft: 4
        }}
        resizeMode="cover"
        source={image}
      />
      <View style={{ width: 68, marginTop: 4 }}>
        <Text
          size="xSmall"
          color="darkestGrey"
          type="regular"
          numberOfLines={2}
          style={{ textAlign: "center" }}
        >
          alexendar simth
        </Text>
      </View>
    </View>
  );
};

LogoCell.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),

  image: PropTypes.object
};

LogoCell.defaultProps = {
  style: {}
};

export default LogoCell;
