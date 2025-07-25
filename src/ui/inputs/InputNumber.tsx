import React from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
import {Text} from "@react-navigation/elements";
import variables from "@/src/styles/variables";

interface InputNumberProps {
  extraView?: ViewStyle;
  onChange?: (value: number) => void;
  value?: number;
  label?: string
}

const InputNumber = ({ value, onChange, extraView,label }: InputNumberProps) => {
  const handleChange = (text: string) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue)) {
      onChange && onChange(parsedValue);
    }
  };

  return (
    <View style={[styles.container, extraView]}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value?.toString()}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    marginTop:variables.spacing.xsm,
    width: "100%",
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
    backgroundColor: variables.colors.primaryBg,
    borderWidth:2,
    borderStyle:"solid",
    borderColor:variables.colors.borderAccent,
    borderRadius:variables.borderRadius.md,
    color: variables.colors.accentPrimary,
    textAlign: "center",
  },
  text: {
    color: variables.colors.accentPrimary,
    fontSize: variables.typography.fontSize.xl,
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
    textAlign: "center",
  },
});

export default InputNumber;
