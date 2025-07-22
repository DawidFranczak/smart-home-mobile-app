import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";
import ChangeNameForm from "./ChangeNameForm";
import Message from "../ui/Message";
import { ICustomError } from "../interfaces/ICustomError";
import useDeviceMutation from "@/src/hooks/queries/device/useDeviceMutation";

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
  const error: ICustomError | null = mutation.error;
  return (
    <>
      <Pressable onPress={() => setDisplayForm(true)}>{children}</Pressable>
      <Modal
        animationType="fade"
        visible={displayForm}
        backdropColor="rgba(0, 0, 0, 0.6)"
        onRequestClose={() => {
          setDisplayForm(false);
        }}
      >
        <View style={styles.container}>
          <ChangeNameForm
            onClose={() => setDisplayForm(false)}
            onConfirm={handleChangeName}
          />
          {error?.details?.non_field_errors && (
            <Message type="error">{error.details.non_field_errors}</Message>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
