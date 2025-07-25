import { useEffect, useState } from "react";
import useRouterMutation from "../hooks/queries/useRouterMutation";
import CustomError from "../utils/CustomError";
import DeviceContainer from "../ui/containers/DeviceContainer";
import InputText from "../ui/inputs/InputText";
import Message from "../ui/Message";
import Button from "../ui/buttons/Button";
import { StyleSheet, View } from "react-native";
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
    <DeviceContainer
      name="Dodaj router"
      wifiStrength={-100}
      isOnline={false}
      id={0}
      editable={false}
    >
      <View style={styles.container}>
        <InputText
          placeholder="Podaj adres mac"
          onChange={(value) => setMac(value)}
        />
        {error && <Message type="error">{error}</Message>}
        <Button onPress={handleSaveRouter}>Dodaj</Button>
      </View>
    </DeviceContainer>
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
