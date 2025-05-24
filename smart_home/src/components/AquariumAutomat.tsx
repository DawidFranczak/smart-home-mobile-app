import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InputTime from "../ui/InputTime";
import Button from "../ui/Button";

interface IAquariumAutomatProps {
  dispatch: ({ type, payload }: { type: string; payload: string }) => void;
  state: {
    led_start: string;
    led_stop: string;
    fluo_start: string;
    fluo_stop: string;
  };
  saveFn: () => void;
}

export default function AquariumAutomat({
  dispatch,
  state,
  saveFn,
}: IAquariumAutomatProps) {
  return (
    <View>
      <Text style={styles.label}>Czas ledów</Text>
      <View style={styles.times}>
        <InputTime
          initialTime={state.led_start}
          onChange={(data) => dispatch({ type: "set/ledStart", payload: data })}
        />
        <InputTime
          initialTime={state.led_stop}
          onChange={(data) => dispatch({ type: "set/ledStop", payload: data })}
        />
      </View>

      <Text style={styles.label}>Czas świetlówki</Text>
      <View style={styles.times}>
        <InputTime
          initialTime={state.fluo_start}
          onChange={(data) =>
            dispatch({ type: "set/fluoStart", payload: data })
          }
        />
        <InputTime
          initialTime={state.fluo_stop}
          onChange={(data) => dispatch({ type: "set/fluoStop", payload: data })}
        />
      </View>

      <Button callback={saveFn}>Zapisz</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  times: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
