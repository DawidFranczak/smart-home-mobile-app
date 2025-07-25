import React from "react";
import { StyleSheet } from "react-native";
import { IButton } from "@/src/interfaces/IButton";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StyledLink from "@/src/ui/StyledLink";
import CardIconContainer from "@/src/ui/containers/CardIconContainer";
import EventButton from "@/src/ui/buttons/EventButton";

interface ButtonCardProps {
  button: IButton;
}

export default function ButtonCard({ button }: ButtonCardProps) {
  function handleHold() {
    console.log("hold");
  }
  function handleClick() {
    console.log("click");
  }
  return (
    <DeviceCardContainer
      isFavourite={button.is_favourite}
      name={button.name}
      wifiStrength={button.wifi_strength}
      isOnline={button.is_online}
      id={button.id}
    >
      <CardIconContainer extraStyles={styles.buttonContainer}>
        <EventButton onPress={handleHold} type="hold">HOLD</EventButton>
        <EventButton onPress={handleClick} type="click">CLICK</EventButton>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/Button/${button.id}/`}>
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
