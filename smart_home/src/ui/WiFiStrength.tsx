import React from "react";
import { Image, StyleSheet, View, ImageStyle, ViewStyle } from "react-native";

interface WifiStrengthProps {
  strength: number;
  style?: ViewStyle | ImageStyle;
}

const getWifiIcon = (strength: number) => {
  if (strength <= -80) return require("../../assets/images/wifi_no.png");
  if (strength <= -60) return require("../../assets/images/wifi_low.png");
  if (strength <= -50) return require("../../assets/images/wifi_medium.png");
  return require("../../assets/images/wifi_perfect.png");
};

export default function WifiStrength({ strength, style }: WifiStrengthProps) {
  const wifiIcon = getWifiIcon(strength);

  return (
    <View style={style}>
      <Image source={wifiIcon} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
