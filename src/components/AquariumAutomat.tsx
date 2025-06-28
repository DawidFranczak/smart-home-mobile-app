import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InputTime from "../ui/InputTime";
import textWithLights from "../styles/textWithLights";
import textBackground from "../styles/textBackground";
interface IAquariumAutomatProps {
  dispatch: ({ type, payload }: { type: string; payload: string }) => void;
  state: {
    led_start: string;
    led_stop: string;
    fluo_start: string;
    fluo_stop: string;
  };
}

export default function AquariumAutomat({
  dispatch,
  state,
}: IAquariumAutomatProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[textBackground.background, textWithLights]}>
          Czas ledów
        </Text>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionInput}>
            <Text
              style={[
                textBackground.background,
                textWithLights,
                styles.textBackground,
              ]}
            >
              Rozpoczęcie
            </Text>
            <InputTime
              initialTime={state.led_start}
              onChange={(data) =>
                dispatch({ type: "set/ledStart", payload: data })
              }
            />
          </View>
          <View style={styles.sectionInput}>
            <Text
              style={[
                textBackground.background,
                textWithLights,
                styles.textBackground,
              ]}
            >
              Zakończenie
            </Text>
            <InputTime
              initialTime={state.led_stop}
              onChange={(data) =>
                dispatch({ type: "set/ledStop", payload: data })
              }
            />
          </View>
        </View>

        <Text style={[textBackground.background, textWithLights]}>
          Czas świetlówki
        </Text>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionInput}>
            <Text
              style={[
                textBackground.background,
                textWithLights,
                styles.textBackground,
              ]}
            >
              Rozpoczęcie
            </Text>
            <InputTime
              initialTime={state.fluo_start}
              onChange={(data) =>
                dispatch({ type: "set/fluoStart", payload: data })
              }
            />
          </View>
          <View style={styles.sectionInput}>
            <Text
              style={[
                textBackground.background,
                textWithLights,
                styles.textBackground,
                ,
              ]}
            >
              Zakończenie
            </Text>
            <InputTime
              initialTime={state.fluo_stop}
              onChange={(data) =>
                dispatch({ type: "set/fluoStop", payload: data })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  section: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  sectionInput: {
    flex: 1 / 2,
    alignItems: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  textBackground: {
    width: "90%",
  },
});
