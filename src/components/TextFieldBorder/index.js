import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Colors, Images, Metrics, ApplicationStyles } from "../../theme";
import Utils from "../../util";

const TextFieldBorder = (props: Object) => {
  const {
    style,
    label,
    error,
    reference,
    textFieldStyle,
    onPress,
    showDropDownIcon,
    onLayout,
    textFieldImage,
    rightTextFieldImage,
    pointerEvents,
    white,
    ...rest
  } = props;

  return (
    <View
      style={[styles.container, style]}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
    >
      <View style={[textFieldStyle, style.textContainer]}>
        {!_.isUndefined(textFieldImage) ? (
          <Image
            resizeMode="contain"
            source={textFieldImage}
            style={{
              padding: Metrics.baseMargin,
              marginLeft: Metrics.smallMargin
            }}
            width={Metrics.images.small}
            height={Metrics.images.small}
          />
        ) : null}

        <TextInput
          selectionColor={Colors.success}
          placeholderTextColor={white ? Colors.text.white : Colors.placeholder}
          underlineColorAndroid={Colors.transparent}
          style={styles.textInputStyle}
          {...rest}
          ref={
            reference
              ? ref => {
                  reference(ref);
                }
              : null
          }
          // editable={_.isUndefined(onPress)}
        />
        {!_.isUndefined(rightTextFieldImage) ? (
          <Image
            resizeMode="contain"
            source={rightTextFieldImage}
            style={{}}
            width={Metrics.images.small}
            height={Metrics.images.small}
          />
        ) : null}
      </View>
      {!_.isEmpty(error) && (
        <Text style={styles.errorStyle}>{error || " "}</Text>
      )}
    </View>
  );
};

TextFieldBorder.propTypes = {
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
  textFieldImage: PropTypes.object
};

TextFieldBorder.defaultProps = {
  style: {},
  reference: undefined,
  error: "",
  textFieldStyle: {},
  onPress: undefined,
  showDropDownIcon: false,
  onLayout: undefined,
  pointerEvents: undefined
};

export default TextFieldBorder;
