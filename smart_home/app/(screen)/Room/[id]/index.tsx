import { StyleSheet, View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import useRoomQuery from "@/src/hooks/queries/useRoomQuery";
import { IDevice } from "@/src/interfaces/IDevice";
import Button from "@/src/ui/Button";
import ButtonContainer from "@/src/ui/ButtonContainer";
import QueryInput from "@/src/ui/QueryInput";
import StyledLink from "@/src/ui/StyledLink";
import getDeviceComponent from "@/src/utils/getDeviceCard";

export default function SelectedRoom() {
  const param = useLocalSearchParams();
  const { roomData } = useRoomQuery(Number(param.id));
  const [filtratedData, setFiltratedData] = useState<IDevice[]>([]);

  useEffect(() => {
    if (!roomData) return;
    setFiltratedData(roomData.device);
  }, [roomData]);

  function handleFilter(value: string) {
    const filter = value.toLowerCase();
    const dataToDisplay = roomData.device.filter((device: IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setFiltratedData(dataToDisplay);
  }

  if (!roomData) return <View></View>;
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
