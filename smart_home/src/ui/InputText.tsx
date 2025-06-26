import React, { RefObject } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import color from "../styles/color";

interface InputNumberProps {
  viewStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  autoFocus?: boolean;
  ref?: RefObject<TextInput | null>;
  secureTextEntry?: boolean;
}

export default function InputText({
  value,
  onChange,
  viewStyle,
  inputStyle,
  placeholder,
  autoFocus,
  ref,
  secureTextEntry = false,
}: InputNumberProps) {
  return (
    <View style={[styles.container, viewStyle]}>
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={color.text.secondary}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00FFFF",
    backgroundColor: "#1a2a44dd",
    color: color.text.primary,

    padding: 10,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
