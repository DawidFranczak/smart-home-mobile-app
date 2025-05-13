import React, { useState, useEffect } from "react";
import { TextInput, View, Text, StyleSheet, ViewStyle } from "react-native";

interface InputTimeProps {
  initialTime: string;
  onChange: (time: string) => void;
  extraStyle?: ViewStyle;
}

const InputTime = ({ initialTime, onChange, extraStyle }: InputTimeProps) => {
  const [data, setData] = useState(initialTime);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const updateTime = (text: string) => {
    // Ensure the time is formatted correctly (HH:mm)
    const formattedTime = text.slice(0, 5);
    setData(formattedTime);
  };

  return (
    <View style={[styles.container, extraStyle]}>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={updateTime}
        maxLength={5}
        placeholder="HH:mm"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00FFFF",
    backgroundColor: "#1a2a44dd",
    color: "#00FFFF",
    padding: 5,
    fontSize: 18,
    width: "100%",
  },
});

export default InputTime;
