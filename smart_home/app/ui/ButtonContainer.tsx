import React from "react";
import { View, StyleSheet } from "react-native";

interface ButtonContainerProps {
  children: React.ReactNode;
}

export default function ButtonContainer({ children }: ButtonContainerProps) {
  return <View style={styles.buttonContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
