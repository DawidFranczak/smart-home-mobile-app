import { StyleSheet, Text, View } from "react-native";
import { IAquarium } from "@/src/interfaces/IAquarium";
import React from "react";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StatusIndicator from "@/src/ui/StatusIndicator";
import StyledLink from "@/src/ui/StyledLink";
import CardIconContainer from "@/src/ui/containers/CardIconContainer";
import InfoCard from "@/src/ui/InfoCard";
import TimeRange from "@/src/ui/TimeRange";

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
      {aquarium.mode || (
        <CardIconContainer>
          <InfoCard style={styles.item} icon="💡">
            {aquarium.led_mode ? "ON" : "OFF"}
          </InfoCard>
          <InfoCard style={styles.item} icon="🔆">
            {aquarium.fluo_mode ? "ON" : "OFF"}
          </InfoCard>
          <InfoCard style={styles.item}  icon="🎨">
            <StatusIndicator
                color={`rgb(${aquarium.color_r},${aquarium.color_g},${aquarium.color_b})`}
            />
          </InfoCard>
          <InfoCard style={styles.item} icon="⚙️">
            {aquarium.mode ? "Automat" : "Manual"}
          </InfoCard>
        </CardIconContainer>
      )}
      {aquarium.mode && (
          <CardIconContainer extraStyles={styles.itemsContainer}>
            <InfoCard style={styles.modeActive} icon="💡">
              <TimeRange start={aquarium.led_start} end={aquarium.led_stop}/>
            </InfoCard>
            <InfoCard style={styles.modeActive} icon="🔆">
              <TimeRange start={aquarium.fluo_start} end={aquarium.fluo_stop}/>
            </InfoCard>
          </CardIconContainer>
      )}
      <StyledLink type="fancy" to={`/Aquarium/${aquarium.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
};

const styles = StyleSheet.create({
  itemsContainer:{
    flex:1,
    justifyContent:"space-around",
    flexDirection:'column',
    flexWrap:"nowrap",
  },
  modeActive:{
    flexDirection:"row",
    flex:1,

  },
  item:{
    width: '45%',
    aspectRatio:2,
  }
});

export default AquariumCard;
