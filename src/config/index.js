import { Text } from "react-native";
import DebugSettings from "./DebugSettings";
import AppConfig from "./AppConfig";

export default () => {
  if (__DEV__) {
    console.disableYellowBox = !DebugSettings.yellowBox;
  }

  // Allow/disallow font-scaling in app
  // Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling;

  Text.allowFontScaling = AppConfig.allowTextFontScaling; // Working!
  // new_solution
};
