import { useEffect, useState } from "react";
import useCardMutation from "@/src/hooks/queries/useCardMutation";
import Header from "@/src/ui/Header";
import Message from "@/src/ui/Message";
import ButtonContainer from "@/src/ui/ButtonContainer";
import StyledLink from "@/src/ui/StyledLink";
import Button from "@/src/ui/Button";
import InputText from "@/src/ui/InputText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Modal, StyleSheet, Text, View } from "react-native";
import textBackground from "@/src/styles/textBackground";
import CustomError from "@/src/utils/CustomError";
import useRfidQuery from "@/src/hooks/queries/useRfidQuery";
import { ActivityIndicator } from "react-native";
import color from "@/src/styles/color";

export default function AddCard() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { mutationCreate } = useCardMutation();
  const rfidID = Number(useLocalSearchParams().id);
  const { rfidData, status } = useRfidQuery(rfidID);
  const mutation = mutationCreate(rfidID);

  useEffect(() => {
    if (mutation.error instanceof CustomError) {
      if (mutation.error.details) {
        const keys = Object.keys(mutation.error.details);
        setError(mutation.error.details[keys[0]][0]);
      }
    } else if (status === 400) {
      setError("Nie udało się dodać karty");
    } else if (status === 400) {
      setError("Czas na dodanie karty minął");
    } else if (status === 409) {
      setError("Karta jest już dodana");
    }
  }, [mutation.error, status]);
  function handleSubmit() {
    if (!name) {
      setError("To pole jest wymagane");
      return;
    }
    setError;
    mutation.mutate(name);
  }
  return (
    <View style={styles.container}>
      <View style={[textBackground.background, styles.form]}>
        <Header>Dodaj karte</Header>
        <InputText placeholder="Nazwa karty" onChange={setName} />
        {error && <Message type="error">{error}</Message>}
        {status === 201 && (
          <Message type="success">Karta została dodana</Message>
        )}
        <ButtonContainer>
          <Button onPress={handleSubmit}>Dodaj</Button>
          <StyledLink to="/">Zamknij</StyledLink>
        </ButtonContainer>
      </View>
      <Modal
        visible={rfidData.pending.includes("add_tag")}
        animationType="fade"
        backdropColor={"rgba(0, 0, 0, 0.8)"}
        onRequestClose={() => {
          useRouter().back();
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.text}>Proszę przyłożyć kartę do czytnika</Text>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    padding: 20,
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
