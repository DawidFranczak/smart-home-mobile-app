import { useEffect, useState } from "react";
import useChangePasswordMutation from "@/src/hooks/queries/useChangePasswordMutation";
import { ICustomError } from "@/src/interfaces/ICustomError";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import Button from "@/src/ui/buttons/Button";
import Header from "@/src/ui/headers/Header";
import InputText from "@/src/ui/inputs/InputText";
import Message from "@/src/ui/Message";
import StyledLink from "@/src/ui/StyledLink";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import PageContainer from "@/src/ui/containers/PageContainer";
import FormContainer from "@/src/ui/containers/FormContainer";
import variables from "@/src/styles/variables";
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
      <PageContainer>
        <View style={styles.form}>
          <FormContainer>
            <Header type="large">Zmiana hasła</Header>
            <InputText
              secureTextEntry={true}
              placeholder="Obecne hasło"
              onChange={setCurrentPassword}
            />
            <Message visible={!!error.current_password} type="error">{error.current_password}</Message>
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
            <Message visible={!!error.empty} type="error">{error.empty}</Message>
            <Message visible={!!error.new_password2} type="error">{error.new_password2}</Message>
            <Message visible={mutation.isSuccess} type="success">Hasło zostało zmienione</Message>
            <ButtonContainer style={styles.containerButton}>
              <Button type="fancy" onPress={handleSubmit}>Zapisz</Button>
              <StyledLink to="/">Powrót</StyledLink>
            </ButtonContainer>
          </FormContainer>
        </View>
      </PageContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding:variables.spacing.md
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  containerButton: {
    marginTop: 10,
    justifyContent: "center",
    gap:50,
  },
});
