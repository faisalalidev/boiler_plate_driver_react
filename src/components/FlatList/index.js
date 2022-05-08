// @flow


import Util from "../../util";
import React from "react";
import PropTypes from "prop-types";
import { Separator } from "@components";
import { FlatList as FlatListRN } from "react-native";

const FlatList = (props: Object) => {
  const { ...rest } = props;
  return <FlatListRN {...rest} />;
};

FlatList.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  ItemSeparatorComponent: PropTypes.func
};

FlatList.defaultProps = {
  keyExtractor: Util.keyExtractor,
  ItemSeparatorComponent: () => <Separator />
};

export default FlatList;
