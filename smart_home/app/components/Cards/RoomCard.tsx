import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IRoom } from "@/app/interfaces/IRoom";
import FavouriteStar from "../FavouriteStar";
import RoomVisibility from "../RoomVisibility";
import Header from "../../ui/Header";
import StyledLink from "@/app/ui/StyledLink";

interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isFavourite, setIsFavourite] = useState(room.is_favourite);
  const handleFavouriteClick = () => setIsFavourite(!isFavourite);

  return (
    <View style={styles.container}>
      <FavouriteStar
        style={styles.favouriteStar}
        isFavourite={isFavourite}
        onPress={handleFavouriteClick}
        id={room.id}
        type="room"
      />
      <RoomVisibility style={styles.lock} visibility={room.visibility} />
      <Header>{room.name}</Header>
      <Text style={styles.tekst}>
        Aktywne urządzenia: {room.active_device_count}
      </Text>
      <Text style={styles.tekst}>
        Wszystkie urządzenia: {room.device_count}
      </Text>
      <StyledLink type="button" to={`/(screen)/room/${room.id}/`}>
        Wybierz
      </StyledLink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    aspectRatio: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: 5,
    padding: 5,
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
  },
  favouriteStar: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  lock: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  tekst: {
    color: "#00ffff",
  },
});
