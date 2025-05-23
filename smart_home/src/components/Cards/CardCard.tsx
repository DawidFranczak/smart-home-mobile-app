import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ICard } from "../../interfaces/IRfid";
import ConfirmDelete from "../ConfirmDelete";
import useCardMutation from "../../hooks/queries/useCardMutation";
import Header from "../../ui/Header";
import formatDate from "@/src/utils/formatDate";
interface CardCardProps {
  card: ICard;
}

export default function CardCard({ card }: CardCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutationDelete } = useCardMutation();
  const mutation = mutationDelete(card.id);

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Header style={styles.headerName}>{card.name}</Header>
        <TouchableOpacity onPress={() => setConfirmDelete(true)}>
          <Image
            source={require("../../../assets/images/delete.png")}
            style={styles.delete}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lastUsed}>
        <Text>Ostatnie użycie:</Text>
        <Text>{formatDate(card.last_used)}</Text>
      </View>
      {confirmDelete && (
        <ConfirmDelete
          name={card.name}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(5px)",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  headerName: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
  },
  delete: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  deleteHovered: {
    transform: "scale(1.2)",
  },
  lastUsed: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
