// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 78,
    padding: Metrics.doubleBaseMargin
  },
  dayHeadContainer: {
    height: 78,
    backgroundColor: Colors.background.grey,
    justifyContent: "center",
    paddingLeft: 45
  },
  subContainer: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 54
  },
  separator: {
    marginHorizontal: 13,
    backgroundColor: Colors.background.grey
  },
  listItemSubContainer: {
    flex: 5,
    justifyContent: "space-between",
    height: 37
  }
});
