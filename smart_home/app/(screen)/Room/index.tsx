import { useState } from "react";

import useRoomQuery from "@/src/hooks/queries/useRoomQuery";
import Button from "@/src/ui/Button";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import RoomCard from "@/src/components/Cards/RoomCard";

export default function Room() {
  const [opneAddRoom, setOpneAddRoom] = useState<boolean>(false);
  const { roomData } = useRoomQuery(undefined);
  return (
    <View style={styles.container}>
      <Button callback={() => setOpneAddRoom(true)}>Dodaj</Button>
      {/* {opneAddRoom && <AddRoo onClose={() => setOpneAddRoom(false)} />} */}
      <FlatList
        numColumns={2}
        data={roomData}
        renderItem={({ item }) => (
          <View style={{ width: "50%" }}>
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
    marginBottom: 100,
  },
});
