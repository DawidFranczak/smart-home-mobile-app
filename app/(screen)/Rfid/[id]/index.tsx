import DeviceEventDisplay from "@/src/components/DeviceEventDisplay";
import { IEvent } from "@/src/interfaces/IEvent";
import color from "@/src/styles/color";
import textBackground from "@/src/styles/textBackground";
import ButtonContainer from "@/src/ui/ButtonContainer";
import DeviceContainer from "@/src/ui/DeviceContainer";
import StyledLink from "@/src/ui/StyledLink";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import {IRfid} from "@/src/interfaces/IRfid";

export default function RfidPage() {
  const params: { id: string } = useLocalSearchParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { device } = useDeviceQuery(id);
  const rfidData = device as IRfid;

  if (!rfidData) return <ActivityIndicator size="large" />;
  return (
    <DeviceContainer
      name={rfidData.name}
      wifiStrength={rfidData.wifi_strength}
      isOnline={rfidData.is_online}
      id={rfidData.id}
    >
      <View style={styles.container}>
        <View style={[styles.eventContainer, textBackground.background]}>
          {rfidData.events?.length === 0 && (
            <Text style={styles.eventText}>Brak akcji</Text>
          )}
          {rfidData.events?.map((event: IEvent) => (
            <DeviceEventDisplay
              key={event.id}
              action={event.action}
              device={event.device}
              event={event.event}
              style={styles.eventText}
            />
          ))}
        </View>
        <ButtonContainer style={styles.buttonContainer}>
          <StyledLink type="button" to={`/Rfid/${rfidData.id}/Card/`}>
            Karty
          </StyledLink>
          <StyledLink
            type="button"
            to={`/Wizzard/Event/${rfidData.fun}/${rfidData.id}/`}
          >
            Ustawienia zdarzenia
          </StyledLink>
        </ButtonContainer>
      </View>
    </DeviceContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 60,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    gap: 10,
    flexDirection: "column",
  },
  eventContainer: {
    alignItems: "center",
  },
  eventText: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
});
