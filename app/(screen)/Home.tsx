import {useEffect, useMemo, useState} from "react";
import { IRoom } from "../../src/interfaces/IRoom";
import { IDevice } from "../../src/interfaces/IDevice";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import useFavouriteQuery from "@/src/hooks/queries/useFavouriteQuery";
import QueryInput from "@/src/ui/QueryInput";
import RoomCard from "@/src/components/Cards/RoomCard";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import cardBackgroung from "@/src/styles/cardBackgroung";
import textWithLights from "@/src/styles/textWithLights";
import Loading from "@/src/components/Loading";
import useDevicesQuery from "@/src/hooks/queries/device/useDevicesQuery";
import useRoomsQuery from "@/src/hooks/queries/room/useRoomsQuery";
import PageContainer from "@/src/ui/PageContainer";
import PageHeader from "@/src/ui/PageHeader";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const { favouriteData } = useFavouriteQuery();
  const { devices } = useDevicesQuery(favouriteData?.devices || []);
  const { rooms } = useRoomsQuery(favouriteData?.rooms || []);
  const [favouriteRoom, setFavouriteRoom] = useState<IRoom[]>([]);
  const [favouriteDevice, setFavouriteDevice] = useState<IDevice[]>([]);
  const memoizedDevices = useMemo(()=> devices, [JSON.stringify(devices)]);
  const memoizedRooms = useMemo(()=> rooms, [JSON.stringify(rooms)]);

  useEffect(() => {
    if (devices) setFavouriteDevice(devices);
    if (rooms) setFavouriteRoom(rooms);
  }, [ memoizedDevices, memoizedRooms]);

  function handleQueryChange(query: string) {
    setFavouriteDevice(
      favouriteData.devices.filter((device: IDevice) => {
        return device.name.toLowerCase().includes(query.toLowerCase());
      })
    );
    setFavouriteRoom(
      favouriteData.rooms.filter((room: IRoom) => {
        return room.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }
  if (!favouriteDevice || !favouriteRoom) return <Loading />;
  return (
      <PageContainer>
        <PageHeader title="Dashboard" subtitle="Witaj z powrotem w Smart Home">
          <QueryInput onChange={handleQueryChange} />
        </PageHeader>
          <ScrollView>
            <View style={styles.section}>
              {favouriteRoom.map((room) => (
                <View key={room.id} style={styles.item}>
                  <RoomCard room={room} />
                </View>
              ))}
              {favouriteDevice.map((device) => (
                <View key={device.id} style={styles.item}>
                  {getDeviceComponent(device)}
                </View>
              ))}
            </View>
          </ScrollView>
      </PageContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
  },
  item: {
    width: screenWidth / 2,
  },
});
