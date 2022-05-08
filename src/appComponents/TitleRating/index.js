// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text } from "../../components";
import styles from "./styles";

const TitleRating = (props: Object) => {
  const { title, rating, image } = props;
  return (
    <View style={styles.container}>
      <Text size="xSmall" color="darkestGrey" type="regular">
        {title}
      </Text>
      <Text size="xSmall" color="darkestGrey" type="regular">
        {rating}
      </Text>
      <View
        style={{
          height: 20,
          width: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={image} resizeMode="contain" />
      </View>
    </View>
  );
};

TitleRating.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.string,
  image: PropTypes.object
};

TitleRating.defaultProps = {
  image: {}
};

export default TitleRating;
