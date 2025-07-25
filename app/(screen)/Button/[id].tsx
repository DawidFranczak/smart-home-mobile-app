import DeviceEventDisplay from "@/src/components/DeviceEventDisplay";
import color from "@/src/styles/color";
import StyledLink from "@/src/ui/StyledLink";
import Tile from "@/src/ui/Tile";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import {IButton} from "@/src/interfaces/IButton";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import WifiStrength from "@/src/ui/WiFiStrength";
import TilesContainer from "@/src/ui/containers/TilesContainer";

export default function ButtonPage() {
  const params = useLocalSearchParams().id;
  const id = parseInt(params as string, 10);
  const { device } = useDeviceQuery(id);
  const buttonData = device as IButton;
  if (!buttonData) return <ActivityIndicator size="large" />;
  return (
      <PageContainer>
        <PageHeader>
          <ButtonContainer>
            <StyledLink type="fancy" to={`/Wizard/Event/button/${buttonData.id}/Add`}>
              Zdarzenia
            </StyledLink>
            <StyledLink type="fancy" to={`/Settings/button/${buttonData.id}/`}>
              Ustawienia
            </StyledLink>
            <WifiStrength strength={buttonData.is_online?buttonData.wifi_strength:-100} size="large"/>
          </ButtonContainer>
        </PageHeader>
        <TilesContainer>
          {buttonData.events?.map((event) => (
              <Tile key={event.id}>
                <DeviceEventDisplay
                    key={event.id}
                    event={event}
                />
              </Tile>
          ))}
        </TilesContainer>
      </PageContainer>
  );
}
// <View style={styles.container}>
//   <View style={[styles.eventContainer, textBackground.background]}>
//     {buttonData.events?.length === 0 && (
//         <Text style={styles.eventText}>Brak akcji</Text>
//     )}
//     {buttonData.events?.map((event: IEvent) => (
//         <DeviceEventDisplay
//             key={event.id}
//             action={event.action}
//             device={event.device}
//             event={event.event}
//             style={styles.eventText}
//         />
//     ))}
//   </View>
//   <View style={styles.buttonContainer}>
//     <StyledLink
//         type="button"
//         to={`/Wizard/Event/${buttonData.fun}/${buttonData.id}/`}
//     >
//       Ustawienia zdarzenia
//     </StyledLink>
//   </View>
// </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
});
