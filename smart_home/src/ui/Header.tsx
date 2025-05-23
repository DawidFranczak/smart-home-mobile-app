import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface HeaderProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export default function Header({ children, style }: HeaderProps) {
  return <Text style={[styles.basic, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  basic: {
    margin: 0,
    fontSize: 24,
    color: "black",
    textAlign: "center",

    textShadowColor: "rgb(0, 200, 255)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
});
