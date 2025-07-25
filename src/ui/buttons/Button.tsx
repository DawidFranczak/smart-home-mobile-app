import React from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import color from "../../styles/color";
import variables from "@/src/styles/variables";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  type?: "primary" | "secondary" | "success" | "danger"| "fancy" | "formPrimary" | "formSecondary";
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export default function Button ({ onPress, children, style, textStyle,type="primary" }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, styles[type], style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

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
  primary: {
    backgroundColor: variables.colors.info,
  },

  danger: {
    backgroundColor: variables.colors.error,
  },

  success: {
    backgroundColor: variables.colors.success,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  secondary: {
    backgroundColor: variables.colors.tertiaryBg,
    color: variables.colors.textPrimary,
    borderWidth: 1,
    borderColor: variables.colors.borderPrimary,
  },
  formPrimary: {
    backgroundColor: variables.colors.accentPrimary,
    color: variables.colors.primaryBg,
  },
  formSecondary: {
    backgroundColor: variables.colors.tertiaryBg,
    color: variables.colors.textPrimary,
    borderWidth: 1,
    borderColor: variables.colors.borderPrimary,
  },
  text: {
    width: "100%",
    color: "black",
    fontSize: variables.typography.fontSize.sm,
    textAlign: "center",
  },
});
