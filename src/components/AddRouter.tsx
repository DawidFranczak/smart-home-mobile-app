import { useEffect, useState } from "react";
import useRouterMutation from "../hooks/queries/useRouterMutation";
import CustomError from "../utils/CustomError";
import InputText from "../ui/inputs/InputText";
import Message from "../ui/Message";
import Button from "../ui/buttons/Button";
import { StyleSheet, View } from "react-native";
import PageContainer from "@/src/ui/containers/PageContainer";
import FormContainer from "@/src/ui/containers/FormContainer";
import Header from "../ui/headers/Header";

export default function AddRouter() {
  const [mac, setMac] = useState("");
  const [error, setError] = useState("");
  const { createRouter } = useRouterMutation();
  const mutation = createRouter();

  useEffect(() => {
    if (mutation.error instanceof CustomError) {
      const key = Object.keys(mutation.error.details)[0];
      setError(mutation.error.details[key][0]);
    }
  }, [mutation.error]);
  function handleSaveRouter() {
    mutation.mutate(mac);
  }
  return (
      <PageContainer>
        <View style={styles.container}>
          <FormContainer>
            <Header type="large">Dodaj router</Header>
            <InputText
              placeholder="Podaj adres mac"
              onChange={(value) => setMac(value)}
            />
            {error && <Message type="error">{error}</Message>}
            <Button type="fancy" onPress={handleSaveRouter}>Dodaj</Button>
          </FormContainer>
        </View>
      </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
