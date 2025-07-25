import React from "react";
import { Image, StyleSheet, View, ImageStyle, ViewStyle } from "react-native";

interface WifiStrengthProps {
  strength: number;
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}

const getWifiIcon = (strength: number) => {
  if (strength <= -80) return require("../../assets/images/wifi_no.png");
  if (strength <= -60) return require("../../assets/images/wifi_low.png");
  if (strength <= -50) return require("../../assets/images/wifi_medium.png");
  return require("../../assets/images/wifi_perfect.png");
};

const getSignalClass = (strength: number) => {
  if (strength <= -80) return styles.offline;
  return "";
};

export default function WifiStrength({
  strength,
    size = "medium",
  style,
  imageStyle,
}: WifiStrengthProps) {
  const wifiIcon = getWifiIcon(strength);
  const signalClass = getSignalClass(strength);
  return (
    <View style={style}>
      <Image
        source={wifiIcon}
        style={[styles.image, styles[size], signalClass, imageStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    tintColor:"white"
  },
  small: {
    width: 20,
    height: 20,
  },
  medium: {
    width: 28,
    height: 28,
  },
  large: {
    width: 36,
    height: 36,
  },
  offline:{
    tintColor:"grey"
  }
});
