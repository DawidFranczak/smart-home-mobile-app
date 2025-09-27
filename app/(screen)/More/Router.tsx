import AddRouter from "@/src/components/AddRouter";
import useRouterQuery from "@/src/hooks/queries/useRouterQuery";
import { StyleSheet, Text, View } from "react-native";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import WifiStrength from "@/src/ui/WiFiStrength";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";
import variables from "@/src/styles/variables";

export default function RouterPage() {
  const { routerData, status } = useRouterQuery();
  if (!routerData) return null;
  const data = routerData[0];
  if (status === 404) return <AddRouter />;
  return (
      <PageContainer>
        <PageHeader title="Router" >
          <WifiStrength strength={data.is_online ? 0 : -100} size="large" />
        </PageHeader>
          <TilesContainer>
            <Tile>
              <Text style={styles.text}>IP:</Text>
              <Text style={styles.textData}>{data.ip}</Text>
            </Tile>
            <Tile>
              <Text style={styles.text}>Mac:</Text>
              <Text style={styles.textData}>{data.mac}</Text>
            </Tile>
            <Tile>
              <Text style={styles.text}>
                Przypisane urządzenia:
              </Text>
              <Text style={styles.textData}>{data.connected_devices}</Text>
            </Tile>
            <Tile>
              <Text style={styles.text}>
                Urządzenia aktywne:
              </Text>
              <Text style={styles.textData}>{data.online_device}</Text>
            </Tile>
          </TilesContainer>
      </PageContainer>
  );
}
const styles = StyleSheet.create({
  text: {
    width: "100%",
    color: variables.colors.textSecondary,
    marginBottom:variables.spacing.md,
    textAlign: "center",
  },
  textData:{
    color:"white",
  }
});
