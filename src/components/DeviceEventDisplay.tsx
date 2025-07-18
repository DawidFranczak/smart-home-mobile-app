import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import color from "../styles/color";

interface IDeviceEventProps {
  action: string;
  device: string;
  event: string;
  style?: TextStyle;
}

export default function DeviceEventDisplay({
  action,
  device,
  event,
  style,
}: IDeviceEventProps) {
  return (
    <Text style={[styles.eventText, style]}>
      {event}-{action}-{device}
    </Text>
  );
}

const styles = StyleSheet.create({
  eventText: {
    fontSize: 10,
    color: color.text.secondary,
    marginVertical: 5,
  },
});
