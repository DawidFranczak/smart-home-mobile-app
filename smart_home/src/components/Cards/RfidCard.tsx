import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { IRfid } from "@/src/interfaces/IRfid";
import DeviceEventDisplay from "../DeviceEventDisplay";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";

interface RfidCardProps {
  rfid: IRfid;
}

export default function RfidCard({ rfid }: RfidCardProps) {
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      <View style={styles.eventContainer}>
        {rfid.events?.map((event) => (
          <DeviceEventDisplay
            key={event.id}
            action={event.action}
            device={event.device}
            event={event.event}
          />
        ))}
      </View>
      <Text style={styles.tekst}>Ilość kart: {rfid.cards.length}</Text>
      <StyledLink type="button" to={`/rfid/${rfid.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  tekst: {
    color: color.text.primary,
  },
});
