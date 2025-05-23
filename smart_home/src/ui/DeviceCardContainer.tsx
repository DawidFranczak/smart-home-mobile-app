import React, { useState } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import FavouriteStar from "../../src/components/FavouriteStar";
import Header from "../ui/Header";
import WifiStrength from "./WiFiStrength";

interface IDeviceCardContainerProps {
  isFavourite: boolean;
  name: string;
  wifiStrength: number;
  isOnline: boolean;
  id: number;
  children?: React.ReactNode;
}

export default function DeviceCardContainer({
  isFavourite,
  name,
  wifiStrength,
  isOnline,
  id,
  children,
}: IDeviceCardContainerProps) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  return (
    <View style={styles.card}>
      <Header>{name}</Header>

      <View style={styles.wifi}>
        <WifiStrength strength={isOnline ? wifiStrength : -100} />
      </View>

      <View style={styles.starContainer}>
        <Pressable onPress={() => setIsFavouriteState((prev) => !prev)}>
          <FavouriteStar isFavourite={isFavouriteState} id={id} type="device" />
        </Pressable>
      </View>

      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "95%",
    aspectRatio: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: 5,
    padding: 5,
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
  },
  starContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  wifi: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
