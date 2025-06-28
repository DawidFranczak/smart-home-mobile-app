import { useEffect, useState } from "react";
import useChangePasswordMutation from "@/src/hooks/queries/useChangePasswordMutation";
import { ICustomError } from "@/src/interfaces/ICustomError";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import Button from "@/src/ui/Button";
import Header from "@/src/ui/Header";
import InputText from "@/src/ui/InputText";
import Message from "@/src/ui/Message";
import StyledLink from "@/src/ui/StyledLink";
import ButtonContainer from "@/src/ui/ButtonContainer";
interface IError {
  empty?: string;
  current_password?: string;
  new_password2?: string;
}
export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState<IError>({});
  const mutation = useChangePasswordMutation();

  useEffect(() => {
    if (mutation.isError) {
      const customError = mutation.error as ICustomError;
      if (!customError.details) {
        return;
      }
      setError(customError.details);
    }
  }, [mutation.error]);

  function handleSubmit() {
    setError({});
    mutation.mutate({
      currentPassword,
      newPassword,
      newPassword2,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <Header style={styles.header}>Zmiana hasła</Header>
        <InputText
          secureTextEntry={true}
          placeholder="Obecne hasło"
          onChange={setCurrentPassword}
        />
        {error.current_password && (
          <Message type="error">{error.current_password}</Message>
        )}
        <InputText
          secureTextEntry={true}
          placeholder="Nowe hasło"
          onChange={setNewPassword}
        />
        <InputText
          secureTextEntry={true}
          placeholder="Powtórz nowe hasło"
          onChange={setNewPassword2}
        />
        {error.empty && <Message type="error">{error.empty}</Message>}
        {error.new_password2 && (
          <Message type="error">{error.new_password2}</Message>
        )}
        {mutation.isSuccess && (
          <Message type="success">Hasło zostało zmienione</Message>
        )}
        <ButtonContainer style={styles.containerButton}>
          <Button onPress={handleSubmit}>Zapisz</Button>
          <StyledLink to="/">Powrót</StyledLink>
        </ButtonContainer>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a2a44",
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  containerButton: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
