import React from "react";
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Href, useRouter } from "expo-router";
import color from "../styles/color";
import variables from "@/src/styles/variables";

interface IStyledLinkProps {
  children: React.ReactNode;
  to: string;
  type?: "primary"  | "success" | "danger"| "fancy";
  style?: ViewStyle;
}

export default function StyledLink({
  children,
  to,
  type = "primary",
  style,
}: IStyledLinkProps) {
  const navigate = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], style]}
      onPress={() => (to === "/" ? navigate.back() : navigate.push(to as any))}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: variables.spacing.xs,
    paddingLeft: variables.spacing.lg,
    paddingRight: variables.spacing.lg,
    borderRadius: variables.borderRadius.lg,
    justifyContent: "center",
  },
  fancy:{
    backgroundColor: '#00ffff',
    borderRadius: variables.borderRadius.lg,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    width: "100%",
    color: "black",
    fontSize: variables.typography.fontSize.sm,
    textAlign: "center",
  },
  primary: {
      backgroundColor: variables.colors.info,
  },
  danger: {
    backgroundColor: variables.colors.error,
  },
  success: {
    backgroundColor:variables.colors.success,
  }
});
