import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import useRoomQuery from "@/src/hooks/queries/useRoomQuery";
import Button from "@/src/ui/Button";
import RoomCard from "@/src/components/Cards/RoomCard";
import { IRoom } from "@/src/interfaces/IRoom";
import { Query } from "@tanstack/react-query";
import QueryInput from "@/src/ui/QueryInput";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;

export default function Room() {
  const { roomData } = useRoomQuery(undefined) as { roomData: IRoom[] };
  const [query, setQuery] = useState<IRoom[]>([]);
  useEffect(() => {
    if (roomData) {
      setQuery(roomData);
    }
  }, [roomData]);
  const handleRoomQuery = (value: string) => {
    const filter = value.toLowerCase();
    const dataToDisplay = roomData.filter((room: IRoom) => {
      return room.name.toLowerCase().includes(filter);
    });
    setQuery(dataToDisplay);
  };
  return (
    <View style={styles.container}>
      <QueryInput onChange={handleRoomQuery} />
      <Button callback={() => {}}>Dodaj</Button>
      <FlatList
        numColumns={2}
        data={query}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <RoomCard room={item} />
          </View>
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
  item: {
    flex: 1 / 2,
  },
});
