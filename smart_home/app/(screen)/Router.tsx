import AddRouter from "@/src/components/AddRouter";
import useRouterQuery from "@/src/hooks/queries/useRouterQuery";
import color from "@/src/styles/color";
import textBackground from "@/src/styles/textBackground";
import DeviceContainer from "@/src/ui/DeviceContainer";
import { StyleSheet, Text, View } from "react-native";

export default function RouterPage() {
  const { routerData, status } = useRouterQuery();
  if (!routerData) return null;
  const data = routerData[0];
  if (status === 404) return <AddRouter />;
  return (
    <DeviceContainer
      name="Ruter"
      wifiStrength={0}
      isOnline={data.is_online}
      id={data.id}
      editable={false}
    >
      <View style={styles.container}>
        <View style={textBackground.background}>
          <Text style={styles.text}>IP: {data.ip}</Text>
          <Text style={styles.text}>Mac: {data.mac}</Text>
          <Text style={styles.text}>
            Przypisane urządzenia: {data.connected_devices}
          </Text>
          <Text style={styles.text}>
            Urządzenia aktywne: {data.online_device}
          </Text>
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
  },
  text: {
    width: "100%",
    color: color.text.primary,
    textAlign: "center",
  },
});
