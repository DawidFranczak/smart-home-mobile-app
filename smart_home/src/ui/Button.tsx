import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import color from "../styles/color";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button = ({ onPress, children, style, textStyle }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
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
    color: color.button.text,
    fontSize: 16,
  },
});

export default Button;
