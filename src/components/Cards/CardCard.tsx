import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ICard } from "../../interfaces/IRfid";
import useCardMutation from "../../hooks/queries/useCardMutation";
import Header from "../../ui/Header";
import formatDate from "@/src/utils/formatDate";
import textBackground from "@/src/styles/textBackground";
import color from "@/src/styles/color";
import ConfirmDelete from "../ConfirmDelete";
interface CardCardProps {
  card: ICard;
}
export default function CardCard({ card }: CardCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutationDelete } = useCardMutation();
  const mutation = mutationDelete(card.id);

  const handleDelete = () => {
    mutation.mutate();
    setConfirmDelete(false);
  };
  return (
    <View style={[styles.card, textBackground.background]}>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => setConfirmDelete(true)}
      >
        <Image
          source={require("../../../assets/images/delete.png")}
          style={styles.delete}
        />
      </TouchableOpacity>
      <Header>{card.name}</Header>
      <View style={styles.lastUsed}>
        <Text style={styles.text}>Ostatnie użycie</Text>
        <Text style={styles.text}>{formatDate(card.last_used)}</Text>
      </View>
      <ConfirmDelete
        name={card.name}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
        visible={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 10,
  },
  lastUsed: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  text: {
    color: color.text.primary,
  },
  delete: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 24,
    height: 24,
  },
});
