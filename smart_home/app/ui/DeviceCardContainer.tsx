import React, { useState } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import FavouriteStar from "../components/FavouriteStar";
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

      {/* WifiStrength – po lewej na górze */}
      <View style={styles.wifi}>
        <WifiStrength strength={isOnline ? wifiStrength : -100} />
      </View>

      {/* FavouriteStar – po prawej na górze */}
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
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
    height: 250,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    overflow: "hidden",
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
