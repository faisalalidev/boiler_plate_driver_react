import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

export default class CustomHeader extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    icon: PropTypes.object,
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { style, icon, onPress, ...rest } = this.props;
    return (
      <View style={[styles.container, style]}>
        <ButtonView
          style={{
            paddingVertical: Metrics.smallMargin
          }}
          onPress={onPress}
        >
          <Image
            resizeMode="contain"
            source={Images.leftArrowBlue}
            style={{
              width: Metrics.images.medium,
              height: Metrics.images.small
            }}
          />
        </ButtonView>
      </View>
    );
  }
}
