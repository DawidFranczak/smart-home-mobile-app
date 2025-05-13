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
        data={favouriteRoom}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={favouriteDevice}
        renderItem={({ item }) => getDeviceComponent(item)}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
