import React from "react";
import { View, StyleSheet } from "react-native";
import WifiStrength from "./WiFiStrength";
import ChangeName from "../components/ChangeName";
import Header from "./Header";
import DeviceEventDisplay from "../components/DeviceEventDisplay";

interface IEvent {
  id: number;
  action: string;
  device: string;
  event: string;
}

interface DeviceContainerProps {
  name: string;
  wifiStrength: number;
  isOnline: boolean;
  children: React.ReactNode;
  id: number;
  events?: IEvent[];
}

export default function DeviceContainer({
  name,
  wifiStrength,
  isOnline,
  children,
  id,
  events,
}: DeviceContainerProps) {
  return (
    <View style={styles.container}>
      <WifiStrength
        strength={isOnline ? wifiStrength : -100}
        style={styles.wifiIcon}
      />
      <ChangeName type="device" id={id}>
        <Header style={styles.header}>{name}</Header>
      </ChangeName>
      {events?.map((event) => (
        <DeviceEventDisplay
          key={event.id}
          action={event.action}
          device={event.device}
          event={event.event}
        />
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wifiIcon: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  header: {
    marginTop: 30,
  },
});
