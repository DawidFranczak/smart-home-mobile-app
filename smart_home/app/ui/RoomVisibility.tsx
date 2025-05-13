import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

interface RoomVisibilityProps {
  visibility: "public" | "private";
  extraStyle?: ViewStyle;
}

export default function RoomVisibility({
  visibility,
  extraStyle,
}: RoomVisibilityProps) {
  const lockImage =
    visibility === "public"
      ? require("../../assets/images/lock_unlocked.png")
      : require("../../assets/images/lock_locked.png");

  return (
    <View style={[styles.container, extraStyle]}>
      <Image source={lockImage} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 24,
    height: 24,
  },
});
