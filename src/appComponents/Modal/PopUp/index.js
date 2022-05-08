import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";

import { Button, ButtonView, Text, Separator } from "../../../components";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../../theme";

export default class Dialogue extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isButton: PropTypes.bool,
    buttonTitle: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: "Title",
    description: "description",
    isButton: false,
    buttonTitle: "Title",
    leftButton: "No",
    rightButton: "Yes",
    onPress: () => null
  };

  state = {
    isVisible: false
  };

  show() {
    this.setState({ isVisible: true });
  }

  hide = () => {
    this.setState({
      isVisible: false
    });
  };
  _renderButton(title) {
    const { onPress } = this.props;
    return (
      <ButtonView onPress={onPress} style={[styles.buttonContainer]}>
        <Text type="reqular" color="black" size="normal">
          {title}
        </Text>
      </ButtonView>
    );
  }

  _renderModalContent(title, desc) {
    const { isButton, buttonTitle } = this.props;
    return (
      <View
        style={{
          borderRadius: 10,
          borderStyle: "solid",
          width: 343,
          height: 293,
          backgroundColor: Colors.background.primary
        }}
      >
        <View style={styles.modalContainer}>
          <Text type="medium" color="black" size="medium">
            {title}
          </Text>
          <Separator />
          <Text
            style={{ marginTop: 20 }}
            type="medium"
            color="purple"
            size="heading"
          >
            {desc}
          </Text>
        </View>
        {isButton ? this._renderButton(buttonTitle) : null}
      </View>
    );
  }

  render() {
    const { description, title } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
      >
        {/* this._renderModalContent(title, description) */}
        {this._renderModalContent("Your Trip", "$2.00")}
      </Modal>
    );
  }
}
