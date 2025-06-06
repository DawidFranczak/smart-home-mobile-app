import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DeviceEventDisplay from "../DeviceEventDisplay";
import { IButton } from "@/src/interfaces/IButton";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";

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
        {button.events?.slice(0, 3).map((event) => (
          <DeviceEventDisplay
            key={event.id}
            action={event.action}
            device={event.device}
            event={event.event}
          />
        ))}
        {button.events && button.events.length > 3 && (
          <Text style={{ color: color.text.secondary }}>...</Text>
        )}
        {(!button.events || button.events.length === 0) && (
          <Text style={{ color: color.text.secondary }}>Brak zdarzeń</Text>
        )}
      </View>
      <StyledLink type="button" to={`/Button/${button.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
