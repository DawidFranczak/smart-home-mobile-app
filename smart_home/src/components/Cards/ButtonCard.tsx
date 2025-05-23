import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import DeviceEventDisplay from "../DeviceEventDisplay";
import { IButton } from "@/src/interfaces/IButton";
import DeviceCardContainer from "@/src/ui/DeviceCardContainer";

interface ButtonCardProps {
  button: IButton;
}

export default function ButtonCard({ button }: ButtonCardProps) {
  return (
    <DeviceCardContainer
      isFavourite={button.is_favourite}
      name={button.name}
      wifiStrength={button.wifi_strength}
      isOnline={button.is_online}
      id={button.id}
    >
      <View style={styles.eventsContainer}>
        <FlatList
          data={button.events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DeviceEventDisplay
              key={item.id}
              action={item.action}
              device={item.device}
              event={item.event}
            />
          )}
          contentContainerStyle={styles.eventsContainer}
        />
      </View>
      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Wybierz</Text>
      </TouchableOpacity>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  eventsContainer: {
    marginTop: 10,
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#00c8ff",
    borderRadius: 5,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
