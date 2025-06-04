import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ButtonContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ButtonContainer({
  children,
  style,
}: ButtonContainerProps) {
  return <View style={[styles.buttonContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
