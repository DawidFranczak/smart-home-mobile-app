import Loading from "@/src/components/Loading";
import { IDevice } from "@/src/interfaces/IDevice";
import QueryInput from "@/src/ui/QueryInput";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePrefetchDeviceQuery from "@/src/hooks/queries/device/usePrefetchDeviceQuery";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";

export default function Device() {
  const { deviceData } = usePrefetchDeviceQuery();
  const [query, setQuery] = useState<IDevice[]>([]);
  useEffect(() => {
    if (deviceData) {
      setQuery(deviceData);
    }
  }, [deviceData]);

  const handleDeviceQuery = (value: string) => {
    const filter = value.toLowerCase();
    const dataToDisplay = deviceData.filter((device: IDevice) => {
      return device.name.toLowerCase().includes(filter);
    });
    setQuery(dataToDisplay);
  };

  if (!query) return <Loading />;
  return (
    <PageContainer>
      <PageHeader title="Urządzenia" subtitle="Zarządzaj urządzeniami" >
        <QueryInput onChange={handleDeviceQuery} />
      </PageHeader>
      <FlatList
        numColumns={2}
        data={query}
        renderItem={({ item }) => (
          <View style={styles.item}>{getDeviceComponent(item)}</View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1 / 2,
  },
});
