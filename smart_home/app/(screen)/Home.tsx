import { useEffect, useState } from "react";
import { IRoom } from "../../src/interfaces/IRoom";
import { IDevice } from "../../src/interfaces/IDevice";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import useFavouriteQuery from "@/src/hooks/queries/useFavouriteQuery";
import QueryInput from "@/src/ui/QueryInput";
import RoomCard from "@/src/components/Cards/RoomCard";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import { FlatList } from "react-native";

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
    <>
      <QueryInput onChange={handleQueryChange} />

      <View style={styles.section}>
        <Text style={styles.title}>Pokoje</Text>
        <FlatList
          data={favouriteRoom}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <RoomCard key={item.id} room={item} />
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Urządzenia</Text>
        <FlatList
          data={favouriteDevice}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>{getDeviceComponent(item)}</View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
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
    width: (screenWidth - 40) / 2,
  },
});
