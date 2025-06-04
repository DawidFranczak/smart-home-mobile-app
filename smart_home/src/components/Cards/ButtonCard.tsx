import React from "react";
import { View, StyleSheet } from "react-native";
import DeviceEventDisplay from "../DeviceEventDisplay";
import { IButton } from "@/src/interfaces/IButton";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StyledLink from "@/src/ui/StyledLink";

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
        {button.events?.map((event) => (
          <DeviceEventDisplay
            key={event.id}
            action={event.action}
            device={event.device}
            event={event.event}
          />
        ))}
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
