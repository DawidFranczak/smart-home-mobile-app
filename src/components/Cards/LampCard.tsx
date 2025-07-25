import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ILamp } from "@/src/interfaces/ILamp";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";
import CardIconContainer from "@/src/ui/containers/CardIconContainer";
import InfoCard from "@/src/ui/InfoCard";
import TimeRange from "@/src/ui/TimeRange";

function formatDate(date: string): string {
  return date.slice(0, 5);
}

interface LampCardProps {
  lamp: ILamp;
}

export default function LampCard({ lamp }: LampCardProps) {
  const navigate = useRouter();

  return (
    <DeviceCardContainer
      isFavourite={lamp.is_favourite}
      name={lamp.name}
      wifiStrength={lamp.brightness}
      isOnline={lamp.is_online}
      id={lamp.id}
    >
      <CardIconContainer>
        <InfoCard style={styles.card} icon="💡" >{lamp.brightness}%</InfoCard>
        <InfoCard style={styles.card} icon="⏱️" >{lamp.lighting_time} s</InfoCard>
        <InfoCard icon="📅"  style={styles.scheduleCard}>
          <TimeRange start={lamp.light_start} end={lamp.light_stop} />
        </InfoCard>
      </CardIconContainer>
      <StyledLink type="fancy" to={`/Lamp/${lamp.id}`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  card:{
    flex:1,
  },
  scheduleCard:{
    width:"100%",
    flexDirection:"row",
    flexWrap:"nowrap",
    justifyContent:"center",
    alignItems:"center",
  }
});
