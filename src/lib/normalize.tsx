import { Dimensions, Platform, PixelRatio } from "react-native";

export default function normalize(size: number) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  const scale: number = SCREEN_WIDTH / 320;
  let newSize: number = size * scale;

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
