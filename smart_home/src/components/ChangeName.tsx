import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import useDeviceMutation from "../hooks/queries/useDeviceMutation";
import ChangeNameForm from "./ChangeNameForm";
import Message from "../ui/Message";

interface ChangeNameProps {
  children: React.ReactNode;
  type: "device" | "room";
  id: number;
}

export default function ChangeName({ children, type, id }: ChangeNameProps) {
  const [displayForm, setDisplayForm] = useState(false);
  const { updateDevice } = useDeviceMutation();
  const mutation = updateDevice(id);

  useEffect(() => {
    if (mutation.isSuccess) {
      setDisplayForm(false);
    }
  }, [mutation.isSuccess]);

  function handleChangeName(name: string) {
    mutation.mutate({ name });
  }

  const error = mutation.error;

  return (
    <Pressable style={styles.changeName} onPress={() => setDisplayForm(true)}>
      {displayForm ? (
        <View>
          <ChangeNameForm
            onClose={() => setDisplayForm(false)}
            onConfirm={handleChangeName}
          />
          {error?.details?.non_field_errors && (
            <Message type="error">{error.details.non_field_errors}</Message>
          )}
        </View>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  changeName: {
    // tutaj dodaj style odpowiadające Twojemu divowi z CSS,
    // np. padding, margin, backgroundColor, itp.
  },
});
