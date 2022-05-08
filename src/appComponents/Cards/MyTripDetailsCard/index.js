// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Colors, Images, Metrics } from "../../../theme";
import { Text, Separator } from "../../../components";
import {
  CarDetailCell,
  RideStatusCell,
  GradientPolylines,
  DriveAddress
} from "../../";
import styles from "./styles";
import Utils from "../../../util";
import MapView, {
  ProviderPropType,
  Marker,
  Callout,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  Polyline
} from "react-native-maps";
import uber_style from "../../../theme/uber_style.json";
const COORDINATES = [
  { latitude: 37.8025259, longitude: -122.4351431 },
  { latitude: 37.7896386, longitude: -122.421646 },
  { latitude: 37.7665248, longitude: -122.4161628 },
  { latitude: 37.7734153, longitude: -122.4577787 },
  { latitude: 37.7948605, longitude: -122.4596065 },
  { latitude: 37.8025259, longitude: -122.4351431 }
];
const MyTripDetailsCard = (props: Object) => {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: 76,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width:
              Metrics.screenWidth -
              (Metrics.doubleBaseMargin + Metrics.baseMargin)
          }}
        >
          <Text color="aztec" size="xLarge" type="regular">
            Ride Details
          </Text>
          <Text color="aztec" size="xSmall" type="regular">
            Here you can see rides that you have completed.
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 60
        }}
      >
        <View
          style={{
            width:
              Metrics.screenWidth -
              (Metrics.doubleBaseMargin + Metrics.baseMargin)
          }}
        >
          <RideStatusCell
            date={Utils.dateFormatHandler(new Date())}
            time="5:30 PM"
            earning="$ 10.00+2.00 Tip"
            earningColor={Colors.appbutton.primary}
          />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width:
              Metrics.screenWidth -
              (Metrics.doubleBaseMargin + Metrics.baseMargin)
          }}
        >
          <Text color="aztec" size="xSmall" type="regular">
            Idea Space
          </Text>
          <Text color="aztec" size="xSmall" type="regular">
            9.57 mi
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "black", height: 209, width: "100%" }}>
        <GradientPolylines COORDINATES={COORDINATES} />
      </View>

      <View
        style={{
          height: 118,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <DriveAddress
          style={styles.myTripDriverAddress}
          startPoint="867 Boylston Street, 5th Floor, Boston"
          endPoint="30 Newbury St, 3rd Floor, Bosten,"
          navImage={Images.selectDestination}
          textColor={Colors.text.aztec}
        />
      </View>

      <Separator style={{ opacity: 0.4, marginHorizontal: 25 }} />
      <View
        style={{
          height: 110,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CarDetailCell star />
      </View>
      <Separator
        style={{ opacity: 0.4, marginBottom: 61, marginHorizontal: 25 }}
      />
    </ScrollView>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(MyTripDetailsCard);
