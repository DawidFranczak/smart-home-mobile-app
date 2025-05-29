import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import textWithLights from "../styles/textWithLights";

interface HeaderProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export default function Header({ children, style }: HeaderProps) {
  return <Text style={[styles.basic, textWithLights, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  basic: {
    margin: 0,
    fontSize: 24,
  },
});
