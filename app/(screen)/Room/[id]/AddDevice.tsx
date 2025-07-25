import useUnassignedDeviceMutation from "@/src/hooks/queries/useUnassignedDeviceMutation";
import useUnassignedDeviceQuery from "@/src/hooks/queries/useUnassignedDeviceQuery";
import { IDevice } from "@/src/interfaces/IDevice";
import color from "@/src/styles/color";
import Button from "@/src/ui/buttons/Button";
import { useLocalSearchParams } from "expo-router";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import Tile from "@/src/ui/Tile";
import variables from "@/src/styles/variables";
import TilesContainer from "@/src/ui/containers/TilesContainer";

export default function AddDevice() {
  const roomId = Number(useLocalSearchParams().id);
  const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
  const { selectDevice } = useUnassignedDeviceMutation();
  const mutation = selectDevice();

  function addDevice(deviceId: number) {
    mutation.mutate({ deviceId, roomId });
  }
  if (!unassignedDeviceData) return <ActivityIndicator size="large" />;
  return (
      <PageContainer>
        <PageHeader title="Przypisz urządzenie"/>
        {(status === 404 || unassignedDeviceData.length === 0) &&
            <Text style={styles.noDevices}>Brak nowo dodanych urządzeń</Text>
        }
        <TilesContainer>
        {status === 200 &&
          unassignedDeviceData.map((device: IDevice) => (
              <Tile key={device.id}>
                <View style={styles.row}>
                  <Text style={styles.text}>{device.name}</Text>
                  <Text style={styles.textFun}>{device.fun}</Text>
                  <Text style={styles.text}>
                    {device.last_seen.split("T")[1].slice(0, 5)}
                  </Text>
                </View>
                <Button onPress={() => addDevice(device.id)}>Przypisz</Button>
              </Tile>
          ))}
        </TilesContainer>
      </PageContainer>
  );
}

const styles = StyleSheet.create({

  text: {
    fontSize: variables.typography.fontSize.sm,
    fontFamily: variables.typography.fontFamily,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
  textFun:{
    color: variables.colors.accentPrimary,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 15,
    backgroundColor: variables.colors.glassBg,
    paddingVertical: variables.spacing.md,
    paddingHorizontal: variables.spacing.md,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: variables.colors.glassBorder,
    borderRadius: variables.spacing.xsm,
  },
  noDevices: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: variables.spacing.xl,
    paddingHorizontal: variables.spacing.lg,
    marginHorizontal: variables.spacing.lg,
    marginVertical: variables.spacing.lg,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: variables.spacing.md,
    color: variables.colors.textSecondary,
    fontFamily: variables.typography.fontFamily,
    fontSize: variables.typography.fontSize.lg,
    fontWeight: '500',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
});
