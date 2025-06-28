import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import Message from "@/src/ui/Message";
import ButtonContainer from "@/src/ui/ButtonContainer";
import Button from "@/src/ui/Button";
import StyledLink from "@/src/ui/StyledLink";
import useRoomMutation from "@/src/hooks/queries/useRoomMutation";
import InputText from "@/src/ui/InputText";
import Header from "@/src/ui/Header";
import { CheckBox } from "@rneui/themed";
import color from "@/src/styles/color";
import CustomError from "@/src/utils/CustomError";
type visibility = "public" | "private";
type errors = {
  name?: string[];
  visibility?: string[];
};
export default function AddRoom() {
  const [name, setName] = useState("");
  const [error, setError] = useState<errors>({});
  const [success, setSuccess] = useState(false);
  const [visibility, setVisibility] = useState<visibility>("public");
  const { createRoom } = useRoomMutation();
  const mutation = createRoom();
  useEffect(() => {
    if (mutation.error instanceof CustomError) {
      setError(mutation.error.details);
    }
  }, [mutation.error]);

  useEffect(() => {
    if (!mutation.isSuccess) return;
    setSuccess(true);
  }, [mutation.isSuccess]);

  const handleAdd = () => {
    mutation.mutate({ name, visibility });
    setSuccess(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Header>Dodaj nowy pokój</Header>
        <InputText placeholder="Nazwa" onChange={setName} />
        {error?.name && <Message type="error">{error.name}</Message>}
        {success && <Message type="success">Dodano pokój</Message>}
        <CheckBox
          checked={visibility === "public"}
          title="Publiczny"
          onPress={() => setVisibility("public")}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.chceckBoxText}
        />
        <CheckBox
          checked={visibility === "private"}
          title="Prywatny"
          onPress={() => setVisibility("private")}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.chceckBoxText}
        />
        {error?.visibility && (
          <Message type="error">{error.visibility}</Message>
        )}

        <ButtonContainer>
          <Button onPress={handleAdd}>Dodaj</Button>
          <StyledLink to="/">Zamknij</StyledLink>
        </ButtonContainer>
      </View>
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

  form: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "column",
    padding: 20,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
  },
  chceckBoxText: {
    color: color.text.primary,
  },
});
