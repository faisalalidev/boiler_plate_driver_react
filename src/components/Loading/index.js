// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";
import { Colors } from "../../theme";

const Loader = (props: Object) => {
  const { loading } = props;
  return (
    <View>
      <StatusBar networkActivityIndicatorVisible={loading} />
      <Modal
        style={{ margin: 0 }}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        isVisible={loading}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      </Modal>
    </View>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool
};

Loader.defaultProps = {
  loading: false
};

export default Loader;
