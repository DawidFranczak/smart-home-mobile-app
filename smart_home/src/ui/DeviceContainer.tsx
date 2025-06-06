import React from "react";
import { View, StyleSheet } from "react-native";
import WifiStrength from "./WiFiStrength";
import ChangeName from "../components/ChangeName";
import Header from "./Header";
import InputText from "./InputText";

interface DeviceContainerProps {
  name: string;
  wifiStrength: number;
  isOnline: boolean;
  children: React.ReactNode;
  id: number;
  editable?: boolean;
}

export default function DeviceContainer({
  name,
  wifiStrength,
  isOnline,
  children,
  id,
  editable = true,
}: DeviceContainerProps) {
  return (
    <View style={styles.container}>
      <WifiStrength
        strength={isOnline ? wifiStrength : -100}
        style={styles.wifiPosition}
        imageStyle={styles.wifiIcon}
      />
      {editable ? (
        <ChangeName type="device" id={id}>
          <Header style={styles.header}>{name}</Header>
        </ChangeName>
      ) : (
        <Header style={styles.header}>{name}</Header>
      )}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
    width: 50,
    height: 50,
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
