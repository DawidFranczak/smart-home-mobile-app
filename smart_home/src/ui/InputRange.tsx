import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Slider from "@react-native-community/slider";

interface IInputRangeProps {
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
  extraStyle?: ViewStyle;
}

const InputRange = ({
  onChange,
  min,
  max,
  value,
  extraStyle: className,
}: IInputRangeProps) => {
  return (
    <View style={[styles.container, className]}>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        value={value}
        onValueChange={(value) => onChange && onChange(value)}
        minimumTrackTintColor="#00FFFF"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#00FFFF"
      />
      {value !== undefined && <Text style={styles.value}>{value}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  value: {
    marginTop: 10,
    fontSize: 16,
    color: "#00FFFF",
  },
});

export default InputRange;
