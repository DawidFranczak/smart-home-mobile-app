import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IRoom } from "@/app/interfaces/IRoom";
import FavouriteStar from "../FavouriteStar";
import RoomVisibility from "../RoomVisibility";
import Header from "../../ui/Header";

interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isFavourite, setIsFavourite] = useState(room.is_favourite);
  const navigate = useRouter();

  const handleSelect = () => {
    navigate.push(`/(screen)/room/${room.id}/`);
  };

  const handleFavouriteClick = () => setIsFavourite(!isFavourite);

  return (
    <View style={styles.container}>
      <FavouriteStar
        isFavourite={isFavourite}
        onPress={handleFavouriteClick}
        id={room.id}
        type="room"
      />
      <RoomVisibility visibility={room.visibility} />
      <Header>{room.name}</Header>
      <Text>Aktywne urządzenia: {room.active_device_count}</Text>
      <Text>Wszystkie urządzenia: {room.device_count}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Wybierz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: 200,
    height: 200,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    transition: "0.4s ease-in-out",
    backdropFilter: "blur(5px)",
  },
  button: {
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  lock: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
