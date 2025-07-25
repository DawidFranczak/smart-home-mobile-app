import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import Message from "@/src/ui/Message";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import Button from "@/src/ui/buttons/Button";
import StyledLink from "@/src/ui/StyledLink";
import InputText from "@/src/ui/inputs/InputText";
import Header from "@/src/ui/headers/Header";
import { CheckBox } from "@rneui/themed";
import color from "@/src/styles/color";
import CustomError from "@/src/utils/CustomError";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import {api} from "@/src/const/api";
import FormContainer from "@/src/ui/containers/FormContainer";
type visibility = "public" | "private";
type errors = {
  name?: string[];
  visibility?: string[];
};
interface RoomData {
  name: string;
  visibility: string;
}
export default function AddRoom() {
  const [name, setName] = useState("");
  const [error, setError] = useState<errors>({});
  const [success, setSuccess] = useState(false);
  const [visibility, setVisibility] = useState<visibility>("public");
  const { createData } = useFetch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (roomData: RoomData) => createData(api.room, roomData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

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
      <FormContainer>
        <Header type="large">Dodaj nowy pokój</Header>
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
          <Button type="fancy" onPress={handleAdd}>Dodaj</Button>
          <StyledLink to="/">Zamknij</StyledLink>
        </ButtonContainer>
      </FormContainer>
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
