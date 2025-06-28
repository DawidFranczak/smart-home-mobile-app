import { FlatList, StyleSheet, View } from "react-native";
import useRoomQuery from "@/src/hooks/queries/useRoomQuery";
import RoomCard from "@/src/components/Cards/RoomCard";
import { IRoom } from "@/src/interfaces/IRoom";
import QueryInput from "@/src/ui/QueryInput";
import { useEffect, useState } from "react";
import StyledLink from "@/src/ui/StyledLink";

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
      <StyledLink to="/Room/AddRoom">Dodaj pokój</StyledLink>
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
