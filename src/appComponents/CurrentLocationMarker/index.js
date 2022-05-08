import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Metrics, Colors, Images, Fonts } from "../../theme";

const CurrentLocationMarker = props => {
  return props.isVisible ? (
    <Marker.Animated
      identifier={"currLocation"}
      coordinate={props.coordinate}
      flat={true}
      anchor={{ x: 0.5, y: 0.5 }}
      // image={props.markerImage}
    >
      {/* props.duration && props.callout ? */}
      {/* <Image source={Images.mapCar} /> */}
      <ImageBackground
        source={Images.pinTime}
        style={{
          width: 65,
          height: 36,
          paddingTop: 10
        }}
      >
        <View
          style={{
            position: "absolute",
            color: "black",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Text size="normal" color="purple" type="regular">
            {props.duration}
          </Text>
          <Text size="small" color="black" type="regular">
            {" "}
            mins
          </Text>
        </View>
      </ImageBackground>
    </Marker.Animated>
  ) : null;
};

export default CurrentLocationMarker;