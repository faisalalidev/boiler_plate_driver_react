import Metrics from "./Metrics";

const type = {
  medium: "Roboto-Medium",
  regular: "Roboto-Regular"
};

const size = {
  xxxSmall: Metrics.generatedFontSize(10),
  xxSmall: Metrics.generatedFontSize(12),
  xSmall: Metrics.generatedFontSize(13),
  small: Metrics.generatedFontSize(15),
  normal: Metrics.generatedFontSize(16),
  medium: Metrics.generatedFontSize(18),
  large: Metrics.generatedFontSize(20),
  xLarge: Metrics.generatedFontSize(22),
  xxLarge: Metrics.generatedFontSize(28),
  xxxLarge: Metrics.generatedFontSize(50),
  heading: Metrics.generatedFontSize(59)
};

export default {
  type,
  size
};
