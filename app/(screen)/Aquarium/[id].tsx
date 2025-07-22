import React, { useEffect, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IAquarium } from "@/src/interfaces/IAquarium";
import useAquariumMutation from "@/src/hooks/queries/useAquariumMutation";
import Message from "@/src/ui/Message";
import Button from "@/src/ui/Button";
import DeviceContainer from "@/src/ui/DeviceContainer";
import AquariumAutomat from "@/src/components/AquariumAutomat";
import { Panel3 } from "reanimated-color-picker";
import ColorPicker from "reanimated-color-picker";
import hexToRgb from "@/src/utils/hexToRgb";
import rgbToHex from "@/src/utils/rgbToHex";
import textBackground from "@/src/styles/textBackground";
import textWithLights from "@/src/styles/textWithLights";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";

type IAction =
  | {
      type: "set/init_value";
      payload: IAquarium;
    }
  | {
      type: "set/color";
      payload: string; // Hex color value
    }
  | { type: "set/ledStart"; payload: string }
  | { type: "set/ledStop"; payload: string }
  | { type: "set/fluoStart"; payload: string }
  | { type: "set/fluoStop"; payload: string };

function reducer(state: IAquarium, action: IAction) {
  switch (action.type) {
    case "set/init_value":
      return { ...state, ...action.payload };
    case "set/color":
      const rgb = hexToRgb(action.payload);
      return {
        ...state,
        color_b: rgb ? rgb.b : 0,
        color_g: rgb ? rgb.g : 0,
        color_r: rgb ? rgb.r : 0,
      };
    case "set/ledStart":
      return {
        ...state,
        led_start: action.payload,
      };
    case "set/ledStop":
      return {
        ...state,
        led_stop: action.payload,
      };
    case "set/fluoStart":
      return {
        ...state,
        fluo_start: action.payload,
      };
    case "set/fluoStop":
      return {
        ...state,
        fluo_stop: action.payload,
      };
    default:
      return state;
  }
}

export default function AquariumPage() {
  const params = useLocalSearchParams();
  const id = params.id ? parseInt(params.id as string, 10) : 0;
  const { device, isLoading } = useDeviceQuery(id);
  const mutation = useAquariumMutation(id);
  const mutationErrors = mutation.error;
  const mutationStatus = mutation?.data?.status;
  const aquariumData = device as IAquarium;

  const [state, dispatch] = useReducer(reducer, {} as IAquarium);
  useEffect(() => {
    if (aquariumData) {
      dispatch({
        type: "set/init_value",
        payload: { ...aquariumData },
      });
    }
  }, [aquariumData]);

  const handleSaveSettings = (type?: string) => {
    if (type) {
      mutation.mutate({
        ...state,
        [type]: !state[type as keyof typeof state],
      });
      return;
    }
    mutation.mutate(state);
  };
  if (Object.keys(state).length === 0) return null;
  return (
    <DeviceContainer
      name={state.name}
      isOnline={state.is_online}
      wifiStrength={state.wifi_strength}
      id={id}
    >
      <View style={styles.container}>
        {mutationErrors && (
          <Message style={styles.message} type="error">
            Błąd w komunikacji z akwarium.
          </Message>
        )}
        {mutationStatus === 200 && (
          <Message style={styles.message} type="success">
            Zapisano dane
          </Message>
        )}
        <ColorPicker
          style={styles.colorPicker}
          value={rgbToHex(state.color_r, state.color_g, state.color_b)}
          onCompleteJS={(color) => {
            dispatch({
              type: "set/color",
              payload: color.hex,
            });
          }}
        >
          <Panel3 />
        </ColorPicker>
        {state.mode ? (
          <AquariumAutomat
            dispatch={dispatch}
            state={{
              led_start: state.led_start,
              led_stop: state.led_stop,
              fluo_start: state.fluo_start,
              fluo_stop: state.fluo_stop,
            }}
          />
        ) : (
          <View style={styles.aquariumManual}>
            <Text style={[textBackground.background, textWithLights]}>
              Ledy
            </Text>
            <Button onPress={() => handleSaveSettings("led_mode")}>
              {state.led_mode ? "Wyłącz" : "Włącz"}
            </Button>
            <Text style={[textBackground.background, textWithLights]}>
              Świetlówka
            </Text>
            <Button onPress={() => handleSaveSettings("fluo_mode")}>
              {state.fluo_mode ? "Wyłącz" : "Włącz"}
            </Button>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => handleSaveSettings(undefined)}
          >
            Zapisz
          </Button>
          <Button
            style={styles.button}
            onPress={() => handleSaveSettings("mode")}
          >
            {state.mode ? "Ręczny" : "Automatyczny"}
          </Button>
        </View>
      </View>
    </DeviceContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginBottom: 60,
  },
  colorPicker: {
    marginTop: 20,
    width: "70%",
  },
  message: {
    position: "absolute",
    top: 10,
  },
  aquariumManual: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  button: { width: "100%" },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    gap: 10,
  },
});
