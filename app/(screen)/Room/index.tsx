import { FlatList, StyleSheet, View } from "react-native";
import RoomCard from "@/src/components/Cards/RoomCard";
import { IRoom } from "@/src/interfaces/IRoom";
import QueryInput from "@/src/ui/QueryInput";
import { useEffect, useState } from "react";
import StyledLink from "@/src/ui/StyledLink";
import usePrefetchRoomQuery from "@/src/hooks/queries/room/usePrefetchRoomQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import variables from "@/src/styles/variables";

export default function Room() {
  const { roomData }: { roomData: IRoom[] } = usePrefetchRoomQuery()
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
      <PageContainer>
        <PageHeader title="Pokoje" >
           <View style={styles.headerContainer} >
             <StyledLink type="fancy" to="/Room/AddRoom">Dodaj pokój</StyledLink>
             <QueryInput extraStyle={styles.queryInput} onChange={handleRoomQuery} />
           </View>
        </PageHeader>
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
      </PageContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    position:"relative",
    flexDirection:"row",
    width:"100%",
    gap:variables.spacing.sm,
  },
  queryInput:{
    // position:"absolute",
    // right:150,
    // top:0,
    // zIndex:50,
  },
  item: {
    flex: 1 / 2,
  },
});
