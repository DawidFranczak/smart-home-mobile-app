import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import DeviceCardContainer from "@/app/ui/DeviceCardContainer";
import { IRfid } from "@/app/interfaces/IRfid";
import DeviceEventDisplay from "../DeviceEventDisplay";
import StyledLink from "@/app/ui/StyledLink";

interface RfidCardProps {
  rfid: IRfid;
}

export default function RfidCard({ rfid }: RfidCardProps) {
  const navigate = useRouter();
  console.log(rfid);
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      <View style={styles.eventsContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text>Ilość kart: {rfid.cards.length}</Text>
          <StyledLink type="button" to={`/rfid/${rfid.id}/`}>
            Wybierz
          </StyledLink>
        </ScrollView>
      </View>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  eventsContainer: {},
  scrollContainer: {
    paddingBottom: 10,
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
});
