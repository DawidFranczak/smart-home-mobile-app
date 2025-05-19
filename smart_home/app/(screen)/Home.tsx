import { useEffect, useState } from "react";
import useFavouriteQuery from "../hooks/queries/useFavouriteQuery";
import { IRoom } from "../interfaces/IRoom";
import { IDevice } from "../interfaces/IDevice";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import getDeviceComponent from "../utils/getDeviceCard";
import RoomCard from "../components/Cards/RoomCard";
export default function Home() {
  const [favouriteRoom, setFavouriteRoom] = useState<IRoom[]>([]);
  const [favouriteDevice, setFavouriteDevice] = useState<IDevice[]>([]);
  const { favouriteData } = useFavouriteQuery();
  useEffect(() => {
    if (!favouriteData) return;
    setFavouriteRoom(favouriteData.rooms);
    setFavouriteDevice(favouriteData.devices);
  }, [favouriteData]);
  if (!favouriteDevice || !favouriteRoom) return null;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.item}
        data={favouriteRoom}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        style={styles.item}
        data={favouriteDevice}
        renderItem={({ item }) => getDeviceComponent(item)}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "50%",
  },
});
