import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
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
        onValueChange={(value) => onChange && onChange(Math.floor(value))}
        minimumTrackTintColor="#00FFFF"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#FFFF00"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "80%",
  },
});

export default InputRange;
