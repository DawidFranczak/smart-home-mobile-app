import {StyleSheet, View, FlatList, ActivityIndicator} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {useEffect, useMemo, useState} from "react";
import { IDevice } from "@/src/interfaces/IDevice";
import Button from "@/src/ui/Button";
import ButtonContainer from "@/src/ui/ButtonContainer";
import QueryInput from "@/src/ui/QueryInput";
import StyledLink from "@/src/ui/StyledLink";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import useRoomQuery from "@/src/hooks/queries/room/useRoomQuery";
import useDevicesQuery from "@/src/hooks/queries/device/useDevicesQuery";

export default function SelectedRoom() {
  const param = useLocalSearchParams();
  const { room } = useRoomQuery(Number(param.id));
  const deviceIds = useMemo(()=>room?.device || [],[room?.device])
  const { devices } = useDevicesQuery(deviceIds);
  const [filtratedData, setFiltratedData] = useState<IDevice[]>([]);
  const memoizedDevices = useMemo(()=> devices, [JSON.stringify(devices)]);

  useEffect(() => {
    if (!memoizedDevices) return;
    setFiltratedData(memoizedDevices);
  }, [memoizedDevices]);

  function handleFilter(value: string) {
    if (!devices) return;

    const filter = value.toLowerCase();
    const dataToDisplay = devices.filter((device:IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }


  if (!room) return <ActivityIndicator size={"large"}  />;
  return (
    <View style={styles.container}>
      <QueryInput onChange={handleFilter} />
      <ButtonContainer>
        <Button>Edytuj</Button>
        <StyledLink type="button" to={`/Room/${param.id}/AddDevice`}>
          Dodaj urządzenie
        </StyledLink>
      </ButtonContainer>
      <FlatList
        numColumns={2}
        data={filtratedData}
        renderItem={({ item }) => (
          <View style={styles.item}>{getDeviceComponent(item)}</View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  deviceContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
  },
  item: {
    flex: 1 / 2,
  },
});
