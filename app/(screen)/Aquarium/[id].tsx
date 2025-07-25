import React, { useEffect, useReducer } from "react";
import {View, Text, StyleSheet, ActivityIndicator, ToastAndroid} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IAquarium } from "@/src/interfaces/IAquarium";
import useAquariumMutation from "@/src/hooks/queries/useAquariumMutation";
import Message from "@/src/ui/Message";
import Button from "@/src/ui/buttons/Button";
import DeviceContainer from "@/src/ui/containers/DeviceContainer";
import AquariumAutomat from "@/src/components/AquariumAutomat";
import { Panel3 } from "reanimated-color-picker";
import ColorPicker from "reanimated-color-picker";
import hexToRgb from "@/src/utils/hexToRgb";
import rgbToHex from "@/src/utils/rgbToHex";
import textBackground from "@/src/styles/textBackground";
import textWithLights from "@/src/styles/textWithLights";
import useDeviceQuery from "@/src/hooks/queries/device/useDeviceQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import WifiStrength from "@/src/ui/WiFiStrength";
import {IAquariumAction} from "@/src/interfaces/IAquariumAction";
import variables from "@/src/styles/variables";
import StyledLink from "@/src/ui/StyledLink";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";
function reducer(state: IAquarium, action: IAquariumAction) {
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
  console.log(state);
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
  if (Object.keys(state).length === 0) return <ActivityIndicator size="large" />;
  return (
      <PageContainer>
        <PageHeader title="Akwarium" subtitle={state.name}>
          <View style={styles.header}>
            <StyledLink type="fancy" to={`/Settings/aquarium/${state.id}/`}>
              Ustawienia
            </StyledLink>
            <WifiStrength strength={state.is_online? state.wifi_strength: -100} size="large"/>
          </View>
        </PageHeader>
          <View style={styles.colorPickerContainer}>
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
          </View>

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
              <TilesContainer>
                <Tile>
                  <Text style={styles.text}>
                      Ledy
                  </Text>
                  <Button style={styles.button} type={state.led_mode? "success": "danger"} onPress={() => handleSaveSettings("led_mode")}>
                    {state.led_mode ? "Wyłącz" : "Włącz"}
                  </Button>
                </Tile>
                <Tile>
                  <Text style={styles.text}>
                    Świetlówka
                  </Text>
                  <Button style={styles.button} type={state.fluo_mode? "success": "danger"} onPress={() => handleSaveSettings("fluo_mode")}>
                    {state.fluo_mode ? "Wyłącz" : "Włącz"}
                  </Button>
                </Tile>
              </TilesContainer>
          )}
        {mutationErrors && (
            <Message
                timeout={1000}
                type="error">
              Błąd w komunikacji z akwarium.
            </Message>
        )}
        {mutationStatus === 200 && (
            <Message
                timeout={1000}
                type="success">
              Zapisano dane
            </Message>
        )}
          <View style={styles.buttonContainer}>
            <Button
                type="fancy"
              onPress={() => handleSaveSettings(undefined)}
            >
              Zapisz
            </Button>
            <Button
                type="fancy"
              onPress={() => handleSaveSettings("mode")}
            >
              {state.mode ? "Ręczny" : "Automatyczny"}
            </Button>
          </View>
      </PageContainer>
  );
}
const styles = StyleSheet.create({
  header:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "90%",
    gap: 10,
  },
  colorPickerContainer:{
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorPicker: {
    width: "50%",
  },
  aquariumManual: {
    marginHorizontal:variables.spacing.md,
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    gap: 10,
  },
  button:{
    width: "100%",
  },
  text: {
    color: variables.colors.accentPrimary,
    fontSize: variables.typography.fontSize.xxl,
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
    textAlign: "center",
    marginBottom:variables.spacing.xsm
  },
});
