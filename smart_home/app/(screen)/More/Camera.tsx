import CameraCard from "@/src/components/Cards/CameraCard";
import { cameraUrl } from "@/src/const/urls";
import { StyleSheet, View } from "react-native";

export default function Camera() {
  return (
    <View style={styles.constainer}>
      <CameraCard url={cameraUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
