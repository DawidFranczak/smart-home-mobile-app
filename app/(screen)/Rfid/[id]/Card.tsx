import CardCard from "@/src/components/Cards/CardCard";
import {ICard, IRfid} from "@/src/interfaces/IRfid";
import textBackground from "@/src/styles/textBackground";
import textWithLights from "@/src/styles/textWithLights";
import QueryInput from "@/src/ui/QueryInput";
import StyledLink from "@/src/ui/StyledLink";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";

const { width } = Dimensions.get("window");

export default function RfidCard() {
  const [cards, setCards] = useState<ICard[]>([]);
  const params: { id: string } = useLocalSearchParams();
  const id = params.id ? parseInt(params.id) : 0;
  const { device } = useDeviceQuery(id);
  const rfidData = device as IRfid;
  useEffect(() => {
    if (rfidData) {
      setCards(rfidData.cards);
    }
  }, [rfidData]);

  function handleFilterCards(value: string) {
    const filter = value.toLowerCase();
    const filteredCards = rfidData.cards.filter((card) => {
      return card.name.toLowerCase().includes(filter);
    });
    setCards(filteredCards);
  }
  if (cards === undefined) return <ActivityIndicator size="large" />;
  return (
    <View style={styles.container}>
      <QueryInput onChange={handleFilterCards} />
      {!cards.length && (
        <Text style={[textBackground.background, textWithLights]}>
          Brak kart
        </Text>
      )}
      {cards.length > 0 && (
        <FlatList
          numColumns={2}
          data={cards}
          renderItem={({ item }) => (
            <View style={styles.item}>{<CardCard card={item} />}</View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <StyledLink style={styles.button} to={`/Rfid/${rfidData.id}/CardAdd`}>
        Dodaj Karte
      </StyledLink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    justifyContent: "space-between",
  },
  item: {
    width: width / 2 - 10,
    margin: 5,
  },
  button: {
    margin: 20,
  },
});
