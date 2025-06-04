import DeviceEventDisplay from "@/src/components/DeviceEventDisplay";
import useButtonQuery from "@/src/hooks/queries/useButtonQuery";
import { IEvent } from "@/src/interfaces/IEvent";
import textBackground from "@/src/styles/textBackground";
import DeviceContainer from "@/src/ui/DeviceContainer";
import StyledLink from "@/src/ui/StyledLink";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ButtonPage() {
  const params = useLocalSearchParams().id;
  const id = parseInt(params as string, 10);
  const { buttonData } = useButtonQuery(id);
  if (!buttonData) return <ActivityIndicator size="large" />;
  return (
    <DeviceContainer
      name={buttonData.name}
      wifiStrength={buttonData.wifi_strength}
      isOnline={buttonData.is_online}
      id={buttonData.id}
    >
      <View style={styles.container}>
        <View style={[styles.eventContainer, textBackground.background]}>
          {buttonData.events?.map((event: IEvent) => (
            <DeviceEventDisplay
              key={event.id}
              action={event.action}
              device={event.device}
              event={event.event}
              style={styles.eventText}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <StyledLink
            type="button"
            to={`/Wizard/Event/${buttonData.fun}/${buttonData.id}/`}
          >
            Ustawienia zdarzenia
          </StyledLink>
        </View>
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
  },
  eventContainer: {
    alignItems: "center",
  },
  eventText: {
    fontSize: 12,
  },
});
