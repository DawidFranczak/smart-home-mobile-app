import DeviceEventDisplay from "@/src/components/DeviceEventDisplay";
import { IEvent } from "@/src/interfaces/IEvent";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import StyledLink from "@/src/ui/StyledLink";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet} from "react-native";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import {IRfid} from "@/src/interfaces/IRfid";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import WifiStrength from "@/src/ui/WiFiStrength";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";

export default function RfidPage() {
  const params: { id: string } = useLocalSearchParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { device } = useDeviceQuery(id);
  const rfidData = device as IRfid;

  if (!rfidData) return <ActivityIndicator size="large" />;
  return (
      <PageContainer>
        <PageHeader>
          <ButtonContainer style={styles.buttonContainer}>
            <StyledLink type="fancy" to={`/Rfid/${rfidData.id}/Card/`}>
              Karty
            </StyledLink>
            <StyledLink
                type="fancy"
                to={`/Wizard/Event/${rfidData.fun}/${rfidData.id}/Add/`}
            >
              Zdarzenia
            </StyledLink>
            <StyledLink type="fancy" to={`/Settings/rfid/${rfidData.id}/`}>
              Ustawienia
            </StyledLink>
            <WifiStrength strength={rfidData.is_online?rfidData.wifi_strength:-100} size="large"/>
          </ButtonContainer>
        </PageHeader>
        <TilesContainer>
          {rfidData.events?.map((event:IEvent) => (
              <Tile extraStyles={styles.tile} key={event.id}>
                <DeviceEventDisplay
                    key={`event-${event.id}`}
                    event={event}
                />
              </Tile>
          ))}
        </TilesContainer>
      </PageContainer>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  tile: {
    paddingTop: 10,
  },
});
