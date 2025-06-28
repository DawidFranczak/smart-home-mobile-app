import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import { IRfid } from "@/src/interfaces/IRfid";
import color from "@/src/styles/color";
import StyledLink from "@/src/ui/StyledLink";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceEventDisplay from "../DeviceEventDisplay";

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
        {rfid.events &&
          rfid.events.map((event, inx) => {
            if (inx < 2) {
              return (
                <DeviceEventDisplay
                  key={event.id}
                  action={event.action}
                  device={event.device}
                  event={event.event}
                />
              );
            }
          })}
        {rfid.events && rfid.events.length > 3 && (
          <Text style={{ color: color.text.secondary }}>...</Text>
        )}
        {(!rfid.events || rfid.events.length === 0) && (
          <Text style={{ color: color.text.secondary }}>Brak zdarzeń</Text>
        )}
      </View>
      <Text style={styles.tekst}>Ilość kart: {rfid.cards.length}</Text>
      <StyledLink type="button" to={`/Rfid/${rfid.id}/`}>
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
