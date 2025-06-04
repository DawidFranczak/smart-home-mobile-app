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
}

export default function DeviceContainer({
  name,
  wifiStrength,
  isOnline,
  children,
  id,
}: DeviceContainerProps) {
  return (
    <View style={styles.container}>
      <WifiStrength
        strength={isOnline ? wifiStrength : -100}
        style={styles.wifiPosition}
        imageStyle={styles.wifiIcon}
      />
      <ChangeName type="device" id={id}>
        <Header style={styles.header}>{name}</Header>
      </ChangeName>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wifiPosition: {
    position: "absolute",
    top: 20,
    right: 30,
  },
  wifiIcon: {
    width: 40,
    height: 40,
  },
  header: {
    marginTop: 30,
    textAlign: "center",
  },
});
