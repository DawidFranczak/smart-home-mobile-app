import React, { useState } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import FavouriteStar from "./FavouriteStar";
import Header from "../ui/Header";
import WifiStrength from "../ui/WiFiStrength";
import cardBackgroung from "../styles/cardBackgroung";

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
  let isFavouriteState = isFavourite;
  return (
    <View style={cardBackgroung.container}>
      <Header>{name}</Header>

      <View style={styles.wifi}>
        <WifiStrength strength={isOnline ? wifiStrength : -100} />
      </View>

      <View style={styles.starContainer}>
        <Pressable onPress={() => (isFavouriteState = !isFavouriteState)}>
          <FavouriteStar isFavourite={isFavouriteState} id={id} type="device" />
        </Pressable>
      </View>

      {children}
    </View>
  );
}
const styles = StyleSheet.create({
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
