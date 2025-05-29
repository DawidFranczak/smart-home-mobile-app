import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import color from "../styles/color";

interface IStyledLinkProps {
  children: React.ReactNode;
  to: string;
  type?: "button" | "link";
}

export default function StyledLink({
  children,
  to,
  type = "link",
}: IStyledLinkProps) {
  const navigate = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigate.push(to)}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<{
  base: ViewStyle;
  link: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
}>({
  base: {},
  link: {},
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    backgroundColor: color.button.background,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    color: color.button.text,
    fontSize: 16,
  },
});
