import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  callback?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button = ({ callback, children, style, textStyle }: ButtonProps) => {
  return (
    <Pressable style={[styles.button, style]} onPress={callback}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    backgroundColor: "rgba(0, 191, 255, 0.75)",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});

export default Button;
