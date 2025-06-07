import useUnassignedDeviceMutation from "@/src/hooks/queries/useUnassignedDeviceMutation";
import useUnassignedDeviceQuery from "@/src/hooks/queries/useUnassignedDeviceQuery";
import { IDevice } from "@/src/interfaces/IDevice";
import color from "@/src/styles/color";
import textBackground from "@/src/styles/textBackground";
import Button from "@/src/ui/Button";
import Header from "@/src/ui/Header";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AddDevice() {
  const roomId = Number(useLocalSearchParams().id);
  const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
  const { selectDevice } = useUnassignedDeviceMutation();
  const mutation = selectDevice();

  function addDevice(deviceId: number) {
    mutation.mutate({ deviceId, roomId });
  }
  if (!unassignedDeviceData) return null;
  return (
    <View style={styles.container}>
      <View style={[textBackground.background, styles.section]}>
        <Header style={styles.header}>Przypisz urządzenie</Header>
        {unassignedDeviceData.length === 0 && (
          <Text style={styles.text}>Brak nowo dodanych urządzeń</Text>
        )}
        {status === 200 &&
          unassignedDeviceData.map((device: IDevice) => (
            <View style={styles.row} key={device.id}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{device.fun}</Text>
                <Text style={styles.text}>
                  {device.last_seen.split("T")[1].slice(0, 5)}
                </Text>
              </View>
              <Button onPress={() => addDevice(device.id)}>Przypisz</Button>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  section: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    gap: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
  header: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 30,
  },
});
