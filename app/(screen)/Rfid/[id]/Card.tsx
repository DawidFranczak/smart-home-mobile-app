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
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";

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
    <PageContainer>
      <PageHeader title={device?.name} subtitle="Karty">
      <View style={styles.buttonContainer}>
        <QueryInput onChange={handleFilterCards}/>
        <StyledLink type="fancy" to={`/Rfid/${rfidData.id}/CardAdd`}>
          Dodaj
        </StyledLink>
      </View>
      </PageHeader>
      <TilesContainer>
        {cards.length > 0 && (
            <FlatList
                numColumns={2}
                data={cards}
                renderItem={({ item }) => (
                    <Tile>{<CardCard card={item} />}</Tile>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        )}
      </TilesContainer>
    </PageContainer>
  );
}
const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  }
});
