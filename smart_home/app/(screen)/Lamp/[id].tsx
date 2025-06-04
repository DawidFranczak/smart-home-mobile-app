import { useEffect, useReducer } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import useLampQuery from "@/src/hooks/queries/useLampQuery";
import useLampMutation from "@/src/hooks/queries/useLampMutation";
import { ILamp } from "@/src/interfaces/ILamp";
import DeviceContainer from "@/src/ui/DeviceContainer";
import Message from "@/src/ui/Message";
import InputTime from "@/src/ui/InputTime";
import InputNumber from "@/src/ui/InputNumber";
import InputRange from "@/src/ui/InputRange";
import Button from "@/src/ui/Button";
import { Text } from "@react-navigation/elements";
import textBackground from "@/src/styles/textBackground";
import textWithLights from "@/src/styles/textWithLights";

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
  const { lampData } = useLampQuery(lampId);
  const { updateLamp } = useLampMutation();
  const updateMutate = updateLamp(lampId);

  useEffect(() => {
    if (lampData) dispatch({ type: "INIT_DATA", payload: lampData });
  }, [lampData]);

  function updateLampData() {
    updateMutate.mutate(state);
  }

  if (Object.keys(state).length === 0)
    return <ActivityIndicator size="small" color="#0000ff" />;
  return (
    <DeviceContainer
      name={state.name}
      wifiStrength={state.wifi_strength}
      isOnline={state.is_online}
      id={state.id}
    >
      <View style={styles.container}>
        {updateMutate.isSuccess && (
          <Message style={styles.message} type="success">
            Zapisano dane
          </Message>
        )}
        {updateMutate.isError && (
          <Message style={styles.message} type="error">
            Wystąpił bład podczas zapisu
          </Message>
        )}
        <View>
          <Text style={[textBackground.background, textWithLights]}>
            Godzina rozpoczęcia
          </Text>
          <InputTime
            initialTime={state.light_start}
            onChange={(time) =>
              dispatch({ type: "set/light_start", payload: time })
            }
          />
        </View>
        <View>
          <Text style={[textBackground.background, textWithLights]}>
            Godzina zakończenia
          </Text>
          <InputTime
            initialTime={state.light_stop}
            onChange={(time) =>
              dispatch({ type: "set/light_stop", payload: time })
            }
          />
        </View>
        <View>
          <Text style={[textBackground.background, textWithLights]}>
            Czas świecenia [s]
          </Text>
          <InputNumber
            value={state.lighting_time}
            onChange={(time) =>
              dispatch({ type: "set/lighting_time", payload: time })
            }
          />
        </View>
        <View>
          <Text style={[textBackground.background, textWithLights]}>
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
        </View>
        <View>
          <Text style={[textBackground.background, textWithLights]}>
            Szybkość{` ${state.step} %`}
          </Text>
          <InputRange
            value={state.step}
            onChange={(step) => dispatch({ type: "set/step", payload: step })}
            min={0}
            max={100}
          />
        </View>
        <Button onPress={updateLampData}>Zapisz</Button>
      </View>
    </DeviceContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    marginBottom: 60,
  },
  message: {
    position: "absolute",
    width: "110%",
    top: 0,
  },
});
