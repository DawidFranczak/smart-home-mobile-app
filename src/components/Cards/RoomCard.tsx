import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IRoom } from "@/src/interfaces/IRoom";
import FavouriteStar from "../FavouriteStar";
import RoomVisibility from "../RoomVisibility";
import Header from "../../ui/headers/Header";
import StyledLink from "@/src/ui/StyledLink";
import color from "@/src/styles/color";
import cardBackgroung from "@/src/styles/cardBackgroung";
import CardIconContainer from "@/src/ui/containers/CardIconContainer";
import InfoCard from "@/src/ui/InfoCard";
import variables from "@/src/styles/variables";
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
        <CardIconContainer>
            <InfoCard style={styles.item}>
                <Text >Aktywne : {room.active_device_count}</Text>
            </InfoCard>
            <InfoCard style={styles.item}>
                <Text>Wszystkie : {room.device_count}</Text>
            </InfoCard>
        </CardIconContainer>
        <StyledLink type="fancy" to={`/Room/${room.id}`}>
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
        zIndex: 2
    },
    item: {
        width: '100%',
        height: 40,
        margin: 4,
        backgroundColor: variables.colors.glassBg,
    },
    lock: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 2
    },
    tekst: {
        color: color.text.primary,
    },
});
