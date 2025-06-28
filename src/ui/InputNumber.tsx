import React from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";

interface InputNumberProps {
  extraView?: ViewStyle;
  onChange?: (value: number) => void;
  value?: number;
}

const InputNumber = ({ value, onChange, extraView }: InputNumberProps) => {
  const handleChange = (text: string) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue)) {
      onChange && onChange(parsedValue);
    }
  };

  return (
    <View style={[styles.container, extraView]}>
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
    marginVertical: 10,
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00FFFF",
    backgroundColor: "#1a2a44dd",
    color: "#00FFFF",
    padding: 10,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default InputNumber;
