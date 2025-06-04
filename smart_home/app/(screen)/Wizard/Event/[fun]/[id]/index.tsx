import ConfirmDelete from "@/src/components/ConfirmDelete";
import DeviceEventDisplay from "@/src/components/DeviceEventDisplay";
import useAvailableActionQuery from "@/src/hooks/queries/useAvailableActionQuery";
import useEventMutation from "@/src/hooks/queries/useEventMutation";
import { IEvent } from "@/src/interfaces/IEvent";
import color from "@/src/styles/color";
import textBackground from "@/src/styles/textBackground";
import Button from "@/src/ui/Button";
import StyledLink from "@/src/ui/StyledLink";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DeviceEventWizzard() {
  const params = useLocalSearchParams<{ id: string; fun: string }>();
  const device_id = parseInt(params.id);
  const device_fun = params.fun;
  const [eventId, setEventId] = useState(0);
  const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
  const { availableAction } = useAvailableActionQuery(device_id, device_fun);
  const { deleteEvent } = useEventMutation();
  const deleteMutation = deleteEvent(device_id, eventId);

  if (!availableAction) return <ActivityIndicator size="large" />;
  return (
    <View style={styles.container}>
      <View style={[styles.section, textBackground.background]}>
        {availableAction.active_events?.length === 0 && (
          <Text style={styles.actionMessage}>Brak akcji</Text>
        )}
        {availableAction.active_events?.map((event: IEvent) => (
          <View key={event.id} style={styles.eventBox}>
            <DeviceEventDisplay
              key={event.id}
              action={event.action}
              device={event.device}
              event={event.event}
              style={styles.eventText}
            />
            <Pressable
              onPress={() => {
                setDisplayDeleteConfirm(true);
                setEventId(event.id);
              }}
            >
              <Image
                source={require("../../../../../../assets/images/delete.png")}
                style={styles.deleteIcon}
              />
            </Pressable>
          </View>
        ))}
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
      <StyledLink
        style={styles.addEventButton}
        to={`/Wizard/Event/${device_fun}/${device_id}/Add/`}
      >
        Dodaj akcje
      </StyledLink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 60,
  },
  section: {
    width: "100%",
  },
  actionMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.text.primary,
    textAlign: "center",
  },
  addEventButton: {
    width: "100%",
    position: "absolute",
    bottom: 15,
  },
  deleteIcon: {
    width: 25,
    height: 25,
  },
  eventBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
  },
  eventText: {
    fontSize: 12,
    color: color.text.primary,
  },
});
