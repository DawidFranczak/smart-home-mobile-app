import { useEffect, useState } from "react";
import { IRoom } from "../../src/interfaces/IRoom";
import { IDevice } from "../../src/interfaces/IDevice";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import useFavouriteQuery from "@/src/hooks/queries/useFavouriteQuery";
import QueryInput from "@/src/ui/QueryInput";
import RoomCard from "@/src/components/Cards/RoomCard";
import getDeviceComponent from "@/src/utils/getDeviceCard";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const [favouriteRoom, setFavouriteRoom] = useState<IRoom[]>([]);
  const [favouriteDevice, setFavouriteDevice] = useState<IDevice[]>([]);
  const { favouriteData } = useFavouriteQuery();
  useEffect(() => {
    if (!favouriteData) return;
    setFavouriteRoom(favouriteData.rooms);
    setFavouriteDevice(favouriteData.devices);
  }, [favouriteData]);
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
  if (!favouriteDevice || !favouriteRoom) return null;
  return (
    <ScrollView style={styles.container}>
      <QueryInput onChange={handleQueryChange} />
      <View style={styles.section}>
        <Text style={styles.title}>Pokoje</Text>
        {favouriteRoom.map((room) => (
          <View key={room.id} style={styles.item}>
            <RoomCard room={room} />
          </View>
        ))}
        <Text style={styles.title}>Urządzenia</Text>
        {favouriteDevice.map((device) => (
          <View key={device.id} style={styles.item}>
            {getDeviceComponent(device)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
    marginBottom: 60,
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#0ff",
  },
  item: {
    width: (screenWidth - 5) / 2,
  },
});
