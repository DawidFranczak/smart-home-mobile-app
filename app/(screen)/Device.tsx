import Loading from "@/src/components/Loading";
import { IDevice } from "@/src/interfaces/IDevice";
import QueryInput from "@/src/ui/QueryInput";
import getDeviceComponent from "@/src/utils/getDeviceCard";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePrefetchDeviceQuery from "@/src/hooks/queries/device/usePrefetchDeviceQuery";

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
    <View style={styles.container}>
      <QueryInput onChange={handleDeviceQuery} />
      <FlatList
        numColumns={2}
        data={query}
        renderItem={({ item }) => (
          <View style={styles.item}>{getDeviceComponent(item)}</View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  item: {
    flex: 1 / 2,
  },
});
