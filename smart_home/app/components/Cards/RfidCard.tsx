import React from "react";
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import DeviceCardContainer from "@/app/ui/DeviceCardContainer";
import { IRfid } from "@/app/interfaces/IRfid";
import DeviceEventDisplay from "../DeviceEventDisplay";
import StyledLink from "@/app/ui/StyledLink";

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
      <ScrollView contentContainerStyle={styles.eventContainer}>
        <FlatList
          data={rfid.events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DeviceEventDisplay
              key={item.id}
              action={item.action}
              device={item.device}
              event={item.event}
            />
          )}
        />
      </ScrollView>
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
    color: "#00ffff",
  },
});
