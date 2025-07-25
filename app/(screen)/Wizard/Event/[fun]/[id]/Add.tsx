import useActionByFunctionQuery from "@/src/hooks/queries/useActionByFunctionQuery";
import useAvailableActionQuery from "@/src/hooks/queries/useAvailableActionQuery";
import useEventMutation from "@/src/hooks/queries/useEventMutation";
import { IDevice } from "@/src/interfaces/IDevice";
import Button from "@/src/ui/buttons/Button";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
import Message from "@/src/ui/Message";
import Select from "@/src/ui/Select";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import useDeviceByFunctionQuery from "@/src/hooks/queries/device/useDeviceByFunctionQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import FormContainer from "@/src/ui/containers/FormContainer";
import Header from "@/src/ui/headers/Header";

export default function AddEventForm() {
  const params = useLocalSearchParams<{ id: string; fun: string }>();
  const device_id = parseInt(params.id);
  const device_fun = params.fun;
  const [deviceFunction, setDeviceFunction] = useState("");
  const [event, setEvent] = useState("");
  const [action, setAction] = useState("");
  const [selectDevice, setSelectDevice] = useState(0);
  const [error, setError] = useState(false);
  const { availableAction } = useAvailableActionQuery(device_id, device_fun);
  const { deviceByFunction } = useDeviceByFunctionQuery(deviceFunction);
  const { actionByFunction } = useActionByFunctionQuery(deviceFunction);
  const { createEvent } = useEventMutation();
  const createMutation = createEvent(device_id);
  const router = useRouter();

  useEffect(() => {
    if (createMutation.isSuccess) {
      router.back();
    }
  }, [createMutation.isSuccess,router]);

  function handleSubmit() {
    if (!event || !deviceFunction || !selectDevice || !action) {
      setError(true);
      return;
    }
    const data = {
      target_device: selectDevice,
      action: action,
      device: device_id,
      event: event,
      extra_settings: {},
    };
    createMutation.mutate(data);
  }
  if (!availableAction) return <ActivityIndicator size="large" />;
  const availableEvent = availableAction.available_events;
  const availableDeviceModels = availableAction.models;
  return (
      <PageContainer>
        <PageHeader title="Dodaj event"></PageHeader>
        <View style={styles.container}>
          <FormContainer extraStyle={{width: "80%",gap:30}}>
            <Header type="large">Dodaj zdarzenie</Header>
           <View style={{width:"100%",gap:20}}>
             <Select
                 items={availableEvent.map((event: string) => ({
                   label: event,
                   value: event,
                 }))}
                 placeholder="Wybierz event"
                 onChange={(e) => setEvent(e)}
             />
             <Select
                 items={availableDeviceModels.map((event: string) => ({
                   label: event,
                   value: event,
                 }))}
                 placeholder="Wybierz typ"
                 onChange={(e) => setDeviceFunction(e)}
             />
             <Select
                 items={
                   !deviceByFunction
                       ? []
                       : deviceByFunction.map((device: IDevice) => ({
                         label: device.name,
                         value: device.id.toString(),
                       }))
                 }
                 placeholder="Wybierz urządzenie"
                 onChange={(e) => setSelectDevice(parseInt(e))}
             />
             <Select
                 items={
                   !actionByFunction
                       ? []
                       : actionByFunction.map((action: string) => ({
                         label: action,
                         value: action,
                       }))
                 }
                 placeholder="Wybierz akcje"
                 onChange={(e) => setAction(e)}
             />
           </View>
            {error && <Message type="error">Wypełnij wszystkie pola</Message>}
            <ButtonContainer>
              <Button type="fancy" onPress={handleSubmit}>Dodaj</Button>
              <Button
                  onPress={() => {
                    router.back();
                  }}
              >
                Anuluj
              </Button>
            </ButtonContainer>
          </FormContainer>
        </View>
      </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
