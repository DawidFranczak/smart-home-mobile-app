import React from "react";
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Href, useRouter } from "expo-router";
import color from "../styles/color";

interface IStyledLinkProps {
  children: React.ReactNode;
  to: Href;
  type?: "button" | "link";
  style?: ViewStyle;
}

export default function StyledLink({
  children,
  to,
  type = "link",
  style,
}: IStyledLinkProps) {
  const navigate = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => (to === "/" ? navigate.back() : navigate.push(to))}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    backgroundColor: color.button.background,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    color: color.button.text,
    fontSize: 16,
    textAlign: "center",
  },
});
