import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IRoom } from "@/src/interfaces/IRoom";
import FavouriteStar from "../FavouriteStar";
import RoomVisibility from "../RoomVisibility";
import Header from "../../ui/Header";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";
import cardBackgroung from "@/src/styles/cardBackgroung";
interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isFavourite, setIsFavourite] = useState(room.is_favourite);
  const handleFavouriteClick = () => setIsFavourite(!isFavourite);

  return (
    <View style={cardBackgroung.container}>
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
      <StyledLink type="button" to={`/Room/${room.id}`}>
        Wybierz
      </StyledLink>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: color.text.primary,
  },
});
