import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import textWithLights from "../../styles/textWithLights";
import variables from "@/src/styles/variables";

interface HeaderProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  type?: "small"|"medium"| "large";
}

export default function Header({ children, style, type="medium" }: HeaderProps) {
  return <Text style={[styles.basic, styles[type], style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  basic: {
    margin: 0,
    padding: 0,
    fontWeight: 700,
    textAlign: "center",
    color: variables.colors.accentPrimary,
    textShadowColor:variables.colors.accentPrimary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius:10,
  },
  small: {
    fontSize: variables.typography.fontSize.sm,
  },
  medium: {
    fontSize: variables.typography.fontSize.xl,
  },
  large: {
    fontSize: variables.typography.fontSize.xxxl,
  },
});
