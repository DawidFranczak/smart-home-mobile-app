import React, { useEffect, useState } from "react";
import {View, StyleSheet, Pressable, Modal, Text} from "react-native";
import ChangeNameForm from "./ChangeNameForm";
import Message from "../ui/Message";
import { ICustomError } from "../interfaces/ICustomError";
import useDeviceMutation from "@/src/hooks/queries/device/useDeviceMutation";
import useRoomMutation from "@/src/hooks/queries/room/useRoomMutation";

interface ChangeNameProps {
  children: React.ReactNode;
  type: "device" | "room";
  id: number;
}

export default function ChangeName({ children, type, id }: ChangeNameProps) {
  const [displayForm, setDisplayForm] = useState(false);
  const { updateDevice } = useDeviceMutation();
  const deviceMutation = updateDevice(id);
  const { updateRoom } = useRoomMutation();
  const roomMutation = updateRoom(id);
  useEffect(() => {
    if (deviceMutation.isSuccess || roomMutation.isSuccess) {
      setDisplayForm(false);
    }
  }, [deviceMutation.isSuccess, roomMutation.isSuccess]);

  useEffect(() => {
    deviceMutation.reset();
    roomMutation.reset();
  }, [displayForm]);

  function handleChangeName(name: string) {
    if (type === "device") {
      deviceMutation.mutate({name});
    }else if (type === "room") {
      roomMutation.mutate({name});
    }
  }
  const deviceError = deviceMutation.error as ICustomError
  const roomError = roomMutation.error as ICustomError
  return (
    <>
      <Pressable onPress={() => setDisplayForm(true)}>{<Text style={styles.text}>{children}</Text>}</Pressable>
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
          <Message visible={!!deviceError?.details} type="error">{deviceError?.details?.non_field_errors}</Message>
          <Message visible={!!roomError?.details} type="error">{roomError?.details?.name[0]}</Message>
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
  text:{
    color: "white",
  }
});
