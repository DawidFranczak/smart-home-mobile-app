import React, {useState} from "react";
import {Text, StyleSheet, TextStyle, View, Image, Pressable} from "react-native";
import color from "../styles/color";
import {IEvent} from "@/src/interfaces/IEvent";
import useEventMutation from "@/src/hooks/queries/useEventMutation";
import ConfirmDelete from "@/src/components/ConfirmDelete";

interface IDeviceEventProps {
  event:IEvent
}

export default function DeviceEventDisplay({
                                             event,
}: IDeviceEventProps) {
  const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
  const { deleteEvent } = useEventMutation();
  const deleteMutation = deleteEvent(1, event.id);

  return (
      <View style={styles.container}>
        <Pressable style={styles.deleteIconContainer}  onPress={() => {
          setDisplayDeleteConfirm(true);
        }}>
          <Image
              style={styles.deleteIcon}
              source={require("../../assets/images/delete.png")}
          />
        </Pressable>
        <Text>
          {event.event}-{event.action}-{event.device}
        </Text>
        <ConfirmDelete
            onCancel={() => setDisplayDeleteConfirm(false)}
            onConfirm={() => {
              deleteMutation.mutate();
              setDisplayDeleteConfirm(false);
            }}
            name="akcje"
            visible={displayDeleteConfirm}
        />
      </View>
  );

}

const styles = StyleSheet.create({
  container:{
    position: "relative",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIconContainer:{
    alignSelf: "flex-end",
  },
  deleteIcon: {
    width: 24,
    height: 24
  }
});
