import { useEffect, useState } from "react";
import useCardMutation from "@/src/hooks/queries/useCardMutation";
import Header from "@/src/ui/headers/Header";
import Message from "@/src/ui/Message";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import StyledLink from "@/src/ui/StyledLink";
import Button from "@/src/ui/buttons/Button";
import InputText from "@/src/ui/inputs/InputText";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import CustomError from "@/src/utils/CustomError";
import color from "@/src/styles/color";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import {IRfid} from "@/src/interfaces/IRfid";
import variables from "@/src/styles/variables";
import FormContainer from "@/src/ui/containers/FormContainer";

export default function AddCard() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { mutationCreate } = useCardMutation();
  const rfidID = Number(useLocalSearchParams().id);
  const { device, status } = useDeviceQuery(rfidID);
  const rfidData = device as IRfid;
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
    setError("");
    mutation.mutate(name);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FormContainer>
        <Header type="large">Dodaj kartę</Header>
        <View style={styles.instructionView}>
          <Text style={styles.instructionText}>Wprowadź nazwę karty i zbliż ją do czytnika RFID</Text>
        </View>
        <InputText placeholder="Nazwa karty" onChange={setName} />
        {error && <Message type="error">{error}</Message>}
        {status === 201 && (
          <Message type="success">Karta została dodana</Message>
        )}
        <ButtonContainer>
          <StyledLink  to="/">Wróć</StyledLink>
          <Button type="fancy"  onPress={handleSubmit}>Dodaj</Button>
        </ButtonContainer>
      </FormContainer>
      <Modal
        visible={rfidData.pending.includes("add_tag")}
        animationType="fade"
        backdropColor={"rgba(0, 0, 0, 0.8)"}
        onRequestClose={() => {
          router.back();
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.text}>Proszę przyłożyć kartę do czytnika</Text>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  instructionView: {
    fontSize: variables.typography.fontSize.lg,
    lineHeight: 1.5,
    marginBottom:variables.spacing.md,
    padding: variables.spacing.md,
    backgroundColor:variables.colors.tertiaryBg,
    borderRadius:variables.spacing.sm,
    borderRightColor:"rgba(0, 0, 0, 0.0)",
    borderTopColor:"rgba(0, 0, 0, 0.0)",
    borderBottomColor:"rgba(0, 0, 0, 0.0)",
    borderLeftColor:variables.colors.accentPrimary,
    borderStyle:"solid",
    borderWidth:3,
  },
  instructionText:{
    color: variables.colors.textMuted,
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
