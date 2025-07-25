import React, { useEffect, useReducer } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import useLampMutation from "@/src/hooks/queries/useLampMutation";
import { ILamp } from "@/src/interfaces/ILamp";
import Message from "@/src/ui/Message";
import InputTime from "@/src/ui/inputs/InputTime";
import InputNumber from "@/src/ui/inputs/InputNumber";
import InputRange from "@/src/ui/inputs/InputRange";
import Button from "@/src/ui/buttons/Button";
import { Text } from "@react-navigation/elements";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import WifiStrength from "@/src/ui/WiFiStrength";
import StyledLink from "@/src/ui/StyledLink";
import variables from "@/src/styles/variables";
import Tile from "@/src/ui/Tile";
import TilesContainer from "@/src/ui/containers/TilesContainer";

function reducer(state: ILamp, action: { type: string; payload: any }) {
  switch (action.type) {
    case "INIT_DATA":
      return { ...state, ...action.payload };
    case "set/light_start":
      return { ...state, light_start: action.payload };
    case "set/light_stop":
      return { ...state, light_stop: action.payload };
    case "set/brightness":
      return { ...state, brightness: action.payload };
    case "set/lighting_time":
      return { ...state, lighting_time: action.payload };
    case "set/step":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

export default function LampPage() {
  const params = useLocalSearchParams();
  const lampId = params.id ? parseInt(params.id as string, 10) : 0;
  const [state, dispatch] = useReducer(reducer, {} as ILamp);
  const { device } = useDeviceQuery(lampId);
  const { updateLamp } = useLampMutation();
  const updateMutate = updateLamp(lampId);
  const lampData = device as ILamp;

  useEffect(() => {
    if (lampData) dispatch({ type: "INIT_DATA", payload: lampData });
  }, [lampData]);

  function updateLampData() {
    updateMutate.mutate(state);
  }

  if (Object.keys(state).length === 0)
    return <ActivityIndicator size="small" color="#0000ff" />;
  return (
      <PageContainer>
        <PageHeader title={device?.name} subtitle="Lampa">
          <View style={styles.header}>
            <StyledLink type="fancy" to={`/Settings/lamp/${state.id}/`}>
              Ustawienia
            </StyledLink>
            <WifiStrength strength={state.is_online? state.wifi_strength: -100} size="large"/>
          </View>
        </PageHeader>
        <View style={styles.container}>
          <TilesContainer>
            <Tile>
              <View style={styles.sectionContainer}>
                <InputTime
                    extraStyle={styles.sectionInput}
                    label="Rozpoczęcie"
                    initialTime={state.light_start}
                    onChange={(time) =>
                        dispatch({ type: "set/light_start", payload: time })
                    }
                />
                <InputTime
                  extraStyle={styles.sectionInput}
                  label="Zakończenie"
                  initialTime={state.light_stop}
                  onChange={(time) =>
                    dispatch({ type: "set/light_stop", payload: time })
                  }
                />
                </View>
            </Tile>
            <Tile>
              <InputNumber
                label="Czas świecenia [s]"
                value={state.lighting_time}
                onChange={(time) =>
                  dispatch({ type: "set/lighting_time", payload: time })
                }
              />
            </Tile>
            <Tile>
              <Text>
                Jasność{` ${state.brightness} %`}
              </Text>
              <InputRange
                value={state.brightness}
                onChange={(brightness) =>
                  dispatch({ type: "set/brightness", payload: brightness })
                }
                min={0}
                max={100}
              />
            </Tile>
            <Tile>
              <Text>
                Szybkość{` ${state.step} %`}
              </Text>
              <InputRange
                value={state.step}
                onChange={(step) => dispatch({ type: "set/step", payload: step })}
                min={0}
                max={100}
              />
            </Tile>
          </TilesContainer>
            {updateMutate.isSuccess && (
                <Message timeout={1000} type="success">
                  Zapisano dane
                </Message>
            )}
            {updateMutate.isError && (
                <Message timeout={1000} type="error">
                  Wystąpił błąd podczas zapisu
                </Message>
            )}
          <Button style={styles.button} type="fancy" onPress={updateLampData}>Zapisz</Button>
        </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:variables.spacing.md
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  sectionContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap:variables.spacing.xsm
  },
  sectionInput: {
    flex: 1 / 2,
    alignItems: "center",
  },
  button:{
    width:"90%",
    alignSelf:"center",
    marginBottom:variables.spacing.xs
  }
});
