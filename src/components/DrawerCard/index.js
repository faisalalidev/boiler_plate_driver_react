import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

export default class TextFieldBorder extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    error: PropTypes.string,
    reference: PropTypes.func,
    textFieldStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func,
    showDropDownIcon: PropTypes.bool,
    onLayout: PropTypes.func,
    textColor:PropTypes.string
  };

  static defaultProps = {
    style: {},
    reference: undefined,
    error: "",
    textFieldStyle: {},
    onPress: undefined,
    showDropDownIcon: false,
    onLayout: undefined,
    textColor:Colors.appbutton.white
  };

  render() {
    const {
      style,
      label,
      error,
      reference,
      textFieldStyle,
      onPress,
      showDropDownIcon,
      onLayout,
      icons,
      data,
      image,
      myText,
      textColor,
      ...rest
    } = this.props;

    return (
      <View style={{ alignItems: "stretch" }}>
        <ButtonView
          style={[
            {
              flexDirection: "row",
              paddingVertical: Metrics.doubleBaseMargin
            },
            style
          ]}
          onPress={onPress}
        >
          {!_.isUndefined(icons) ? (
            <View
              style={{
                paddingRight: Metrics.baseMargin,
                justifyContent: "center"
              }}
            >
              <Image source={this.props.icons} />
            </View>
          ) : null}

          <View
            style={{
              flex: 1,
              marginHorizontal: Metrics.xDoubleBaseMargin
            }}
          >
            <Text type="bold" size="medium" color={textColor}>
              {this.props.myText}
            </Text>
          </View>
        </ButtonView>
      </View>
    );
  }
}
