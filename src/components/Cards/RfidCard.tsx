import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import { IRfid } from "@/src/interfaces/IRfid";
import color from "@/src/styles/color";
import StyledLink from "@/src/ui/StyledLink";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceEventDisplay from "../DeviceEventDisplay";
import CardIconContainer from "@/src/ui/containers/CardIconContainer";
import EventButton from "@/src/ui/buttons/EventButton";

interface RfidCardProps {
  rfid: IRfid;
}

export default function RfidCard({ rfid }: RfidCardProps) {
  function handleHold() {
    console.log("hold");
  }
  function handleClick() {
    console.log("click");
  }
  return (
    <DeviceCardContainer
      isFavourite={rfid.is_favourite}
      name={rfid.name}
      wifiStrength={rfid.wifi_strength}
      isOnline={rfid.is_online}
      id={rfid.id}
    >
      <CardIconContainer extraStyles={styles.buttonContainer}>
        <EventButton onPress={handleHold} type="hold">HOLD</EventButton>
        <EventButton onPress={handleClick} type="click">CLICK</EventButton>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/Rfid/${rfid.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection: "row",
    flexWrap:"nowrap",
    height:"75%"
  }
});
