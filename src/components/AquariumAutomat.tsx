import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InputTime from "../ui/inputs/InputTime";
import {IAquariumAction} from "@/src/interfaces/IAquariumAction";
import variables from "@/src/styles/variables";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";
interface IAquariumAutomatProps {
  dispatch: ({ type, payload }: IAquariumAction) => void;
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
      <TilesContainer>
        <Tile extraStyles={styles.tile}>
          <Text style={styles.tailText}>
            Czas ledów
          </Text>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionInput}>
              <InputTime
                label="Rozpoczecie"
                initialTime={state.led_start}
                onChange={(data) =>
                  dispatch({ type: "set/ledStart", payload: data })
                }
              />
            </View>
            <View style={styles.sectionInput}>
              <InputTime
                label="Zakończenie"
                initialTime={state.led_stop}
                onChange={(data) =>
                  dispatch({ type: "set/ledStop", payload: data })
                }
              />
            </View>
          </View>
        </Tile>
        <Tile extraStyles={styles.tile}>
          <Text style={styles.tailText}>
            Czas świetlówki
          </Text>
          <View style={styles.sectionContainer}>
          <View style={styles.sectionInput}>
            <InputTime
              label="Rozpoczecie"
              initialTime={state.fluo_start}
              onChange={(data) =>
                dispatch({ type: "set/fluoStart", payload: data })
              }
            />
          </View>
          <View style={styles.sectionInput}>
            <InputTime
              label="Zakończenie"
              initialTime={state.fluo_stop}
              onChange={(data) =>
                dispatch({ type: "set/fluoStop", payload: data })
              }
            />
          </View>
        </View>
        </Tile>
      </TilesContainer>
  );
}

const styles = StyleSheet.create({
  sectionInput: {
    flex: 1 / 2,
    alignItems: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap:variables.spacing.xsm
  },
  tile:{
    paddingVertical: variables.spacing.xsm,
  },
  tailText:{
    color: variables.colors.accentPrimary,
    fontSize: variables.typography.fontSize.base,
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
  }
});
