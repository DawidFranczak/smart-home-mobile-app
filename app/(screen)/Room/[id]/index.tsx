import {StyleSheet, View, FlatList, ActivityIndicator} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {useEffect, useMemo, useState} from "react";
import { IDevice } from "@/src/interfaces/IDevice";
import Button from "@/src/ui/buttons/Button";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import StyledLink from "@/src/ui/StyledLink";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import useRoomQuery from "@/src/hooks/queries/room/useRoomQuery";
import useDevicesQuery from "@/src/hooks/queries/device/useDevicesQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";

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

  // function handleFilter(value: string) {
  //   if (!devices) return;
  //
  //   const filter = value.toLowerCase();
  //   const dataToDisplay = devices.filter((device:IDevice) => {
  //     return device.name.toLowerCase().includes(filter);
  //   });
  //   setFiltratedData(dataToDisplay);
  // }


  if (!room) return <ActivityIndicator size={"large"}  />;
  return (
      <PageContainer>
        <PageHeader  title="Pokój" subtitle={room.name} >
          <ButtonContainer>
            <StyledLink type="fancy" to={`/Settings/room/${param.id}/`}>
              Edytuj
            </StyledLink>
            <StyledLink type="fancy" to={`/Room/${param.id}/AddDevice`}>
              Dodaj urządzenie
            </StyledLink>
          </ButtonContainer>
        </PageHeader>
        <FlatList
          numColumns={2}
          data={filtratedData}
          renderItem={({ item }) => (
            <View style={styles.item}>{getDeviceComponent(item)}</View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </PageContainer>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1 / 2,
  },
});
