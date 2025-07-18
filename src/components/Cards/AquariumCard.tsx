import { Image, StyleSheet, Text, View } from "react-native";
import { IAquarium } from "@/src/interfaces/IAquarium";
import React from "react";
import DeviceCardContainer from "@/src/components/DeviceCardContainer";
import StatusIndicator from "@/src/ui/StatusIndicator";
import formatAquariumDate from "@/src/utils/formatAquariumDate";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";

interface AquariumCardProps {
  aquarium: IAquarium;
}

const AquariumCard: React.FC<AquariumCardProps> = ({ aquarium }) => {
  const ledImage = aquarium.led_mode
    ? require("../../../assets/images/led_on.png")
    : require("../../../assets/images/led_off.png");
  const fluoImage = aquarium.fluo_mode
    ? require("../../../assets/images/light_on.png")
    : require("../../../assets/images/light_off.png");
  const modeImage = aquarium.mode
    ? require("../../../assets/images/robot_on.png")
    : require("../../../assets/images/robot_off.png");
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
      <View style={styles.indicatorContainer}>
        <StatusIndicator
          color={`rgb(${aquarium.color_r},${aquarium.color_g},${aquarium.color_b})`}
        ></StatusIndicator>
        <Image source={ledImage} style={styles.image} />
        <Image source={fluoImage} style={styles.image} />
      </View>
      <Image source={modeImage} style={styles.image} />

      {aquarium.mode && (
        <>
          <View style={styles.tekst}>
            <Image source={ledImage} style={styles.image} />
            <Text style={styles.tekst}>
              {formatAquariumDate(aquarium.led_start)} -{" "}
              {formatAquariumDate(aquarium.led_stop)}
            </Text>
          </View>
          <View style={styles.tekst}>
            <Image source={fluoImage} style={styles.image} />
            <Text style={styles.tekst}>
              {formatAquariumDate(aquarium.fluo_start)} -{" "}
              {formatAquariumDate(aquarium.fluo_stop)}
            </Text>
          </View>
        </>
      )}
      <StyledLink type="button" to={`/Aquarium/${aquarium.id}/`}>
        Wybierz
      </StyledLink>
    </DeviceCardContainer>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  tekst: {
    flexDirection: "row",
    color: color.text.primary,
  },
  image: { width: 24, height: 24 },
});

export default AquariumCard;
