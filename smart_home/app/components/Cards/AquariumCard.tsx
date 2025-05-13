import { IAquarium } from "@/app/interfaces/IAquarium";
import DeviceCardContainer from "@/app/ui/DeviceCardContainer";
import StatusIndicator from "@/app/ui/StatusIndicator";
import StyledLink from "@/app/ui/StyledLink";
import formatAquariumDate from "@/app/utils/formatAquariumDate";
import React from "react";
import { Text, View } from "react-native";

interface AquariumCardProps {
  aquarium: IAquarium;
}

const AquariumCard: React.FC<AquariumCardProps> = ({ aquarium }) => {
  if (!aquarium) {
    return <View>Brak danych akwarium</View>;
  }

  return (
    <DeviceCardContainer
      isFavourite={aquarium.is_favourite}
      isOnline={aquarium.is_online}
      wifiStrength={aquarium.wifi_strength}
      name={aquarium.name}
      id={aquarium.id}
    >
      <View>
        <StatusIndicator
          color={`rgb(${aquarium.color_r},${aquarium.color_g},${aquarium.color_b})`}
        >
          Kolor ledów
        </StatusIndicator>
        <StatusIndicator color={aquarium.led_mode ? "green" : "red"}>
          Ledy
        </StatusIndicator>
        <StatusIndicator color={aquarium.fluo_mode ? "green" : "red"}>
          Świetlówka
        </StatusIndicator>
      </View>
      <Text>{aquarium.mode ? "Automat" : "Manual"}</Text>
      {aquarium.mode && (
        <>
          <Text>
            Ledy {formatAquariumDate(aquarium.led_start)} -{" "}
            {formatAquariumDate(aquarium.led_stop)}
          </Text>
          <Text>
            Świetlówka {formatAquariumDate(aquarium.fluo_start)} -{" "}
            {formatAquariumDate(aquarium.fluo_stop)}
          </Text>
        </>
      )}
      <StyledLink type="button" to={`/aquarium/${aquarium.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
};

export default AquariumCard;
