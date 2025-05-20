import React from "react";
import { Text, StyleSheet } from "react-native";

interface IDeviceEventProps {
  action: string;
  device: string;
  event: string;
}

export default function DeviceEventDisplay({
  action,
  device,
  event,
}: IDeviceEventProps) {
  return (
    <Text style={styles.eventText}>
      {event}-{action}-{device}
    </Text>
  );
}

const styles = StyleSheet.create({
  eventText: {
    fontSize: 10,
    color: "#00ffff",
    marginVertical: 5,
  },
});
