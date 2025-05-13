import React from "react";
import { Image, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

interface NavbarIconProps {
  onClick?: () => void;
  svg: string;
  extraStyle?: ViewStyle;
}

export default function NavbarIcon({
  onClick,
  svg,
  extraStyle,
}: NavbarIconProps) {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.icon, extraStyle]}>
      <Image source={{ uri: svg }} style={styles.iconImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    cursor: "pointer",
    transition: "transform 0.4s ease-in-out",
  },
  iconImage: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
});
